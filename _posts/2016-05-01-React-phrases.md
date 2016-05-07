---
layout: post
title: Tutoriel React
published: true
---

Je vais vous montrer comment faire une petite application React dont le but est de créer une petite application pour mémoriser le sens de phrases idiomatiques en anglais.

L'application consiste à afficher une "carte" qui contient une phrase en anglais.
La traduction en français se trouve en dessous mais floutée (on ne voit que l'apparence de la phrase).

![](/images/2016-05-01-React-phrases/screen1.png)

Une nouvelle phrase est choisie au hasard en utilisant les flèches gauche et droit.
Le floutage disparaît en utilisant les flèches haut et bas.

Côté technique, nous utiliserons React avec Babel afin d'utiliser les possibilités du langage ES2015. 
Et nous utiliserons Webpack même si ce n'est pas indispensable, n'ayant qu'un seul vrai fichier js.

Ce tutoriel n'est destiné au débutant puisqu'il faut connaître les bases de React mais l'objectif est de créer de toutes pièces une application simple avec tout l'environnement.

Le code source se trouve sur [GitHub](https://github.com/pom421/phrases).

## Étape 1 : installation de l'environnement

Nous installons (si ce n'est déjà fait) Babel, Webpack et webpack-dev-server en global pour notre système.

```sh
npm i -g babel webpack webpack-dev-server
```

Nous initialisons notre projet npm et nous ajoutons les dépendances et les dépendances seulement utiles en phase de développement (comme le transpileur Babel).

```sh
mkdir phrases
cd phrases
npm init
npm i react react-dom --save
npm i babel-loader babel-core babel-preset-es2015 babel-preset-react --save-dev
touch index.html App.js main.js webpack.config.js
```

__index.html__

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Setup</title>
    <style>
    .hidden {
        text-shadow: black 0 0 8px;
        color: transparent;
        transition: none;
    }
</style>
</head>

<body>
    <div id="app"></div>
    <script src="index.js"></script>
</body>

</html>
```

- le div#app sera le point de montage de notre composant React
- index.js sera le fichier buildé par webpack 
- la classe hidden permet de flouter un texte via text-shadow

__webpack.config.js__

```js
module.exports = {
    entry: './main.js',
    output: {
        path: './',
        filename: 'index.js'
    },
    devServer: {
        inline: true, 
        port: 3333
    }, 
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
}
```
- le fichier buildé est appelé index.js
- un serveur de développment répondra sur le port 3333
- les syntaxes es2015 et react de babel seront chargées

__package.json__

Remplacer la partie scripts par celle-ci : 

```sh
  "scripts": {
    "start": "webpack-dev-server"
  },
```
- le serveur de dev webpack sera maintenant disponible en faisant npm start. 

__main.js__

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Card from './App';

ReactDOM.render(<Card />, document.getElementById('app'));
```

- notre composant React sera appelé Card et il est monté sur le div#app.

__App.js__

```js
import React, {Component} from 'react';

// composant React qui contient les 2 phrases
class Card extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <button>Nouvelle phrase</button>
        <div className="card">
          <div className="en" >An english fake sentence</div>
          <div>Une phrase anglaise pour de faux</div>
        </div>
      </div>
    );
  }
}

export default Card;
```

Pour tester le bon fonctionnement des étapes précédentes, dans une console lancer : npm start.
L'application est disponible sur http://localhost:3333.


## Étape 2 : State et évènement onClick

Les phrases seront récupérées par Ajax vers un fichier json. 

```js
import React, {Component} from 'react';

let phrases = [
  {
    "en": "I went to see my parents",
    "fr": "Je suis venu voir mes parents"
  },
  {
    "en": "So far",
    "fr": "Jusqu'ici"
  },
  {
    "en": "By then",
    "fr": "D'ici là"
  },
  {
    "en": "For now",
    "fr": "Pour l'instant"
  }
]

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// composant React qui contient les 2 phrases
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      en: "",
      fr: "",
      idPhrase: 0,
      visibility: false

    }
    this.displayNew = this.displayNew.bind(this);
  }

  displayNew() {
    let rand = getRandomIntInclusive(0, phrases.length - 1);
    this.setState({
      en: phrases[rand].en,
      fr: phrases[rand].fr,
      idPhrase: rand,
      visibility: false
    });
  }
  render() {
    return (
      <div>
        <button onClick={this.displayNew}>Nouvelle phrase</button>
        <div className="card">
          <div className="en" >{this.state.en}</div>
          <div className={this.state.visibility? "": "hidden">{this.state.fr}</div>
        </div>
      </div>
    );
  }
}

export default Card;
```
- le state de notre composant Card contient les propriétés :
    - en : la phrase anglaise
    - fr : la phrase française
    - idPhrase : l'index dans le tableau de la phrase
    - visibility : un booléen pour piloter le floutage ou non du champ fr. Dans cette étape, la visibility est toujours à false. Nous verrons plus loin comment la modifier. 
    
- dans le render, on lie le onClick du bouton avec la méthode displayNew. Cette méthode choisit aléatoirement une phrase à afficher et modifie l'état en conséquence. React s'occupe du re-render pour nous!
- chaque méthode doit être bind avec this quand on utilise React avec la syntaxe class. Sinon le contexte du this ne correspond pas à l'instance de classe ce qui provoque des erreurs.

## Étape 3 : évènements claviers

```sh
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      en: "",
      fr: "",
      idPhrase: 0,
      visibility: false
    }
    this.displayNew = this.displayNew.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }
  componentDidMount() {
    // gestionnaire d'évènement monté quand le DOM est prêt
    document.body.addEventListener('keyup', this.onKeyUp);
  }
  onKeyUp(e) {
    var intKey = (window.Event) ? e.which : e.keyCode;
    console.log("keycode", intKey);
    // flêches gauche et droite pour avancer dans les phrases
    if (intKey === 37 || intKey === 39) {
      this.displayNew();
    }
    // flêches haut et bas pour révéler la phrase en français
    else if (intKey === 38 || intKey === 40) {
      this.unhide();
    }
  }
  // pour supprimer le floutage de la phrase cachée
  unhide() {
    this.setState({
      visibility: true
    })
  }
  displayNew() {
    let rand = getRandomIntInclusive(0, phrases.length - 1);
    this.setState({
      en: phrases[rand].en,
      fr: phrases[rand].fr,
      idPhrase: rand,
      visibility: false
    });
  }
  render() {
    return (
      <div className="flex">
        <button onClick={this.displayNew}>Nouvelle phrase</button>
        <div className="card">
          <div className="en" title={this.state.idPhrase}>{this.state.en}</div>
          <div className={this.state.visibility ? "" : "hidden"}>{this.state.fr}</div>
        </div>
      </div>
    );
  }
}
```

- componentDidMount est une des nombreuses méthodes de React permettant de prendre la main lors d'une phase du cycle de vie du composant. Cette méthode est lancée par React quand la méthode render a été une première fois lancée. La méthode componentWillUnmount permet de fermer des ressources avant que le composant soit unmount. Ici nous utilisons componentDidMount car nous voulons que le gestionnaire d'évènement soit monté quand le DOM est prêt.
- la méthode unhide permet de modifier la propriété du state visibility. En le plaçant à true, React va relancer la méthode render et supprimer l'effet de flou.
- le gestionnaire d'évènement onKeyUp est installé sur le body pour que toutes les touches soient détectées sur toute la page. Les codes correspondants aux flèches haut et bas lancent la méthode unhide. Et les flèches gauche et droit lance la méthode displayNew.  

## Étape 4 : Améliorer les CSS


__index.html__

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Setup</title>
    <style>
        .flex {
            display: flex;
            flex-direction: column;
        }
        
        .card {
            display: flex;
            flex-direction: column;
            padding: 30px 15px;
            background-color: #eee;
            border-radius: 6px;
            margin: 20px 10px;
            flex: 1 1 auto;
            min-height: 200px;
            text-align: center;
        }
        
        div {
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            font-size: 21px;
            font-weight: 200;
        }
        
        button {
            padding: 7px 10px;
            margin: 10px;
            flex: 1 1 auto;
            font-size: 14px;
            line-height: 1.3333333;
            border-radius: 6px;
            color: #fff;
            background-color: #337ab7;
            border-color: #2e6da4;
        }
        
        .card > div {
            flex: 1 1 auto;
            transition: color 1s ease-out;
            transition: text-shadow 0.4s ease-out;
            justify-content: space-between;
            align-items: center;
        }
        
        .hidden {
            text-shadow: black 0 0 8px;
            color: transparent;
            transition: none;
        }
        
        .legende{
            margin: 10px;
            font-size: 0.7em;
            text-align: right;
        }
    </style>
</head>

<body>
    <div id="app"></div>
    <script src="index.js"></script>
</body>

</html>
```

- on utilise flexbox en direction column, ce qui donne un affichage propre sans trop se fatiguer ;)
- on ajoute une transition sur la couleur et le text-shadow pour ajouter un effet lors de la suppression de l'effet de flou

## Étape 5 : Ajax

__App.js__

On va externaliser le stockage des phrases dans un fichier json sur le serveur (une évolution naturelle serait de récupérer par la suite les phrases via un web service d'une API).

```js
function fetchPhrases(){
  var req = new XMLHttpRequest();
  req.open('GET', 'json/data.json', false);
  req.send(null);

  if (req.status != 200) {
    console.log('Problème pour récupérer le fichier json');
  }
  return JSON.parse(req.responseText);
}

let phrases = fetchPhrases();
```

__data/json__

```js
[
  {
    "en": "I went to see my parents",
    "fr": "Je suis venu voir mes parents"
  },
  {
    "en": "So far",
    "fr": "Jusqu'ici"
  },
  {
    "en": "By then",
    "fr": "D'ici là"
  },
  {
    "en": "For now",
    "fr": "Pour l'instant"
  }
]
```

Et voila!