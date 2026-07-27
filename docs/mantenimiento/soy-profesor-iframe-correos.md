# Soy profesor — Iframe del directorio de correos

La página **Soy profesor** (`/soy-profesor`) muestra un único bloque embebido: el **directorio de correos del profesorado**, con buscador y tabla interactiva.

> **Tip:** las rutas en azul son enlaces. Al hacer clic (en Cursor, VS Code o GitHub) abres el archivo o la línea que debes editar.

---

## Dónde vive el contenido del iframe

A diferencia del calendario escolar (PDF en `public/documents/`), el directorio de correos **no usa un archivo suelto en `public/`**. El HTML completo del iframe está **incrustado en código** dentro del proyecto:

| Rol | Ruta (clic para abrir) |
|-----|------------------------|
| **Contenido HTML + datos del directorio** | [`correo.tsx`](../../src/components/embeded/correo.tsx#L98) — arreglo `const datos` |
| **Componente que envuelve el iframe** | [`ContenidoHtml.tsx`](../../src/components/embeded/ContenidoHtml.tsx) |
| **Página que lo muestra** | [`SoyProfesorPage.tsx`](../../src/pages/SoyProfesorPage.tsx) |
| **Estilos del contenedor (opcional)** | [`SoyProfesorPage.css`](../../src/pages/SoyProfesorPage.css) → clase `.profesores-correo` |

Ruta de la página en el sitio: `/soy-profesor`

---

## Cómo funciona

1. [`SoyProfesorPage`](../../src/pages/SoyProfesorPage.tsx) renderiza `<ProfesoresCorreo />`.
2. [`ProfesoresCorreo`](../../src/components/embeded/correo.tsx#L261) pasa una constante `html` a `ContenidoHtml`.
3. [`ContenidoHtml`](../../src/components/embeded/ContenidoHtml.tsx) crea un `<iframe>` con `srcDoc={html}`.
4. El HTML incluye CSS, un buscador, una tabla y un arreglo JavaScript [`const datos = […]`](../../src/components/embeded/correo.tsx#L98) con nombre y correo de cada persona.

El iframe usa `sandbox="allow-same-origin allow-scripts"` porque el buscador y la tabla dependen de JavaScript.

---

## Nota importante: el contenido debe ser parseado

**El sitio no lee Excel, CSV ni archivos HTML sueltos de forma automática.**

Para actualizar el directorio hay que **parsear** (preparar) la información y **integrarla** en [`correo.tsx`](../../src/components/embeded/correo.tsx#L98):

| Paso | Descripción |
|------|-------------|
| 1. Obtener datos | Exportar o copiar la lista oficial de nombres y correos. |
| 2. Parsear | Convertir cada fila al formato `{ nombre: "…", correo: "…" }` dentro de [`const datos`](../../src/components/embeded/correo.tsx#L98). |
| 3. Integrar | Pegar o reemplazar esas entradas dentro de la constante `html` en [`correo.tsx`](../../src/components/embeded/correo.tsx). |
| 4. Verificar | Comprobar en desarrollo que la tabla carga, el buscador filtra y los `mailto:` funcionan. |

> Si el HTML no está bien formado o contiene caracteres que rompen el template literal de TypeScript (como `` ` `` o `${` sin escapar), el iframe puede quedar en blanco o la compilación fallará.

### Formato de cada registro

Dentro del `<script>` del HTML embebido ([línea ~98](../../src/components/embeded/correo.tsx#L98)):

```js
{"nombre":"NOMBRE APELLIDOS","correo":"correo@aragon.unam.mx"},
```

---

## Archivos que hay que editar

| Qué cambiar | Archivo (clic para abrir) |
|-------------|---------------------------|
| Lista de profesores y correos | [`correo.tsx`](../../src/components/embeded/correo.tsx#L98) → `const datos` |
| Diseño, columnas o lógica del buscador | [`correo.tsx`](../../src/components/embeded/correo.tsx#L4) → resto del bloque `html` |
| Título visible de la página | [`es.json`](../../src/i18n/locales/es.json#L184) · [`en.json`](../../src/i18n/locales/en.json#L184) → `pages.soyProfesor.tituloCorreos` |
| Título accesible del iframe | i18n → `pages.soyProfesor.correosIframeTitle` |
| Altura mínima del iframe (opcional) | [`correo.tsx`](../../src/components/embeded/correo.tsx#L261) → prop `iframeStyle` |
| Ancho / márgenes del bloque (opcional) | [`SoyProfesorPage.css`](../../src/pages/SoyProfesorPage.css) |

[`SoyProfesorPage.tsx`](../../src/pages/SoyProfesorPage.tsx) y [`ContenidoHtml.tsx`](../../src/components/embeded/ContenidoHtml.tsx) **no suelen requerir cambios** al actualizar solo datos de correos.

---

## Actualizar solo nombres o correos (caso más frecuente)

1. Abre [`correo.tsx`](../../src/components/embeded/correo.tsx#L98).
2. Busca `const datos = [` dentro del bloque `html`.
3. **Agregar** un profesor: añade una línea al arreglo.
4. **Editar** un correo: localiza la fila por nombre y cambia el valor de `correo`.
5. **Eliminar** un registro: borra la línea correspondiente.
6. Guarda, ejecuta `npm run dev` y abre `/soy-profesor`.
7. Prueba el buscador y un enlace de correo.

---

## Reemplazar todo el HTML del iframe

Usar solo si cambia la estructura (nuevas columnas, otro diseño, otro script).

1. Prepara un documento HTML **autocontenido**.
2. Adáptalo al template literal de TypeScript (escapa `` ` `` y `${`).
3. Sustituye la constante `html` en [`correo.tsx`](../../src/components/embeded/correo.tsx#L4).
4. Mantén `sandbox="allow-same-origin allow-scripts"`.
5. Verifica con `npm run build`.

---

## Textos en español e inglés

| Clave i18n | Uso |
|------------|-----|
| `pages.soyProfesor.tituloCorreos` | Encabezado sobre el iframe |
| `pages.soyProfesor.correosIframeTitle` | Atributo `title` del iframe |

Archivos: [`es.json`](../../src/i18n/locales/es.json#L184) · [`en.json`](../../src/i18n/locales/en.json#L184).

El placeholder del buscador está **dentro del HTML embebido** en [`correo.tsx`](../../src/components/embeded/correo.tsx), no en i18n.

---

## Opciones del iframe

En [`correo.tsx`](../../src/components/embeded/correo.tsx#L261) (`ProfesoresCorreo`):

| Prop / valor | Actual | Efecto |
|--------------|--------|--------|
| `sandbox` | `allow-same-origin allow-scripts` | Permite JS del buscador |
| `iframeStyle.minHeight` | `min(85vh, 1400px)` | Altura mínima del directorio |

---

## Verificación rápida

1. `npm run dev`
2. Ir a `/soy-profesor`
3. Confirmar tabla, buscador y `mailto:`

---

## Resumen rápido

| Qué | Ir a |
|-----|------|
| Datos (nombre + correo) | [`correo.tsx`](../../src/components/embeded/correo.tsx#L98) |
| Títulos ES/EN | [`es.json`](../../src/i18n/locales/es.json#L184) / [`en.json`](../../src/i18n/locales/en.json#L184) |
| Página | [`SoyProfesorPage.tsx`](../../src/pages/SoyProfesorPage.tsx) |
| Iframe reutilizable | [`ContenidoHtml.tsx`](../../src/components/embeded/ContenidoHtml.tsx) |

**No hay carpeta `public/` para este iframe:** el contenido se mantiene en [`correo.tsx`](../../src/components/embeded/correo.tsx).
