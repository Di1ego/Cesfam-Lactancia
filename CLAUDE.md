# Web de apoyo a la Clínica de Lactancia Materna (CLAC) — CESFAM Arauco

## Contexto
Intervención de pasantía clínica APS (Nutrición y Dietética, Universidad de Chile).
Página web a la que llegan embarazadas y madres de lactantes desde el WhatsApp de la
Clínica de Lactancia (CLAC) del CESFAM Arauco.

## Qué debe hacer la página
1. **Inicio**: qué es la página + aviso breve: "Esta página entrega orientación y no reemplaza la atención de salud."
2. **Cómo agendar hora en CLAC**: horarios, requisitos y botón a WhatsApp.
3. **Registro**: la usuaria indica si está embarazada (fecha probable de parto, FPP) o si tiene un bebé (fecha de nacimiento). Nombre opcional, solo para saludarla.
4. **Checklist de síntomas**: chips seleccionables, en lenguaje simple.
5. **Resultado**:
   - Si marca algún síntoma de alerta → pantalla que recomienda pedir hora prioritaria en CLAC, con botón a WhatsApp y mensaje prellenado.
   - Si no marca alertas → pasa directo al camino.
6. **Camino por etapas** (estilo juego: ruta horizontal en zigzag con nodos, como un mapa de niveles): embarazo y ciclo vital del bebé. La etapa actual se calcula desde las fechas y se destaca. Cada nodo abre un desplegable con contenido basado en guías MINSAL.

## Reglas clínicas (no negociables)
- No escribas contenido clínico propio. Todo texto de salud vive en `src/content/` y lo redacta y valida el equipo. Si falta contenido, usa el marcador `[CONTENIDO PENDIENTE DE VALIDACIÓN]`.
- Qué síntomas generan alerta se define solo en `src/content/sintomas.json` (campo `"alerta": true/false`). La lógica nunca tiene síntomas escritos a mano en el código.
- Toda derivación es hacia la CLAC. El número de WhatsApp y el mensaje prellenado están en `src/content/config.json`.

## Privacidad
- Sin backend, sin base de datos, sin formularios que envíen datos a ningún servidor.
- Nombre y fechas se guardan solo en el navegador (localStorage), con un botón visible para borrarlos.
- No agregar analítica, cookies de terceros ni scripts externos sin autorización explícita.
- No pedir RUT, teléfono, dirección ni ningún otro dato identificador.

## Stack
- Vite + React (JavaScript), CSS simple.
- Vitest para tests.
- Sitio estático, publicado en Netlify.

## Estructura esperada
```
src/
  content/     config.json, sintomas.json, etapas.json
  lib/         triage.js (decide si hay alerta), fechas.js (edad gestacional y edad del bebé)
  components/
  pages/
```
- Edad gestacional desde FPP: 40 semanas − días que faltan para la FPP.
- Edad del bebé: meses y días desde la fecha de nacimiento.

## Diseño
- Mobile first (probar a 360 px de ancho). Celulares de gama media y planes de datos limitados: página liviana, sin imágenes pesadas.
- Letra base mínima de 16 px, alto contraste, botones de al menos 44 px de alto.
- Tono cercano y empático, tuteo, frases cortas, español de Chile.
- Accesible: etiquetas en los campos, navegable con teclado, nunca depender solo del color.

## Forma de trabajar
- Antes de programar algo nuevo, propone un plan y espera aprobación.
- Cambios pequeños: una pantalla o una función a la vez.
- `triage.js` y `fechas.js` deben tener tests. Corre los tests antes de dar algo por terminado.
- Al terminar, explica en español qué cambiaste y cómo probarlo.

## Comandos
- `npm run dev` — servidor local
- `npm test` — tests
- `npm run build` — versión para publicar
