// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://sandrapautonnier.com",
  output: "static",
  trailingSlash: "always",
  integrations: [react(), sitemap()],
  build: {
    // Génère /page/index.html plutôt que /page.html, cohérent avec
    // trailingSlash: "always" et les URLs déjà indexées.
    format: "directory",
  },
});
