import type { APIRoute } from "astro";
import { SITE } from "../lib/site";

/**
 * Généré au build pour rester aligné sur le sitemap produit par
 * @astrojs/sitemap (sitemap-index.xml).
 *
 * Les robots des moteurs d'IA sont nommés un par un, et autorisés. Sans
 * mention explicite, certains s'en tiennent à la règle générale, d'autres
 * considèrent l'absence de consigne comme un refus : les citer lève
 * l'ambiguïté. Google-Extended ne pilote pas le classement dans la recherche
 * Google, seulement l'usage des contenus par Gemini et les aperçus IA.
 *
 * Pour fermer la porte à l'un d'eux plus tard, il suffit de remplacer son
 * « Allow: / » par « Disallow: / ».
 */
const ROBOTS_IA = [
  "GPTBot", // OpenAI, entraînement
  "OAI-SearchBot", // OpenAI, recherche dans ChatGPT
  "PerplexityBot",
  "ClaudeBot", // Anthropic
  "Google-Extended", // Gemini et aperçus IA de Google
];

const body = `User-agent: *
Allow: /

${ROBOTS_IA.map((robot) => `User-agent: ${robot}\nAllow: /`).join("\n\n")}

Sitemap: ${SITE.url}/sitemap-index.xml
`;

export const GET: APIRoute = () =>
  new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
