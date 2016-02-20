---
layout: post
title:  Mettre à jour son bash sous Mac OS X 10.10
tags: osx, bash
---

Cet article montre comment mettre à jour son shell bash sous OS X Yosemite.

Le bash en version 4 est très utile. Par exemple avec l'expansion de paramètre qui permet ceci :

```sh
for file in *.pdf; do
  mv "${file}" "${file,,}"
done
```

Ce script a pour but de prendre tous les fichiers pdf du répertoire courant et de modifier tous les noms pour qu'ils soient en minuscules. ^^ fait exactement l'inverse à savoir tout mettre en majuscule.

Pour plus d'informations sur ces substitutions : 
[http://wiki.bash-hackers.org/syntax/pe#overview](http://wiki.bash-hackers.org/syntax/pe#overview)


On peut faire des choses assez puissantes comme ne récupérer que certaines parties d'une chaîne suivant une expression régulière. Ce qui est intéressant est la concision pour y parvenir.

Mais sous OS X Yosemite, il y a un problème. La console nous renvoie ce message :

```sh
line 5: on trouve ${file,,}: bad substitution
```

Un coup de man bash nous apprend que la bash qu'on utilise est en version 3.2, version qui ne permet pas encore ce genre de substitution.

Qu'à cela ne tienne nous allons mettre à jour bash. On pourrait aller télécharger la dernière version (4.4 à l'heure où je parle) sur le site officiel et l'installer à la mano.

Mais nous allons utiliser homebrew qui est un gestionnaire de paquets sous Mac et qui s'installe très facilement.

Pour cela, on va sur http://brew.sh/

On copie dans un terminal la commande demandée :

```sh
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

On peut se passer d'installer XCode pour l'instant (question posée par l'installer).

Ensuite, on lance dans le terminal brew install bash.

Ceci a pour effet d'installer un nouveau bash 4.3.42 dans : 
```sh
/usr/local/Cellar/bash/4.3.42/bin/bash /bin/bash
```
On renomme ensuite l'ancien bash en bash-3

```sh
sudo mv /bin/bash /bin/bash-3
```

Attention car alors nous n'avons plus de bash disponible pour nos scripts! Corrigeons vite cela :
```sh
sudo ln -s  /usr/local/Cellar/bash/4.3.42/bin/bash /bin/bash
```

Et voila, notre script est maintenant fonctionnel!


