---
layout: post
title: Grav CMS
tags: php, cms
published: true
---

Il n'y pas que [Jekyll](http://jekyllrb.com/) dans la vie. 
Entre site statique et site classique comme Wordpress ou Drupal, il y a [Grav](https://getgrav.org/) un système dynamique mais sans base de données (et très puissant). 

### Présentation

Jekyll est un générateur de **sites web statique**. À quoi peut bien servir ces systèmes qui ne proposent pas plus mais moins de fonctionnalités? 

Ils sont très pratiques pour des sites contenant de simples pages HTML statiques qui ont peu d'interaction, ce qui s'applique bien pour les blogs. De cette façon on évite tout problème de performance et on simplifie sa pile de technos pour un site documentaire. Si l'on a un blog par exemple et que l'on veut un peu d'interaction comme la partie commentaire, il existe maintenant des services tiers qui peuvent intégrer leur système comme [Disqus](https://disqus.com) par exemple avec une simple ligne de code.

Le problème est qu'il faut lancer une commande de génération ce qui est toujours un peu pénible. Pourquoi puisque PHP contient des librairies permettant d'interpréter le Markdown, ne pas avoir un système qui interprète dynamiquement le Markdown mais sans avoir à gérer une base de données? C'est ce que propose Grav. 

### Plugin Admin

Ce plugin est très utile puisqu'il permet d'administrer le site : ajouter, modifier des pages.
Supprimer le cache, etc..

Le plus pratique est de prendre le skeleton avec le plugin d'administration sur le site officiel.

### Support des fichiers open office

Par défaut le CMS ne connaît pas les fichiers .odt et ne sait pas les ouvrir.

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

Ajouté également pour des fichiers dmg par exemple. 

```sh
dmg:
  type: file
  mime: application/octet-stream
```

### Ajout de template

Grav impose une organisation un peu particulière et finalement très pratique. 
Les fichiers markdown ne se retrouvent pas en vrac dans un grand répertoire (comme Jekyll) mais chaque .md a son propre répertoire spécifique. Ce répertoire est préfixé par un chiffre permettant de fixer un ordre particulier (mais cela peut être aussi une date pour un blog). Dans ce répertoire, on sauve le markdown sous un nom qui permettra de définir le template à appliquer, ce qui peut suprendre. Si l'on a un fichier docs.md, c'est le template /templates/docs.html.twig qui va se charger du rendu. Ces templates ont accès au méta données du yaml front matter mais aussi aux fichiers contenus dans ce répertoire. 

Dans la suite, nous avons créé 2 template pour pouvoir afficher des images se trouvant dans le répertoire d'un fichier .md. 

### Template slider d'images

On veut ajouter un template qui affiche un slider pour toutes les images contenu dans le répertoire courant. <br>
cf. [http://learn.getgrav.org/cookbook/general-recipes#really-simple-css-image-slider](://learn.getgrav.org/cookbook/general-recipes#really-simple-css-image-slider)


- ajouter 4 images dans le répertoire qui contient le fichier .md
- ajout du fichier css/custom.css (pas trouvé comment compiler \_custom.scss)

Ajout d'un thème themes/learn2/css/custom.css

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

- ajout d'un template base.html.twig dans themes/learn2/templates

{% raw %}
```twig
{% extends 'partials/base.html.twig' %}

{% block content %}

    <div id="slider">
        <figure>
        {% for image in page.media.images %}
            {{ image.html }}
        {% endfor %}
        </figure>
    </div>

    {{ page.content }}
{% endblock %}
```
{% endraw %}

Le fichier md doit s'appeler base.md et peut être vide ou avoir comme ici seulement un titre.

```yaml
---
title: slider d'image
---
```

### Template galerie d'images

On ajoute un template pour afficher automatiquement toutes les images se trouvant dans le répertoire du fichier markdown.

- ajout d'un theme : themes/learn2/css/custom.css

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

- ajout d'un template : themes/learn2/templates/gallery.html.twig

{% raw %}
```twig
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
{% endraw %}

Le fichier markdown doit s'appeler gallery.md pour être associé à ce nouveau template.

```md
---
title: Écrans application smartphone
---

#### Écrans

>Voici les 37 écrans jQuery mobile pour la version 2015
```

Auparavant, les images ont été préfixées par un chiffre afin de fixer un certain ordre d'affichage.

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
