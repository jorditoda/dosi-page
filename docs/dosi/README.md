# Dosi · Documentació per construir l'app

Aquesta carpeta conté tot el que cal per crear la base de l'app **Dosi** amb Flutter i Firebase. Està pensada perquè un agent (o un desenvolupador) la llegeixi sencera i pugui començar a programar sense haver de preguntar el que ja s'ha decidit.

Dosi és una app de microaprenentatge amb scroll vertical (estil reels) sobre negociació, psicologia i comunicació. Cada pantalla és una targeta que ensenya una idea en 20-30 segons, amb repàs espaiat, ratxes i una notificació diària.

## Documents

| Fitxer | Què hi trobaràs |
| --- | --- |
| `01-producte.md` | Concepte, públic, model de negoci, principis i abast de la primera versió |
| `02-pantalles.md` | Totes les pantalles, la navegació, els estats, les interaccions i els textos |
| `03-disseny.md` | Colors, tipografia, mides, radis, icones (amb el codi SVG), components i icona de l'app |
| `04-contingut.md` | Model de dades del contingut, format JSON, contingut inicial, algorisme del feed i del repàs |
| `05-arquitectura.md` | Stack, paquets, estructura de carpetes, Firebase, notificacions, idiomes i analítica |
| `06-pla-de-treball.md` | Passos ordenats amb criteris d'acceptació per construir la base |
| `referencia-disseny/` | Els dissenys originals de cada pantalla (`Main` = Feed, `Guia` = guia d'estil). Són HTML amb estils inline de l'eina de disseny: no cal obrir-los al navegador, llegeix-los com a codi font per treure'n mides, colors, radis i textos exactes |
| `icona/` | Icona de l'app en SVG i PNG de 1024 px (`app_icon`) i primer pla per a la icona adaptativa d'Android (`app_icon_foreground`). Els PNG només són al zip, no al projecte |

Ordre de lectura recomanat: 01 → 02 → 03 → 04 → 05 → 06. Abans de cada pantalla, obre també el seu fitxer de `referencia-disseny/`.

## Instruccions per a l'agent

1. **Llegeix tots els documents abans d'escriure codi.** Les decisions que hi ha aquí ja estan preses amb el propietari del projecte; no les canviïs sense preguntar.
2. **Objectiu d'aquesta fase:** construir la base de l'app (la "Fase 1" de `01-producte.md`) seguint `06-pla-de-treball.md`, pas a pas, i deixant cada pas funcionant abans de passar al següent.
3. **Idiomes:** el codi, els noms de classes, variables i comentaris, en anglès. Tots els textos visibles per l'usuari, en català i a través del sistema de traduccions (fitxers ARB), mai escrits directament al codi dels widgets.
4. **Paquets:** afegeix-los amb `flutter pub add <paquet>` per obtenir la versió estable més recent. No fixis versions de memòria. Si l'API d'un paquet no coincideix amb el que diu aquesta documentació, mana la documentació oficial del paquet.
5. **Contingut:** no inventis contingut de psicologia, negociació o comunicació. Fes servir només el contingut inicial de `04-contingut.md`. Si et cal més per provar, duplica'l marcant-lo clarament com a contingut de prova (`"isPlaceholder": true`).
6. **Disseny:** reprodueix colors, mides, radis i textos tal com estan a `03-disseny.md` i a `referencia-disseny/`. Si hi ha contradicció, mana `03-disseny.md`.
7. **Decisions noves:** si et cal prendre una decisió que no està documentada, tria l'opció més simple i anota-la en un fitxer `DECISIONS.md` a l'arrel del repositori, amb el motiu.
8. **Coses que només pot fer el propietari** (crear el projecte de Firebase amb el seu compte, triar l'identificador de l'app, comptes d'Apple i Google): para i demana-les. La llista és a `06-pla-de-treball.md`, secció "Preguntes obertes".

## Missatge d'inici suggerit per a la nova sessió

> Llegeix tots els documents del projecte "MicroLearning app" (comença pel README.md) i construeix la base de l'app Dosi en Flutter seguint 06-pla-de-treball.md. Abans de començar, fes-me les preguntes obertes que necessitis de la llista de "Preguntes obertes".

## Altres referències

- Lienzo amb tots els dissenys (privat del propietari): https://claude.ai/artifact/7hdGpvU1Z5855sq4sYCJT3
- Document de pla de l'app (privat del propietari): https://claude.ai/artifact/6Me3z6PBKhCRYGML66BmDS

Aquests documents de markdown ja inclouen tota la informació dels dos enllaços; no cal obrir-los per poder treballar.
