import js from "@eslint/js";
import globals from "globals";

// Configuration réduite au strict nécessaire depuis la suppression de React.
// L'ancienne importait eslint-plugin-react-refresh, qui n'a jamais figuré
// dans package.json : « npm run lint » échouait donc depuis la migration.
//
// Portée volontairement limitée au JavaScript : les fichiers .ts et .astro
// demanderaient typescript-eslint et eslint-plugin-astro, deux dépendances
// de plus. Leur typage est déjà vérifié au build par Astro.
export default [
  { ignores: ["dist", ".astro"] },
  {
    files: ["**/*.{js,mjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
    rules: js.configs.recommended.rules,
  },
];
