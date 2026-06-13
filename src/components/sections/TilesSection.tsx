/**
 * TilesSection — rotated diamond photo mosaic.
 *
 * Reconstruction of monopo.vn `#tilesGrid` (study clone).
 * Spec: docs/research/components/tiles.spec.md + tiles.tree.json
 *
 * Motion contract: ScrollProvider (Locomotive v4) reads the data-scroll
 * attributes and applies horizontal parallax transforms — rows drift in
 * alternating directions (+1 / -1) while each inner img-container adds a
 * layered ±.5 drift inside its diamond mask. No custom JS here.
 *
 * Geometry (parametric on --tile, 458px desktop / 180px mobile):
 * - tile box rotated 45deg, overflow hidden -> diamond mask
 * - inner <img> counter-rotated -45deg scale(1.45) -> photo reads upright
 * - horizontal period = 1.5 x tile  -> flex gap = tile/2 (thin black gaps)
 * - vertical pitch = 0.75 x tile    -> row margin-top = -tile/4 (interlock)
 * - adjacent rows staggered by half a period -> rows offset +/- 0.375 x tile
 * - 6 tiles per row (8.5 x tile wide) so motion never reveals lattice edges
 *
 * NOTE: rotation lives on the static `tiles__line-img` mask and the initial
 * row offsets use relative `left` — Locomotive overwrites `style.transform`
 * on data-scroll elements, so neither may be baked into a transform there.
 */

const ROW_IMAGES: string[][] = [
  ["atlas-01.jpg", "atlas-02.jpg", "atlas-03.jpg"],
  ["atlas-04.jpg", "atlas-05.jpg", "atlas-06.jpg"],
  ["atlas-07.jpg", "atlas-08.jpg", "atlas-09.jpg"],
  ["atlas-10.jpg", "atlas-11.jpg", "atlas-12.jpg"],
];

const SLOTS_PER_ROW = 6;

export default function TilesSection() {
  return (
    <section
      id="tilesGrid"
      className="tiles tiles--rotated relative h-[400px] overflow-hidden bg-black [--tile:180px] md:h-[790px] md:[--tile:458px]"
    >
      <div className="tiles__wrap absolute left-1/2 top-1/2 flex w-[calc(var(--tile)*8.5)] -translate-x-1/2 -translate-y-1/2 flex-col">
        {ROW_IMAGES.map((images, rowIndex) => {
          const positive = rowIndex % 2 === 0;
          const slots = Array.from(
            { length: SLOTS_PER_ROW },
            (_, slot) => images[slot % images.length],
          );

          return (
            <div
              key={rowIndex}
              className={[
                "tiles__line relative flex w-max gap-[calc(var(--tile)/2)]",
                rowIndex > 0 ? "-mt-[calc(var(--tile)/4)]" : "",
                positive
                  ? "left-[calc(var(--tile)*-0.375)]"
                  : "left-[calc(var(--tile)*0.375)]",
              ]
                .filter(Boolean)
                .join(" ")}
              data-scroll=""
              data-scroll-speed={positive ? "1" : "-1"}
              data-scroll-direction="horizontal"
              data-scroll-target="#tilesGrid"
            >
              {slots.map((file, slotIndex) => (
                <div
                  key={slotIndex}
                  className="tiles__line-img relative h-[var(--tile)] w-[var(--tile)] shrink-0 rotate-45 overflow-hidden"
                >
                  <div
                    className="img-container h-full w-full"
                    data-scroll=""
                    data-scroll-speed={positive ? ".5" : "-.5"}
                    data-scroll-direction="horizontal"
                    data-scroll-target="#tilesGrid"
                  >
                    {/* Decorative mosaic photo — plain <img> per spec */}
                    <img
                      src={`/images/tiles/${file}`}
                      alt=""
                      className="h-full w-full -rotate-45 scale-[1.45] object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}
