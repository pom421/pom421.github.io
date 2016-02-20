---
layout: post
title: Configurer Apache/PHP sous OS X 10.11
tags: osx, apache, php
published: true
---

Ce document explique comment configurer Apache + PHP sous OS X El Capitan 10.11.

Référence : [http://coolestguidesontheplanet.com/get-apache-mysql-php-and-phpmyadmin-working-on-osx-10-11-el-capitan/](http://coolestguidesontheplanet.com/get-apache-mysql-php-and-phpmyadmin-working-on-osx-10-11-el-capitan/)


Sous OS X, un apache est déjà présent qui peut être configuré avec PHP comme on peut le constater :
```sh
woody$ php -v
PHP 5.5.27 (cli) (built: Aug 22 2015 18:20:44)
Copyright (c) 1997-2015 The PHP Group
Zend Engine v2.5.0, Copyright (c) 1998-2015 Zend Technologies

woody$ whereis apachectl
/usr/sbin/apachectl

woody$ apachectl -v
Server version: Apache/2.4.16 (Unix)
Server built:   Aug 22 2015 16:51:57
```

**Où se trouve le fichier de configuration d'Apache sous OS X El Capitan?**

/private/etc/apache2/httpd.conf

**Comment vérifier la syntaxe du fichier httpd.conf ?**

````sh
apachectl configtest # pour vérifier la syntaxe de httpd.conf
````

**Procédure pour ajouter un répertoire utilisateur pour héberger des sites**

Par défaut le serveur apache d'OS X El Capitan prévoit un DocumentRoot système pointant sur **/Library/WebServer/Documents**.

Il convient de créer un répertoire pour héberber les pages web pour l'utilisateur et non pour tout le système afin de compartimenter les choses. Nous prendrons l'exemple de l'utilisateur woody pour les commandes suivantes.

```sh
woody$ sudo su - # on passe en root par facilité en dev
```

Création d'un fichier .conf

```sh
root$ cd /private/etc/apache2/users/

# on va créer un fichier .conf pour l'utilisateur voulu (ici woody) en utilisant un bloc Here documents
root$ cat > woody.conf << EOF
<Directory "/Users/woody/Sites/">
AllowOverride All
Options Indexes MultiViews FollowSymLinks
Require all granted
</Directory>
EOF

# vérifiez que le le fichier a les droits 644 et le propriétaire root
root# ls woody.conf
-rw-r--r--   1 root  wheel  131 Nov 30 15:30 woody.conf
```

Modification du fichier httpd.conf

```sh
# modification du fichier httpd.conf
root# vim /private/etc/apache2/httpd.conf

# dans httpd.conf, assurez vous que les lignes suivantes sont décommentées
LoadModule authz_core_module libexec/apache2/mod_authz_core.so
LoadModule authz_host_module libexec/apache2/mod_authz_host.so
LoadModule userdir_module libexec/apache2/mod_userdir.so
LoadModule include_module libexec/apache2/mod_include.so
LoadModule rewrite_module libexec/apache2/mod_rewrite.so
LoadModule php5_module libexec/apache2/libphp5.so
```

Modification du fichier extra

```sh
root# vim /etc/apache2/extra/httpd-userdir.conf
# décommentez la ligne suivante
Include /private/etc/apache2/users/*.conf
```

Test

```sh
# on crée un fichier de diagnostic sur le répertoire local de l'utilisateur
woody$ cat > /Users/woody/Sites/phpinfo.php << EOF
<? phpinfo();
EOF

# on relance apache
root# sudo apachectl restart
```

Le site est accessible avec un navigateur pointant sur :
[http://localhost/~woody/phpinfo.php](http://localhost/~woody/phpinfo.php)

** En cas de problème de permission**

Référence : [http://learn.getgrav.org/troubleshooting/permissions](http://learn.getgrav.org/troubleshooting/permissions)

Par défaut sous OS X, le processus Apache est lancé avec le compte \_www dans le fichier httpd.conf.

Cela pose problème pour Grav car il a besoin d'écrire des fichiers (par exemple dans le répertoire cache).

Il y a plusieurs manières de régler ce problème. Le plus simple est de faire lancer le processus par
l'utilisateur.

```sh
User woody
Group staff
```
