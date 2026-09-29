# Noël en Famille — site de contenu

Sélection éditoriale de cadeaux de Noël pour toute la famille.
Site statique, sans panier, sans paiement, sans collecte de données.

**En ligne :** https://noel-en-famille.onrender.com

## Ce que c'est

Un site de contenu organisé par univers de cadeau, construit pour le
référencement naturel. Chaque univers a sa propre URL, son propre texte et
ses propres données structurées.

| | |
|---|---|
| Pages | 19 |
| Univers | 6 |
| Fiches produit | 9 |
| Pages institutionnelles | 3 |
| Technologie | HTML, CSS et JavaScript statiques |
| Dépendances | aucune |
| Build | aucun |

## Structure

```
index.html                        accueil
cadeaux-enfants/                  univers + ses fiches
cadeaux-ados/
cadeaux-mamans/
cadeaux-papas/
cadeaux-grands-parents/
cadeaux-animaux/
a-propos/                         nos critères de sélection
guide/                            la méthode en quatre questions
mentions-legales/                 éditeur, données, prix
assets/                           site.css, site.js, favicon.svg
img/                              photographies produit
sitemap.xml
robots.txt
```

Les URL sont propres : `/cadeaux-enfants/` sert `cadeaux-enfants/index.html`,
ce qui fonctionne sur tout hébergeur statique, y compris en ouverture
directe d'un fichier sur le disque.

## Choix techniques

**Pas de dépendance.** Ni framework, ni bundler, ni `node_modules`. Le dépôt
se déploie tel quel, et le premier octet arrive aussi vite qu'un fichier
statique.

**Pas de page unique avec routage.** Chaque page est un document HTML
complet et distinct. Un moteur qui rend une seule page et change le contenu
après coup force Google à exécuter du JavaScript pour lire la page. Ici,
chaque URL est lisible directement dans la réponse HTTP.

**Pas de suivi.** Aucun cookie, aucun pixel, aucun service tiers de mesure
d'audience. La seule ressource externe est la feuille de police Google, et
rien n'est transmis à qui que ce soit.

**Aucune donnée personnelle.** Pas de formulaire, pas de compte, pas de
cookie. Le site fonctionne entièrement sans JavaScript : celui-ci ne sert
qu'au menu mobile, à la révélation au défilement et aux accordéons.

## Contenu

Les textes ne sont pas remplissés. Chaque univers explique ses propres
critères de choix, et chaque fiche justifie la présence du produit dans la
sélection par des caractéristiques vérifiables plutôt que par des promesses.

Les prix indiqués sont des ordres de grandeur destinés à situer un budget.
Ils ne constituent pas une offre et ne sont pas garantis.

## Déploiement

Render, via `render.yaml` (site statique, sans commande de build).
Chaque `git push` sur `main` redéploie.

## Accessibilité

Navigation au clavier complète, lien d'évitement, `aria-current` sur la page
courante,Focus visible, contrastes vérifiés, respect de
`prefers-reduced-motion`, et un seul `h1` par page.

## Vérification

Le dépôt est contrôlé avant chaque déploiement : structure HTML, résolution
de tous les liens internes, présence des images, unicité et longueur des
balises SEO, validité des données structurées, intégrité du texte français,
et chargement sans erreur JavaScript.

## Photographies

Les photographies de produit proviennent des sources fournies pour ce projet.
Trois produits sans photographie légitime utilisent une illustration
vectorielle de substitution, générée à la volée, afin d'éviter toute image
cassée.
