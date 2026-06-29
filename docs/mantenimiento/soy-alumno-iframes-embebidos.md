# Soy alumno — Iframes embebidos (calendario, tutores, prácticas)

La página **Soy alumno** (`/soy-alumno`) integra tres bloques con contenido embebido en `<iframe>`. Cada uno usa un mecanismo distinto según el tipo de documento.

| Sección | Ancla en página | Tipo de contenido | Archivo principal |
|---------|-----------------|-------------------|-------------------|
| Calendario escolar | `#seccion-calendario` | PDF local | `src/components/embeded/CalendarioEscolar.tsx` |
| Búsqueda de tutores | `#seccion-tutores` | HTML embebido | `src/components/embeded/tutores.tsx` |
| Práctica de redes | `#seccion-redes` | PDF en Google Drive | `src/components/alumno/redesData.ts` |

Componentes auxiliares compartidos:

- `src/components/embeded/ContenidoHtml.tsx` — renderiza HTML dentro de un iframe (`srcDoc`).
- `src/components/VistaPreviaDocumento.tsx` — iframe con URL externa (Google Drive preview).

---

## Nota importante: preparar el contenido antes de integrarlo

**El sitio no lee archivos sueltos automáticamente.** Para que el contenido se muestre dentro del iframe hay que **prepararlo (parsearlo)** e integrarlo en el código o en la carpeta pública correspondiente:

| Tipo | Qué significa «parsear» aquí |
|------|------------------------------|
| **Calendario (PDF)** | Descargar el PDF oficial, colocarlo en `public/documents/` y actualizar las rutas en el componente. No basta con enlazar al PDF del servidor UNAM en el iframe (ver restricción más abajo). |
| **Tutores (HTML)** | Convertir la tabla o exportación (Excel, HTML, etc.) en un **documento HTML completo** (`<!DOCTYPE html>…`) con estilos y datos incluidos, e insertarlo en la constante `html` de `tutores.tsx`. Si solo cambian filas de la tabla, suele bastar con actualizar el arreglo `const datos = […]` dentro de ese HTML. |
| **Prácticas (PDF)** | Subir cada PDF a Google Drive, compartirlo para **cualquier persona con el enlace puede ver**, obtener el **ID del archivo** y registrar la URL de vista previa en `redesData.ts`. |

> Si el contenido no fue parseado e integrado correctamente, el iframe aparecerá vacío, mostrará un error de permisos o el navegador bloqueará la carga.

---

## 1. Calendario escolar

### Dónde va el PDF

```
public/documents/calendario-2026-ll.pdf
```

Los archivos en `public/` se sirven en la raíz del sitio. El iframe apunta a:

```
/documents/calendario-2026-ll.pdf
```

### Archivos a editar

| Qué cambiar | Archivo |
|-------------|---------|
| Ruta del PDF embebido | `src/components/embeded/CalendarioEscolar.tsx` → `CALENDARIO_PDF_EMBED` |
| Enlace de respaldo (PDF oficial UNAM) | Misma archivo → `CALENDARIO_PDF_ORIGEN` |
| Título visible y accesibilidad | `src/i18n/locales/es.json` y `en.json` → `pages.soyAlumno.calendarioEscolar`, `abrirCalendarioPdf` |

### Pasos para actualizar el calendario

1. Descarga el PDF del calendario vigente desde la fuente oficial UNAM/FES Aragón.
2. Renómbralo de forma clara (p. ej. `calendario-2026-ll.pdf`) y cópialo en `public/documents/`.
3. En `CalendarioEscolar.tsx`, actualiza:
   - `CALENDARIO_PDF_EMBED` con la ruta pública (`/documents/nombre-del-archivo.pdf`).
   - `CALENDARIO_PDF_ORIGEN` con la URL oficial para el enlace «Abrir en nueva pestaña».
4. Actualiza los textos en i18n si cambia el periodo (p. ej. «2026 - II» → «2027 - I»).
5. Verifica en `npm run dev` que el PDF se ve dentro del iframe y que el enlace de respaldo abre el documento oficial.

### Por qué no se embebe directamente el PDF de aragon.unam.mx

El servidor UNAM envía la cabecera `X-Frame-Options: sameorigin`, que impide mostrar ese PDF dentro de un iframe en otro dominio. Por eso se usa una **copia local** en `public/documents/`.

---

## 2. Búsqueda de tutores

### Cómo funciona

El componente `Tutores` pasa un bloque HTML completo a `ContenidoHtml`, que lo inyecta en el iframe mediante `srcDoc`. Incluye CSS, tabla, filtros y un arreglo JavaScript `const datos = […]` con grupo, profesor, turno, salón, horario y correo.

### Archivos a editar

| Qué cambiar | Archivo |
|-------------|---------|
| Contenido HTML y datos de tutores | `src/components/embeded/tutores.tsx` → constante `html` |
| Título de la sección | `src/i18n/locales/es.json` y `en.json` → `tutorsView.titulo` |
| Título del iframe (accesibilidad) | i18n → `tutorsView.iframeTitle` |
| Estilos del contenedor (opcional) | `src/components/embeded/tutores.css` |

