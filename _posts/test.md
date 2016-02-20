---
layout: post
title: test
published: true
---

DEBUT 

{% raw %}
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
{% endraw %}
FIN
