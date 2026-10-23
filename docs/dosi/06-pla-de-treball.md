# 06 · Pla de treball (Fase 1: base de l'app)

Fer els passos en ordre. Cada pas ha de quedar **funcionant i provat** abans de començar el següent. Al final de cada pas: `flutter analyze` sense avisos i, si toca, tests en verd.

## Preguntes obertes (demanar-les al propietari abans de començar)

1. **Identificador de l'app** (bundle id / application id), p. ex. `com.<domini>.dosi`. Ha de ser d'un domini que controli. Si encara no el té, fer servir un provisional i anotar-ho a `DECISIONS.md`.
2. **Projecte de Firebase**: l'ha de crear el propietari amb el seu compte de Google (o donar accés). Cal tenir-lo abans del pas 8.
3. **Repositori**: on es desa el codi (GitHub, local…).
4. **Compte de desenvolupador d'Apple**: necessari per a notificacions remotes a iPhone i per publicar. Si no en té, provar FCM a Android.
5. **Dispositiu de proves**: Android, iPhone o tots dos.

## Passos

### Pas 0 · Projecte

- `flutter create` amb el nom `dosi`, l'identificador acordat i només Android i iOS.
- Bloquejar l'orientació en vertical.
- Fitxers `README.md` (com executar-lo) i `DECISIONS.md` a l'arrel.
- **Fet quan:** l'app buida s'executa a Android i iOS.

### Pas 1 · Tema, tipografies i icones

- Afegir les fonts (Bricolage Grotesque, Inter) a `assets/fonts/` i declarar-les.
- Crear `AppColors`, els estils de text i `AppTheme` (`03-disseny.md`).
- Crear els SVG d'`assets/icons/` i un widget `AppIcon(name, size, color)`.
- Crear els components bàsics de `core/widgets/` (botons, píndoles, barra de progrés, fila de la setmana).
- Generar la icona de l'app i el splash.
- **Fet quan:** una pantalla de prova mostra tots els components i icones i coincideix amb la guia d'estil.

### Pas 2 · Traduccions

- Configurar `gen-l10n` i crear `app_ca.arb` amb tots els textos de `02-pantalles.md`.
- **Fet quan:** cap widget té text visible escrit directament al codi.

### Pas 3 · Contingut

- Crear els JSON d'`assets/content/ca/` amb el contingut inicial de `04-contingut.md`.
- Models (`Topic`, `Card` sealed i subclasses, `Series`, `Scenario`) i `ContentRepository`.
- **Fet quan:** hi ha tests que carreguen els JSON i validen que tots els `reviewOf`, `cardIds` i `topic` apunten a elements existents.

### Pas 4 · Navegació i esquelet de pantalles

- `go_router` amb la barra inferior de 4 pestanyes (`StatefulShellRoute`) i totes les rutes de `02-pantalles.md`, de moment amb pantalles buides.
- **Fet quan:** es pot navegar per totes les pestanyes i rutes, i cada pestanya conserva el seu estat.

### Pas 5 · Feed i targetes (amb dades en memòria)

- Feed vertical (`PageView`), capçalera amb ratxa i progrés, targeta d'idea, targeta oberta (incloent el visual `anchorScale`), targeta de quiz/escenari amb tots els estats, pantalla de tancament.
- De moment el progrés es guarda en memòria (un `ProgressRepository` provisional).
- **Fet quan:** es pot fer una dosi sencera amb el contingut inicial i les pantalles coincideixen amb `Main`, `Targeta`, `Quiz` i `Tancament` de `referencia-disseny/`.

### Pas 6 · Lògica d'aprenentatge

- `spaced_repetition.dart`, `daily_feed_builder.dart` i `streak_calculator.dart` com a funcions pures, amb tests (`04-contingut.md`).
- Connectar-les al feed: targeta vista (en obrir l'exemple o en passar-la), respostes de quiz, dosi diària desada, ratxa.
- **Fet quan:** els tests cobreixen els casos de `04-contingut.md` (inclosos canvis de dia i poc contingut), i en canviar la data del sistema apareixen els repassos esperats.

### Pas 7 · Onboarding i ajustos

- Pantalla d'onboarding completa, redirecció a l'onboarding si no s'ha completat.
- Ajustos a Perfil: hora de notificació, objectiu diari, temes.
- **Fet quan:** la primera arrencada passa per l'onboarding i els canvis d'ajustos afecten el feed.

### Pas 8 · Firebase

- `flutterfire configure`, inicialització a `main.dart`, login anònim amb la pantalla de "sense connexió" per a la primera arrencada.
- `ProgressRepository` i `SettingsRepository` sobre Firestore (model de `05-arquitectura.md`), substituint la versió en memòria.
- Regles de seguretat a `firestore.rules`.
- Analytics amb els esdeveniments de `05-arquitectura.md`.
- **Fet quan:** el progrés es manté en tancar i obrir l'app, funciona en mode avió després de la primera arrencada, i les dades apareixen a la consola de Firestore sota l'usuari anònim.

### Pas 9 · Notificacions

- `NotificationService`: permís a l'onboarding, canals, programació de 30 dies amb text diferent cada dia, recordatori de ratxa, reprogramació, obertura de la targeta en tocar-la.
- `PushService`: token FCM a Firestore, temes `all` i `lang_ca`, missatges amb l'app oberta, obertura de targeta per `data.cardId`.
- Afegir a Perfil l'opció "Activar notificacions" si el permís està denegat.
- **Fet quan:** amb l'hora posada a d'aquí 2 minuts arriba la notificació amb el text de la targeta prevista; en tocar-la s'obre aquesta targeta; un missatge de prova enviat des de la consola de Firebase arriba al dispositiu Android.

### Pas 10 · Explorar, mini-sèries i Perfil

- Explorar amb progrés real per tema, mini-sèries de `series.json` i tema Pro bloquejat.
- Mini-sèrie com a feed filtrat.
- Perfil amb ratxa, setmana, estadístiques reals, targetes guardades i ajustos.
- **Fet quan:** les xifres d'Explorar i Perfil corresponen al progrés real.

### Pas 11 · Practicar, Conversa i Subscripció (interfície)

- Practicar amb els escenaris de `scenarios.json` i el bàner de prova.
- Conversa amb `MockConversationService`.
- Subscripció amb selecció de pla i missatge "Les subscripcions arribaran aviat."
- **Fet quan:** les tres pantalles coincideixen amb `referencia-disseny/` i la navegació entre elles funciona.

### Pas 12 · Repàs final

- Comparar cada pantalla amb `referencia-disseny/` a 390 × 844 i en un mòbil petit (360 px d'amplada): res tallat ni desbordat.
- Revisar accessibilitat: objectius tàctils de 44 px, etiquetes semàntiques als botons d'icona, contrast.
- Actualitzar `README.md` del repositori (com executar, configurar Firebase, enviar una notificació de prova) i `DECISIONS.md`.
- **Fet quan:** l'app es pot fer servir cada dia de principi a fi amb el contingut inicial.

## Fora d'aquesta fase

Converses reals amb IA, pagaments i RevenueCat, escoltar targetes amb veu, altres idiomes, publicació a les botigues.
