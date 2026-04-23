# Mundial 2026 - Seguimiento y Porra

Aplicación web completa para seguir el Mundial de Fútbol 2026 y gestionar porras entre amigos. Sin frameworks, sin backend propio: HTML, CSS y JavaScript vanilla con sincronización en la nube vía JSONBin.

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
- **Favoritos**: el admin puede marcar partidos con ⭐ y filtrar por ellos
- **Estadísticas**: partidos jugados, goles totales, media por partido, progreso del torneo
- **Filtros**: por grupo, por fase (grupos / KO) o solo favoritos
- **Exportar/importar CSV**: backup completo de resultados
- **Sincronización**: estado visible en pantalla (cargando / sincronizado / error); fallback a localStorage sin conexión

### 🎯 `porra2026.html` — Sistema de predicciones

Permite a cada participante crear su propia porra y competir en un leaderboard colectivo.

**Funcionalidades:**

- **Predicciones**: 72 resultados de fase de grupos + 4 pronósticos especiales (campeón, subcampeón, ronda máxima de España/Francia/Argentina/Brasil)
- **Leaderboard en tiempo real**: ranking con medallas para los tres primeros, columnas de exactos / parciales / especiales / total
- **Detalle de porra**: al hacer clic en cualquier participante se abre un modal con los 72 partidos, comparando su pronóstico con el resultado real y los puntos obtenidos
- **Bloqueo automático**: la porra se bloquea al enviar; se puede desbloquear y editar hasta el **10 de junio de 2026 a las 23:59 (hora España)**; después queda bloqueada definitivamente
- **Sincronización multiusuario**: varios participantes pueden rellenar su porra a la vez sin conflictos

---

## 🏅 Sistema de puntuación (porra)

| Pronóstico | Puntos |
|---|---|
| Resultado exacto (goles) | 25 |
| Ganador correcto o empate | 10 |
| Resultado incorrecto | 0 |
| **Especiales** | |
| Campeón correcto | 200 |
| Subcampeón correcto | 150 |
| Ronda máxima de cada Big 4 correcta | 100 c/u |

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
- Marcar/desmarcar favoritos (⭐)
- Marcar/desmarcar emisión en TVE (📺)
- Exportar e importar datos en CSV
- Resetear todos los datos

Los usuarios sin login pueden ver resultados, clasificaciones, estadísticas y filtros, pero no modificar nada.

---

## 🚀 Cómo usar

```bash
# Opción A: abrir directamente en el navegador
index.html         # seguimiento del torneo
porra2026.html     # predicciones

# Opción B: servidor local (mejor experiencia)
python -m http.server 8000
# → http://localhost:8000
```

---

## 🛠️ Tecnologías

| | |
|---|---|
| Frontend | HTML5 + CSS3 + JavaScript ES6+ (sin frameworks) |
| Almacenamiento compartido | JSONBin (API REST) |
| Persistencia local | localStorage (fallback offline) |
| Banderas | FlagCDN |
| Fuentes | Google Fonts — Bebas Neue, DM Sans, DM Mono |
| Diseño | Tema oscuro, gradientes sutiles, responsive |

---

## 🔧 Configuración (JSONBin)

Los datos se sincronizan en dos bins separados:

| | Bin ID |
|---|---|
| Resultados, favoritos y TVE | `69e0e848aaba88219706dc21` |
| Porras de todos los usuarios | `69e107f9aaba882197079212` |

La API key está configurada directamente en el código de cada fichero HTML.

---

## 📊 Estructura de datos

### Resultados (`index.html`)

```json
{
  "1": { "home": 2, "away": 0 },
  "2": { "home": 1, "away": 1, "pen1": 4, "pen2": 3 },
  "favoriteMatches": { "1": true },
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
    "locked": true
  }
}
```

---

## 📱 Compatibilidad

- Navegadores modernos: Chrome, Firefox, Safari, Edge
- Dispositivos: desktop, tablet y móvil
- Requiere conexión a internet para sincronización entre usuarios

---

**¡Disfruta del Mundial 2026! ⚽**
