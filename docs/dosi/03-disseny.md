# 03 · Disseny

Estil: **fosc, enèrgic i directe, amb el ritme d'un reel.** Un sol color fort (taronja) per a les accions, i un color per a cada tema. L'app només té tema fosc a la Fase 1.

## Colors

| Token | Hex | Ús |
| --- | --- | --- |
| `bg` | `#101216` | Fons de totes les pantalles i de la barra inferior |
| `surface` | `#1A1D23` | Targetes, llistes, camps, fons de la targeta oberta |
| `surfaceAlt` | `#1F2229` | Bombolles del personatge, tema seleccionat a l'onboarding |
| `surfaceOption` | `#20232A` | Opcions de quiz sense respondre |
| `surfaceHigh` | `#262A32` | Botons d'icona, xips neutres, bombolla de micròfon |
| `pill` | `#22252C` | Píndola de ratxa i botó de tancar |
| `border` | `#2A2E36` | Vores d'1 px, barres de progrés buides |
| `borderStrong` | `#343843` | Vora dels botons secundaris |
| `borderDashed` | `#3A3F4A` / `#4A4F5A` | Vores discontínues (Pro, pistes), cercles buits |
| `divider` | `#23262D` | Vora superior de la barra inferior i capçaleres |
| `textPrimary` | `#F2F3F5` | Títols i text important |
| `textSecondary` | `#C9CDD6` | Cos de text llarg |
| `textBody` | `#DDE0E6` | Text de "Com aplicar-ho" i feedback |
| `textMuted` | `#A3A8B3` | Subtítols, dades, etiquetes |
| `textFaint` | `#8A8F99` | Pestanyes inactives, pistes |
| `accent` | `#FF8A3D` | Botó principal, pestanya activa, ratxa, progrés |
| `accentSoft` | `#FFB27A` | Text taronja sobre fons fosc, enllaços |
| `onAccent` | `#101216` | Text i icones sobre `accent` |
| `success` | `#34D399` | Resposta correcta (text: `#6EE7B7`; sobre ple: `#06281C`) |
| `error` | `#F87171` | Resposta incorrecta (text: `#FCA5A5`; sobre ple: `#3A0B0B`) |

### Colors de tema

| Tema (id) | Color | Text de l'etiqueta | Fons de l'etiqueta |
| --- | --- | --- | --- |
| Negociació (`negotiation`) | `#FF8A3D` | `#FFB27A` | color al 14 % |
| Psicologia (`psychology`) | `#A78BFA` | `#C4B5FD` | color al 14 % |
| Comunicació (`communication`) | `#2DD4BF` | `#5EEAD4` | color al 14 % |

Els fons translúcids es fan amb el color del tema a una opacitat concreta: 14 % per a etiquetes, 16 % per a quadrats d'inicial i avatars, 10-12 % per a estats seleccionats, 45 % per al rang del visual d'ancoratge.

### Regles de color

1. Un sol botó taronja (`accent`) per pantalla: l'acció principal.
2. Els colors de tema només serveixen per identificar temes, mai per a accions.
3. Correcte i incorrecte sempre van acompanyats d'icona (✓ / ✕) i de text, mai només de color.
4. Contrast mínim de 4,5:1 per a tot el text.

## Tipografia

Dues famílies de Google Fonts (llicència OFL), **incloses a l'app com a fitxers** (no descarregades en temps d'execució), perquè funcioni sense connexió:

- **Bricolage Grotesque** — títols, ganxos i números grans. Gruixos 600, 700, 800.
- **Inter** — text, botons i interfície. Gruixos 400, 500, 600.

Descarregar els fitxers des de Google Fonts i declarar-los a `pubspec.yaml` sota `assets/fonts/`.

### Escala

| Estil | Família | Mida (px) | Gruix | Interlineat | Ús |
| --- | --- | --- | --- | --- | --- |
| `display` | Bricolage | 32-34 | 700-800 | 1,10 | Títol d'onboarding, tancament, subscripció |
| `hook` | Bricolage | 33 | 700 | 1,12 | Ganxo de la targeta del feed (i `hookAccent`) |
| `screenTitle` | Bricolage | 30 | 700 | 1,10 | "Explorar", "Practicar" |
| `cardTitle` | Bricolage | 23-24 | 700 | 1,20 | Pregunta de quiz, ganxo a la targeta oberta, nom al perfil |
| `number` | Bricolage | 18-30 | 700-800 | 1,00 | Ratxa, estadístiques, hora, objectiu |
| `body` | Inter | 15-16 | 400 | 1,50-1,55 | Idea clau, exemples, missatges |
| `button` | Inter | 14-16 | 600 | — | Botons (principal 16, secundaris 14 en gruix 500) |
| `label` | Inter | 13 | 600 | — | Etiquetes de tema, text petit destacat |
| `caption` | Inter | 12-13 | 400 | 1,45 | Subtítols, metadades |
| `section` | Inter | 12 | 600 | — | Títols de secció en MAJÚSCULES, espaiat 0,06 em, `textMuted` |
| `tiny` | Inter | 11 | 400 | — | Només dies de la setmana i eixos. **Res per sota d'11 px** |

