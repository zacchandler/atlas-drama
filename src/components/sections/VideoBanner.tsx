"use client";

// VideoBanner (#video-banner) — full-bleed showreel band, 690px tall at desktop.
// Poster state: looping muted reel; global cursor shows a white "Play" circle
// (wrapper emits `cursor-hide` + data-cursor="play", handled by DotCursor).
// Click → expanded state: same <video> switches to the full showreel, unmuted,
// from 0s, with simple overlay controls (volume + fullscreen bottom-right,
// close top-right). Esc also exits.
// Spec: docs/research/components/souls.spec.md + video-banner.tree.json

import { useCallback, useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

const POSTER_SRC = asset("/videos/pip.mp4");
const SHOWREEL_SRC = asset("/videos/pip.mp4");

const CTRL_BTN =
  "cursor-pointer text-white transition-transform duration-200 hover:scale-[1.2]";

function VolumeIcon({ muted }: { muted: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 7.5v5h3.2L11 16.5v-13L6.2 7.5H3z"
        fill="currentColor"
      />
      {muted ? (
        <path
          d="M13.5 7.5l4 5m0-5l-4 5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      ) : (
        <>
          <path
            d="M13.2 7.6a3.4 3.4 0 010 4.8"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M15.3 5.6a6.2 6.2 0 010 8.8"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

function FullscreenIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 6.5V2h4.5M11.5 2H16v4.5M16 11.5V16h-4.5M6.5 16H2v-4.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 2.5l13 13m0-13l-13 13"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function VideoBanner() {
  const [expanded, setExpanded] = useState(false);
  const [muted, setMuted] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // One <video> element: swap src + audio + loop between the two states.
  // Also guarantees the poster reel autoplays muted on first mount.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (expanded) {
      video.src = SHOWREEL_SRC;
      video.loop = false;
      video.muted = false;
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.src = POSTER_SRC;
      video.loop = true;
      video.muted = true;
      video.play().catch(() => {});
    }
  }, [expanded]);

  const exitToPoster = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    setMuted(false);
    setExpanded(false);
  }, []);

  // Esc exits the expanded showreel.
  useEffect(() => {
    if (!expanded) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") exitToPoster();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expanded, exitToPoster]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
      return;
    }
    wrapRef.current?.requestFullscreen?.().catch(() => {});
  };

  return (
    <div
      id="video-banner"
      ref={wrapRef}
      data-scroll=""
      className="relative h-[240px] w-full overflow-hidden bg-black md:h-[690px]"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={POSTER_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      {!expanded ? (
        /* Poster hit-area: native cursor hidden, global PlayCursor follows. */
        <div
          className="cursor-hide absolute inset-0 z-[1]"
          data-cursor="play"
          role="button"
          tabIndex={0}
          aria-label="Play the Atlas raid reel"
          onClick={() => setExpanded(true)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setExpanded(true);
            }
          }}
        />
      ) : (
        <>
          <button
            type="button"
            aria-label="Close showreel"
            onClick={exitToPoster}
            className={`${CTRL_BTN} absolute right-[24px] top-[20px] z-[2] md:right-[48px] md:top-[28px]`}
          >
            <CloseIcon />
          </button>
          <div className="absolute bottom-[15px] right-[24px] z-[2] flex items-center gap-[18px] md:right-[48px]">
            <button
              type="button"
              aria-label={muted ? "Unmute showreel" : "Mute showreel"}
              onClick={toggleMute}
              className={CTRL_BTN}
            >
              <VolumeIcon muted={muted} />
            </button>
            <button
              type="button"
              aria-label="Toggle fullscreen"
              onClick={toggleFullscreen}
              className={CTRL_BTN}
            >
              <FullscreenIcon />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
