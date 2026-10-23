# 02 · Pantalles i navegació

Mida de referència: **390 × 844 px** (iPhone estàndard), sempre en vertical. Els dissenys exactes de cada pantalla són a `referencia-disseny/<Pantalla>.dc.html`. Colors, tipografies i mides concretes: `03-disseny.md`.

Tots els textos d'aquest document són els textos definitius en català i han d'anar als fitxers ARB.

## Mapa de navegació

```
Onboarding (només el primer cop)
   └─► Shell amb barra inferior (4 pestanyes)
        ├─ Feed ────────► Targeta oberta (en tocar "Veure l'exemple")
        │                 Pantalla de tancament (en completar l'objectiu diari)
        ├─ Explorar ────► Mini-sèrie (feed filtrat amb les targetes de la sèrie)
        │                 Subscripció (en tocar un tema Pro)
        ├─ Practicar ───► Conversa amb IA
        │                 Subscripció (botó "Veure Pro")
        └─ Perfil ──────► Subscripció (botó "Veure plans")
                          Targetes guardades
                          Ajustos (hora de notificació, objectiu diari)
```

Rutes suggerides (go_router):

| Ruta | Pantalla | Notes |
| --- | --- | --- |
| `/onboarding` | Onboarding | Redirecció automàtica si l'onboarding no s'ha completat |
| `/feed` | Feed | Pestanya 1. Accepta `?card=<id>` per obrir una targeta concreta (des d'una notificació) |
| `/feed/card/:id` | Targeta oberta | Pantalla completa, sense barra inferior |
| `/feed/done` | Pantalla de tancament | Amb barra inferior |
| `/explore` | Explorar | Pestanya 2 |
| `/explore/series/:id` | Mini-sèrie | Feed amb les targetes de la sèrie |
| `/practice` | Practicar | Pestanya 3 |
| `/practice/:scenarioId` | Conversa | Pantalla completa, sense barra inferior |
| `/profile` | Perfil | Pestanya 4 |
| `/profile/saved` | Targetes guardades | Llista simple (no dissenyada: seguir l'estil d'Explorar) |
| `/pro` | Subscripció | Modal a pantalla completa, sense barra inferior |

Cada pestanya conserva el seu estat i la seva posició de scroll quan es canvia de pestanya.

## Barra inferior (comuna)

- Alçada 76 px, fons `bg`, vora superior d'1 px `#23262D`, marge inferior intern de 10 px (més l'àrea segura del sistema).
- 4 elements repartits uniformement, cadascun amb icona de 24 px a sobre i text de 12 px a sota, separats 4 px. Mida tàctil mínima de 68 × 52 px.
- Pestanyes: **Feed**, **Explorar**, **Practicar**, **Perfil** (icones a `03-disseny.md`).
- Activa: color `accent` (#FF8A3D) i text en gruix 600. Inactiva: color `textFaint` (#8A8F99), gruix 500.

---

## 1. Onboarding

Referència: `Onboarding.dc.html`. Una sola pantalla amb tres seccions i un botó. Es mostra només el primer cop.

De dalt a baix (marges laterals 20 px, separació entre blocs 26 px):

1. **Capçalera**
   - Text petit en `accent`, 13 px, 600: "Benvingut a Dosi"
   - Títol (Bricolage 34 px, 700): "Uns minuts al dia per entendre millor la gent."
   - Subtítol (15 px, `textMuted`): "Tria què t'interessa i et prepararem un feed a mida."
2. **"Què vols aprendre?"** (títol de secció 14 px, 600, `textSecondary`)
   - Tres botons-commutador, un per tema, de 68 px d'alçada mínima, radi 18:
     - Cercle-quadrat de 40 px amb la inicial del tema en el color del tema sobre fons del color al 16 %.
     - Nom del tema (16 px, 600) i descripció (13 px, `textMuted`).
     - A la dreta, cercle de 26 px: buit si no està seleccionat; ple amb el color del tema i un ✓ si ho està.
     - Seleccionat: vora d'1,5 px del color del tema i fons `#1F2229`. No seleccionat: vora `border`, fons `surface`.
   - Temes i descripcions:
     - Negociació — "Sous, preus, acords"
     - Psicologia — "Per què fem el que fem"
     - Comunicació — "Escoltar, convèncer, dir que no"
   - Per defecte: Negociació i Psicologia seleccionats. Cal com a mínim un tema seleccionat per continuar.
3. **"Objectiu diari"**
   - Selector de 3 opcions en graella (3 columnes, 64 px d'alçada, radi 14): **5** "Relaxat", **12** "Regular", **20** "Intens". Per defecte 12.
   - Seleccionat: vora `accent` i fons `accent` al 12 %.
4. **"Aprenentatge del dia"**
   - Fila de 60 px (radi 16, fons `surface`): icona de campana en `accent`, text "Notificació cada dia a les" i, a sota, "Pots canviar-ho quan vulguis" (12 px); a la dreta l'hora en Bricolage 20 px. Per defecte **20:30**.
   - En tocar-la s'obre un selector d'hora del sistema.
5. **Botó principal** a baix de tot: "Començar a aprendre" amb fletxa →.
   - En tocar-lo: es desen les preferències, **es demana el permís de notificacions** (aquí és el millor moment, perquè l'usuari entén per què), es programen les notificacions i es va al Feed.
   - Si l'usuari denega el permís, l'app continua igualment; a Perfil es pot tornar a activar.

## 2. Feed

Referència: `Main.dc.html` (targeta d'idea) i `Quiz.dc.html` (targeta de quiz).

Estructura:

1. **Capçalera** (padding 18/20/10 px):
   - A l'esquerra, píndola de ratxa: icona de flama plena en `accent` + "5 dies" (14 px, 600), fons `#22252C`.
   - A la dreta, progrés del dia: "4 de 12 avui" (12 px, `textMuted`) i, a sota, barra de 4 px (buida `border`, plena `accent`), amplada màxima 180 px.
2. **Zona de targetes**: `PageView` vertical. Cada pàgina és una targeta (marges laterals 16 px, radi 28, fons `surface`, vora `border`, padding 22 px).
3. Sota la targeta, pista centrada (13 px, `textFaint`): fletxa cap amunt + "Llisca amunt per a la següent". Es pot amagar després de les 3 primeres targetes del primer dia.
4. **Barra inferior.**

### Targeta d'idea (tancada)

De dalt a baix:
- Fila superior: etiqueta del tema ("Negociació · Nivell 1", píndola amb el color del tema) a l'esquerra; a la dreta, un botó rodó de 44 px (fons `surfaceHigh`): **Guardar** (commutador; quan està guardada, la icona es mostra plena o en `accent`). El botó **Escoltar** no es mostra a la Fase 1.
- Il·lustració decorativa opcional: la icona del concepte molt gran (220 px) al 8 % d'opacitat, sortint per la dreta. Si la targeta no en té, no es mostra res.
- **Ganxo**: Bricolage 33 px, 700, interlineat 1,12. Si la targeta té `hookAccent` (p. ex. "Per què?"), es mostra a sota amb el mateix estil en color `accent`.
- **Idea clau**: 16 px, `textSecondary`, interlineat 1,55. Les paraules entre `**` es mostren en `textPrimary` i gruix 600.
- Espai flexible.
- Botó principal: "Veure l'exemple" + fletxa → obre la **Targeta oberta**.
- No hi ha més botons. L'usuari avança llisquejant amunt; si la targeta no s'ha obert, en passar-la es dona per vista i es marca com a nova (`learning`, caixa 1).
- El contingut de la targeta es pot desplaçar si no hi cap (pantalles baixes o text llarg); el botó principal queda sempre al peu.

### Targeta de quiz o escenari

De dalt a baix:
- Etiquetes: "↻ Repàs · fa {n} dies" (fons `surfaceHigh`; {n} = dies des que es va veure la idea) i el tema. Si és un escenari nou (no un repàs), només el tema.
- **Pregunta**: Bricolage 23 px, 700, interlineat 1,22.
- **Opcions**: 2-4 botons (alçada mínima 64 px, radi 16, fons `#20232A`, vora `border`), cadascun amb una lletra (A, B, C) en un quadrat de 30 px i el text (15 px).
- En respondre:
  - L'opció correcta: vora i lletra en `success` (#34D399), fons `success` al 10 %.
  - L'opció triada si és incorrecta: vora i lletra en `error` (#F87171), fons `error` al 10 %.
  - Les altres: opacitat 0,6.
  - Apareix una caixa de feedback: icona ✓ o ✕, paraula en negreta ("Exacte!" o "Gairebé.") i el text de feedback de la targeta.
  - A baix apareixen dos botons: "Tornar-hi" (secundari, torna a l'estat inicial) i "Continuar →" (principal, passa a la següent targeta).
- No es pot respondre dues vegades sense tocar "Tornar-hi". Només el primer intent compta per al repàs espaiat.

### Comportament del feed

- L'ordre de les targetes el decideix l'algorisme de `04-contingut.md`.
- El comptador "X de N avui" augmenta quan una targeta es dona per **vista**: una targeta d'idea quan s'obre l'exemple o quan l'usuari la passa llisquejant amunt; un quiz quan es respon.
- Quan s'arriba a N, la pàgina següent és la **pantalla de tancament**. Si l'usuari continua, el feed segueix amb més targetes (sense comptar per a la ratxa).
- Si s'entra des d'una notificació (`/feed?card=<id>`), aquesta targeta es mostra la primera.

## 3. Targeta oberta

Referència: `Targeta.dc.html`. Pantalla completa sense barra inferior, fons `surface`.

- **Capçalera**: botó rodó de 44 px per tornar al feed (fletxa cap avall), etiqueta del tema al centre, botó Guardar a la dreta.
- Nom del concepte en `accent` (13 px, 600), p. ex. "Efecte àncora", i a sota el ganxo en Bricolage 24 px.
- **Secció "Exemple"** (títol de secció: 12 px, 600, majúscules, espaiat 0,06 em, `textMuted`):
  - Caixa amb fons `bg`, vora `border`, radi 20, padding 16 px.
  - Text de l'exemple (15 px, `textSecondary`).
  - Si la targeta té un visual (`example.visual`), es dibuixa a sota. El primer tipus de visual és `anchorScale` (vegeu `04-contingut.md`): dues files amb una barra de 10 px, un rang marcat i un punt de 16 px a la xifra d'ancoratge, amb una escala de valors a sota i una frase de conclusió en negreta.
- **Secció "Com aplicar-ho"**: llista numerada (cercles de 24 px amb el número en `accentSoft` sobre `accent` al 16 %), text de 15 px.
- **Font**: 12 px, `textMuted`, "Font: …".
- **Peu**: un botó quadrat taronja de 52 px amb fletxa cap amunt per anar a la següent targeta.

## 4. Pantalla de tancament ("Dosi d'avui feta")

Referència: `Tancament.dc.html`. Es mostra com una pàgina més del feed, amb la barra inferior.

- Cercle de 84 px amb la flama de 46 px (fons `accent` al 14 %).
- Títol (Bricolage 32 px, 800): "Dosi d'avui feta"
- "12 de 12 targetes · **6 dies seguits**" (el segon tros en `accentSoft`).
- **Setmana**: 7 cercles de 28 px (Dl, Dt, Dc, Dj, Dv, Ds, Dg). Dia complet: cercle `accent` amb ✓. Avui: igual però amb un halo. Dies futurs: cercle discontinu. L'etiqueta del dia d'avui diu "Avui".
- **"Avui has après"**: llista de les idees noves vistes avui (punt del color del tema, nom del concepte, nom del tema a la dreta).
- Caixa amb vora discontínua i campana: "Demà a les 20:30 t'arribarà l'aprenentatge del dia, i repassaràs N idees d'aquesta setmana." (hora i nombre dinàmics).
- Botons: "Fins demà" (principal, porta a la pestanya Explorar) i "Continuar aprenent" (secundari, continua el feed amb més targetes).
- Si l'usuari torna al Feed el mateix dia després d'haver completat la dosi, el feed s'obre en aquesta pantalla de tancament.

## 5. Explorar

Referència: `Explorar.dc.html`.

- Títol "Explorar" (Bricolage 30 px) i subtítol "Tria un tema o una sèrie curta per anar al gra."
- **"Els teus temes"**: una targeta per tema seleccionat (radi 18): inicial en quadrat de 44 px, nom (16 px, 600), "X de Y" a la dreta i barra de progrés de 6 px en el color del tema. En tocar-la, el feed es filtra per aquest tema.
- **"Mini-sèries"**: files de 56 px amb un punt del color del tema, títol (15 px, 500), "Tema · N targetes · M min" i fletxa. En tocar-les s'obre la mini-sèrie.
- **Tema Pro bloquejat**: targeta amb vora discontínua, icona de cadenat, "Persuasió avançada" / "Tema avançat · inclòs al pla Pro" i una píndola "Pro". En tocar-la s'obre Subscripció.
- Barra inferior amb Explorar actiu.

## 6. Mini-sèrie

No té disseny propi: és el mateix Feed, però amb les targetes de la sèrie en ordre i un títol a la capçalera en lloc de la ratxa. En acabar, mostra un missatge breu "Sèrie completada" i torna a Explorar.

## 7. Practicar (Fase 1: dades de mostra)

Referència: `Practicar.dc.html`.

- Títol "Practicar" i subtítol "Assaja converses reals amb un personatge d'IA i rep feedback quan acabis."
- Bàner (fons `accent` al 10 %, vora `accent` al 35 %): "Et queden 2 converses de prova" / "Amb Pro, practica sempre que vulguis." i botó "Veure Pro" → Subscripció.
- **"Escenaris"**: targetes amb avatar rodó de 46 px (inicial del personatge, color del tema), títol, personatge i "Tema · Nivell · durada":
  - Negociar el sou — "Amb la Marta, de recursos humans" — Negociació · Nivell mitjà · 5 min
  - Demanar un augment — "Amb en Jordi, el teu cap" — Negociació · Nivell difícil · 7 min
  - Dir que no a més feina — "Amb la Laia, companya d'equip" — Comunicació · Nivell mitjà · 5 min
  - Calmar un client enfadat — "Amb en Pere, que reclama un retard" — Comunicació · Nivell fàcil · 4 min
- Els escenaris es carreguen d'un fitxer `scenarios.json` (vegeu `04-contingut.md`).

## 8. Conversa amb IA (Fase 1: interfície amb dades de mostra)

Referència: `Conversa.dc.html`. Pantalla completa sense barra inferior.

- **Capçalera** (vora inferior): fletxa enrere, avatar de 40 px, "Marta · RRHH" i "Negociar el sou", botó "Acabar" a la dreta.
- Franja d'objectiu: icona de diana + "Objectiu: tancar un sou dins del teu rang".
- **Missatges**: bombolles amb radi 18 (la cantonada del costat de qui parla, 6 px), amplada màxima 80 %.
  - Personatge: a l'esquerra, fons `#1F2229`.
  - Usuari: a la dreta, fons `accent`, text `onAccent`.
  - **Pista** del coach: caixa amb vora discontínua, icona de bombeta, "**Pista:** …" en `accentSoft`.
  - Indicador "escrivint" (tres punts).
- **Barra d'entrada**: camp de text arrodonit de 48 px ("Escriu la teva resposta…"), botó de micròfon (48 px, `surfaceHigh`) i botó d'enviar (48 px, `accent`).
- **Fase 1:** la conversa mostra els missatges de mostra del disseny; en enviar, el missatge de l'usuari s'afegeix i el personatge respon amb un text fix ("Aquesta funció arribarà aviat."). Deixar preparada una interfície `ConversationService` per connectar la IA a la Fase 2.

## 9. Perfil

Referència: `Perfil.dc.html`.

- Avatar genèric de 52 px, nom (Bricolage 24 px; a la Fase 1 sempre "Tu", perquè no hi ha registre) i "Pla gratuït".
- **Ratxa**: flama de 34 px, "5 dies" (Bricolage 30 px, 800), "seguits complint l'objectiu", i la setmana (com a la pantalla de tancament; avui mostra "4/12" dins el cercle si no està complet).
- **Estadístiques** en 3 columnes: "idees apreses", "per repassar", "guardades" (número en Bricolage 24 px).
- **Bàner Pro**: "Passa a Pro" / "Converses amb IA i temes avançats" i botó "Veure plans" → Subscripció.
- **Ajustos** (llista amb separadors):
  - "Aprenentatge del dia" — hora (obre selector d'hora i reprograma notificacions)
  - "Objectiu diari" — "12 targetes" (obre selector 5/12/20)
  - "Targetes guardades" — fletxa
  - (Afegir) "Temes" — permet canviar els temes de l'onboarding
  - (Afegir, si el permís està denegat) "Activar notificacions"
- Barra inferior amb Perfil actiu.

## 10. Subscripció (Fase 1: només interfície)

Referència: `Subscripcio.dc.html`. Modal a pantalla completa.

- Botó de tancar (X) a dalt a la dreta.
- Píndola "Pro", títol (Bricolage 32 px, 800) "No només llegeixis. Practica-ho." i subtítol "Assaja les converses difícils abans que passin de veritat."
- Avantatges amb ✓:
  - **Converses amb IA** · sous, augments, dir que no, clients
  - **Feedback personal** · què has fet bé i què pots millorar
  - **Temes avançats** · persuasió, conflictes, lideratge
  - El feed i la notificació diària continuen gratis (en gris)
- Selector de pla (botons de ràdio, 68 px): **Anual** "El més econòmic · [PREU AL MES]" `[PREU]/any` (seleccionat per defecte) i **Mensual** "Sense compromís" `[PREU]/mes`.
- Botó principal "Passar a Pro", text legal (12 px) "Es renova automàticament. Pots cancel·lar-ho quan vulguis des de la botiga d'apps." i botó de text "Restaurar compres".
- **Fase 1:** el botó mostra un missatge "Les subscripcions arribaran aviat." Els preus queden com a text configurable.
