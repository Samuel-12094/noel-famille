# Noël en Famille

Boutique de cadeaux de Noël pour **toute la famille**, en français.
Site statique, **fichier HTML unique**, sans aucune dépendance externe.

Thème clair, rouge & vert. Positionnement : cadeaux pour tous les âges et tous les budgets.

## Démarrage

Ouvrir directement `index.html` dans un navigateur, ou servir le dossier :

```bash
python -m http.server 8000
# http://localhost:8000/
```

## Fonctionnalités

- **Catalogue piloté par les données** — le tableau `CATALOG` alimente les cartes,
  les fiches produit, les filtres et le panier.
- **Illustrations SVG** intégrées en ligne (aucun appel réseau).
- **Recherche** insensible aux accents, filtres catégorie / promo / bestseller / favoris, tri par prix.
- **Sélecteur de cadeau** : destinataire + budget.
- **Fiche produit** : caractéristiques, quantité, avis, « souvent achetés ensemble ».
- **Avis clients** avec note par étoiles et photo compressée côté client.
- **Wishlist** (cœur) persistante.
- **Panier** persistant : quantités, suppression, barre de progression vers la livraison offerte.
- **Livraison offerte dès 30 000 FCFA** (5 000 FCFA en dessous), avec barre de progression.
- **Checkout** en deux étapes : récapitulatif puis formulaire, confirmation avec référence `NF-XXXXXX`.
- **Compte à rebours** jusqu'au 25 décembre.
- **Mentions légales** en 5 onglets : mentions légales, CGV, confidentialité, cookies, contact.
- **SEO** : meta description, Open Graph, Twitter card, favicon SVG, JSON-LD `OnlineStore`.


## Couche conversion

Éléments ajoutés pour transformer le visiteur en acheteur :

- **Barre de réassurance** sous le hero (livraison, paiement Mobile Money, emballage premium, retours) — lève les freins avant le scroll.
- **Preuve sociale chiffrée** dans le hero (clients, note moyenne, délai de livraison, retours).
- **Urgence sur les fiches produit** : stock faible, compte à rebours de fin de promo borné entre 45 min et 60 h, et nombre de spectateurs.
- **Panneau « ajouté au panier »** qui suit l'ajout : récapitulatif du panier, barre vers la livraison offerte, et double CTA (continuer / voir le panier).

Le compte à rebours de promo est recalculé à chaque chargement à partir d'une ancre
stable par produit, avec une échéance toujours future et crédible.

## Structure

```
index.html
├── <style>    thème, composants, responsive
└── <script>   ART → CATALOG → API → rendu → filtres → panier → checkout
```

## Persistance

| Clé | Contenu |
|---|---|
| `noel-famille-cart` | Panier |
| `noel-famille-wishlist` | Favoris |
| `noel-famille-reviews` | Avis publiés |
| `noel-famille-orders` | Commandes |

## Backend

`API` est une couche d'abstraction prête à être branchée sur un vrai serveur
(endpoint cible : `/api/orders`). Remplacez le corps de ses cinq méthodes par
des appels `fetch()` ; le reste du front n'a pas à changer.

## Accessibilité

Navigation clavier complète, piège de focus dans les modales, `Échap` ferme la
couche supérieure, attributs `aria`, et respect de `prefers-reduced-motion`.

## Contenu

Produits, avis et coordonnées sont **fictifs**, fournis à titre de démonstration.
