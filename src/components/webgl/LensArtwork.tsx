"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Hero WebGL — reconstruction of monopo.vn's `#lens-artwork` scene.
 *
 * Pipeline (recovered from the live bundle, docs/research/source/SHADERS_EXTRACTED.glsl):
 *  1. Background plane — procedural noise/lines gradient shader
 *     (palette: sage [120,158,113], amber [224,148,66], gold [232,201,73]).
 *  2. CubeCamera captures the background → samplerCube `tCube`.
 *  3. Refractive sphere — Three.js Fresnel shader with the site's exact uniforms
 *     (mRefractionRatio .016, mFresnelBias .016, mFresnelPower 4.206, mFresnelScale 2.442).
 *  4. Film-grain post pass (random offset +0.075).
 */

const BG_VERT = /* glsl */ `
varying vec3 vUv;
void main() {
  vUv = position;
  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * modelViewPosition;
}
`;

const BG_FRAG = /* glsl */ `
#define PR 1.0
varying vec3 vUv;

uniform vec3 uBaseFirstColor;
uniform vec3 uBaseSecondColor;
uniform vec3 uAccentColor;
uniform float uBgProgress;
uniform float uAccentOpacity;
uniform float uBaseFrequency;
uniform float uAccentFrequency;
uniform float uNoiseIntensity;
uniform float uOpacityBackground;
uniform float uTime;
uniform float uZoom;
uniform vec2 u_res;

vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

float noise(vec3 p){
  vec3 a = floor(p);
  vec3 d = p - a;
  d = d * d * (3.0 - 2.0 * d);
  vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
  vec4 k1 = perm(b.xyxy);
  vec4 k2 = perm(k1.xyxy + b.zzww);
  vec4 c = k2 + a.zzzz;
  vec4 k3 = perm(c);
  vec4 k4 = perm(c + 1.0);
  vec4 o1 = fract(k3 * (1.0 / 41.0));
  vec4 o2 = fract(k4 * (1.0 / 41.0));
  vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
  vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);
  return o4.y * d.y + o4.x * (1.0 - d.y);
}

float snoise3(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1. + 3.0 * C.xxx;
  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0/7.0;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

mat2 rotate2d(float angle){
  return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

float lines(in vec2 pos, float b){
  float scale = 10.0;
  pos *= scale;
  return smoothstep(0.0, .5 + b * .5, abs((sin(pos.x * 3.1415) + b * 2.0)) * .5);
}

float circle(in vec2 _st, in float _radius, in float blurriness){
  vec2 dist = _st;
  return 1. - smoothstep(_radius - (_radius * blurriness), _radius + (_radius * blurriness), dot(dist, dist) * 4.0);
}

float dist(vec2 p0, vec2 pf){return sqrt((pf.x-p0.x)*(pf.x-p0.x)+(pf.y-p0.y)*(pf.y-p0.y));}

void main() {
  vec2 resolution = u_res * PR;
  vec3 uv = vUv.xyz;

  float progress = uBgProgress;

  float baseNoise = noise(uBaseFrequency * uv + uTime);
  vec2 basePos = rotate2d(baseNoise) * uv.xy * uZoom;
  float basePattern = basePos.x;
  basePattern = lines(basePos, .5);

  vec2 st = gl_FragCoord.xy / resolution.xy - vec2(.5);
  st.y *= resolution.y / resolution.x;
  float c = circle(st, .2 + progress * 10.0, 2.);
  float offX = uv.x + sin(uv.y + uTime * 2.);
  float offY = uv.y - uTime * .2 - cos(uTime * 2.) * 0.1;

  float nc = (snoise3(vec3(offX, offY, uTime * 5.) * 2.)) * .03;
  float d = dist(resolution.xy * 0.5, gl_FragCoord.xy) * (1.0 - progress) * 0.003;

  vec2 accentPos = rotate2d(baseNoise) * uv.xy * uZoom;
  float accentPattern = accentPos.x;
  accentPattern = lines(accentPos, .1);

  vec3 baseMix = mix(uBaseFirstColor, uBaseSecondColor, basePattern);
  vec3 accentMix = mix(baseMix, uAccentColor, accentPattern - (1. - uAccentOpacity));

  float finalMask = smoothstep(1., 1., pow(c, 6.) * 10. + nc * (1. - progress));
  vec4 finalImage = mix(vec4(finalMask), vec4(accentMix, 1.0), clamp((finalMask + progress), 0., 1.)) * (1.0 - d);

  gl_FragColor = vec4(vec3(finalImage), uOpacityBackground);
}
`;

const FRESNEL_VERT = /* glsl */ `
uniform float mRefractionRatio;
uniform float mFresnelBias;
uniform float mFresnelScale;
uniform float mFresnelPower;

varying vec3 vReflect;
varying vec3 vRefract[3];
varying float vReflectionFactor;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
  vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );
  vec3 I = worldPosition.xyz - cameraPosition;
  vReflect = reflect( I, worldNormal );
  vRefract[0] = refract( normalize( I ), worldNormal, mRefractionRatio );
  vRefract[1] = refract( normalize( I ), worldNormal, mRefractionRatio * 0.99 );
  vRefract[2] = refract( normalize( I ), worldNormal, mRefractionRatio * 0.98 );
  vReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), mFresnelPower );
  gl_Position = projectionMatrix * mvPosition;
}
`;

const FRESNEL_FRAG = /* glsl */ `
uniform samplerCube tCube;
uniform float uSphereAlpha;
uniform float uRefractionPower;

varying vec3 vReflect;
varying vec3 vRefract[3];
varying float vReflectionFactor;

void main() {
  vec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );
  vec4 refractedColor = vec4( 1.0 );
  refractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;
  refractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;
  refractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;
  refractedColor.a = uRefractionPower;
  gl_FragColor = mix( vec4(vec3(refractedColor.rgb), refractedColor.a), reflectedColor * uSphereAlpha, clamp( vReflectionFactor, 0.0, 1.0 ) );
}
`;

