# 05 · Arquitectura tècnica

## Stack

| Peça | Tria | Motiu |
| --- | --- | --- |
| App | **Flutter** (Dart 3, última versió estable) | El propietari ja treballa amb Flutter |
| Gestió d'estat | **Riverpod** (`flutter_riverpod`) | Estàndard, testable, sense context |
| Navegació | **go_router** amb `StatefulShellRoute` per a la barra inferior | Rutes declaratives, enllaços des de notificacions |
| Models | Classes Dart pures amb `fromJson`/`toJson` escrits a mà, `sealed` per als tipus de targeta | Evitar generació de codi a la Fase 1 |
| Backend | **Firebase des del principi** | Decisió del propietari |
| Autenticació | Firebase Auth **anònima** | Sense registre; es podrà vincular a un compte més endavant |
| Base de dades | **Cloud Firestore** amb persistència local (per defecte a mòbil) | Progrés sincronitzat i funcionament sense connexió |
| Notificació diària | **`flutter_local_notifications`** + `timezone` + `flutter_timezone` | Local, gratuïta, funciona sense connexió |
| Missatges remots | **Firebase Cloud Messaging** (`firebase_messaging`) | Campanyes i novetats |
| Analítica | `firebase_analytics` | Mesurar retenció i ús |
| Icones | `flutter_svg` amb SVG propis | Estil d'icona del disseny |
| Traduccions | `flutter_localizations` + `gen-l10n` (fitxers ARB) | Català ara, altres idiomes després |
| Preferències locals | `shared_preferences` | Només per a dades de dispositiu (p. ex. si s'ha demanat el permís) |
| Icona i splash | `flutter_launcher_icons`, `flutter_native_splash` (dev) | |

Afegir sempre els paquets amb `flutter pub add` (versió estable més recent). Comprovar a la documentació de cada paquet els passos de configuració natius d'Android i iOS.

**Fases posteriors** (no instal·lar ara): `purchases_flutter` (RevenueCat), `cloud_functions` per a la IA, `flutter_tts` per escoltar targetes.

## Estructura de carpetes

Organització per funcionalitat:

```
lib/
  main.dart                     # inicialitza Firebase, zona horària, notificacions i llança l'app
  app.dart                      # MaterialApp.router, tema, traduccions
  core/
    theme/                      # app_colors.dart, app_text_styles.dart, app_theme.dart
    widgets/                    # PrimaryButton, SecondaryButton, IconCircleButton, TopicPill, ProgressBar, WeekRow, AppIcon…
    router/                     # app_router.dart
    utils/                      # dates (data local, AAAA-MM-DD), format de números
  l10n/
    app_ca.arb
  data/
    models/                     # Topic, Card (sealed), IdeaCard, QuizCard, ScenarioCard, Series, Scenario, CardState, UserSettings, DayLog
    content_repository.dart     # llegeix els JSON d'assets
    progress_repository.dart    # llegeix i escriu el progrés a Firestore
    settings_repository.dart    # preferències de l'usuari (Firestore) 
    auth_service.dart           # login anònim
  domain/
    spaced_repetition.dart      # regles de caixes (funcions pures)
    daily_feed_builder.dart     # algorisme del feed (funcions pures)
    streak_calculator.dart      # ratxa (funcions pures)
  features/
    onboarding/
    feed/                       # feed_screen, idea_card_view, quiz_card_view, card_detail_screen, daily_done_page, anchor_scale_visual
    explore/
    series/
    practice/                   # practice_screen, conversation_screen, conversation_service.dart (interfície + mock)
    profile/
    pro/                        # subscription_screen
  services/
    notification_service.dart   # programació de notificacions locals
    push_service.dart           # FCM: permís, token, missatges en primer pla
    analytics_service.dart
assets/
  content/ca/                   # topics.json, cards.json, series.json, scenarios.json
  icons/                        # SVG de 03-disseny.md
  fonts/                        # BricolageGrotesque, Inter
  app_icon/                     # app_icon.png, app_icon_foreground.png
test/
  domain/                       # tests de spaced_repetition, daily_feed_builder, streak_calculator
```

Les funcions de `domain/` han de ser **pures** (sense Firebase ni Flutter), amb la data d'avui passada com a paràmetre, perquè es puguin provar fàcilment.

## Firebase

### Configuració

1. El propietari crea el projecte de Firebase amb el seu compte (vegeu "Preguntes obertes" a `06-pla-de-treball.md`).
2. Configurar l'app amb la **FlutterFire CLI** (`flutterfire configure`) per a Android i iOS. Això genera `lib/firebase_options.dart`.
3. Activar a la consola: Authentication (proveïdor anònim), Firestore, Cloud Messaging i Analytics.

### Autenticació

- En arrencar, si no hi ha usuari, `signInAnonymously()`.
- La primera arrencada necessita connexió. Si no n'hi ha, mostrar una pantalla senzilla "Necessites connexió per començar" amb un botó per tornar-ho a provar. Després, l'app ha de funcionar sense connexió.

### Model de Firestore

```
users/{uid}
  createdAt: timestamp
  topics: ["negotiation", "psychology"]
  dailyGoal: 12
  notificationTime: "20:30"
  timezone: "Europe/Madrid"
  onboardingCompleted: true
  plan: "free"
  streak: { current: 5, best: 9, lastCompletedDate: "2026-10-22" }

users/{uid}/cardStates/{cardId}
  status, box, nextReviewDate, firstSeenAt, lastSeenAt, correctCount, wrongCount, saved

users/{uid}/days/{AAAA-MM-DD}
  plannedCardIds: [...]        # la dosi del dia calculada
  seenCardIds: [...]
  goal: 12
  completed: false

users/{uid}/devices/{installationId}
  fcmToken, platform, updatedAt
```

### Regles de seguretat

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

Desar-les a `firestore.rules` al repositori.

## Notificacions locals (aprenentatge del dia)

Paquets: `flutter_local_notifications`, `timezone`, `flutter_timezone`.

- **Inicialització** a `main.dart`: inicialitzar les zones horàries, establir la zona local amb `flutter_timezone` i inicialitzar el plugin amb la gestió del toc (`onDidReceiveNotificationResponse`) i de l'obertura de l'app des d'una notificació (`getNotificationAppLaunchDetails`).
- **Canal d'Android**: id `daily_dose`, nom "Aprenentatge del dia", importància alta. Segon canal `streak_reminder`, nom "Recordatori de ratxa", importància per defecte.
- **Permís**: demanar-lo a l'onboarding, en tocar "Començar a aprendre". iOS: `requestPermissions(alert, badge, sound)`. Android 13 o posterior: `requestNotificationsPermission()`.
- **Mode de programació**: `AndroidScheduleMode.inexactAllowWhileIdle`. **No** demanar el permís d'alarmes exactes (`SCHEDULE_EXACT_ALARM`): Google Play el limita a apps de despertador i calendari, i aquí uns minuts de retard no importen.
- **Una notificació diferent cada dia**: no fer servir la repetició diària del paquet (repetiria sempre el mateix text). En lloc d'això, programar **una notificació per a cadascun dels propers 30 dies** amb `zonedSchedule`, cadascuna amb el seu text (vegeu `04-contingut.md`). A iOS hi ha un límit de 64 notificacions pendents: 30 diàries + recordatoris queden per sota.
- **Ids**: `1000 + dia` per a les diàries i `2000 + dia` per als recordatoris (dia = 0…29 a partir d'avui).
- **Reprogramar** (cancel·lar les dues sèries i tornar-les a crear) en aquests moments: en obrir l'app, en canviar l'hora o l'objectiu, en completar la dosi del dia.
- **Recordatori de ratxa**: a les 21:30 de cada dia, només si l'hora de la notificació diària és anterior a les 21:00 i la ratxa actual és d'1 dia o més. Quan l'usuari completa la dosi, es cancel·la el recordatori d'avui.
- **Payload**: l'id de la targeta (`card:neg-001`). En tocar-la, navegar a `/feed?card=neg-001`.

## Missatges remots (Firebase Cloud Messaging)

- Demanar el permís amb el mateix diàleg de l'onboarding (no tornar-lo a demanar per separat).
- Obtenir el token i desar-lo a `users/{uid}/devices/{installationId}`; actualitzar-lo quan canviï (`onTokenRefresh`).
- Subscriure tots els dispositius al tema `all` (per a campanyes) i al tema `lang_ca`.
- Missatges amb l'app oberta: mostrar-los amb `flutter_local_notifications` (canal `announcements`).
- Missatges en segon pla: registrar el gestor de segon pla segons la documentació de `firebase_messaging`.
- Si un missatge porta `data.cardId`, en tocar-lo s'obre aquella targeta, igual que les notificacions locals.
- **iOS**: cal un compte de desenvolupador d'Apple, activar "Push Notifications" i "Background Modes → Remote notifications" a Xcode, i pujar la clau APNs a la consola de Firebase. Si encara no està disponible, deixar-ho tot preparat i provar FCM primer a Android.

## Traduccions

- `flutter_localizations` + `generate: true` a `pubspec.yaml` i `l10n.yaml` amb `arb-dir: lib/l10n`, plantilla `app_ca.arb`.
- `supportedLocales: [Locale('ca')]` a la Fase 1, i l'app sempre en català encara que el mòbil estigui en un altre idioma (fins que hi hagi més traduccions).
- Tots els textos de `02-pantalles.md` van a `app_ca.arb`, amb marcadors per als valors dinàmics (`{done} de {goal} avui`, `{count} dies`, plurals amb ICU).
- El contingut (targetes) no va als ARB: és als JSON de `assets/content/ca/`.

## Analítica (Firebase Analytics)

Esdeveniments mínims:

| Esdeveniment | Paràmetres |
| --- | --- |
| `onboarding_completed` | `topics`, `daily_goal`, `notification_time`, `notifications_granted` |
| `card_viewed` | `card_id`, `type`, `topic` |
| `card_expanded` | `card_id` |
| `quiz_answered` | `card_id`, `correct` |
| `daily_goal_completed` | `goal`, `streak` |
| `notification_opened` | `card_id`, `kind` (`daily` / `streak` / `push`) |
| `pro_screen_viewed` | `source` |

## Conversa amb IA (preparació per a la Fase 2)

- Definir una interfície `ConversationService` amb `Stream<String> reply(Scenario scenario, List<Message> history)` i `Future<Feedback> finish(...)`.
- Fase 1: `MockConversationService` amb respostes fixes.
- Fase 2: implementació que crida una funció de Firebase (Cloud Functions) que guarda la clau de l'API, comprova la subscripció i aplica límits d'ús. **La clau de l'API mai pot anar dins l'app.**

## Qualitat

- `flutter analyze` sense avisos i `dart format` aplicat.
- Tests unitaris de `domain/` (repàs espaiat, feed diari, ratxa), incloent-hi canvis de dia i casos amb poc contingut.
- Provar en un dispositiu o emulador Android i en un simulador d'iOS.
