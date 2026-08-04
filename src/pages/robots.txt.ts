import type { APIRoute } from "astro";
import { SITE } from "../lib/site";

// Généré au build pour rester aligné sur le sitemap produit par
// @astrojs/sitemap (sitemap-index.xml).
const body = `User-agent: *
Allow: /

Sitemap: ${SITE.url}/sitemap-index.xml
`;

export const GET: APIRoute = () =>
  new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
