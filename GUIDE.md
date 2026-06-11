# Guide du site — École Emmanuel

Bienvenue ! Ce guide t'explique **tout** ce qu'il faut savoir pour faire vivre le site,
même sans connaissances techniques. Prends ton temps, rien n'est cassable : tu peux
toujours revenir en arrière.

---

## 1. À quoi ressemble le projet

```
mantasoa/
├── index.html          ← la page principale (accueil + les 4 sections)
├── histoire.html       ← la page "histoire complète" de l'école
├── css/                ← l'apparence (couleurs, mise en page) — à ne pas toucher au début
├── js/                 ← les animations — à ne pas toucher
├── assets/images/      ← TES PHOTOS vont ici (voir le fichier "À_LIRE" dedans)
└── GUIDE.md            ← ce document
```

Les **4 sections** demandées sont toutes sur `index.html` :
1. **L'école** (histoire brève + bouton vers l'histoire complète)
2. **L'association** (origine + actions)
3. **Photos & vidéos** (galerie + vidéos YouTube)
4. **Nous aider** (bouton de don HelloAsso)

---

## 2. Voir le site sur ton ordinateur (avant de le mettre en ligne)

Le plus simple : **double-clique sur `index.html`**. Il s'ouvre dans ton navigateur.
C'est tout ! Tu vois exactement ce que verront les visiteurs.

À chaque fois que tu modifies un texte, enregistre le fichier puis **rafraîchis la page**
dans le navigateur (touche F5) pour voir le changement.

---

## 3. Modifier les textes

Ouvre `index.html` (ou `histoire.html`) avec un éditeur de texte.
👉 Je te recommande **Visual Studio Code** (gratuit : https://code.visualstudio.com) :
il colore le code et rend les choses bien plus claires que le Bloc-notes.

Dans les fichiers, j'ai mis des repères. Cherche les mots **`MODIFIABLE`** :
chaque fois que tu en vois un, le texte juste en dessous est fait pour être remplacé.

Exemple — tu vois ceci :
```html
<!-- MODIFIABLE : version BRÈVE de l'histoire -->
<p>
  À Mantasoa, l'enseignement public reste rare...
</p>
```
Tu remplaces simplement le texte **entre `<p>` et `</p>`** par le tien.
Ne touche pas aux balises `<p>` et `</p>` elles-mêmes : ce sont elles qui font les paragraphes.

### L'histoire longue
Elle est dans `histoire.html`. Tu y trouveras des paragraphes entre crochets `[...]`
qui te servent de trame ("Les origines", "Le développement", etc.). Remplace-les par ton récit.
Pour ajouter un paragraphe, copie une ligne `<p>...</p>` et colle-la en dessous.

---

## 4. Ajouter tes photos

Dépose tes photos dans `assets/images/` (et `assets/images/galerie/`) en respectant
les **noms de fichiers** indiqués dans le fichier `À_LIRE-noms-des-images.txt` qui s'y trouve.

> 💡 Tant qu'une photo n'est pas là, un joli visuel de remplacement s'affiche tout seul.
> Tu n'as donc pas besoin de tout préparer d'un coup.

**Important : compresse tes photos** avant de les mettre, sinon le site sera lent
(surtout depuis Madagascar). Glisse-les sur https://squoosh.app, vise ~1600 px de large
et moins de 400 Ko, puis télécharge le résultat.

---

## 5. Tes vidéos

Tes 2 vidéos sont **hébergées directement sur le site** (un lecteur vidéo intégré,
pas de YouTube). Elles sont déjà en place : `video1.mp4` et `video2.mp4` dans
`assets/images/galerie/`.

- **Pour remplacer une vidéo** : dépose un nouveau fichier au même nom (`video1.mp4`
  ou `video2.mp4`) dans `assets/images/galerie/`.
- **Pour changer le titre** affiché sous une vidéo : dans `index.html`, modifie le
  texte entre `<p class="video-title">` et `</p>`.

> 💡 La vidéo n'est téléchargée que lorsque le visiteur clique sur "lecture" : le reste
> du site reste rapide. Seule la première image s'affiche en aperçu.
>
> Si plus tard une vidéo est trop lourde et lente à démarrer (la 2e fait 25 Mo),
> on pourra soit la compresser, soit la basculer sur YouTube. Dis-le-moi le cas échéant.

---

## 6. Mettre le lien de don HelloAsso

Cherche dans `index.html` le texte `https://www.helloasso.com/` (il apparaît à
quelques endroits : le bouton "Nous aider", le pied de page). Remplace-le par
**ton vrai lien HelloAsso** (l'adresse de ta page de collecte).

Fais la même chose dans `histoire.html` (pied de page).

---

## 7. Changer les couleurs (facultatif)

Tout est regroupé en haut du fichier `css/styles.css`, dans la partie `:root`.
Par exemple `--terracotta: #e07a3f;` est la couleur orange des boutons.
Change le code couleur (format `#xxxxxx`) et tout le site s'adapte. Pour trouver
un code couleur : https://htmlcolorcodes.com

---

## 8. Mettre le site en ligne avec FileZilla

FileZilla fonctionne très bien pour ce site (rien à "compiler", ce sont juste des
fichiers à copier).

1. Connecte-toi à ton hébergement dans FileZilla (hôte, identifiant, mot de passe
   fournis par ton hébergeur).
2. Va dans le dossier public de ton site (souvent nommé `www`, `public_html` ou `htdocs`).
3. **Glisse tout le contenu** du dossier `mantasoa` (les fichiers `index.html`,
   `histoire.html`, et les dossiers `css`, `js`, `assets`) vers ce dossier distant.
4. Ouvre l'adresse de ton site dans un navigateur : c'est en ligne ! 🎉

Pour une mise à jour : tu modifies tes fichiers en local, puis tu re-glisses
uniquement les fichiers modifiés (FileZilla propose d'écraser : accepte).

> **Alternative gratuite à envisager plus tard** : des hébergeurs comme *Netlify*
> ou *Cloudflare Pages* hébergent ce type de site gratuitement, avec HTTPS automatique
> (le petit cadenas de sécurité) et une mise à jour par simple glisser-déposer.
> FileZilla reste parfait si tu as déjà un hébergement. Dis-moi si tu veux qu'on
> regarde cette option ensemble.

---

## 9. Récapitulatif de ce que tu dois fournir / faire

- [ ] Écrire l'histoire **brève** dans `index.html`
- [ ] Écrire l'histoire **longue** dans `histoire.html`
- [ ] Écrire le texte de l'**association** (origine + actions) dans `index.html`
- [ ] Déposer les **photos** (bons noms de fichiers, compressées)
- [ ] Mettre les **identifiants des vidéos** YouTube
- [ ] Coller le **lien HelloAsso**
- [ ] Vérifier les **coordonnées de contact** (e-mail, dans le pied de page)

Tu peux tout faire progressivement. Si tu bloques sur un point, reviens vers moi !
