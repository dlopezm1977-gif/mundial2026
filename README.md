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
- El admin introduce los goles directamente; en partidos KO con empate se añade el resultado de penaltis
- Logos de canal: DAZN siempre visible; TVE se activa automáticamente en el partido inaugural, todos los de España, y semis/final/tercer puesto (el admin puede marcarlo manualmente en cualquier otro)
- Estadísticas: partidos jugados, goles totales, media por partido y barra de progreso; antes del inicio muestra cuenta atrás en directo hasta el partido inaugural
- Filtros por grupo, por fase (grupos / KO), por fecha o solo partidos en TVE

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
- **Confirmación de envío**: al enviar (nueva porra o actualización), el formulario se cierra y aparece un mensaje de éxito con el nombre del participante; el campo de nombre queda libre para que otra persona pueda registrar su porra a continuación
- **Sincronización multiusuario**: varios participantes pueden rellenar su porra a la vez sin conflictos
- **Diseño responsive**: optimizado para móvil, incluyendo el formulario de nombre, la clasificación y el simulador
- Botón 📲 Instalar en el header con instrucciones paso a paso para instalar la app en Android e iOS
- Botón ⚽ Resultados en el header (morado) para navegar directamente a la página de seguimiento

**Pestaña Clasificación:**

- **Banner "Rey del día"**: siempre visible en la cabecera, muestra quién sumó más puntos en la última jornada con resultados (respeta el filtro de grupo activo)
- **Filtro de grupo**: botones 🌐 Global + uno por cada grupo creado; al activar un grupo, el ranking, el histórico de jornadas y la gráfica de evolución se filtran a ese grupo
- **Sub-pestaña General**: ranking completo con posición, nombre (etiqueta de grupo visible en vista Global), exactos, especiales y total; medallas 🥇🥈🥉 para el top 3; franja de color en el borde izquierdo de cada fila: verde = porra bloqueada (enviada), rojo = porra sin bloquear (pendiente de enviar)
- **Sub-pestaña Por jornada**: tabla histórica con el top 3 de cada día jugado
- **Sub-pestaña Evolución**: gráfica de líneas (Chart.js) con la evolución de puntos acumulados por jugador a lo largo del torneo; leyenda interactiva para ocultar/mostrar participantes
- **Detalle de porra**: clic en cualquier participante abre un modal con los 72 partidos y los pronósticos especiales comparados con el resultado real

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
| Ronda máxima correcta (por cada equipo del Big 4) | 100 |

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

Los datos se sincronizan en Firebase Realtime Database en dos nodos separados:

| Nodo | URL | Contenido |
|---|---|---|
| `/results` | `…/results.json` | Resultados de partidos y marcas TVE manual |
| `/porras` | `…/porras.json` | Porras de todos los usuarios |

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
    }
  }
}
```

- `/results` — lectura pública; escritura solo para el admin autenticado (Firebase Auth)
- `/porras` — lectura y escritura públicas (los usuarios guardan su porra sin login)

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
  "tveMatches": { "3": true }
}
```

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
| `sw.js` | Service worker — caché offline de los ficheros principales |
| `icons/icon-192.png` | Icono de la app (192×192 px) para launcher y apple-touch-icon |
| `assets/img/DAZN.png` | Logo DAZN (usado en los match cards) |
| `assets/img/TVE.png` | Logo TVE (usado en los match cards) |
| `docs/mensajes_whatsapp.txt` | Mensajes listos para compartir la porra por WhatsApp |

---

## 📱 Compatibilidad

- **Navegadores**: Chrome, Firefox, Safari, Edge (versiones modernas)
- **Dispositivos**: desktop, tablet y móvil — diseño responsive con breakpoints a 680 px y 480 px
- **Instalable como app** en Android (Chrome) e iOS (Safari) mediante PWA
- **Requiere** conexión a internet para sincronización entre usuarios; sin conexión funciona en modo local (localStorage)

---

**¡Disfruta del Mundial 2026! ⚽**
