# Audit du codebase — sandrapautonnier (SPA React)

Audit en lecture seule effectué le 2026-07-28. Aucun fichier n'a été modifié.
Legend gravité : 🔴 bloquant · 🟠 important · 🟡 cosmétique.
"AVANT" = à corriger avant de migrer vers Astro. "PENDANT" = se règle naturellement en migrant (composant/fichier de toute façon réécrit ou déplacé).

---

## 1. Structure

Arborescence globale saine (`src/{pages,components,features,assets,sass,store}`), mais deux fichiers sortent nettement du lot :

| Fichier | Lignes | Constat |
|---|---|---|
| `src/features/QuoteEstimator/index.jsx` | **1372** | 🔴 **Anormalement gros.** Mélange dans un seul fichier : le catalogue de prix (data), le moteur de calcul, 5 écrans de formulaire (JSX), la génération de PDF (jsPDF), le formatage de texte et un envoi d'email désactivé. Aucune autre logique métier du site n'approche cette taille. |
| `src/sass/features/_quoteEstimator.scss` | 688 | 🟠 Miroir du fichier ci-dessus — la complexité du composant se propage dans son style. |
| `src/index.css` (+ `.map`) | 2286 | 🟠 **Fichier généré committé dans Git.** C'est la sortie compilée de `style.scss` (via un script `sass --watch` séparé de Vite), pas une source. Voir section 5. |
| `src/components/ProjectDetail/index.jsx` | 167 | 🟡 Taille raisonnable, mais logique de scroll-restoration via `localStorage` un peu bricolée (section 8). |

Le reste (pages, composants, features) est dans des tailles raisonnables (30–165 lignes).

