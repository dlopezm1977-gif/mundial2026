# Mundial 2026 - Seguimiento y Porra

Aplicación web completa para seguir el Mundial de Fútbol 2026 y gestionar porras entre amigos. Sin frameworks, sin backend propio: HTML, CSS y JavaScript vanilla con sincronización en la nube vía Firebase Realtime Database. Instalable como app en móvil (PWA).

**🌐 Acceso público (GitHub Pages):**
- Seguimiento: https://dlopezm1977-gif.github.io/mundial2026/index.html
- Porra: https://dlopezm1977-gif.github.io/mundial2026/porra2026.html

---

## 📋 Aplicaciones

El proyecto tiene dos ficheros HTML independientes que comparten datos en tiempo real:

### 🏆 `index.html` — Seguimiento de partidos

Pantalla principal del torneo. Muestra los **104 partidos** (72 de grupos + 32 de eliminatorias) organizados por fase y fecha, con horarios en hora España.

Organizada en cuatro pestañas:

**Partidos**
- Muestra los 104 partidos (72 de grupos + 32 de eliminatorias) ordenados por fase y fecha, con horarios en hora España
- Dentro de cada día los partidos se ordenan por hora España de menor a mayor
- Al entrar, el filtro de fecha se activa automáticamente en el día en curso (hora Madrid); el "día" empieza a las 8:00h, por lo que antes de esa hora se muestra el día anterior. Si no hay partidos ese día, muestra todos
- Los horarios de madrugada (0–7h España) muestran "+1" indicando que el partido pertenece al día siguiente respecto a la fecha del calendario
- El admin introduce los goles directamente; en partidos KO con empate se añade el resultado de penaltis
- Logos de canal: DAZN siempre visible; TVE se activa automáticamente en el partido inaugural, todos los de España, y semis/final/tercer puesto (el admin puede marcarlo manualmente en cualquier otro)
- Estadísticas: partidos jugados, goles totales, media por partido y barra de progreso; antes del inicio muestra cuenta atrás en directo hasta el partido inaugural
- Filtros por grupo, por fase (grupos / KO), por fecha o solo partidos en TVE
- **Indicador de pronósticos**: cada tarjeta de partido incluye una barra de color en la parte inferior con el porcentaje de participantes de la porra que pronosticaron victoria local / empate / victoria visitante; antes del partido los colores son azul / gris / naranja; una vez jugado, el segmento acertado se pone en verde y los erróneos en rojo. Los picks se leen directamente del nodo `/porras` de Firebase (solo porras con `locked: true`); los picks se almacenan internamente como array indexado por ID de partido
- **Modal de pronósticos**: al pulsar el marcador de cualquier partido (o la barra de picks), se abre un modal con todos los pronósticos agrupados: en partidos acabados por exacto / resultado correcto / fallo (ordenados por marcador asc dentro de cada grupo); en partidos pendientes o en curso agrupados por victoria local / empate / victoria visitante y ordenados por marcador asc (1-0, 2-0, 2-1, 3-0…). Funciona en escritorio y móvil

**Clasificación**
- Tabla por grupo calculada automáticamente con criterios de desempate (puntos, diferencia de goles, goles a favor)
- Resalta visualmente quién clasifica directo (1.º y 2.º) y quién puede ser mejor tercero

**Cuadro KO**
- Cuadro visual de eliminatorias de izquierda a derecha: 16avos → Octavos → Cuartos → Semifinales → Final → Campeón
- Conectores en forma de corchete que muestran el camino de cada equipo a lo largo de las rondas
- Las tarjetas muestran equipos (con bandera), marcador, ganador resaltado y eliminado en gris
- El campeón se proclama en una caja dorada al final del cuadro en cuanto se disputa la final
- Partido por el 3.er y 4.º puesto mostrado por separado bajo el cuadro principal
- El admin puede editar resultados directamente desde el cuadro haciendo clic en cualquier partido
- Algoritmo que asigna automáticamente los 8 mejores terceros a sus slots KO correctos

**Datos CSV**
- Exportar/importar backup completo de resultados

