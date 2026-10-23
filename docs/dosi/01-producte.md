# 01 · Producte

## Què és Dosi

Una app de scroll vertical, com Reels o TikTok, però on cada pantalla és una **targeta que ensenya una idea útil en 20-30 segons**. La promesa: aprendre coses aplicables a la vida real en pocs minuts al dia, i recordar-les de debò gràcies al repàs.

- **Nom:** Dosi
- **Lema:** "Una dosi diària per entendre millor la gent."
- **Temes inicials:** negociació, psicologia i comunicació.
- **Idioma inicial:** català. L'app es prepara des del principi per afegir castellà i anglès.
- **Plataformes:** Android i iOS (mòbil, vertical). No cal tauleta ni web en aquesta fase.

## Per a qui

1. **Ara:** el propietari del projecte, que la farà servir ell mateix per aprendre i polir-la amb l'ús real.
2. **Més endavant:** es publicarà a App Store i Google Play per treure'n rendiment.

Per això, tot el que es construeixi ha d'estar preparat per publicar-se (traduccions, Firebase, separació de contingut i codi), encara que algunes peces (pagaments, IA real) s'afegeixin després.

## Com funciona (resum)

- L'usuari tria temes, objectiu diari i hora de notificació a l'onboarding.
- Cada dia té un **feed** amb una "dosi" de N targetes (5, 12 o 20) que barreja idees noves i repassos.
- Cada idea **torna en forma de pregunta** al cap d'uns dies (repetició espaiada).
- Quan completa la dosi, veu una **pantalla de tancament** i suma un dia a la **ratxa**.
- Rep **una notificació diària** amb "l'aprenentatge del dia".
- (Pagament) Pot **practicar converses** amb un personatge d'IA i rebre feedback.

## Model de negoci: freemium

El que fa venir i tornar la gent és gratis; el que té un cost real (la IA) és de pagament.

| Funcionalitat | Gratis | Pro (pagament) |
| --- | --- | --- |
| Feed de targetes | Sí | Sí |
| Notificació diària | Sí | Sí |
| Quizzes i repàs | Sí | Sí |
| Converses de pràctica amb IA | 1-2 de prova | Sí, amb un límit raonable d'ús |
| Temes avançats | No | Sí |

- Plans: **anual** i **mensual**. Preus pendents de decidir (als dissenys hi ha `[PREU]`).
- Subscripcions a través d'App Store i Google Play, gestionades amb **RevenueCat** (fase posterior).
- Les converses amb IA es fan a través d'un servidor intermedi (funció de Firebase) que guarda la clau de l'API i comprova la subscripció. **La clau de l'API mai pot anar dins l'app.**

## Principis de producte

1. **Enganxa, però aprens de debò.** Ritme de reel, però amb repàs espaiat i sessions que s'acaben.
2. **Sessions amb final.** En arribar a l'objectiu diari es mostra una pantalla de "dosi feta". Es pot continuar, però no és un scroll infinit.
3. **Contingut fiable.** Cada targeta es basa en idees ben establertes (Kahneman, Cialdini, Fisher i Ury, Carnegie…) i cita la font.
4. **Una notificació al dia com a màxim**, més un sol recordatori de ratxa si no s'ha entrat.
5. **Accessible:** contrast mínim 4,5:1, objectius tàctils de 44 px com a mínim, el color mai és l'única pista.

## Fases del projecte

1. **Fase 1 · Base de l'app (aquesta feina).** Feed, targetes, quizzes, repetició espaiada, ratxa, onboarding, notificació diària local, Firebase (autenticació anònima, desat del progrés, missatges remots), Explorar i Perfil. Pantalles de Practicar, Conversa i Subscripció només com a interfície amb dades de mostra.
2. **Fase 2 · Pràctica amb IA.** Converses reals amb un personatge d'IA i feedback.
3. **Fase 3 · Preparar la publicació.** Servidor per a la IA, subscripcions amb RevenueCat, prova gratuïta de 1-2 converses, límits d'ús.
4. **Fase 4 · Llançament.** Campanyes de notificacions, més temes i idiomes, proves A/B dels textos de notificació.

## Abast de la Fase 1

**Dins:**
- Projecte Flutter amb tema, tipografies, icones i icona de l'app.
- Contingut carregat des de fitxers JSON inclosos a l'app.
- Onboarding complet (temes, objectiu diari, hora de notificació, permís de notificacions).
- Feed vertical amb targetes d'idea, quiz i escenari; targeta oberta; guardar.
- Repetició espaiada, objectiu diari, ratxa i pantalla de tancament.
- Notificació diària local amb una targeta diferent cada dia, i recordatori de ratxa.
- Firebase: autenticació anònima, progrés a Firestore (amb funcionament sense connexió), token de missatges remots, analítica bàsica.
- Explorar (temes, progrés, mini-sèries) i Perfil (ratxa, estadístiques, ajustos).
- Practicar, Conversa i Subscripció com a pantalles amb dades de mostra i sense funcionalitat real.

**Fora (fases posteriors):**
- Converses reals amb IA.
- Pagaments i RevenueCat.
- Escoltar la targeta amb veu sintètica (el botó hi és, però desactivat o ocult).
- Altres idiomes (només l'estructura preparada).
- Vídeos.