**Gravité globale section 1 : 🔴 bloquant** sur `QuoteEstimator` (AVANT — le découper avant migration limite la taille de l'île `client:load`), 🟡 cosmétique pour le reste.

---

## 2. Composants

| Composant | Rôle | Utilisé dans | Réutilisable ? |
|---|---|---|---|
| `Navbar` | Nav principale + burger menu | Toutes les pages | Oui |
| `Footer` | Pied de page + réseaux sociaux | Toutes les pages | Oui |
| `Loader` | Écran de chargement initial | Non importé dans le SPA actuel (le loader vit dans `index.html`/`public/loader.css`) | Composant orphelin, voir ci-dessous |
| `Meta` | `document.title` + meta description via `useEffect` | Home, Profile, Portfolio, Contact, Price, ProjectDetail | Oui, mais **pattern 100% client-side** — inutile en SSG (section 8) |
| `Dropdown` | Menu déroulant générique (texte ou liste) | `Works` (filtre catégorie), documenté par `QuoteEstimator` en interne (composant inline distinct, ne réutilise pas celui-ci) | Oui |
| `ProjectDetail` | Page détail d'un projet portfolio | Route `/portfolio/:id` | Non (jetable, spécifique à une route) |
| `Works` | Grille de projets filtrable | Portfolio (x2), — pas Home (Home a sa propre logique de carousel) | Oui |
| `Skills` | Grille de compétences | **Aucun** import trouvé nulle part | 🔴 **Code mort, voir ci-dessous** |
| `Carousel` (feature) | Carousel générique à enfants | Home | Oui |
| `AgeCalculator` (feature) | Calcule un âge à partir d'une date | Profile | Oui, minimal |
| `QuoteEstimator` (feature) | Simulateur de devis 5 étapes + PDF | Price | Non (jetable, spécifique à une route), et beaucoup trop gros |
| `useThemeStore` (store) | Store Zustand dark/light mode | **Aucun** import trouvé nulle part | 🔴 **Code mort, voir ci-dessous** |

### Code mort confirmé

- **`src/components/Skills/index.jsx`** (🔴 bloquant si jamais réimporté) : importe `../../assets/content/skillsList.json`, qui **n'existe pas** (seuls `certificates.json`, `services.json`, `technicalSkills.json`, `worksList.json` existent). Le composant n'est actuellement importé nulle part donc ça ne casse rien en l'état, mais toute tentative de le réutiliser plantera au build/à l'exécution. **AVANT** — supprimer le composant ou lui fournir de vraies données.
- **`src/store/useThemeStore.jsx`** (🟠 important) : store Zustand complet (dark/light mode), jamais importé par aucun composant. Aucun bouton de bascule de thème n'existe dans l'UI (Navbar/Footer ne l'appellent pas). De plus, même s'il était branché, il est **cassé sur le fond** : `document.body.className = "mode"` assigne toujours le littéral `"mode"`, jamais une variante liée à `isDarkMode` — donc aucune distinction dark/light ne s'appliquerait jamais. **AVANT** — supprimer le fichier et la dépendance `zustand` (sauf si un dark mode est prévu et qu'il faut le refaire correctement).
- **`src/assets/content/certificates.json`** (🟡 cosmétique) : fichier de données jamais importé nulle part. **AVANT/PENDANT** — supprimer ou l'utiliser réellement dans Profile.
- **`src/components/Loader/index.jsx`** (🟡 cosmétique) : composant écran de chargement, non importé — le vrai loader affiché est géré directement dans `index.html`/`public/loader.css`/`main.jsx` (suppression du `#preloader` après montage React). Composant dupliqué/orphelin.

### Doublons de logique

- `QuoteEstimator` réimplémente son propre bouton dropdown (`quote-estimator-project-toggle`) avec la même mécanique (hauteur animée via `scrollHeight`, chevron rotatif) que le composant `Dropdown` existant, au lieu de le réutiliser. 🟡 cosmétique, mais entretient la duplication de code déjà signalée en section 1.
- `formatEUR`, `formatRangeEUR`, `optionPriceLabel`, `ecommercePriceLabel` (`QuoteEstimator`) : quatre fonctions de formatage de prix qui se chevauchent presque totalement (`optionPriceLabel` et `ecommercePriceLabel` sont quasi identiques). 🟡 cosmétique.
- `detailsText`, `prestationsSummary` et les `summaryLines` internes à `downloadPdf` : **trois implémentations parallèles** qui reconstruisent chacune, indépendamment, un résumé texte des mêmes choix utilisateur (type de projet, options, multilingue, hébergement...). Modifier une règle métier oblige à la répercuter dans les trois. 🟠 important — AVANT (risque réel de désynchronisation lors d'une future modif de prix).
- Code mort *dans* `QuoteEstimator` : le bloc email (bouton, formulaire, état `clientName`/`clientEmail`/`sending`/`status`, fonction `sendEmail`) est entièrement commenté en JSX (`{/* COMMENTÉ ... */}`) mais toute la logique JS associée (états, fonction `sendEmail` avec des IDs EmailJS factices `"service_xxxx"`/`"template_xxxx"`) reste active dans le fichier. 🟡 cosmétique mais alourdit encore le fichier déjà trop gros.

---

## 3. Styles

**Approche** : SCSS global classique (pas de CSS Modules, pas de Tailwind, pas de styled-components), importé via un barrel `src/sass/style.scss` qui `@import` les partials. Deux composants (`Dropdown`, `ProjectDetail`) importent en plus leur propre `.scss` directement dans le `.jsx` — le reste dépend uniquement du bundle global. 🟡 stratégie d'import incohérente, sans conséquence fonctionnelle.

### Variables

`src/sass/utils/_variables.scss` centralise correctement les couleurs de base (`$main-color`, `$secondary-color`, `$background`, `$text`, `$text-color`, `$border`, `$tags`, `$tags-text`, `$component-hover`, `$component`, `$input`, `$light-color`, `$light-text`). Bonne pratique de départ — **mais elle n'est pas respectée partout** (voir ci-dessous).

### Toutes les couleurs hex trouvées (avec occurrences)

| Couleur | Occurrences | Où | Statut |
|---|---|---|---|
| `#70588C` (= `$main-color`/`$text-color`/`$border`) | 3 en SCSS (déjà via variable) **+ 10 en dur dans `QuoteEstimator.jsx`** (styles inline) | `_variables.scss`, `QuoteEstimator/index.jsx` | 🟠 important — le composant le plus visible du site contourne entièrement le design system |
| `linear-gradient(135deg, #E8B4C8 0%, #C8A8D8 50%, #A8C8B8 100%)` | **9** répétitions du triplet complet | `_mixins.scss` (x6), `style.scss` (x2), `_footer.scss` (x1) | 🟠 important — jamais extrait en variable/mixin unique malgré des mixins déjà dédiés au dégradé |
| `#f5f1ed` (= valeur de `$component`) | 8 | `_mixins.scss` (x3), `_variables.scss` (x1, en tant que `$component`), `_home.scss`, `_footer.scss`, `style.scss`, `_quoteEstimator.scss` | 🟠 important — la variable existe et est ignorée 7 fois sur 8 |
| `#666` | 3 | `_contact.scss`, `_quoteEstimator.scss`, `QuoteEstimator.jsx` (inline) | 🟡 |
| `#333` | 4 | `_projectDetail.scss` (x3), `_profile.scss`, `_services.scss` | 🟡 |
| `#999` / `#ddd` / `#ccc` / `#e0e0e0` / `#f0f0f0` / `#f6f6f6` | 1–3 chacune | `_contact.scss`, `_quoteEstimator.scss`, `_mixins.scss`, `_dropdown.scss` | 🟡 gris non documentés, aucune variable |
| `#121212` | 1 | `_loader.scss` | 🟡 |
| `#141414` / `#3f3e3e` | 1 chacune | `style.scss` (`.base-text`/`.bis-text`) | 🟡 |
| `#2e7d32` / `#c62828` | 1 chacune | `_quoteEstimator.scss` (messages succès/erreur) | 🟡 sémantiquement correctes (vert/rouge) mais non variabilisées |
| `#fff9f0` | 1 | `QuoteEstimator.jsx` (inline) | 🟡 |

**Constat global** : les couleurs de marque *sont* centralisées dans `_variables.scss`, mais environ une **quinzaine de valeurs hex** sont dupliquées en dur ailleurs — le pire contrevenant étant `QuoteEstimator.jsx` qui réécrit `#70588C` dix fois en style inline React au lieu d'utiliser une classe SCSS. **PENDANT** (mécanique, à corriger au fil de l'eau en migrant chaque fichier).

### Polices — chargées **trois fois**

1. `@fontsource/montserrat` importé dans `main.jsx` → police self-hostée, bundlée (fichiers `.woff2`/`.woff` visibles dans `dist/assets`).
2. `index.html` charge en plus Montserrat via Google Fonts CDN (`<link href="https://fonts.googleapis.com/css2?family=Montserrat...">`, poids 400/600/700).
3. `style.scss` charge **une troisième fois** Montserrat *et* "Space Grotesk" (utilisée pour tous les titres `h1/h2/h3`) via un second `@import url(fonts.googleapis.com...)`.

Résultat : Montserrat est récupérée depuis deux origines différentes (self-hosted + CDN Google), et Space Grotesk n'a **aucun fallback self-hosted** — elle ne vit que sur le CDN Google alors que c'est la police de tous les titres du site. 🟠 important, impact performance réel (requêtes réseau redondantes, dépendance à un tiers pour les titres). **PENDANT** — la migration Astro est le bon moment pour choisir un seul mécanisme (recommandé : self-host les deux polices avec `@fontsource`, supprimer les deux `@import` Google Fonts).

---

## 4. Contenu

Bonne séparation générale : `services.json`, `worksList.json`, `technicalSkills.json` sont des fichiers de données externes proprement consommés par le JSX (`.map()`), pattern qui se transposera facilement en content collections Astro.

Ce qui **n'est pas** externalisé, alors que le pattern existe déjà pour le reste :
- Le contenu texte de `Legalnotice`, `Home`, `Profile`, `Contact` (paragraphes, listes de réussites, timeline de parcours) est écrit en dur dans le JSX. 🟡 cosmétique, acceptable pour du contenu qui change rarement.
- Le catalogue `PRICING` de `QuoteEstimator` (~110 lignes de labels et prix) est une donnée métier mélangée à la logique du composant, alors que tout le reste du contenu marketing du site vit dans `src/assets/content/*.json`. 🟠 important — l'extraire en fichier de données séparé réduirait mécaniquement la taille du fichier de moitié et faciliterait les futures modifications de prix par quelqu'un de non-technique.
- `certificates.json` : donnée orpheline (section 2).

---

## 5. Dépendances (`package.json`)

| Dépendance | Utilisation | Constat |
|---|---|---|
| `zustand` | Uniquement par `useThemeStore`, lui-même jamais importé | 🟠 **Suppressible** — dépendance entière installée pour du code mort. |
| `@fontsource/montserrat` | `main.jsx` | Utile en soi, mais redondant avec les deux chargements Google Fonts (section 3). |
| `@fortawesome/*` (4 paquets) | Très largement utilisés (Navbar, Footer, Home, Profile, Portfolio, ProjectDetail, QuoteEstimator...) | Légitime. `@fortawesome/react-fontawesome` est à `0.2.2`, trois majeures de retard (`3.5.0` dispo) — pas urgent, mais vérifier les breaking changes avant une mise à jour groupée. |
| `jspdf` | `QuoteEstimator` uniquement (export PDF) | Légitime, usage ciblé. |
| `react-calendly` | `Contact` uniquement (widget de prise de RDV) | Légitime. |
| `@emailjs/browser` | `Contact` + `QuoteEstimator` (fonction morte, section 2) | Légitime pour Contact ; à retirer de QuoteEstimator avec le reste du code mort. |
| `react`, `react-dom`, `react-router-dom` | Cœur de l'app | À jour en version majeure (19 / 7), seulement des patchs disponibles (`npm outdated` : 19.0.0→19.2.8, 7.1.5→7.18.1). Pas obsolète. |
| `sass` (devDep) | Compilé via un script `sass --watch` séparé, lancé en parallèle de Vite par `concurrently` | 🟠 important — **remplaçable par du natif** : Vite supporte nativement l'import de `.scss` sans watcher externe ni fichier `index.css` généré à committer. Ce script disparaîtra de toute façon avec Astro (qui gère `.scss` nativement), donc **PENDANT**. |
| `eslint-config` (`eslint.config.js`) | — | 🟡 `settings.react.version` est figé à `'18.3'` alors que le projet est en React 19 — désynchronisation mineure qui peut masquer des règles de lint spécifiques à React 19. |

**Rien d'alarmant côté obsolescence** — les versions "Wanted" vs "Latest" (`npm outdated`) montrent des écarts de patch/minor normaux, pas de dépendance abandonnée ou avec faille connue identifiée dans cet audit.

---

## 6. Assets

| Fichier | Poids | Format | Constat |
|---|---|---|---|
| `src/assets/images/*.webp` (7 fichiers) | 1.7 Ko – 13.6 Ko | WebP | 🟢 Bien optimisés, rien à signaler. |
| `src/assets/images/Logo_Sukiweb_mono.png` | 21.3 Ko | **PNG** | 🟡 Doublon inutile — la version `.webp` du même logo existe juste à côté (`Logo_Sukiweb_mono.webp`, 1.7 Ko). À vérifier si le `.png` est encore utilisé quelque part avant suppression. |
| `public/Logo_sukiweb.png` | 20.8 Ko | **PNG** | 🟡 Utilisé comme favicon (`index.html`) — poids raisonnable pour un favicon mais pourrait passer en `.ico`/`.svg`. Non bloquant. |
| `public/Sukiweb.webp` | 14.8 Ko | WebP | Référencée comme `twitter:image` dans `index.html`, mais `og:image` pointe vers `/Sukiweb.jpg` — **fichier `.jpg` inexistant dans `public/`**. 🟠 important, lié à la consigne de la phase Astro (uniformiser og:image/twitter:image sur un seul JPG 1200x630 — actuellement aucun des deux formats attendus n'existe correctement). |
| `src/assets/pdf/CV-Sandra-Pautonnier.pdf` | **358.7 Ko** | PDF | 🟡 Plus gros asset du repo. Téléchargé à la demande (pas bloquant pour le rendu), mais lourd pour ce qui est probablement 1–2 pages de texte — une passe de compression serait utile. |
| Images de couverture portfolio (`worksList.json` → `cover`) | Inconnu (hébergées ailleurs) | WebP (à priori) | 🔴 **Aucune des 6 images n'est un asset local** — toutes pointent vers `https://gentle-pony-095b6f.netlify.app/...`, un déploiement Netlify tiers sans rapport avec ce projet. Voir section 8 (fragilité). |

**Aucune image locale au-dessus de 200 Ko.** Pas d'AVIF utilisé nulle part (non bloquant, WebP suffit ; AVIF serait un gain marginal optionnel).

---

## 7. Accessibilité et sémantique

- **Bug confirmé (🔴 bloquant, AVANT)** — `src/components/Works/index.jsx:44` :
  ```jsx
  <img src={`${works.cover}`} alt={`${works.description}`} loading="lazy" />
  ```
  Aucune entrée de `worksList.json` ne possède de champ `description` (les champs sont `titlework`, `context`, `conclusion`, etc.). Cet `alt` se résout donc littéralement en **`alt="undefined"`** sur chaque image de la page `/portfolio` (les deux sections "Projets professionnels et personnels" et "Projets professionnalisants"). Correction triviale (`alt={works.titlework}` par exemple), à faire immédiatement indépendamment du calendrier de migration.
- **H1 manquant sur `/portfolio/:id`** (🟠 important) — `ProjectDetail` n'a **aucun `<h1>`** ; le titre du projet est en `<h2>{project.titlework}</h2>`, directement suivi de `<h3>` pour les sous-sections. Toutes les autres pages ont un `<h1>` unique correctement placé — cette route est l'exception. **AVANT/PENDANT** (à corriger en migrant cette route vers Astro, ou avant si le fix est fait dans le SPA actuel).
- Hiérarchie de titres sinon cohérente : chaque page (`Home`, `Profile`, `Portfolio`, `Contact`, `Legalnotice`) a exactement un `<h1>`, suivi de `<h2>`/`<h3>` dans un ordre logique. Bon point de départ pour respecter la contrainte "un seul H1 par page" de la migration.
- `alt` présents sur quasiment toutes les autres images (`Navbar`, `Footer`, `Home`, `Profile`, `Contact`, `Portfolio`, `ProjectDetail`) — bonne couverture générale, cohérente avec les commits récents ("Refactor headings and accessibility improvements", "add aria-labels").
- **`dangerouslySetInnerHTML`** dans `QuoteEstimator` (ligne ~1343, `formatDetailsWithBold(detailsText)`) : 🟠 important. Le contenu injecté provient uniquement de l'état interne (labels de prix), pas d'une saisie utilisateur directe — pas de faille XSS exploitable *aujourd'hui*. Mais c'est un pattern risqué à conserver : toute évolution future qui ferait transiter du texte saisi par l'utilisateur (ex. son nom) dans `detailsText` ouvrirait une XSS stockée. À corriger avant d'étendre ce composant (remplacer par un rendu JSX structuré plutôt que du HTML string).
- **Boutons réinventés avec des `div`** : `Navbar` (`div role="button" tabIndex="0" onKeyDown={...}` pour le burger menu) et `Dropdown` (même pattern pour le toggle) recréent manuellement la sémantique d'un `<button>` natif au lieu d'en utiliser un. Fonctionnel (gestion clavier présente), mais perd les comportements par défaut du navigateur (focus ring natif, `:disabled`, etc.). 🟡 cosmétique, non bloquant.
- Usage de `div` très dense dans les composants les plus riches (QuoteEstimator, Home, Profile — jusqu'à ~280 occurrences cumulées sur 4 fichiers). Majoritairement des conteneurs de mise en page légitimes, mais `QuoteEstimator` mélange en plus des dizaines de `style={{...}}` inline (grid, couleurs, marges) au lieu de classes SCSS — incohérent avec le reste du codebase qui est full-SCSS. 🟡 cosmétique mais aggrave la duplication de couleurs (section 3).
- `lang="fr"` bien présent sur `<html>` (`index.html`). ✅
- Contrastes : rien d'alarmant détecté statiquement ($text noir sur fond clair `$component`/`#f5f1ed`, `$light-text` `#404044` sur blanc). Quelques gris clairs isolés (`#999` sur fond blanc dans les hints de formulaire `Contact`) sont limites pour AA en petit texte — non vérifiable formellement sans outil de contraste, recommandé de repasser dessus visuellement. 🟡 à vérifier, pas confirmé comme problème.

---

## 8. Points de fragilité

1. **`QuoteEstimator` est le point de fragilité n°1 du site** (🔴). Modifier un seul prix oblige à toucher potentiellement 5 endroits différents du même fichier (`PRICING`, `calcEstimate`, `prestationsSummary`, `detailsText`, `downloadPdf`/`summaryLines`) qui reconstruisent chacun indépendamment une vue du même état — aucune source unique de vérité pour l'affichage. Un oubli dans l'un des cinq est invisible tant qu'on ne teste pas manuellement chaque écran ET le PDF exporté.
2. **Images du portfolio hébergées sur un tiers sans rapport** (🔴) — les 6 covers de `worksList.json` pointent vers `gentle-pony-095b6f.netlify.app`. Si ce déploiement disparaît ou change d'URL, toutes les images du portfolio cassent instantanément sur `/`, `/portfolio` et `/portfolio/:id`, sans que rien dans ce repo ne le détecte. Impossible aussi d'appliquer une optimisation d'image côté Astro sur des URLs distantes non maîtrisées.
3. **Identifiants EmailJS en dur dans le code source** (`Contact/index.jsx`, `QuoteEstimator/index.jsx`) — `service_dgr4ts3` / `template_npfqhdf` / clé publique `0GoSVF1YIRg3i22PD`. Ce n'est pas anormal en soi pour EmailJS (conçu pour du client-side), mais 🟠 important de vérifier que l'allowlist de domaines et le rate-limiting sont bien configurés côté EmailJS, sans quoi n'importe qui peut lire ces identifiants dans le bundle JS et les réutiliser depuis un autre site.
4. **Dépendance implicite entre `Contact` et `QuoteEstimator`** via EmailJS — `Contact` appelle `emailjs.init(...)` dans un `useEffect`, et la fonction `sendEmail` (morte mais toujours présente) de `QuoteEstimator` suppose que cette initialisation a déjà eu lieu ailleurs dans l'app. Si un visiteur arrive directement sur `/price` sans passer par `/contact`, et que ce bloc email était un jour réactivé, l'envoi échouerait silencieusement. 🟡 cosmétique tant que le bloc reste commenté, mais à garder en tête si quelqu'un le réactive un jour.
5. **`Meta` component = confirmation du problème que la migration doit résoudre** (🔴, mais attendu). `document.title` et la meta description ne sont modifiés qu'après hydratation React (`useEffect`). C'est exactement le symptôme décrit en préambule (le HTML servi ne contient que "Chargement...") : aujourd'hui, **aucune page n'a de title/description SEO tant que le JS n'a pas tourné**. Rien à corriger dans le SPA actuel — c'est la raison d'être de la migration Astro.
6. **`index.css`/`index.css.map` générés et committés dans Git**, maintenus à jour par un script `sass --watch` séparé du pipeline Vite (lancé uniquement via `npm run dev`, en parallèle). Quiconque édite `index.css` directement, ou oublie de lancer le watcher, désynchronise silencieusement le CSS livré de sa source `.scss`. Se résout naturellement en migrant vers Astro (compilation SCSS native, plus besoin de committer de sortie compilée).
7. **`useThemeStore` no-op** (section 2) — au-delà d'être du code mort, il est cassé sur le fond (`document.body.className` toujours mis à la même valeur littérale). Si quelqu'un le réactive un jour en pensant qu'il fonctionne, il découvrira que le mode sombre n'a jamais été réellement implémenté.
8. **Fichier `COMPONENT_DOCUMENTATION.txt`** dans `src/components/Dropdown/` — fichier de documentation généré (probablement par un outil IA), non tracké par Git au moment de cet audit, unique en son genre dans tout le repo (aucun autre composant n'a de documentation similaire). Sans impact fonctionnel, mais signale une pratique non appliquée uniformément — à harmoniser (soit documenter tous les composants, soit supprimer ce fichier isolé).

---

## Recommandation finale

**Le socle est sain, pas besoin de réécrire le site de zéro.** La séparation contenu/composants (JSON externes, composants découpés par responsabilité) est un bon point de départ pour Astro, et la grande majorité des composants (`Navbar`, `Footer`, `Works`, `Dropdown`, `Carousel`, `ProjectDetail`, `AgeCalculator`) sont raisonnablement écrits, accessibles dans l'ensemble, et se transposeront sans drame en composants Astro + îlots React ciblés.

Ce qu'il faut **garder tel quel** :
- Les fichiers de contenu `services.json`, `worksList.json`, `technicalSkills.json` et le pattern de les consommer via `.map()`.
- Les variables SCSS de `_variables.scss` (juste à faire respecter partout).
- La structure de composants layout (`Navbar`/`Footer`) et les composants "feuille" (`Carousel`, `Dropdown`, `AgeCalculator`).

Ce qu'il faut **réécrire ou nettoyer**, idéalement **avant ou pendant** la migration (puisque chaque fichier sera de toute façon touché) :
- **Découper `QuoteEstimator`** en (a) données de tarification isolées, (b) fonctions de calcul pures testables, (c) sous-composants par étape. C'est le seul vrai chantier de réécriture du site — tout le reste est du nettoyage ponctuel.
- **Supprimer le code mort** : `Skills` (+ son import cassé), `certificates.json`, `useThemeStore` (+ dépendance `zustand`), `Loader` orphelin, bloc email commenté dans `QuoteEstimator`.
- **Corriger `alt="undefined"`** dans `Works/index.jsx` — indépendant du calendrier de migration, à faire dès maintenant.
- **Ajouter un `<h1>`** à la page `ProjectDetail`.
- **Rapatrier les images du portfolio en local** plutôt que de dépendre d'un déploiement Netlify tiers.
- **Unifier le chargement des polices** sur un seul mécanisme (recommandé : `@fontsource` pour Montserrat *et* Space Grotesk, suppression des deux imports Google Fonts).
- **Éliminer les couleurs hex dupliquées** (`#70588C`, le dégradé rose/violet, `#f5f1ed`) au profit des variables SCSS existantes.

Rien dans cet audit ne remet en cause la faisabilité ou la priorité de la migration Astro déjà planifiée — au contraire, plusieurs points ci-dessus (Meta component, polices, images externes) sont précisément ce que cette migration doit résoudre.

---

## Reporté à la phase visuelle

Constaté pendant la migration Astro, volontairement laissé de côté pour ne pas
toucher au rendu. À reprendre lors de la refonte visuelle.

### 1. Le CSS est servi en entier sur chaque page — 🟠 important

La feuille compilée pèse **59,2 Ko** et part sur les 15 pages, quelle que soit la
page consultée. Les 688 lignes de `_quoteEstimator.scss` sont donc chargées sur
les mentions légales, les pages service, etc., alors qu'une seule page affiche le
simulateur. C'est aujourd'hui **le premier poste de poids de la page d'accueil**,
devant les images (65,7 Ko répartis sur 8 fichiers).

Piste : styles scopés par page/composant, ou au minimum sortir le simulateur du
bundle global. Suppose de revoir l'organisation de `style.scss`, qui importe
aujourd'hui tous les partials en un seul point d'entrée.

### 2. Le carrousel de l'accueil coûte 168 Ko de runtime React — 🟠 important

C'est le **seul** îlot de la page d'accueil, et il tire tout React pour un
défilement de trois vignettes. Le remplacer par du CSS `scroll-snap` supprimerait
l'îlot et ferait passer l'accueil à **zéro JS applicatif**, comme les 12 autres
pages.

Non fait ici parce que cela change le comportement de défilement (inertie tactile,
comportement des boutons précédent/suivant, indicateurs) — donc un choix
d'expérience, pas une simple équivalence technique.

### Autres points ouverts, plus mineurs

- `_dropdown.scss` et `_loader.scss` subsistent dans `src/styles/` alors que les
  composants correspondants ont été supprimés. `_loader.scss` est toujours importé
  par `style.scss` et produit donc des règles mortes.
- `_quoteEstimator.scss` contient `strong:contains("estimation")`, un sélecteur
  qui n'existe pas en CSS et n'a jamais rien appliqué.
- Les règles `body.mode` de `_colors.scss` sont inertes : la classe n'est posée
  nulle part depuis la suppression de `useThemeStore`. À trancher si un mode
  sombre est prévu.
- Les icônes FontAwesome sont rendues en SVG statique au build (zéro JS sur les
  pages sans îlot), mais restent 4 paquets npm. Des SVG inline les remplaceraient
  avantageusement.

## Refonte 2026 — points relevés en cours d'intégration

### Captures projet manquantes — 🟠 important

Le nouveau contenu décrit 9 projets. Tant qu'une capture n'est pas fournie, la
carte et la fiche affichent un **aplat de la teinte du projet portant son nom**
(composant `ProjectVisuel.astro`) : aucune image empruntée, aucun texte entre
crochets en production.

Cinq projets n'ont aujourd'hui **aucune capture** :

| Projet | Teinte de l'aplat | Capture attendue |
| --- | --- | --- |
| VELA | lilas | espace membre |
| Ardvina | sauge | écran principal (avec l'accord du client) |
| Location Voiture Cassis | rose | page d'accueil du site |
| Ancrage | sauge | tableau de bord (capture ou courte vidéo) |
| UkaBot | lilas | tableau de bord web |

Quatre projets ont une capture, mais **héritée de l'ancien site : 600 px de
large** (`kasa`, `lemansschoolofai`, `pulsar42`, `speaktime`). Elles suffisent
pour les vignettes de grille (190 px de haut), mais la maquette prévoit un visuel
de **1200 × 460** sur la fiche projet : à cette taille elles sont agrandies deux
fois et deviennent floues. `A-CONFIRMER.md` demande d'ailleurs des captures
neuves pour les 9 projets, en WebP 1600 px de large.

Pour installer une capture : déposer le fichier dans
`src/assets/images/portfolio/<slug>.webp`, puis ajouter au JSON du projet
`"cover": "../../assets/images/portfolio/<slug>.webp"`. L'aplat disparaît tout
seul et la boîte garde exactement les mêmes dimensions — rien ne se décale.

### `_projectDetail.scss` n'était plus importé — 🔴 bloquant (corrigé)

Depuis la migration Astro, `style.scss` n'importait plus
`components/_projectDetail.scss`. Les pages `/realisations/<slug>/`
s'affichaient donc **sans leurs styles propres** : titre, encadrés, listes à
puces et boutons retombaient sur les règles globales. La régression n'avait pas
été vue parce que les vérifications de la migration avaient porté sur les images
et le texte servi, pas sur la mise en page de ces pages.

L'import est rétabli. Le fichier sera de toute façon remplacé à l'étape 5 par le
gabarit de la maquette. Rien n'avait été déployé entre-temps : le site en ligne
est encore la version React.

### `/a-propos/` déborde horizontalement à 375 et 768 px — 🟠 important

Mesuré sur la page construite : largeur de défilement 451 px pour 375 px de
fenêtre, 839 px pour 768 px. En cause, les étiquettes de compétences
(`competences.json`) rendues dans une liste qui ne revient pas à la ligne.

Antérieur à la refonte, sans rapport avec le nouveau contenu. À traiter à
l'étape 7, qui réécrit cette page.

### Les pleines largeurs de l'accueil ignorent la barre de défilement — 🟠 important

`_Home.scss` étire `.header-banner`, son image et `.cta` avec
`width: 100vw` plus `margin-left: calc(-50vw + 50%)`. Or `100vw` compte la
barre de défilement verticale : sur un navigateur qui l'affiche en permanence
(Windows, Linux), ces blocs mesurent une quinzaine de pixels de plus que la
zone visible, et la page défile horizontalement.

Mesuré sur `/` : largeur de défilement 1433 px pour 1425 px visibles à 1440 px
de fenêtre, et le même écart à 375 et 768 px.

Remède : `width: 100%` sur un conteneur en `overflow-x: hidden`, ou la
variante moderne `100dvw`. Antérieur à la refonte ; à traiter à l'étape 4, qui
réécrit l'accueil.

**Corrigé à l'étape 4.** Le nouvel accueil n'emploie plus `100vw` : chaque
section occupe toute la largeur disponible et un conteneur interne de 1200 px
recentre le contenu. `BaseLayout` accepte pour cela `pleineLargeur`, qui libère
le conteneur de 1240 px. Mesuré après coup : plus aucun débordement
horizontal sur `/` à 375, 768 et 1440 px.
