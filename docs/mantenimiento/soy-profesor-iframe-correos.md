# Soy profesor — Iframe del directorio de correos

La página **Soy profesor** (`/soy-profesor`) muestra un único bloque embebido: el **directorio de correos del profesorado**, con buscador y tabla interactiva.

---

## Dónde vive el contenido del iframe

A diferencia del calendario escolar (PDF en `public/documents/`), el directorio de correos **no usa un archivo suelto en `public/`**. El HTML completo del iframe está **incrustado en código** dentro del proyecto:

| Rol | Ruta |
|-----|------|
| **Contenido HTML + datos del directorio** | `src/components/embeded/correo.tsx` |
| **Componente que envuelve el iframe** | `src/components/embeded/ContenidoHtml.tsx` |
| **Página que lo muestra** | `src/pages/SoyProfesorPage.tsx` |
| **Estilos del contenedor (opcional)** | `src/pages/SoyProfesorPage.css` → clase `.profesores-correo` |

Ruta de la página en el sitio:

```
/soy-profesor
```

---

## Cómo funciona

1. `SoyProfesorPage` renderiza `<ProfesoresCorreo />`.
2. `ProfesoresCorreo` (en `correo.tsx`) pasa una constante `html` a `ContenidoHtml`.
3. `ContenidoHtml` crea un `<iframe>` con `srcDoc={html}` (HTML inyectado, no URL externa).
4. El HTML incluye CSS, un buscador, una tabla y un arreglo JavaScript `const datos = […]` con nombre y correo de cada persona.

El iframe usa `sandbox="allow-same-origin allow-scripts"` porque el buscador y la tabla dependen de JavaScript.

---

## Nota importante: el contenido debe ser parseado

**El sitio no lee Excel, CSV ni archivos HTML sueltos de forma automática.**

Para actualizar el directorio hay que **parsear** (preparar) la información y **integrarla** en `correo.tsx`:

| Paso | Descripción |
|------|-------------|
| 1. Obtener datos | Exportar o copiar la lista oficial de nombres y correos (Excel, hoja de cálculo, HTML, etc.). |
| 2. Parsear | Convertir cada fila al formato de objeto `{ nombre: "…", correo: "…" }` dentro del arreglo `const datos`. |
| 3. Integrar | Pegar o reemplazar esas entradas dentro de la constante `html` en `correo.tsx`. |
| 4. Verificar | Comprobar en desarrollo que la tabla carga, el buscador filtra y los enlaces `mailto:` funcionan. |

> Si el HTML no está bien formado o contiene caracteres que rompen el template literal de TypeScript (como `` ` `` o `${` sin escapar), el iframe puede quedar en blanco o la compilación fallará.

### Formato de cada registro

Dentro del `<script>` del HTML embebido (aprox. línea 98 de `correo.tsx`):

```js
{"nombre":"NOMBRE APELLIDOS","correo":"correo@aragon.unam.mx"},
```

Ejemplo real del archivo:

```js
{"nombre":" ALBA VILLA BELEN ANAID ","correo":" belenalba749@aragon.unam.mx "},
```

---

## Archivos que hay que editar

| Qué cambiar | Archivo |
|-------------|---------|
| Lista de profesores y correos | `src/components/embeded/correo.tsx` → arreglo `const datos` dentro de `html` |
| Diseño, columnas o lógica del buscador | Misma archivo → resto del bloque `html` (CSS + `<script>`) |
| Título visible de la página | `src/i18n/locales/es.json` y `en.json` → `pages.soyProfesor.tituloCorreos` |
| Título accesible del iframe | i18n → `pages.soyProfesor.correosIframeTitle` |
| Altura mínima del iframe (opcional) | `correo.tsx` → prop `iframeStyle` en `<ContenidoHtml>` |
| Ancho / márgenes del bloque (opcional) | `src/pages/SoyProfesorPage.css` |

`SoyProfesorPage.tsx` y `ContenidoHtml.tsx` **no suelen requerir cambios** al actualizar solo datos de correos.

---

## Actualizar solo nombres o correos (caso más frecuente)

1. Abre `src/components/embeded/correo.tsx`.
2. Busca `const datos = [` dentro del bloque `html`.
3. **Agregar** un profesor: añade una línea al arreglo:

```js
{"nombre":"APELLIDOS NOMBRE","correo":"nuevo@aragon.unam.mx"},
```

4. **Editar** un correo: localiza la fila por nombre y cambia el valor de `correo`.
5. **Eliminar** un registro: borra la línea correspondiente (evita dejar filas vacías como `{"nombre":"","correo":""}`).
6. Guarda, ejecuta `npm run dev` y abre `/soy-profesor`.
7. Prueba el campo «Buscar por nombre o apellido…» y un enlace de correo.

---

## Reemplazar todo el HTML del iframe

Usar solo si cambia la estructura (nuevas columnas, otro diseño, otro script).

1. Prepara un documento HTML **autocontenido**: `<!DOCTYPE html>`, estilos en `<head>`, tabla y scripts en `<body>`.
2. **Parsea / adapta** el HTML para TypeScript:
   - Todo debe ir dentro de `` const html = `…` ``.
   - Escapa comillas invertidas internas: `` \` ``.
   - Escapa `${` si aparece en el HTML: `\${`.
3. Sustituye la constante `html` completa en `correo.tsx`.
4. Mantén en `ProfesoresCorreo`:

```tsx
<ContenidoHtml
  html={html}
  sandbox="allow-same-origin allow-scripts"
  …
/>
```

5. Verifica tabla, buscador y compilación (`npm run build`).

---

## Textos en español e inglés

| Clave i18n | Uso |
|------------|-----|
| `pages.soyProfesor.tituloCorreos` | Encabezado «Correos del profesorado» sobre el iframe |
| `pages.soyProfesor.correosIframeTitle` | Atributo `title` del iframe (lectores de pantalla) |

Archivos:

- `src/i18n/locales/es.json`
- `src/i18n/locales/en.json`

El placeholder del buscador («Buscar por nombre o apellido…») está **dentro del HTML embebido** en `correo.tsx`, no en i18n. Si se requiere traducción al inglés del contenido interno, habría que duplicar o parametrizar ese HTML (hoy la tabla está solo en español).

---

## Opciones del iframe

En `correo.tsx`, componente `ProfesoresCorreo`:

| Prop / valor | Actual | Efecto |
|--------------|--------|--------|
| `sandbox` | `allow-same-origin allow-scripts` | Permite JS del buscador dentro del iframe |
| `iframeStyle.minHeight` | `min(85vh, 1400px)` | Altura mínima visible del directorio |

---

## Verificación rápida

1. `npm run dev`
2. Ir a `/soy-profesor`
3. Confirmar:
   - La tabla lista todos los profesores.
   - El buscador filtra por nombre.
   - Cada correo abre el cliente de email (`mailto:`).

---

## Resumen rápido

```
Datos (nombre + correo)  →  parsear a JSON  →  src/components/embeded/correo.tsx  (const datos dentro de html)
Títulos ES/EN            →  src/i18n/locales/es.json + en.json  (pages.soyProfesor.*)
Página                   →  /soy-profesor  →  src/pages/SoyProfesorPage.tsx
Iframe reutilizable      →  src/components/embeded/ContenidoHtml.tsx
```

**No hay carpeta `public/` para este iframe:** el contenido se guarda y mantiene en `src/components/embeded/correo.tsx`.
