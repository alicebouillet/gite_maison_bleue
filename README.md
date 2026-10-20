# La Maison Bleue

Site du gîte : vitrine publique, livret d'accueil et espace propriétaire.

| Page | Fichier | Pour qui |
|---|---|---|
| Vitrine | `index.html` | Les visiteurs, avant de réserver |
| Livret d'accueil | `livret.html` | Les voyageurs, pendant le séjour |
| Espace propriétaire | `admin.html` | Katia et Philippe, avec mot de passe |

Site statique : HTML, CSS et JavaScript, sans build ni dépendance à installer.
Les données (réservations, demandes) sont dans **Supabase**.

---

## 1. Mise en ligne sur GitHub Pages

1. Créez un dépôt et déposez-y tous ces fichiers.
2. Settings → Pages → Source : branche `main`, dossier `/root`.
3. Le site est publié sur `https://VOTRE-PSEUDO.github.io/VOTRE-DEPOT/`.

Le site fonctionne déjà à ce stade : seules les réservations ont besoin de Supabase.

## 2. Créer la base Supabase

1. Créez un compte sur [supabase.com](https://supabase.com) — le plan gratuit suffit largement.
2. **New project**, choisissez une région en Europe (Frankfurt ou Paris).
3. SQL Editor → **New query** → collez tout le contenu de `supabase/schema.sql` → **Run**.
4. Authentication → Users → **Add user** : créez vos deux comptes, en cochant *Auto Confirm User*.
5. Authentication → Providers → Email → **désactivez « Enable signup »**, pour que personne d'autre ne puisse créer de compte.
6. Authentication → URL Configuration → **Site URL** : l'adresse de votre site GitHub Pages.

## 3. Brancher le site

Ouvrez `assets/config.js` et remplissez les deux premières lignes :

```js
SUPABASE_URL: 'https://xxxxx.supabase.co',
SUPABASE_ANON_KEY: 'eyJhbGci...'
```

Les deux valeurs sont dans Supabase → Project Settings → **API**.

> La clé `anon` est faite pour être publique : elle ne donne accès qu'à ce que les
> règles de sécurité (RLS) autorisent, c'est-à-dire déposer une demande et lire les
> dates occupées. **Ne mettez jamais la clé `service_role`** dans ce fichier.

Dans le même fichier, complétez aussi vos informations : téléphone, e-mail, tarifs, photos.

## 4. Ajouter les photos

1. Déposez vos images dans `assets/photos/` (format `.jpg`, redimensionnées à 1600 px de large environ).
2. Dans `assets/config.js`, renseignez le `src` de chaque photo :

```js
{src:'assets/photos/sejour.jpg', alt:'Le séjour', legende:'Le séjour, vue sur la Loire'}
```

La première photo renseignée devient automatiquement l'image d'accueil.

## 5. Compléter le livret

Dans `livret.html`, tout ce qui est `[entre crochets]` est à remplacer. Également à régler :

- les coordonnées des lieux, dans la liste `LIEUX` en bas du fichier ;
- l'emplacement des bacs à déchets, dans l'objet `DECHETS` juste en dessous.

---

## Comment ça marche

**Une demande de séjour**
Le visiteur remplit le formulaire de la vitrine → une ligne est créée dans
`reservations` avec le statut `demande` → elle apparaît dans l'onglet *Demandes*
de l'espace propriétaire → vous confirmez, mettez en option, ou refusez.

**Le calendrier public**
Il lit la vue `disponibilites`, qui n'expose que des dates : ni nom, ni e-mail,
ni montant. Les séjours `confirme`, `option` et `bloque` apparaissent occupés ;
les simples demandes, non.

**Les statuts**

| Statut | Sens | Visible sur la vitrine |
|---|---|---|
| `demande` | reçue du site, pas encore traitée | non |
| `option` | pré-réservé, en attente de confirmation | oui, occupé |
| `confirme` | séjour confirmé | oui, occupé |
| `bloque` | vous occupez le gîte | oui, occupé |

**Le jour du départ** reste disponible : un départ le 14 n'empêche pas une arrivée le 14.

---

## Structure

```
index.html              vitrine publique
livret.html             livret d'accueil
admin.html              espace propriétaire
assets/
  config.js             ← le seul fichier à remplir
  style.css             charte graphique commune
  photos/               vos images
supabase/
  schema.sql            à exécuter une fois dans Supabase
```

## Pour aller plus loin

- **Synchroniser Airbnb et Booking** : les deux plateformes exportent un lien iCal
  des dates bloquées. L'import demande une fonction côté serveur (Supabase Edge Function),
  parce qu'un navigateur ne peut pas lire ces liens directement.
- **Être prévenu d'une nouvelle demande** : un trigger Supabase + un service d'envoi
  d'e-mails (Resend) permet de recevoir un message à chaque demande.
- **Nom de domaine** : GitHub Pages accepte un domaine personnalisé
  (Settings → Pages → Custom domain), par exemple `lamaisonbleue-saumur.fr`.