const GRAIN_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

const GRAIN_FRAG = /* glsl */ `
uniform float amount;
uniform sampler2D tDiffuse;
varying vec2 vUv;

float random( vec2 p )
{
  vec2 K1 = vec2(
    23.14069263277926,
    2.665144142690225
  );
  return fract( cos( dot(p,K1) ) * 12345.6789 );
}

void main() {
  vec4 color = texture2D( tDiffuse, vUv );
  vec2 uvRandom = vUv;
  uvRandom.y *= random(vec2(uvRandom.y,amount));
  color.rgb += random(uvRandom)*0.075;
  gl_FragColor = vec4( color );
}
`;

const rgb = (r: number, g: number, b: number) => new THREE.Color(r / 255, g / 255, b / 255);

export default function LensArtwork() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let w = mount.clientWidth || window.innerWidth;
    let h = mount.clientHeight || window.innerHeight;
    const isMobile = w < 1024;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.domElement.id = "lens-artwork";
    mount.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.z = 5;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // -- background plane (fills frustum at z=0; vUv = local position, ±0.5) --
    const fovY = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    const bgUniforms = {
      uTime: { value: 0 },
      // Atlas ember palette (was monopo sage/amber): bright red → ember-orange → black
      uBaseFirstColor: { value: rgb(214, 39, 39) },
      uBaseSecondColor: { value: rgb(255, 96, 40) },
      uAccentColor: { value: rgb(6, 6, 8) },
      uBgProgress: { value: 0 },
      uAccentOpacity: { value: 0.55 },
      uBaseFrequency: { value: 2.6 },
      uAccentFrequency: { value: 2.2 },
      uNoiseIntensity: { value: 0 },
      uOpacityBackground: { value: 0 },
      uZoom: { value: isMobile ? 0.1 : 0.2 },
      u_res: { value: new THREE.Vector2(w, h) },
    };
    const bgMat = new THREE.ShaderMaterial({
      vertexShader: BG_VERT,
      fragmentShader: BG_FRAG,
      uniforms: bgUniforms,
      transparent: true,
      depthWrite: false,
    });
    const bgMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), bgMat);
    bgMesh.scale.set(fovY * (w / h), fovY, 1);
    scene.add(bgMesh);

    // -- cube camera captures background for the refraction sphere --
    const cubeRT = new THREE.WebGLCubeRenderTarget(256);
    const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRT);
    scene.add(cubeCamera);

    // -- fresnel refraction sphere (exact live uniforms) --
    const sphereUniforms = {
      mRefractionRatio: { value: 0.016 },
      mFresnelBias: { value: 0.016 },
      mFresnelScale: { value: 2.442 },
      mFresnelPower: { value: 4.206 },
      tCube: { value: cubeRT.texture },
      uSphereAlpha: { value: 0 },
      uRefractionPower: { value: 0 },
    };
    const sphereMat = new THREE.ShaderMaterial({
      vertexShader: FRESNEL_VERT,
      fragmentShader: FRESNEL_FRAG,
      uniforms: sphereUniforms,
      transparent: true,
    });
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(2.2, 64, 64), sphereMat);
    sphere.position.set(isMobile ? 0.6 : 1.15, isMobile ? 1.9 : 1.65, 1.0);
    cubeCamera.position.copy(sphere.position);
    scene.add(sphere);

    // -- film grain post pass --
    const rt = new THREE.WebGLRenderTarget(w * renderer.getPixelRatio(), h * renderer.getPixelRatio());
    const postScene = new THREE.Scene();
    const postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const grainUniforms = {
      tDiffuse: { value: rt.texture },
      amount: { value: 0 },
    };
    const postQuad = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({ vertexShader: GRAIN_VERT, fragmentShader: GRAIN_FRAG, uniforms: grainUniforms })
    );
    postScene.add(postQuad);

    // -- intro ramp: bgProgress 0→.25, opacity 0→.8, sphere fades in --
    const start = performance.now();
    const INTRO_MS = 2400;

    let raf = 0;
    const render = (t: number) => {
      const k = Math.min((t - start) / INTRO_MS, 1);
      const ease = 1 - Math.pow(1 - k, 3);
      bgUniforms.uBgProgress.value = 0.25 * ease; // live hero settles at .25 — pattern with deep black edges
      bgUniforms.uOpacityBackground.value = 0.8 * ease;
      sphereUniforms.uSphereAlpha.value = ease;
      sphereUniforms.uRefractionPower.value = 0.75 * ease;

      bgUniforms.uTime.value += 7e-5 * 2; // live site: ~7e-5 per frame (speed factor ~2 for visible drift)

      // cubemap: hide sphere while capturing its environment
      sphere.visible = false;
      cubeCamera.update(renderer, scene);
      sphere.visible = true;

      grainUniforms.amount.value = Math.random();

      renderer.setRenderTarget(rt);
      renderer.render(scene, camera);
      renderer.setRenderTarget(null);
      renderer.render(postScene, postCamera);

      if (!reduced || k < 1) raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const onResize = () => {
      w = mount.clientWidth || window.innerWidth;
      h = mount.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const fy = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      bgMesh.scale.set(fy * (w / h), fy, 1);
      bgUniforms.u_res.value.set(w, h);
      rt.setSize(w * renderer.getPixelRatio(), h * renderer.getPixelRatio());
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      rt.dispose();
      cubeRT.dispose();
      bgMat.dispose();
      sphereMat.dispose();
      if (renderer.domElement.parentElement === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