**Álbum** *(solo visible para admin)*
- Tracker del álbum Panini WC2026: 980 cromos — 48 selecciones × 20 (XX01–XX20) + FWC00–FWC19
- Click en un cromo para ciclar su estado: ❌ falta (rojo) → ✅ tengo (verde) → 🔄 repe (azul)
- Cromos especiales (#01 y #13 de cada selección, todos los FWC) marcados con ★ y borde diferenciado
- Buscador en tiempo real: claves con cero (`ESP01`, `FWC05`) garantizan unicidad en la búsqueda
- Filtro por estado: **Todos / Tengo / Faltas / Repes** — combinable con el buscador
- Datos persistidos en Firebase nodo `/album` (requiere auth de admin para leer y escribir)
- Responsive: 1 equipo por fila en móvil con tiles de mínimo 44 px para zona de toque cómoda

**General**
- Sincronización con estado visible (cargando / sincronizado / error); fallback a localStorage sin conexión
- Diseño responsive optimizado para móvil con breakpoints a 680 px y 480 px
- Botón 📲 Instalar en el header con instrucciones paso a paso para instalar la app en Android e iOS
- Botón 🎯 Porra en el header (morado) para navegar directamente a la página de predicciones

### 🎯 `porra2026.html` — Sistema de predicciones

Permite a cada participante crear su propia porra y competir en un leaderboard colectivo.

**Flujo del formulario (en orden):**

1. ⚽ **Resultados Fase de Grupos** — 72 partidos con filtro por grupo
2. 🔮 **Simulador de eliminatorias** — calcula los cruces del cuadro KO a partir de los resultados de grupos; el usuario selecciona el ganador tocando directamente la tarjeta del equipo (con bandera), ronda a ronda; al terminar rellena automáticamente campeón, subcampeón, Big 4 y equipos por continente (siempre editable antes de enviar)
3. 🏆 **Pronósticos especiales** — campeón (200 pts), subcampeón (150 pts) y ronda máxima del Big 4 — España, Francia, Argentina y Brasil — (100 pts c/u)
4. 🌍 **Equipos por continente** — cuántos equipos de cada continente llegan a cada ronda eliminatoria (50 pts por acierto exacto)

**Otras funcionalidades:**

- **Grupos de participantes**: cada participante puede pertenecer a **varios grupos a la vez** (trabajo, familia, amigos…); el admin gestiona los grupos desde el panel de administración (añadir/quitar con chips); el propio usuario también puede añadirse a un grupo desde su formulario
- **Bloqueo automático**: la porra se bloquea al enviar; se puede desbloquear y editar hasta el **10 de junio de 2026 a las 23:59 (hora España)**; después queda bloqueada definitivamente
- **Registro cerrado tras la fecha límite**: una vez superada la fecha límite no se pueden crear nuevos participantes; solo es posible consultar las porras ya enviadas
- **Confirmación de envío**: al enviar (nueva porra o actualización), el formulario se cierra y aparece un mensaje de éxito con el nombre del participante; el campo de nombre queda libre para que otra persona pueda registrar su porra a continuación
- **Sincronización multiusuario**: varios participantes pueden rellenar su porra a la vez sin conflictos
- **Diseño responsive**: optimizado para móvil, incluyendo el formulario de nombre, la clasificación y el simulador
- Botón 📲 Instalar en el header con instrucciones paso a paso para instalar la app en Android e iOS
- Botón ⚽ Resultados en el header (morado) para navegar directamente a la página de seguimiento

**Pestañas** (la clasificación es la primera y activa por defecto al entrar):

**Pestaña Clasificación:**

- **Banner "Rey del día / Rey de ronda"**: siempre visible en la cabecera. Durante la fase de grupos muestra quién sumó más puntos en la última jornada con resultados. En cuanto empieza una ronda eliminatoria (primer partido jugado), el banner pasa a mostrar el "Rey de 16avos / Octavos / Cuartos / Semis / Final" — calculado sobre las predicciones de continentes de esa ronda (respeta el filtro de grupo activo)
- **Filtro de grupo**: botones 🌐 Global + uno por cada grupo creado; al activar un grupo, el ranking, el histórico de jornadas y la gráfica de evolución se filtran a ese grupo
- **Sub-pestaña General**: ranking completo con posición, nombre (etiqueta de grupo visible en vista Global), exactos, especiales y total; medallas 🥇🥈🥉 para el top 3; franja de color en el borde izquierdo de cada fila: verde = porra bloqueada (enviada), rojo = porra sin bloquear (pendiente de enviar)
- **Sub-pestaña Por jornada**: tabla histórica con el top 3 de cada día (fase de grupos) y de cada ronda eliminatoria. Las rondas KO aparecen en la parte superior de la tabla (más recientes) y se activan en cuanto se juega el primer partido de esa ronda. El rey de cada ronda KO se determina por los puntos obtenidos en las predicciones de continentes de esa ronda (50 pts × 5 continentes = 250 pts máx por ronda)
- **Sub-pestaña Evolución**: gráfica de líneas (Chart.js) con la evolución de puntos acumulados por jugador a lo largo del torneo; leyenda interactiva para ocultar/mostrar participantes
- **Detalle de porra**: clic en cualquier participante abre un modal con los 72 partidos y los pronósticos especiales comparados con el resultado real; la cabecera de la tabla (PARTIDO / TU PRONÓSTICO / RESULTADO REAL / PUNTOS) es sticky y permanece visible al hacer scroll; la tabla usa `table-layout:fixed` con proporciones de columna definidas para evitar desbordamiento lateral en móvil

---

## 🏅 Sistema de puntuación (porra)

### Partidos de grupos

| Pronóstico | Puntos |
|---|---|
| Resultado exacto (goles) | 25 |
| Ganador correcto o empate | 10 |
| Resultado incorrecto | 0 |

### Especiales

| Pronóstico | Puntos |
|---|---|
| Campeón correcto | 200 |
| Subcampeón correcto | 150 |
| Ronda máxima correcta (por cada equipo del Big 4) — se evalúa solo tras la Final | 100 |

### Predicción de continentes

Se predice cuántos equipos de cada continente llegan a cada ronda eliminatoria. **50 puntos** por cada combinación continente/ronda acertada exactamente.

| Continente | Equipos | Icono |
|---|---|---|
| 🏰 Europa | 16 | República Checa, Bosnia y Herzegovina, Suiza, Escocia, Turquía, Alemania, Países Bajos, Suecia, Bélgica, España, Francia, Noruega, Austria, Portugal, Inglaterra, Croacia |
| 🏯 Asia | 8 | Corea del Sur, Qatar, Japón, Irán, Arabia Saudita, Irak, Jordania, Uzbekistán |
| 🗽 América | 12 | México, Canadá, Haití, Estados Unidos, Paraguay, Curazao, Ecuador, Uruguay, Argentina, Colombia, Panamá, Brasil |
| 🦁 África | 10 | Sudáfrica, Marruecos, Costa de Marfil, Túnez, Egipto, Cabo Verde, Senegal, Argelia, RD de Congo, Ghana |
| 🦘 Oceanía | 2 | Australia, Nueva Zelanda |

**Máximos por ronda**: 16avos=32, Octavos=16, Cuartos=8, Semifinales=4, Final=2. La tabla muestra la suma actual por ronda en tiempo real (verde = exacto, rojo = excedido). No se puede enviar la porra si alguna ronda supera su máximo.

---

## 🏟️ Estructura del torneo

- **48 equipos** en **12 grupos** (A–L), 4 por grupo
- **72 partidos** de fase de grupos
- **32 partidos** de eliminatorias
- **Sedes**: Estados Unidos, México y Canadá
- **Fechas**: 11 de junio – 19 de julio de 2026

### 🌍 Grupos

| Grupo | Equipos |
|---|---|
| A | México, Sudáfrica, Corea del Sur, República Checa |
| B | Canadá, Bosnia y Herzegovina, Qatar, Suiza |
| C | Brasil, Marruecos, Haití, Escocia |
| D | Estados Unidos, Paraguay, Australia, Turquía |
| E | Alemania, Curazao, Costa de Marfil, Ecuador |
| F | Países Bajos, Japón, Suecia, Túnez |
| G | Bélgica, Egipto, Irán, Nueva Zelanda |
| H | España, Cabo Verde, Arabia Saudita, Uruguay |
| I | Francia, Senegal, Irak, Noruega |
| J | Argentina, Argelia, Austria, Jordania |
| K | Portugal, RD Congo, Uzbekistán, Colombia |
| L | Inglaterra, Croacia, Ghana, Panamá |

---

## 🔐 Sistema de admin

El admin se autentica mediante **Firebase Authentication (Email/Password)**. No hay contraseñas hardcodeadas en el código: el usuario admin se crea y gestiona desde **Firebase Console → Authentication → Users**.

Para acceder: pulsa el botón 🔐 Admin en el header → se abre un modal con email y contraseña → Firebase valida las credenciales y devuelve un token de sesión. La sesión se mantiene automáticamente entre recargas (Firebase SDK gestiona el token internamente).

### `index.html`

Con sesión de admin activa se habilitan:
- Editar resultados (clic en el marcador de cualquier partido o desde el Cuadro KO)
- Marcar/desmarcar emisión en TVE (📺) en partidos no detectados automáticamente
- Exportar e importar datos en CSV
- Resetear todos los datos

### `porra2026.html`

Con sesión de admin activa se habilita:
- **Gestionar grupos**: asignar múltiples grupos a cada participante desde un panel con chips por grupo (✕ para quitar) e input con autocompletado para añadir nuevos; cada acción se guarda en Firebase al instante

Los usuarios sin login pueden ver resultados, clasificaciones, estadísticas y todos los filtros, pero no modificar nada.

---

## 📱 PWA — Instalación en móvil

Ambas páginas son instalables como app nativa gracias al soporte PWA (manifest + service worker).

### Android (Chrome)
1. Abre la URL en Chrome
2. Pulsa el menú ⋮ → "Añadir a pantalla de inicio"
3. Confirma — el icono aparece en el launcher

### iOS (Safari)
1. Abre la URL en Safari
2. Toca ⬆️ Compartir en la barra inferior
3. Desliza y toca "Añadir a pantalla de inicio"
4. Confirma — el icono aparece en el inicio

> En algunos dispositivos Android Chrome muestra el banner de instalación automáticamente.
> En iOS solo funciona desde Safari; Chrome y otros navegadores no permiten instalar la app.

El service worker (`sw.js`) cachea los ficheros principales para permitir uso offline básico.

---

## 🚀 Cómo usar

### Acceso público

Las dos páginas están desplegadas en GitHub Pages y accesibles desde cualquier dispositivo sin instalación:

- https://dlopezm1977-gif.github.io/mundial2026/index.html
- https://dlopezm1977-gif.github.io/mundial2026/porra2026.html

### Desarrollo local

```bash
# Servidor local (necesario para evitar restricciones CORS)
python -m http.server 8080
# → http://localhost:8080/index.html
# → http://localhost:8080/porra2026.html
```

---

## 🛠️ Tecnologías

| | |
|---|---|
| Frontend | HTML5 + CSS3 + JavaScript ES6+ (sin frameworks) |
| Gráficas | Chart.js 4.4 (CDN) |
| Almacenamiento compartido | Firebase Realtime Database (REST API) |
| Autenticación | Firebase Authentication (Email/Password) |
| Persistencia local | localStorage (fallback offline) |
| PWA | Web App Manifest + Service Worker (caché offline) |
| Banderas | FlagCDN |
| Fuentes | Google Fonts — Bebas Neue, DM Sans, DM Mono |
| Diseño | Tema oscuro, gradientes sutiles, responsive (480 px / 680 px) |
| Despliegue | GitHub Pages |

---

## 🔧 Configuración (Firebase)

Los datos se sincronizan en Firebase Realtime Database en tres nodos principales:

| Nodo | URL | Contenido |
|---|---|---|
| `/results` | `…/results.json` | Resultados de partidos (marcador, flag `live`, penaltis) y marcas TVE manual |
| `/porras` | `…/porras.json` | Porras de todos los usuarios |
| `/scorers` | `…/scorers.json` | Tabla de goleadores sincronizada automáticamente desde football-data.org |
| `/album` | `…/album.json` | Estado del álbum de cromos (solo admin): clave `ESP01`…`ESP20`, `FWC00`…`FWC19` → 0/1/2 |

**URL base:** `https://mundial2026-53420-default-rtdb.europe-west1.firebasedatabase.app`

La URL y la configuración del SDK están en el código de cada fichero HTML. La seguridad se controla mediante Firebase Auth y las reglas de la base de datos:

```json
{
  "rules": {
    "results": {
      ".read": true,
      ".write": "auth != null"
    },
    "porras": {
      ".read": true,
      ".write": true
    },
    "scorers": {
      ".read": true,
      ".write": "auth != null"
    },
    "album": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

- `/results` — lectura pública; escritura solo para el admin autenticado (Firebase Auth) o el script de sync
- `/porras` — lectura y escritura públicas (los usuarios guardan su porra sin login)
- `/scorers` — lectura pública; escritura solo para el admin / script de sync
- `/album` — lectura y escritura solo para el admin (datos privados del tracker de cromos)

El admin se gestiona desde Firebase Console → Authentication → Users, sin contraseñas hardcodeadas en el código.

---

## 📢 Banner de avisos

Ambas páginas incluyen un banner configurable que aparece entre el header y las pestañas. Sirve para avisar a los usuarios de incidencias, mantenimiento o cualquier mensaje puntual sin necesidad de tocar el código de la app.

### Configuración manual

Edita el objeto `BANNER_CONFIG` en cada fichero HTML (sección `// ── BANNER CONFIG`, justo debajo de `// ── FIREBASE CONFIG`):

```javascript
const BANNER_CONFIG = {
  visible: true,       // true = mostrar | false = ocultar
  type: 'warning',     // 'info' | 'warning' | 'error' | 'success'
  message: 'Estamos actualizando los datos, vuelve en unos minutos.',
  dismissible: false,  // true = el usuario puede cerrarlo con la ✕
  ticker: true,        // true = texto en movimiento estilo rótulo televisivo
};
```

| Propiedad | Valores | Descripción |
|---|---|---|
| `visible` | `true` / `false` | Muestra u oculta el banner |
| `type` | `'info'` · `'warning'` · `'error'` · `'success'` | Color del banner |
| `dismissible` | `true` / `false` | Si el usuario puede cerrarlo con la ✕ |
| `ticker` | `true` / `false` | Texto estático o desplazándose en bucle |

| `type` | Color | Uso recomendado |
|---|---|---|
| `warning` | Amarillo | Avisos generales o mantenimiento |
| `error` | Rojo | Problemas críticos o sin conexión |
| `info` | Azul | Información neutral |
| `success` | Verde | Confirmaciones o buenas noticias |

### Comportamiento automático

Si `loadResults()` / `loadAll()` falla al conectar con Firebase y **no hay banner manual configurado** (`visible: false` o `message` vacío), el banner de error aparece automáticamente con el mensaje "Sin conexión con el servidor de datos…".

Si ya hay un banner manual activo, este tiene prioridad y el automático no lo sobrescribe.

Cuando la conexión se recupera (al pulsar **↺ Actualizar**), el estado vuelve al definido en `BANNER_CONFIG`.

---

## 📊 Estructura de datos

### Resultados — nodo `/results`

```json
{
  "1": { "home": 2, "away": 0 },
  "2": { "home": 1, "away": 1, "pen1": 4, "pen2": 3 },
  "5": { "home": 1, "away": 0, "live": true },
  "tveMatches": { "3": true }
}
```

- El campo `live: true` indica que el partido está en curso (se elimina cuando termina)
- `pen1` / `pen2` solo aparecen en partidos KO que llegan a penaltis

### Porras — nodo `/porras`

```json
{
  "nombre_usuario": {
    "displayName": "Nombre Completo",
    "picks": {
      "1": { "h": 2, "a": 0 },
      "2": { "h": 1, "a": 1 }
    },
    "groups": ["Trabajo", "Amigos"],
    "champion": "Brasil",
    "runnerup": "Argentina",
    "big4": {
      "España": "Cuartos de Final",
      "Francia": "Semifinales",
      "Argentina": "Final",
      "Brasil": "Campeón"
    },
    "continentPicks": {
      "Europa":  { "16avos de Final": 12, "Octavos de Final": 6, "Cuartos de Final": 3, "Semifinales": 2, "Final": 1 },
      "Asia":    { "16avos de Final": 5,  "Octavos de Final": 3, "Cuartos de Final": 1, "Semifinales": 0, "Final": 0 },
      "América": { "16avos de Final": 10, "Octavos de Final": 5, "Cuartos de Final": 3, "Semifinales": 2, "Final": 1 },
      "África":  { "16avos de Final": 4,  "Octavos de Final": 2, "Cuartos de Final": 1, "Semifinales": 0, "Final": 0 },
      "Oceanía": { "16avos de Final": 1,  "Octavos de Final": 0, "Cuartos de Final": 0, "Semifinales": 0, "Final": 0 }
    },
    "locked": true
  }
}
```

---

## 📁 Ficheros del proyecto

| Fichero | Descripción |
|---|---|
| `index.html` | Seguimiento de partidos, clasificaciones de grupo y cuadro de eliminatorias |
| `porra2026.html` | Sistema de predicciones y leaderboard |
| `manifest.json` | Manifiesto PWA (nombre, icono, colores, modo standalone) |
| `sw.js` | Service worker — caché offline de los ficheros principales (versión `v29`); cachea: `index.html`, `porra2026.html`, `manifest.json`, `icons/icon-192.png`, `assets/img/DAZN.png`, `assets/img/TVE.png`; la versión se incrementa en cada deploy para forzar recarga en móvil |
| `scripts/sync-results.js` | Script Node.js ejecutado por GitHub Actions cada 5 min; obtiene resultados de football-data.org y los escribe en Firebase; también sincroniza la tabla de goleadores (`/scorers`) |
| `.github/workflows/sync-results.yml` | Workflow de GitHub Actions disparado externamente (cron-job.org) cada 5 min para ejecutar el script de sincronización |
| `icons/icon-192.png` | Icono de la app (192×192 px) para launcher y apple-touch-icon |
| `assets/img/DAZN.png` | Logo DAZN (usado en los match cards) |
| `assets/img/TVE.png` | Logo TVE (usado en los match cards) |
| `docs/mensajes_whatsapp.txt` | Mensajes listos para compartir la porra por WhatsApp |

---

## ⚙️ Sincronización automática de resultados

Los resultados y goleadores se sincronizan automáticamente con **football-data.org** cada 5 minutos mientras dura el torneo (hasta el 20 de julio de 2026).

### Arquitectura

1. **[cron-job.org](https://cron-job.org)** dispara el endpoint `workflow_dispatch` de GitHub Actions cada 5 min (servicio externo gratuito, el cron nativo de GitHub Actions tiene granularidad mínima de 5 min y suele retrasarse)
2. **GitHub Actions** (`.github/workflows/sync-results.yml`) ejecuta `scripts/sync-results.js` con Node.js 24
3. El script consulta `football-data.org/v4/competitions/WC/matches` y `…/scorers`
4. Solo escribe en Firebase si hay cambios (PATCH para resultados, PUT para goleadores)

### Limitaciones de la API gratuita

- football-data.org (plan gratuito): devuelve marcadores y goleadores, pero **no el desglose gol a gol** (minuto, anotador, tipo); la función `syncGoals` existe en el código pero está desactivada
- El sync cubre solo la **fase de grupos** (partidos 1–72); los KO se sincronizan cuando football-data.org los actualice con los equipos reales

### Secretos necesarios (GitHub → Settings → Secrets)

| Secret | Uso |
|---|---|
| `FOOTBALL_DATA_TOKEN` | Token de la API de football-data.org |
| `FIREBASE_ADMIN_EMAIL` | Email del usuario admin en Firebase Authentication |
| `FIREBASE_ADMIN_PASSWORD` | Contraseña del usuario admin |

---

## 📱 Compatibilidad

- **Navegadores**: Chrome, Firefox, Safari, Edge (versiones modernas)
- **Dispositivos**: desktop, tablet y móvil — diseño responsive con breakpoints a 680 px y 480 px
- **Instalable como app** en Android (Chrome) e iOS (Safari) mediante PWA
- **Requiere** conexión a internet para sincronización entre usuarios; sin conexión funciona en modo local (localStorage)

---

**¡Disfruta del Mundial 2026! ⚽**
