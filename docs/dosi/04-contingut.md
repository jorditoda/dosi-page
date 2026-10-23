# 04 · Contingut, feed i repàs

El contingut viu en **fitxers JSON inclosos a l'app** (`assets/content/ca/`). Més endavant es podrà servir des de Firebase sense canviar el model. El codi no ha de saber res d'un tema o targeta concrets: tot surt d'aquests fitxers.

## Fitxers

```
assets/content/ca/
  topics.json        # temes
  cards.json         # totes les targetes (idea, quiz, escenari)
  series.json        # mini-sèries
  scenarios.json     # escenaris de pràctica amb IA (Fase 1: només per mostrar la llista)
```

Si `cards.json` creix molt, es pot dividir en un fitxer per tema (`cards_negotiation.json`, …) amb el mateix format.

## Model de dades

### Tema (`topics.json`)

```json
[
  {
    "id": "negotiation",
    "name": "Negociació",
    "description": "Sous, preus, acords",
    "initial": "N",
    "color": "#FF8A3D",
    "labelColor": "#FFB27A",
    "isPro": false,
    "order": 1
  }
]
```

### Targeta (`cards.json`)

Tres tipus amb camps comuns. Implementar-ho en Dart amb una classe `sealed` `Card` i les subclasses `IdeaCard`, `QuizCard` i `ScenarioCard`.

Camps comuns:

| Camp | Tipus | Descripció |
| --- | --- | --- |
| `id` | string | Únic. Format `<tema>-<número>` per a idees (`neg-001`) i `<id de la idea>-q<n>` per a quizzes de repàs (`neg-001-q1`) |
| `type` | `"idea"` \| `"quiz"` \| `"scenario"` | Tipus |
| `topic` | string | Id del tema |
| `level` | int | 1 = bàsic, 2 = mitjà, 3 = avançat |
| `isPro` | bool | Si només és per a Pro |
| `isPlaceholder` | bool (opcional) | `true` si és contingut de prova |

Camps de `idea`:

| Camp | Tipus | Límit | Descripció |
| --- | --- | --- | --- |
| `concept` | string | 30 caràcters | Nom del concepte ("Efecte àncora") |
| `hook` | string | 90 | Frase gran del feed |
| `hookAccent` | string? | 20 | Pregunta curta en taronja sota el ganxo ("Per què?") |
| `keyIdea` | string | 220 | Idea clau. Admet `**negreta**` |
| `example.text` | string | 200 | Text de l'exemple |
| `example.visual` | objecte? | — | Visual opcional (vegeu més avall) |
| `apply` | string[] | 2-3 elements de 140 | Passos de "Com aplicar-ho" |
| `source` | string | — | Font acadèmica o llibre |
| `notification` | string | 80 | Text per a la notificació del dia |
| `icon` | string? | — | Nom d'una icona d'`assets/icons/` per a la il·lustració decorativa |

Camps de `quiz` i `scenario`:

| Camp | Tipus | Descripció |
| --- | --- | --- |
| `reviewOf` | string? | Id de la idea que repassa. Obligatori per a `quiz`; opcional per a `scenario` |
| `question` | string | Pregunta o situació (màx. 160 caràcters) |
| `options` | `{id, text}[]` | 2-4 opcions |
| `correctOptionId` | string | Id de l'opció correcta |
| `feedbackCorrect` | string | Text després d'encertar |
| `feedbackWrong` | string | Text després de fallar |

