import { useEffect } from "react";

const SITE = "https://sorgenx.com";

export const HOME_PAGE_META = {
  title: "Aether | SORGEN 家用恢复舱",
  description:
    "Aether 家用恢复舱。小元越用越懂你，App 连接日常，把短时恢复带进家里。深圳溯元求索智能科技有限公司（SORGEN）。",
  ogDescription: "Aether 家用恢复舱 — 深圳溯元求索智能科技有限公司（SORGEN）",
  path: "/",
} as const;

type PageMeta = {
  title: string;
  description: string;
  /** Site path beginning with `/`. Null skips canonical / og:url (used by 404). */
  path: string | null;
  ogDescription?: string;
  robots?: string;
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`;
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

function removeRobotsIfUnset(robots?: string) {
  const existing = document.head.querySelector('meta[name="robots"]');
  if (!robots) {
    existing?.remove();
    return;
  }
  upsertMeta("name", "robots", robots);
}

export function usePageMeta({ title, description, path, ogDescription, robots }: PageMeta) {
  useEffect(() => {
    const socialDescription = ogDescription ?? description;
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", socialDescription);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", socialDescription);
    if (path) {
      const url = path === "/" ? `${SITE}/` : `${SITE}${path}`;
      upsertMeta("property", "og:url", url);
      upsertLink("canonical", url);
    }
    removeRobotsIfUnset(robots);
  }, [title, description, path, ogDescription, robots]);
}
