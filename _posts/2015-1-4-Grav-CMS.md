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

- ajout d'un template twig base.html.twig dans themes/learn2/templates

{% raw  %}
{% extends 'partials/base.html.twig' %}
{% endraw  %}

{% raw  %}
{% block content %}
{% endraw  %}

    <div id="slider">
        <figure>
        {% raw  %}
        {% for image in page.media.images %}
        {% endraw  %}
            {{ image.html }}
        {% raw  %}
        {% endfor %}
        {% endraw  %}
        </figure>
    </div>

    {{ page.content }}
{% raw  %}
{% endblock %}
{% endraw  %}

Le fichier md doit s'appeler base.md et peut être vide ou avoir comme ici seulement un titre.

```yaml
---
title: slider d'image
---
```

### Ajout d'une page de gallerie

>On ajoute un template pour afficher automatiquement toutes les images se trouvant dans le répertoire du fichier markdown.

themes/learn2/css/custom.css
```css
figure.stacked{
  float: left;
  margin: 0 20px;
  text-align: center;
}

figure.stacked img{
  border: 1px dotted lightgray;
  padding: 1px;
}

figure.stacked figcaption{
  font-weight: bold;
}
```

themes/learn2/templates/gallery.html.twig



```html
{% extends 'partials/base.html.twig' %}

{#
  ajout pom galerie de toutes les images
#}

{% block content %}
  {{ page.content }}

        {% for image in page.media.images %}
          <figure class="stacked">
            {{ image.html(image.url, image.url) }}
            <figcaption>
              {% set fileName = image.url | split('/') %}
              {{ fileName[count(fileName) - 1] }}
            </figcaption>
          </figure>
        {% endfor %}
{% endblock %}
```


Le fichier markdown doit s'appeler gallery.md pour être associé à ce nouveau template.

```md
---
title: Écrans application smartphone
---

#### Écrans

>Voici les 37 écrans jQuery mobile pour la version 2015
```


>Auparavant, les images ont été préfixées par un chiffre afin de fixer un certain ordre d'affichage.

#### Browser-sync

Il est possible grâce à Browser-sync de voir les modifications incrémentales faites dans les fichiers markdown sans avoir besoin de recharger la page du navigateur, tout cela en gardant la même position dans la page (la position de l'ascenseur est conservée!). Pour cela, il faut :

- se placer dans le répertoire contenant memento
- lancer la commande suivante utilisant browser-sync en mode proxy :

```sh
browser-sync start --proxy "localhost/~pomauguet/memento" --files "user/**/*.md"
```

Ensuite, il faut utiliser [l'URL](http://localhost:3000/~pomauguet/memento/) du serveur browser-sync :

### FAQ

**J'ai supprimé un répertoire et il est pourtant toujours visible dans le site?**

Ceci est dû à un problème de cache. Pour corriger cela, aller sur la [page d'admin](http://localhost/~pomauguet/memento/admin) et cliquer sur Clear cache.