El títol "Dosi" de la marca: Bricolage 112 px, 800, espaiat −0,03 em.

## Mides i espais

| Element | Valor |
| --- | --- |
| Pantalla de referència | 390 × 844 px |
| Marges laterals | 16-20 px |
| Espais entre elements | 8 · 10 · 12 · 16 · 20 · 26 px |
| Objectiu tàctil mínim | 44 × 44 px |
| Botó principal | 52-56 px d'alçada, radi 16 |
| Botó secundari | 44-52 px d'alçada, radi 14, vora 1 px `borderStrong` |
| Botó d'icona | 44 px, rodó, fons `surfaceHigh` |
| Targeta del feed | radi 28, padding 22 px, vora 1 px `border` |
| Targetes i llistes | radi 18-22, padding 14-18 px |
| Opcions de quiz | alçada mínima 64 px, radi 16, vora 1,5 px |
| Etiquetes (píndoles) | radi complet, padding 7 × 12 px |
| Barra de progrés | 4 px (feed) o 6 px (temes), radi complet |
| Barra inferior | 76 px |
| Camp de text | 48 px, radi complet |

## Icones

Estil: **línia**, traç d'**1,8 px**, quadrícula de **24 px**, extrems i unions **arrodonits**, sense farciment. **Mai emojis.** L'única icona plena és la **flama** de la ratxa.

Desar cada icona com a fitxer SVG a `assets/icons/` i pintar-la amb `flutter_svg` aplicant el color amb `ColorFilter` (els SVG fan servir `currentColor`, que cal substituir pel color desitjat). Plantilla:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <!-- contingut -->
</svg>
```

| Nom de fitxer | Ús | Contingut |
| --- | --- | --- |
| `feed.svg` | Pestanya Feed | `<rect x="5" y="3" width="14" height="18" rx="3"/><path d="M9 8h6M9 12h6"/>` |
| `explore.svg` | Pestanya Explorar | `<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>` |
| `practice.svg` | Pestanya Practicar | `<path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4z"/>` |
| `profile.svg` | Pestanya Perfil, avatar genèric | `<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>` |
| `flame.svg` | Ratxa (**plena**: `fill="currentColor"`, `stroke-width="1.5"`) | `<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.2 1-3.7 2.3-5 .2 1.6 1 2.6 2.2 3C11 8.5 11 5.5 12 3z"/>` |
| `bookmark.svg` | Guardar | `<path d="M7 4h10v16l-5-4-5 4z"/>` |
| `volume.svg` | Escoltar | `<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/>` |
| `bell.svg` | Notificació | `<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>` |
| `lock.svg` | Pro, bloquejat | `<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>` |
| `send.svg` | Enviar | `<path d="M4 12l16-8-6 16-2.5-6.5z"/>` |
| `mic.svg` | Veu | `<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>` |
| `check.svg` | Fet, correcte | `<path d="M5 12.5l4.5 4.5L19 7.5"/>` |
| `plus.svg` | Afegir | `<path d="M12 5v14M5 12h14"/>` |
| `close.svg` | Tancar, incorrecte | `<path d="M6 6l12 12M18 6L6 18"/>` |
| `chevron_right.svg` | Fletxa de llista i botons | `<path d="M9 6l6 6-6 6"/>` |
| `chevron_up.svg` | Següent targeta | `<path d="M6 15l6-6 6 6"/>` |
| `chevron_down.svg` | Tornar de la targeta oberta | `<path d="M6 9l6 6 6-6"/>` |
| `arrow_left.svg` | Enrere | `<path d="M15 6l-6 6 6 6"/>` |
| `review.svg` | Etiqueta de repàs | `<path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3"/><path d="M18 3v4h-4M6 21v-4h4"/>` |
| `target.svg` | Objectiu (conversa, ajustos) | `<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>` |
| `bulb.svg` | Pista del coach | `<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.8V16h5v-.3c0-.7.4-1.4 1-1.8A6 6 0 0 0 12 3z"/>` |
| `anchor.svg` | Il·lustració de l'efecte àncora | `<circle cx="12" cy="5" r="2"/><path d="M12 7v13M8 11h8M5 14a7 7 0 0 0 14 0"/>` |