Un `quiz` sempre repassa una idea concreta i només apareix com a repàs. Un `scenario` és una situació pràctica: si té `reviewOf`, es comporta exactament com un quiz (només surt com a repàs d'aquella idea); si no en té, apareix al feed com a contingut nou i no té repàs.

### Visual `anchorScale`

Primer (i de moment únic) tipus de visual de l'exemple. Dibuixa una escala horitzontal comuna amb diverses files.

```json
{
  "type": "anchorScale",
  "min": 5500,
  "max": 9500,
  "ticks": [6000, 7000, 8000, 9000],
  "lanes": [
    { "label": "Tu dius 9.000 € primer", "result": "acord prop de 8.000 €", "anchor": 9000, "rangeFrom": 8000, "rangeTo": 9000, "highlight": true },
    { "label": "Ell diu 6.000 € primer", "result": "acord entre 6.000 i 7.000 €", "anchor": 6000, "rangeFrom": 6000, "rangeTo": 7000, "highlight": false }
  ],
  "conclusion": "Mateix cotxe, uns 1.500 € de diferència."
}
```

- La fila amb `highlight: true` fa servir el color `accent` (rang al 45 %, punt ple); les altres, `textSecondary` (rang al 35 %).
- Posició horitzontal: `(valor − min) / (max − min)`.
- Els valors de l'escala es formaten amb el separador de milers català (punt).

Si una targeta porta un tipus de visual desconegut, s'ignora sense error.

### Mini-sèrie (`series.json`)

```json
[
  { "id": "negotiate-salary", "title": "Com negociar un sou", "topic": "negotiation", "cardIds": ["neg-001"], "minutes": 3, "isPro": false }
]
```

### Escenari de pràctica (`scenarios.json`)

```json
[
  {
    "id": "salary",
    "title": "Negociar el sou",
    "topic": "negotiation",
    "character": { "name": "Marta", "role": "RRHH", "initial": "M", "description": "Amb la Marta, de recursos humans" },
    "level": "Nivell mitjà",
    "minutes": 5,
    "goal": "Tancar un sou dins del teu rang",
    "isPro": true
  }
]
```

## Contingut inicial

Aquest és **l'únic contingut real** que ha de fer servir la Fase 1. El lot complet de targetes es generarà en una sessió a part.

### `topics.json`

```json
[
  { "id": "negotiation", "name": "Negociació", "description": "Sous, preus, acords", "initial": "N", "color": "#FF8A3D", "labelColor": "#FFB27A", "isPro": false, "order": 1 },
  { "id": "psychology", "name": "Psicologia", "description": "Per què fem el que fem", "initial": "P", "color": "#A78BFA", "labelColor": "#C4B5FD", "isPro": false, "order": 2 },
  { "id": "communication", "name": "Comunicació", "description": "Escoltar, convèncer, dir que no", "initial": "C", "color": "#2DD4BF", "labelColor": "#5EEAD4", "isPro": false, "order": 3 }
]
```

### `cards.json`

```json
[
  {
    "id": "neg-001",
    "type": "idea",
    "topic": "negotiation",
    "level": 1,
    "isPro": false,
    "concept": "Efecte àncora",
    "hook": "Qui diu el primer número en una negociació sovint acaba guanyant.",
    "hookAccent": "Per què?",
    "keyIdea": "Es diu **efecte àncora**. La primera xifra que sentim es converteix en el punt de referència, i tota la negociació gira al seu voltant.",
    "example": {
      "text": "Vens el teu cotxe de segona mà. Mira què passa segons qui diu el primer preu:",
      "visual": {
        "type": "anchorScale",
        "min": 5500,
        "max": 9500,
        "ticks": [6000, 7000, 8000, 9000],
        "lanes": [
          { "label": "Tu dius 9.000 € primer", "result": "acord prop de 8.000 €", "anchor": 9000, "rangeFrom": 8000, "rangeTo": 9000, "highlight": true },
          { "label": "Ell diu 6.000 € primer", "result": "acord entre 6.000 i 7.000 €", "anchor": 6000, "rangeFrom": 6000, "rangeTo": 7000, "highlight": false }
        ],
        "conclusion": "Mateix cotxe, uns 1.500 € de diferència."
      }
    },
    "apply": [
      "Si saps bé quant val, fes tu la primera oferta: ambiciosa però justificable.",
      "Si l'altre ancora amb una xifra absurda, digues que està fora de lloc i torna a criteris objectius."
    ],
    "source": "Tversky i Kahneman (1974); Galinsky i Mussweiler (2001)",
    "notification": "Per què qui diu el primer número sol guanyar la negociació?",
    "icon": "anchor"
  },
  {
    "id": "neg-001-q1",
    "type": "quiz",
    "topic": "negotiation",
    "level": 1,
    "isPro": false,
    "reviewOf": "neg-001",
    "question": "Negocies el sou d'una feina nova i et pregunten quant demanes. Tens dades del sector. Què fas?",
    "options": [
      { "id": "a", "text": "Dius que prefereixes que facin ells la primera oferta" },
      { "id": "b", "text": "Dius una xifra a la part alta del rang del sector, i expliques per què" },
      { "id": "c", "text": "Dius el mínim que acceptaries, per no espantar-los" }
    ],
    "correctOptionId": "b",
    "feedbackCorrect": "Amb bona informació, ancorar primer et dona avantatge: la teva xifra marca el terreny de joc.",
    "feedbackWrong": "Si ancores baix o deixes que ancorin ells, tota la negociació parteix d'una xifra pitjor per a tu."
  },
  {
    "id": "psy-001",
    "type": "idea",
    "topic": "psychology",
    "level": 1,
    "isPro": false,
    "concept": "Reciprocitat",
    "hook": "Per què costa tant dir que no a algú que t'acaba de fer un favor?",
    "keyIdea": "Es diu **principi de reciprocitat**: sentim l'obligació de tornar el que ens donen, encara que no ho haguem demanat.",
    "example": {
      "text": "Al supermercat et donen un tast gratuït. Després et sents una mica obligat a comprar el producte, tot i que no el necessitaves."
    },
    "apply": [
      "Quan algú et fa un favor just abans de demanar-te alguna cosa, separa-ho: pots agrair el favor i dir que no a la petició.",
      "Si ets tu qui demana, començar oferint alguna cosa de valor real fa que l'altre estigui més disposat a ajudar."
    ],
    "source": "Regan (1971); Cialdini, Influence (1984)",
    "notification": "Per què et costa dir que no a qui t'acaba de fer un favor?"
  },
  {
    "id": "psy-001-q1",
    "type": "quiz",
    "topic": "psychology",
    "level": 1,
    "isPro": false,
    "reviewOf": "psy-001",
    "question": "Un company t'ajuda amb una tasca i, just després, et demana que el cobreixis divendres. No et va bé. Què fas?",
    "options": [
      { "id": "a", "text": "Acceptes, perquè t'ha ajudat i seria lleig dir que no" },
      { "id": "b", "text": "Li agraeixes l'ajuda i li dius que divendres no pots" },
      { "id": "c", "text": "Li dius que no i deixes de demanar-li ajuda" }
    ],
    "correctOptionId": "b",
    "feedbackCorrect": "Agrair el favor i respondre la petició són dues coses separades.",
    "feedbackWrong": "La reciprocitat t'empeny a dir que sí. Pots agrair l'ajuda i, alhora, dir que no al que no et va bé."
  },
  {
    "id": "com-001",
    "type": "idea",
    "topic": "communication",
    "level": 1,
    "isPro": false,
    "concept": "Escolta activa",
    "hook": "La majoria de gent no escolta per entendre, sinó per respondre.",
    "hookAccent": "Com es nota?",
    "keyIdea": "L'**escolta activa** consisteix a demostrar que has entès abans de donar la teva opinió: resumir el que l'altre ha dit i preguntar si ho has entès bé.",
    "example": {
      "text": "Un amic t'explica que està cremat a la feina. En lloc de dir-li \"canvia de feina\", li dius: \"Sembla que et sents poc valorat, és així?\". La conversa canvia de to."
    },
    "apply": [
      "Abans de respondre, resumeix en una frase el que t'han dit.",
      "Pregunta \"ho he entès bé?\" i espera la resposta abans de donar consells."
    ],
    "source": "Rogers i Farson, Active Listening (1957)",
    "notification": "Com saber si algú t'escolta de debò o només espera el seu torn?"
  },
  {
    "id": "com-001-s1",
    "type": "scenario",
    "topic": "communication",
    "level": 1,
    "isPro": false,
    "reviewOf": "com-001",
    "question": "Una clienta et diu enfadada que la comanda ha arribat tard per segona vegada. Quina és la millor primera resposta?",
    "options": [
      { "id": "a", "text": "\"Ha estat culpa del transportista, no nostra.\"" },
      { "id": "b", "text": "\"Entenc que és la segona vegada i que us ha causat un problema. Què us ha afectat més?\"" },
      { "id": "c", "text": "\"Us puc fer un descompte del 10 %.\"" }
    ],
    "correctOptionId": "b",
    "feedbackCorrect": "Primer, demostra que has entès. Les solucions funcionen millor quan l'altre se sent escoltat.",
    "feedbackWrong": "Justificar-te o oferir una solució massa ràpid fa que l'altre no se senti escoltat."
  }
]
```

### `series.json`

```json
[
  { "id": "negotiate-salary", "title": "Com negociar un sou", "topic": "negotiation", "cardIds": ["neg-001", "neg-001-q1"], "minutes": 3, "isPro": false }
]
```

Les altres sèries que surten als dissenys ("Dir que no sense sentir-te culpable", "Per què ens costa dir que no a un favor") s'afegiran amb el lot de contingut.

### `scenarios.json`

Els quatre escenaris de `02-pantalles.md`, secció Practicar: `salary` (Marta, RRHH), `raise` (Jordi, el teu cap, nivell difícil, 7 min), `say-no` (Laia, companya d'equip, comunicació), `angry-client` (Pere, client, nivell fàcil, 4 min). Objectiu del de Marta: "Tancar un sou dins del teu rang". Per als altres, posar un objectiu curt coherent amb el títol.

## Estat de cada targeta per usuari

Per a cada idea, l'app guarda:

| Camp | Tipus | Descripció |
| --- | --- | --- |
| `cardId` | string | Id de la idea |
| `status` | `new` \| `learning` \| `known` | Estat |
| `box` | int 0-5 | Caixa del repàs espaiat |
| `nextReviewDate` | data `AAAA-MM-DD` o null | Quan toca repassar |
| `firstSeenAt` / `lastSeenAt` | timestamp | |
| `correctCount` / `wrongCount` | int | Respostes als quizzes |
| `saved` | bool | Guardada |

Les targetes de quiz no tenen estat propi: el resultat s'aplica a la idea que repassen (`reviewOf`).

## Repetició espaiada

Sistema de caixes (Leitner) amb intervals fixos:

| Caixa | Proper repàs |
| --- | --- |
| 1 | +1 dia |
| 2 | +3 dies |
| 3 | +7 dies |
| 4 | +14 dies |
| 5 | +30 dies |

Regles:
- **Veure una idea** (obrir l'exemple o passar-la llisquejant): `status = learning`, `box = 1`, proper repàs demà. A la Fase 1 no hi ha manera de marcar una idea com a coneguda; `status = known` només s'arriba a la caixa 5 amb quizzes.
- **Quiz encertat al primer intent**: `box = min(box + 1, 5)`, proper repàs segons la nova caixa. A partir de la caixa 5 encertada, `status = known`.
- **Quiz fallat**: `box = 1`, proper repàs demà, `status = learning`.
- Si una idea té diversos quizzes, se'n tria un per rotació a cada repàs.
- Si una idea no té cap quiz, no entra al repàs (només es comptabilitza com a vista).

## Algorisme del feed diari

Entrades: temes seleccionats, objectiu diari `N`, estats de les targetes, data d'avui.

1. **Repassos pendents**: idees amb `nextReviewDate <= avui` que tinguin quiz. Ordenar per data més antiga. Màxim `ceil(N / 3)` repassos per dia (els que sobrin passen a l'endemà).
2. **Targetes noves**: idees i escenaris sense `reviewOf` mai vistos dels temes seleccionats, no Pro (a la Fase 1 tothom és gratuït, però respectar el camp), ordenats per `level` i després per `id`. Alternar temes (round-robin) perquè no surtin tres del mateix tema seguides.
3. **Barreja**: intercalar de manera que hi hagi un repàs cada 2-3 targetes noves, començant sempre amb una targeta nova.
4. La dosi del dia té `N` elements. Després de la pantalla de tancament, el feed continua amb més targetes noves (i, si s'acaben, mostra un missatge "Ja has vist tot el contingut disponible").
5. **La dosi del dia es calcula una sola vegada al dia** i es desa (llista d'ids), perquè no canviï si l'usuari tanca i obre l'app. Si canvien els temes o l'objectiu, es recalcula la part que encara no s'ha vist.
6. Si s'entra des d'una notificació amb una targeta, aquesta es posa la primera.

Amb el contingut inicial (només 3 idees), la dosi serà curta: l'app ha de funcionar bé amb pocs elements (si n'hi ha menys de `N`, la dosi és el que hi hagi i la pantalla de tancament mostra el nombre real).

## Ratxa

- Un dia compta com a **complet** quan s'arriba a `N` targetes vistes (o a totes les disponibles, si n'hi ha menys de `N`).
- Ratxa actual: dies complets consecutius fins avui (o fins ahir, si avui encara no s'ha completat).
- Es guarda també la millor ratxa.
- Els dies es calculen amb l'**hora local** del mòbil.

## Notificacions: quin text s'envia

- Per a cada dia dels propers 30, es preveu quina serà la primera targeta nova d'aquell dia (seguint l'ordre de l'algorisme) i se n'usa el camp `notification` com a cos de la notificació. Títol: "Dosi".
- Cada 3r dia (o quan hi ha més de 3 repassos pendents), la notificació és de repàs: "Fa {n} dies vas aprendre {concepte}. Ho recordes?".
- La notificació porta l'id de la targeta perquè, en tocar-la, s'obri el feed amb aquesta targeta la primera.
- Recordatori de ratxa (si el dia no s'ha completat): "Encara ets a temps de mantenir la ratxa de {n} dies."

Detalls tècnics de la programació: `05-arquitectura.md`.
