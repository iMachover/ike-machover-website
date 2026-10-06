import { createFileRoute } from "@tanstack/react-router";

import { ScrollScrub } from "@/components/scroll-scrub/scroll-scrub";
import { scrollScrubScenes, scrollScrubTheme } from "@/scroll-scrub-scenes";
import "@/site.css";

export const Route = createFileRoute("/")({
  component: Index,
});

const waypoints = [
  "Piano",
  "Wedding",
  "Gaming",
  "Hockey",
  "Florida",
  "Ocean",
  "Mountains",
  "Coding",
  "Hardware",
  "AI Build",
  "Universe",
] as const;

function Index() {
  return (
    <main className="ike-site" id="top">
      <a className="skip-link" href="#scene-01">Skip to story</a>

      <header className="site-header">
        <a className="site-header__brand" href="#top" aria-label="Ike Machover, back to top">
          <img alt="" height="32" src="/assets/brand/portal-mark.png" width="32" />
          <span>Ike Machover</span>
        </a>
        <span className="site-header__edition">A life in motion</span>
        <a className="site-header__map" href="#finale">
          View the map <span aria-hidden="true">↗</span>
        </a>
      </header>

      <ScrollScrub scenes={scrollScrubScenes} theme={scrollScrubTheme} />

      <section aria-labelledby="finale-title" className="site-finale" id="finale">
        <div className="site-finale__atmosphere" aria-hidden="true" />
        <div className="site-finale__intro">
          <span className="site-finale__number">11 / 11</span>
          <h2 id="finale-title">Where to next?</h2>
          <p>Music, games, movement, nature, hardware, code, and the questions beyond.</p>
          <a className="site-finale__restart" href="#scene-01">
            <span aria-hidden="true">↶</span> Start again
          </a>
        </div>
        <nav aria-label="Explore a waypoint" className="site-finale__route">
          <ol>
            {waypoints.map((waypoint, index) => (
              <li key={waypoint}>
                <a href={`#scene-${String(index + 1).padStart(2, "0")}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <img
                    alt=""
                    height="28"
                    loading="lazy"
                    src={`/assets/brand/icons/waypoint-${String(index + 1).padStart(2, "0")}.png`}
                    width="28"
                  />
                  {waypoint}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <footer className="site-finale__foot">
          <span>Ike Machover</span>
          <span>Keep exploring.</span>
        </footer>
      </section>
    </main>
  );
}
