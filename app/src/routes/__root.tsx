import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import appMetaJson from "../app-meta.json";
import { reportHiggsfieldError } from "../lib/higgsfield-error-reporting";

declare const __HF_DESIGN_INSPECTOR__: boolean;

type AppMeta = {
  og_title?: string | null;
  og_description?: string | null;
  og_image_url?: string | null;
  favicon_url?: string | null;
  og_video_url?: string | null;
  marketplace_cover_url?: string | null;
  theme_color?: string | null;
};

const appMeta = appMetaJson as AppMeta;
const siteUrl = "https://ike-machover.higgsfield.app";

function absoluteUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    return new URL(value, siteUrl).toString();
  } catch {
    return null;
  }
}

function buildHead(meta: AppMeta) {
  const title = meta.og_title ?? "Ike Machover";
  const description =
    meta.og_description ??
    "An interactive journey through the places and passions that shape Ike Machover.";
  const image = absoluteUrl(meta.og_image_url);
  const favicon = meta.favicon_url ?? "/assets/brand/favicon.svg";
  const video = absoluteUrl(meta.og_video_url);

  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title },
      { name: "description", content: description },
      { name: "author", content: "Ike Machover" },
      { name: "theme-color", content: meta.theme_color ?? "" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl },
      { name: "twitter:card", content: "summary_large_image" },
      ...(image
        ? [
            { property: "og:image", content: image },
            { name: "twitter:image", content: image },
          ]
        : []),
      ...(video ? [{ property: "og:video", content: video }] : []),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: favicon },
      { rel: "icon", type: "image/x-icon", href: "/assets/brand/favicon.ico" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/assets/brand/favicon-16.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/assets/brand/favicon-32.png" },
      { rel: "apple-touch-icon", href: "/assets/brand/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  };
}

function NotFoundComponent() {
  return (
    <main className="site-system-page">
      <img alt="" height="72" src="/assets/brand/portal-mark.png" width="72" />
      <p>Lost waypoint</p>
      <h1>404</h1>
      <a href="/">Return to the journey</a>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    reportHiggsfieldError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <main className="site-system-page">
      <img alt="" height="72" src="/assets/brand/portal-mark.png" width="72" />
      <p>The route paused</p>
      <h1>Let's try again.</h1>
      <button
        onClick={() => {
          router.invalidate();
          reset();
        }}
        type="button"
      >
        Reload the journey
      </button>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => buildHead(appMeta),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    if (!__HF_DESIGN_INSPECTOR__) return;
    void import("../module/design-inspector/runtime")
      .then(({ installHiggsfieldDesignInspector }) => {
        installHiggsfieldDesignInspector();
      })
      .catch((error) => {
        reportHiggsfieldError(
          error instanceof Error ? error : new Error("Design inspector failed"),
          { boundary: "design_inspector_import" },
        );
      });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
