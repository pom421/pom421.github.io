---
layout: post
title: Tips Grav CMS
tags: php, cms
published: true
---

Il n'y pas que [Jekyll](http://jekyllrb.com/) dans la vie ni que des générateurs de sites statiques. 
Entre site statiques et site classique comme Wordpress ou Drupal, il y a [Grav](https://getgrav.org/) un système dynamique mais sans base de données (et très puissant). 

### Plugin Admin

Ce plugin est très utile puisqu'il permet d'administrer le site : ajouter, modifier des pages.
Cacher le cache, etc..

Prendre le skeleton avec le plugin d'administration sur le site officiel.
(mdp : D23)

### Support des fichiers open office

Par défaut le CMS ne connaît pas les fichiers .odt.

Pour cela, il faut ajouter dans system/config/media.yaml les définitions suivantes :

```sh
odt:
  type: file
  mime: application/vnd.oasis.opendocument.text
ods:
  type: file
  mime: application/vnd.oasis.opendocument.spreadsheet
odp:
  type: file
  mime: application/vnd.oasis.opendocument.presentation
odg:
  type: file
  mime: application/vnd.oasis.opendocument.graphics
```

Ajouté également pour des fichiers dmg

```sh
dmg:
  type: file
  mime: application/octet-stream
```

### Ajout d'un slider

>On veut ajouter un template qui affiche un slider pour toutes les images contenu dans le répertoire courant. <br>
cf. http://learn.getgrav.org/cookbook/general-recipes#really-simple-css-image-slider


- ajouter 4 images dans le répertoire qui contient le fichier .md
- ajout du fichier css/custom.css (pas trouvé comment compiler \_custom.scss)

themes/learn2/css/custom.css

```css
@keyframes slidy {
    0% { left: 0%; }
    20% { left: 0%; }
    25% { left: -100%; }
    45% { left: -100%; }
    50% { left: -200%; }
    70% { left: -200%; }
    75% { left: -300%; }
    95% { left: -300%; }
    100% { left: -400%; }
}
body { margin: 0; }
div#slider {
    overflow: hidden;
    margin-top: -3rem;
    max-height: 30rem;
}
div#slider figure img { width: 20%; float: left; }
div#slider figure {
    position: relative;
    width: 500%;
    margin: 0;
    left: 0;
    animation: 30s slidy infinite;
}
```
