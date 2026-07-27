# Soy alumno — Iframes embebidos (calendario, tutores, prácticas)

La página **Soy alumno** (`/soy-alumno`) integra tres bloques con contenido embebido en `<iframe>`. Cada uno usa un mecanismo distinto según el tipo de documento.

> **Tip:** las rutas en azul son enlaces. Al hacer clic (en Cursor, VS Code o GitHub) abres el archivo o la línea que debes editar.

| Sección | Ancla en página | Tipo de contenido | Archivo principal (clic) |
|---------|-----------------|-------------------|--------------------------|
| Calendario escolar | `#seccion-calendario` | PDF local | [`CalendarioEscolar.tsx`](../../src/components/embeded/CalendarioEscolar.tsx#L5) |
| Búsqueda de tutores | `#seccion-tutores` | HTML embebido | [`tutores.tsx`](../../src/components/embeded/tutores.tsx#L203) |
| Práctica de redes | `#seccion-redes` | PDF en Google Drive | [`redesData.ts`](../../src/components/alumno/redesData.ts#L12) |

Componentes auxiliares compartidos:

- [`ContenidoHtml.tsx`](../../src/components/embeded/ContenidoHtml.tsx) — renderiza HTML dentro de un iframe (`srcDoc`).
- [`VistaPreviaDocumento.tsx`](../../src/components/VistaPreviaDocumento.tsx) — iframe con URL externa (Google Drive preview).

---

## Nota importante: preparar el contenido antes de integrarlo

**El sitio no lee archivos sueltos automáticamente.** Para que el contenido se muestre dentro del iframe hay que **prepararlo (parsearlo)** e integrarlo en el código o en la carpeta pública correspondiente:

| Tipo | Qué significa «parsear» aquí |
|------|------------------------------|
| **Calendario (PDF)** | Descargar el PDF oficial, colocarlo en [`public/documents/`](../../public/documents/) y actualizar las rutas en el componente. No basta con enlazar al PDF del servidor UNAM en el iframe (ver restricción más abajo). |
| **Tutores (HTML)** | Convertir la tabla o exportación (Excel, HTML, etc.) en un **documento HTML completo** (`<!DOCTYPE html>…`) con estilos y datos incluidos, e insertarlo en la constante `html` de [`tutores.tsx`](../../src/components/embeded/tutores.tsx). Si solo cambian filas de la tabla, suele bastar con actualizar el arreglo [`const datos`](../../src/components/embeded/tutores.tsx#L203). |
| **Prácticas (PDF)** | Subir cada PDF a Google Drive, compartirlo para **cualquier persona con el enlace puede ver**, obtener el **ID del archivo** y registrar la URL de vista previa en [`redesData.ts`](../../src/components/alumno/redesData.ts#L12). |

> Si el contenido no fue parseado e integrado correctamente, el iframe aparecerá vacío, mostrará un error de permisos o el navegador bloqueará la carga.

---

## 1. Calendario escolar

### Dónde va el PDF

[`public/documents/calendario-2026-ll.pdf`](../../public/documents/calendario-2026-ll.pdf)

Los archivos en `public/` se sirven en la raíz del sitio. El iframe apunta a:

```
/documents/calendario-2026-ll.pdf
```

### Archivos a editar

| Qué cambiar | Archivo (clic para abrir) |
|-------------|---------------------------|
| Ruta del PDF embebido | [`CalendarioEscolar.tsx`](../../src/components/embeded/CalendarioEscolar.tsx#L8) → `CALENDARIO_PDF_EMBED` |
| Enlace de respaldo (PDF oficial UNAM) | [`CalendarioEscolar.tsx`](../../src/components/embeded/CalendarioEscolar.tsx#L5) → `CALENDARIO_PDF_ORIGEN` |
| Título visible y accesibilidad | [`es.json`](../../src/i18n/locales/es.json#L108) · [`en.json`](../../src/i18n/locales/en.json#L108) → `pages.soyAlumno.calendarioEscolar`, `abrirCalendarioPdf` |

### Pasos para actualizar el calendario

1. Descarga el PDF del calendario vigente desde la fuente oficial UNAM/FES Aragón.
2. Renómbralo de forma clara (p. ej. `calendario-2026-ll.pdf`) y cópialo en [`public/documents/`](../../public/documents/).
3. En [`CalendarioEscolar.tsx`](../../src/components/embeded/CalendarioEscolar.tsx#L5), actualiza:
   - `CALENDARIO_PDF_EMBED` con la ruta pública (`/documents/nombre-del-archivo.pdf`).
   - `CALENDARIO_PDF_ORIGEN` con la URL oficial para el enlace «Abrir en nueva pestaña».
4. Actualiza los textos en i18n si cambia el periodo (p. ej. «2026 - II» → «2027 - I»).
5. Verifica en `npm run dev` que el PDF se ve dentro del iframe y que el enlace de respaldo abre el documento oficial.

### Por qué no se embebe directamente el PDF de aragon.unam.mx

El servidor UNAM envía la cabecera `X-Frame-Options: sameorigin`, que impide mostrar ese PDF dentro de un iframe en otro dominio. Por eso se usa una **copia local** en `public/documents/`.

---

## 2. Búsqueda de tutores

### Cómo funciona

El componente [`Tutores`](../../src/components/embeded/tutores.tsx) pasa un bloque HTML completo a [`ContenidoHtml`](../../src/components/embeded/ContenidoHtml.tsx), que lo inyecta en el iframe mediante `srcDoc`. Incluye CSS, tabla, filtros y un arreglo JavaScript [`const datos = […]`](../../src/components/embeded/tutores.tsx#L203) con grupo, profesor, turno, salón, horario y correo.

### Archivos a editar

| Qué cambiar | Archivo (clic para abrir) |
|-------------|---------------------------|
| Contenido HTML y datos de tutores | [`tutores.tsx`](../../src/components/embeded/tutores.tsx#L203) → constante `html` / `datos` |
| Título de la sección | [`es.json`](../../src/i18n/locales/es.json) · [`en.json`](../../src/i18n/locales/en.json) → `tutorsView.titulo` |
| Título del iframe (accesibilidad) | i18n → `tutorsView.iframeTitle` |
| Estilos del contenedor (opcional) | [`tutores.css`](../../src/components/embeded/tutores.css) |

### Pasos para actualizar la tabla de tutores

#### Opción A — Solo cambian filas (caso más común)

1. Abre [`tutores.tsx`](../../src/components/embeded/tutores.tsx#L203).
2. Localiza el arreglo `const datos = [` (línea ~203).
3. Añade, edita o elimina objetos con esta forma:

```js
{ grupo: "2258", profesor: "NOMBRE DEL TUTOR", turno: "VESPERTINO", salon: "A504", horario: "19:00-21:00 M,J.", correo: "correo@aragon.unam.mx" },
```

4. Guarda y recarga `/soy-alumno#seccion-tutores`. Prueba los filtros por grupo, profesor y turno.

#### Opción B — Cambia todo el HTML (diseño o estructura nueva)

1. Prepara un archivo HTML **autocontenido** (DOCTYPE, `<head>` con estilos, `<body>` con tabla y scripts).
2. **Parsea / adapta** ese HTML para incrustarlo en TypeScript:
   - Escapa comillas invertidas (\`) si las hay en el HTML.
   - Evita `${` suelto dentro del template literal (rompería la cadena).
   - Mantén `sandbox="allow-same-origin allow-scripts"` en el componente (los filtros usan JavaScript).
3. Sustituye el contenido de la constante `html = \`…\`` en [`tutores.tsx`](../../src/components/embeded/tutores.tsx).
4. Verifica en desarrollo que la tabla carga y los filtros funcionan.

### Referencia del patrón HTML embebido

Otros módulos del proyecto usan el mismo enfoque (p. ej. horarios en [`horarios.tsx`](../../src/components/embeded/horarios.tsx)).

---

## 3. Práctica de redes

### Cómo funciona

[`PracticaRedes`](../../src/components/alumno/PracticaRedes.tsx) muestra pestañas **REDES I** y **REDES II**. Cada práctica es un acordeón; dentro hay uno o más iframes con PDFs alojados en **Google Drive**, usando la URL:

```
https://drive.google.com/file/d/{FILE_ID}/preview
```

La lista de prácticas y enlaces está en [`redesData.ts`](../../src/components/alumno/redesData.ts#L12).

### Archivos a editar

| Qué cambiar | Archivo (clic para abrir) |
|-------------|---------------------------|
| Prácticas, cantidad de PDFs y URLs | [`redesData.ts`](../../src/components/alumno/redesData.ts#L12) (`REDES_1_PRACTICAS` / [`REDES_2_PRACTICAS`](../../src/components/alumno/redesData.ts#L74)) |
| Textos de títulos y descripción | [`es.json`](../../src/i18n/locales/es.json#L108) · [`en.json`](../../src/i18n/locales/en.json#L108) → `pages.soyAlumno.practicaRedes.*` |
| Estructura visual del acordeón (opcional) | [`RedesPracticasLista.tsx`](../../src/components/alumno/RedesPracticasLista.tsx) · [`PracticaRedes.tsx`](../../src/components/alumno/PracticaRedes.tsx) |

### Pasos para agregar o actualizar una práctica

1. Sube el PDF a Google Drive (carpeta institucional acordada).
2. Comparte el archivo: **Acceso general → Cualquier persona con el enlace → Lector**.
3. Copia el ID del archivo desde la URL de Drive.
4. En [`redesData.ts`](../../src/components/alumno/redesData.ts#L12), añade o edita una entrada en `REDES_1_PRACTICAS` o `REDES_2_PRACTICAS`:

```ts
{
  key: 'r1-p9',
  titleKey: 'practica',
  titleNum: 9,
  previews: [
    preview('FILE_ID_DEL_PDF_1'),
    preview('FILE_ID_DEL_PDF_2'),
  ],
},
```

5. Si agregas una práctica nueva con título distinto, revisa si hace falta una clave i18n adicional en `practicaRedes`.
6. Verifica en `/soy-alumno#seccion-redes` que cada iframe carga el PDF.

### Quitar una práctica

Elimina su objeto del arreglo correspondiente en [`redesData.ts`](../../src/components/alumno/redesData.ts#L12).

---

## Textos e idiomas (ES / EN)

| Clave i18n | Uso |
|------------|-----|
| `pages.soyAlumno.calendarioEscolar` | Encabezado calendario |
| `pages.soyAlumno.abrirCalendarioPdf` | Enlace alternativo al PDF |
| `tutorsView.titulo` | Encabezado tutores |
| `tutorsView.iframeTitle` | Título accesible del iframe de tutores |
| `pages.soyAlumno.practicaRedes.titulo` | Encabezado prácticas de redes |
| `pages.soyAlumno.practicaRedes.vistaPrevia` | Título accesible de cada iframe de práctica |

Archivos: [`es.json`](../../src/i18n/locales/es.json#L108) y [`en.json`](../../src/i18n/locales/en.json#L108).

---

## Verificación rápida

1. Ejecuta `npm run dev`.
2. Abre `/soy-alumno` y usa la navegación lateral para saltar a cada sección.
3. Comprueba calendario, tutores y prácticas.

---

## Resumen rápido

| Bloque | Ir a |
|--------|------|
| Calendario | [`public/documents/`](../../public/documents/) + [`CalendarioEscolar.tsx`](../../src/components/embeded/CalendarioEscolar.tsx#L5) |
| Tutores | [`tutores.tsx`](../../src/components/embeded/tutores.tsx#L203) (`const datos`) |
| Prácticas | [`redesData.ts`](../../src/components/alumno/redesData.ts#L12) |
| Textos | [`es.json`](../../src/i18n/locales/es.json#L108) / [`en.json`](../../src/i18n/locales/en.json#L108) |