### Pasos para actualizar la tabla de tutores

#### Opción A — Solo cambian filas (caso más común)

1. Abre `src/components/embeded/tutores.tsx`.
2. Localiza el arreglo `const datos = [` dentro del bloque `html` (aprox. línea 203).
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
3. Sustituye el contenido de la constante `html = \`…\`` en `tutores.tsx`.
4. Verifica en desarrollo que la tabla carga y los filtros funcionan.

### Referencia del patrón HTML embebido

Otros módulos del proyecto usan el mismo enfoque (p. ej. horarios en `src/components/embeded/horarios.tsx`). El comentario al inicio de esos archivos indica:

> *Es necesario parsear el HTML para que se pueda renderizar en el iframe.*

---

## 3. Práctica de redes

### Cómo funciona

`PracticaRedes` muestra pestañas **REDES I** y **REDES II**. Cada práctica es un acordeón; dentro hay uno o más iframes con PDFs alojados en **Google Drive**, usando la URL:

```
https://drive.google.com/file/d/{FILE_ID}/preview
```

La lista de prácticas y enlaces está en `src/components/alumno/redesData.ts`.

### Archivos a editar

| Qué cambiar | Archivo |
|-------------|---------|
| Prácticas, cantidad de PDFs y URLs | `src/components/alumno/redesData.ts` |
| Textos de títulos y descripción | `src/i18n/locales/es.json` y `en.json` → `pages.soyAlumno.practicaRedes.*` |
| Estructura visual del acordeón (opcional) | `src/components/alumno/RedesPracticasLista.tsx`, `PracticaRedes.tsx` |

### Pasos para agregar o actualizar una práctica

1. Sube el PDF a Google Drive (carpeta institucional acordada).
2. Comparte el archivo: **Acceso general → Cualquier persona con el enlace → Lector**.
3. Copia el ID del archivo desde la URL de Drive:
   - URL típica: `https://drive.google.com/file/d/1T3oUF7pGVdJTny5YWjbmbkiWyS7doZm8/view`
   - ID: `1T3oUF7pGVdJTny5YWjbmbkiWyS7doZm8`
4. En `redesData.ts`, añade o edita una entrada en `REDES_1_PRACTICAS` o `REDES_2_PRACTICAS`:

```ts
{
  key: 'r1-p9',           // identificador único
  titleKey: 'practica',   // o 'practica6y7'
  titleNum: 9,            // número mostrado en el acordeón
  previews: [
    preview('FILE_ID_DEL_PDF_1'),
    preview('FILE_ID_DEL_PDF_2'),  // opcional: más de un PDF por práctica
  ],
},
```

5. Si agregas una práctica nueva con título distinto, revisa si hace falta una clave i18n adicional en `practicaRedes`.
6. Verifica en `/soy-alumno#seccion-redes` que cada iframe carga el PDF (si Drive pide login, revisa permisos de compartir).

### Quitar una práctica

Elimina su objeto del arreglo correspondiente en `redesData.ts`. No hace falta borrar el archivo de Drive salvo que se decida retirarlo del repositorio documental.

---

## Textos e idiomas (ES / EN)

Además de los archivos de contenido, actualiza siempre **ambos** idiomas cuando cambie un título visible:

| Clave i18n | Uso |
|------------|-----|
| `pages.soyAlumno.calendarioEscolar` | Encabezado calendario |
| `pages.soyAlumno.abrirCalendarioPdf` | Enlace alternativo al PDF |
| `tutorsView.titulo` | Encabezado tutores |
| `tutorsView.iframeTitle` | Título accesible del iframe de tutores |
| `pages.soyAlumno.practicaRedes.titulo` | Encabezado prácticas de redes |
| `pages.soyAlumno.practicaRedes.vistaPrevia` | Título accesible de cada iframe de práctica |

Archivos: `src/i18n/locales/es.json` y `src/i18n/locales/en.json`.

---

## Verificación rápida

1. Ejecuta `npm run dev`.
2. Abre `/soy-alumno` y usa la navegación lateral para saltar a cada sección.
3. Comprueba:
   - **Calendario:** PDF visible; enlace de respaldo abre el PDF oficial.
   - **Tutores:** tabla cargada; filtros responden.
   - **Prácticas:** acordeones abren; PDFs de Drive se ven sin pedir inicio de sesión.

---

## Resumen rápido

```
Calendario   →  public/documents/*.pdf  +  CalendarioEscolar.tsx  +  i18n (calendarioEscolar)
Tutores      →  parsear HTML/datos  →  tutores.tsx (const html)  +  i18n (tutorsView)
Prácticas    →  PDF en Drive (permiso lectura)  →  redesData.ts (preview FILE_ID)  +  i18n (practicaRedes)
```
