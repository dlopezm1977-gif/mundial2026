# Mundial 2026 - Seguimiento y Porra

Una aplicación web completa para el seguimiento del Mundial de Fútbol 2026 y gestión de porras entre amigos.

## 📋 Descripción del Proyecto

Este proyecto consta de dos aplicaciones web principales:

### 🏆 Seguimiento de Partidos (`index.html`)
- **Visualización de partidos**: Muestra todos los partidos del Mundial 2026 organizados por fases
- **Ingreso de resultados**: Permite introducir resultados de partidos con posibilidad de penaltis
- **Clasificación de grupos**: Calcula automáticamente las posiciones de cada grupo
- **Estadísticas**: Muestra estadísticas generales del torneo (partidos jugados, goles, etc.)
- **Exportación/Importación CSV**: Permite guardar y cargar datos en formato CSV
- **Sincronización en tiempo real**: Usa JSONBin para almacenamiento compartido

### 🎯 Porra Mundial (`porra2026.html`)
- **Pronósticos de partidos**: Permite predecir resultados de los 72 partidos de fase de grupos
- **Pronósticos especiales**:
  - Campeón del Mundial (200 puntos)
  - Subcampeón (150 puntos)
  - Ronda máxima de España, Francia, Argentina y Brasil (100 puntos cada uno)
- **Sistema de puntuación**:
  - Resultado exacto: 25 puntos
  - Ganador/empate correcto: 10 puntos
- **Clasificación en tiempo real**: Leaderboard con puntuaciones actualizadas
- **Bloqueo de porras**: Una vez enviada, la porra se bloquea hasta el 10 de junio de 2026

## 🏟️ Estructura del Torneo

- **48 equipos** divididos en **12 grupos** (A-L)
- **72 partidos** de fase de grupos
- **Eliminatorias**: 16avos, Octavos, Cuartos, Semifinales, Final y Tercer Puesto
- **Sedes**: Estados Unidos, México y Canadá

## 🛠️ Tecnologías Utilizadas

- **HTML5** y **CSS3** puro (sin frameworks)
- **JavaScript** vanilla (ES6+)
- **JSONBin** para almacenamiento remoto
- **Google Fonts** (Bebas Neue, DM Sans, DM Mono)
- **FlagCDN** para banderas de países

## 🎨 Características de Diseño

- **Tema oscuro** moderno con gradientes sutiles
- **Tipografía** especializada para títulos deportivos
- **Interfaz responsive** optimizada para móviles
- **Animaciones sutiles** y transiciones suaves
- **Iconografía** con emojis y símbolos deportivos

## 📊 Funcionalidades Técnicas

### Seguimiento de Partidos
- **Cálculo automático de clasificaciones** basado en resultados
- **Resolución de slots KO**: Algoritmo complejo para determinar equipos clasificados
- **Soporte para penaltis** en partidos de eliminación
- **Validación de datos** y manejo de errores

### Sistema de Porras
- **Motor de puntuación** automático
- **Caché inteligente** para optimizar cálculos
- **Sincronización multiusuario** segura
- **Plazos de edición** con bloqueo automático

## 🚀 Instalación y Uso

1. **Clona o descarga** los archivos del proyecto
2. **Abre `index.html`** en un navegador web moderno
3. **Para la porra**, abre `porra2026.html` en otra pestaña
4. **Los datos se sincronizan automáticamente** entre usuarios

## 🔧 Configuración

### JSONBin (Almacenamiento)
- **Bin ID para resultados**: `69e0e848aaba88219706dc21`
- **Bin ID para porras**: `69e107f9aaba882197079212`
- **API Key**: Configurada en el código (privada)

### Fechas Importantes
- **Inicio del torneo**: 11 de junio de 2026
- **Final del torneo**: 19 de julio de 2026
- **Plazo para enviar porras**: Hasta el 10 de junio de 2026

## 📈 Estructura de Datos

### Resultados de Partidos
```json
{
  "id_partido": {
    "home": 2,
    "away": 1,
    "pen1": 4,  // opcional para penaltis
    "pen2": 3   // opcional para penaltis
  }
}
```

### Porra de Usuario
```json
{
  "nombre_usuario": {
    "displayName": "Nombre Completo",
    "picks": {
      "1": {"h": 2, "a": 0},
      "2": {"h": 1, "a": 1}
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

## 🎯 Sistema de Puntuación

### Partidos de Grupos
- **Resultado exacto**: 25 puntos
- **Ganador correcto o empate**: 10 puntos
- **Resultado incorrecto**: 0 puntos

### Pronósticos Especiales
- **Campeón correcto**: 200 puntos
- **Subcampeón correcto**: 150 puntos
- **Ronda correcta de Big 4**: 100 puntos cada uno

## 🌍 Equipos Participantes

**Grupo A**: México, Sudáfrica, Corea del Sur, República Checa
**Grupo B**: Canadá, Bosnia y Herzegovina, Qatar, Suiza
**Grupo C**: Brasil, Marruecos, Haití, Escocia
**Grupo D**: Estados Unidos, Paraguay, Australia, Turquía
**Grupo E**: Alemania, Curazao, Costa de Marfil, Ecuador
**Grupo F**: Países Bajos, Japón, Suecia, Túnez
**Grupo G**: Bélgica, Egipto, Irán, Nueva Zelanda
**Grupo H**: España, Cabo Verde, Arabia Saudita, Uruguay
**Grupo I**: Francia, Senegal, Irak, Noruega
**Grupo J**: Argentina, Argelia, Austria, Jordania
**Grupo K**: Portugal, RD de Congo, Uzbekistán, Colombia
**Grupo L**: Inglaterra, Croacia, Ghana, Panamá

## 📱 Compatibilidad

- **Navegadores modernos**: Chrome, Firefox, Safari, Edge
- **Dispositivos**: Desktop, tablet y móvil
- **Conexión**: Requiere internet para sincronización

## 🔒 Seguridad y Privacidad

- **Datos almacenados externamente** en JSONBin
- **Sin recopilación de datos personales** (solo nombres de usuario voluntarios)
- **Sincronización en tiempo real** entre participantes
- **Bloqueo automático** de porras después del plazo

## 🤝 Contribución

Este proyecto fue desarrollado para uso personal y entre amigos. Para modificaciones:

1. **Edita los archivos HTML** directamente
2. **Modifica las constantes** de configuración según necesites
3. **Prueba en múltiples navegadores** antes de compartir

## 📄 Licencia

Proyecto personal - uso libre para fines no comerciales.

---

**¡Disfruta del Mundial 2026! ⚽🏆**</content>
<parameter name="filePath">c:\Users\david.lopez.martinez\mundial2026\README.md