Mides habituals: 24 px a la barra inferior, 20 px dins botons d'icona, 18 px dins botons de text, 15-16 px dins etiquetes.

## Components

| Component | Especificació |
| --- | --- |
| `PrimaryButton` | Fons `accent`, text `onAccent` 16 px 600, alçada 52 (54-56 a onboarding i subscripció), radi 16, icona opcional a la dreta (fletxa) |
| `SecondaryButton` | Transparent, vora 1 px `borderStrong`, text `textPrimary` 14 px 500, alçada 46-52, radi 14, icona opcional a l'esquerra |
| `IconCircleButton` | 44 px, rodó, fons `surfaceHigh`, icona 20 px `textPrimary` |
| `TopicPill` | Píndola amb fons del tema al 14 % i text del tema, 13 px 600 |
| `StreakPill` | Fons `pill`, flama 18 px `accent`, text 14 px 600 |
| `ProgressBar` | Fons `border`, part plena `accent` o color del tema, radi complet |
| `QuizOption` | Vegeu estats a `02-pantalles.md` |
| `FeedbackBox` | Radi 16, padding 14, fons `success`/`error` al 10 %, icona 22 px i text 14 px |
| `SectionTitle` | Inter 12 px 600, majúscules, espaiat 0,06 em, `textMuted` |
| `WeekRow` | 7 cercles de 28-30 px en graella; complet `accent` + ✓, futur vora discontínua |
| `BottomNav` | Vegeu `02-pantalles.md` |

## Tema de Flutter (punt de partida)

```dart
// lib/core/theme/app_colors.dart
import 'package:flutter/material.dart';

abstract final class AppColors {
  static const bg = Color(0xFF101216);
  static const surface = Color(0xFF1A1D23);
  static const surfaceAlt = Color(0xFF1F2229);
  static const surfaceOption = Color(0xFF20232A);
  static const surfaceHigh = Color(0xFF262A32);
  static const pill = Color(0xFF22252C);
  static const border = Color(0xFF2A2E36);
  static const borderStrong = Color(0xFF343843);
  static const divider = Color(0xFF23262D);
  static const textPrimary = Color(0xFFF2F3F5);
  static const textSecondary = Color(0xFFC9CDD6);
  static const textBody = Color(0xFFDDE0E6);
  static const textMuted = Color(0xFFA3A8B3);
  static const textFaint = Color(0xFF8A8F99);
  static const accent = Color(0xFFFF8A3D);
  static const accentSoft = Color(0xFFFFB27A);
  static const onAccent = Color(0xFF101216);
  static const success = Color(0xFF34D399);
  static const error = Color(0xFFF87171);
}
```

Els colors de tema han de venir de `topics.json` (vegeu `04-contingut.md`), no fixats al codi, perquè es puguin afegir temes nous sense tocar l'app.

Fer servir `ThemeData(brightness: Brightness.dark, scaffoldBackgroundColor: AppColors.bg, …)` i un `TextTheme` propi amb els estils de l'escala. Desactivar efectes de Material que no encaixen (ombres, ondulació exagerada); els botons es fan amb widgets propis.

## Icona de l'app

Dues targetes apilades (com el feed): la del darrere gris (`#2A2E36`) girada −10°, la del davant taronja (`#FF8A3D`) girada 6°, amb una "d" geomètrica en `#101216`. Fons `#101216`.

SVG font (1024 × 1024, sense arrodonir: les botigues hi apliquen la màscara):

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <rect width="1024" height="1024" fill="#101216"/>
  <rect x="292" y="232" width="440" height="580" rx="72" fill="#2A2E36" transform="rotate(-10 512 522)"/>
  <g transform="rotate(6 512 522)">
    <rect x="292" y="232" width="440" height="580" rx="72" fill="#FF8A3D"/>
    <circle cx="496" cy="556" r="110" fill="none" stroke="#101216" stroke-width="64"/>
    <path d="M606 346V666" fill="none" stroke="#101216" stroke-width="64" stroke-linecap="round"/>
  </g>
</svg>
```

- Fitxers a `icona/`: `app_icon.svg`, `app_icon_foreground.svg` (el mateix sense el fons, per a la icona adaptativa d'Android) i, si s'han adjuntat, els PNG de 1024 px.
- Generar les icones de totes les mides amb el paquet `flutter_launcher_icons` a partir del PNG de 1024 px. Android adaptativa: fons `#101216` i primer pla `app_icon_foreground.png`.
- Pantalla d'arrencada (splash): fons `#101216` amb la icona al centre (paquet `flutter_native_splash` o configuració nativa).
