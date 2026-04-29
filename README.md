# Mundial 2026 - Seguimiento y Porra

Aplicación web completa para seguir el Mundial de Fútbol 2026 y gestionar porras entre amigos. Sin frameworks, sin backend propio: HTML, CSS y JavaScript vanilla con sincronización en la nube vía JSONBin.

**🌐 Acceso público (GitHub Pages):**
- Seguimiento: https://dlopezm1977-gif.github.io/mundial2026/index.html
- Porra: https://dlopezm1977-gif.github.io/mundial2026/porra2026.html

---

## 📋 Aplicaciones

El proyecto tiene dos ficheros HTML independientes que comparten datos en tiempo real:

### 🏆 `index.html` — Seguimiento de partidos

Pantalla principal del torneo. Muestra los **104 partidos** (72 de grupos + 32 de eliminatorias) organizados por fase y fecha, con horarios en hora España.

**Funcionalidades:**

- **Visualización de partidos**: grupos A–L y todas las rondas KO (16avos, octavos, cuartos, semis, tercer puesto y final)
- **Resultados en tiempo real**: el admin introduce los goles; en partidos KO con empate, también el resultado de penaltis
- **Clasificación de grupos**: se calcula automáticamente con criterios de desempate (puntos, diferencia de goles, goles a favor)
- **Resolución de slots KO**: algoritmo que asigna los 8 mejores terceros clasificados a sus cruces correctos
- **Logos de canales**: DAZN aparece siempre; TVE se marca automáticamente en el partido inaugural, todos los partidos de España, y las semifinales/final/tercer puesto (el admin puede marcarlo en cualquier otro partido)
- **Estadísticas**: partidos jugados, goles totales, media por partido y una tarjeta de progreso con barra visual; antes del inicio del torneo esa tarjeta muestra una cuenta atrás en directo (días, horas, minutos y segundos) hasta el partido inaugural
- **Filtros**: por grupo, por fase (grupos / KO), por fecha o solo partidos en TVE (disponible para todos los usuarios)
- **Exportar/importar CSV**: backup completo de resultados
- **Sincronización**: estado visible en pantalla (cargando / sincronizado / error); fallback a localStorage sin conexión
- **Diseño responsive**: optimizado para móvil con breakpoints a 680 px y 480 px

### 🎯 `porra2026.html` — Sistema de predicciones

Permite a cada participante crear su propia porra y competir en un leaderboard colectivo.

**Funcionalidades:**

- **Predicciones de grupos**: 72 resultados de fase de grupos con filtro por grupo
- **Pronósticos especiales**: campeón (200 pts), subcampeón (150 pts) y ronda máxima del Big 4 — España, Francia, Argentina y Brasil — (100 pts c/u)
- **Predicción de continentes**: se predice cuántos equipos de cada continente llegarán a cada ronda eliminatoria (50 pts por acierto exacto)
- **Bloqueo automático**: la porra se bloquea al enviar; se puede desbloquear y editar hasta el **10 de junio de 2026 a las 23:59 (hora España)**; después queda bloqueada definitivamente
- **Sincronización multiusuario**: varios participantes pueden rellenar su porra a la vez sin conflictos
- **Diseño responsive**: optimizado para móvil, incluyendo el formulario de nombre y la clasificación

**Pestaña Clasificación:**

- **Banner "Rey del día"**: siempre visible en la cabecera, muestra quién sumó más puntos en la última jornada con resultados
- **Sub-pestaña General**: ranking completo con posición, nombre, exactos, especiales y total; medallas 🥇🥈🥉 para el top 3
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

Contraseña: `admin2026`

Con sesión de admin activa se habilitan:
- Editar resultados (clic en el marcador de cualquier partido)
- Marcar/desmarcar emisión en TVE (📺) en partidos no detectados automáticamente
- Exportar e importar datos en CSV
- Resetear todos los datos

Los usuarios sin login pueden ver resultados, clasificaciones, estadísticas y todos los filtros (incluyendo el filtro 📺 TVE), pero no modificar nada.

---

## 🚀 Cómo usar

### Acceso público

Las dos páginas están desplegadas en GitHub Pages y accesibles desde cualquier dispositivo sin instalación:

- https://dlopezm1977-gif.github.io/mundial2026/index.html
- https://dlopezm1977-gif.github.io/mundial2026/porra2026.html

### Desarrollo local

```bash
# Servidor local (necesario para que funcione la API de JSONBin)
python -m http.server 8000
# → http://localhost:8000/index.html
# → http://localhost:8000/porra2026.html
```

---

## 🛠️ Tecnologías

| | |
|---|---|
| Frontend | HTML5 + CSS3 + JavaScript ES6+ (sin frameworks) |
| Gráficas | Chart.js 4.4 (CDN) |
| Almacenamiento compartido | JSONBin (API REST) |
| Persistencia local | localStorage (fallback offline) |
| Banderas | FlagCDN |
| Fuentes | Google Fonts — Bebas Neue, DM Sans, DM Mono |
| Diseño | Tema oscuro, gradientes sutiles, responsive (480 px / 680 px) |
| Despliegue | GitHub Pages |

---

## 🔧 Configuración (JSONBin)

Los datos se sincronizan en dos bins separados:

| | Bin ID |
|---|---|
| Resultados y TVE manual | `69e0e848aaba88219706dc21` |
| Porras de todos los usuarios | `69e107f9aaba882197079212` |

La API key está configurada directamente en el código de cada fichero HTML.

---

## 📊 Estructura de datos

### Resultados (`index.html`)

```json
{
  "1": { "home": 2, "away": 0 },
  "2": { "home": 1, "away": 1, "pen1": 4, "pen2": 3 },
  "tveMatches": { "3": true }
}
```

### Porras (`porra2026.html`)

```json
{
  "nombre_usuario": {
    "displayName": "Nombre Completo",
    "picks": {
      "1": { "h": 2, "a": 0 },
      "2": { "h": 1, "a": 1 }
    },
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
| `index.html` | Seguimiento de partidos y clasificaciones de grupo |
| `porra2026.html` | Sistema de predicciones y leaderboard |
| `mensajes_whatsapp.txt` | Mensajes listos para compartir la porra por WhatsApp |
| `DAZN.png` | Logo DAZN (usado en los match cards) |
| `TVE.png` | Logo TVE (usado en los match cards) |

---

## 📱 Compatibilidad

- **Navegadores**: Chrome, Firefox, Safari, Edge (versiones modernas)
- **Dispositivos**: desktop, tablet y móvil — diseño responsive con breakpoints a 680 px y 480 px
- **Requiere** conexión a internet para sincronización entre usuarios; sin conexión funciona en modo local (localStorage)

---

**¡Disfruta del Mundial 2026! ⚽**
