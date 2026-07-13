# Guía de entrega — Operación del sitio ICO FES Aragón

Documento para quien **recibe el repositorio** y debe mantenerlo u operarlo **sin haber participado en el desarrollo**.

Léelo junto con el [`README.md`](../README.md) de la raíz. El README explica instalación y estructura; **esta guía** explica cómo trabajar día a día con el sitio.

---

## 1. ¿Qué es este proyecto?

Es un **sitio web estático** (no hay base de datos ni servidor propio de la aplicación).

- Se construye con React + Vite.
- El resultado publicable es la carpeta `dist/` tras `npm run build`.
- Los textos de la interfaz están en español e inglés.
- Parte del contenido (PDF, tablas HTML, enlaces a Drive) se **incrustan** en la página; no se actualizan solos desde sistemas externos.

**Implicación práctica:** casi todo cambio de contenido se hace editando archivos del repositorio, generando un build y publicando de nuevo `dist/` (o el flujo de despliegue que use la unidad).

---

## 2. Primeros pasos (primera vez)

1. Instala **Node.js 20+** (LTS) desde [nodejs.org](https://nodejs.org/).
2. Clona o descarga este repositorio.
3. Abre una terminal en la carpeta del proyecto.
4. Ejecuta:

```bash
npm install
npm run dev
```

5. Abre en el navegador la URL que muestre la terminal (suele ser `http://localhost:5173`).
6. Navega el sitio y cambia ES/EN en el header para familiarizarte.

Si algo falla:

| Síntoma | Qué revisar |
|---------|-------------|
| `npm` no se reconoce | Node no está instalado o no está en el PATH |
| Error al instalar | Versión de Node muy antigua; prueba LTS actual |
| Puerto ocupado | Vite usará otro puerto; usa el que indique la terminal |
| Página en blanco | Abre la consola del navegador (F12) y anota el error |

---

## 3. Mapa del sitio (qué ve el usuario)

| En el menú | URL | Contenido principal |
|------------|-----|---------------------|
| Inicio | `/` | Accesos rápidos + carrusel de convocatorias |
| Programa académico | `/programa-academico` | Misión/visión, grid académico, carrusel institucional |
| Soy alumno | `/soy-alumno` | Accesos, calendario, tutores, prácticas de redes, etc. |
| → Horarios | `/soy-alumno/horarios` | Horarios embebidos |
| → Extraordinarios | `/soy-alumno/extraordinarios` | PDFs de extraordinarios |
| → Horas complementarias | `/soy-alumno/horas-comp` | Tarjetas + tablas de ponderación |
| Soy profesor | `/soy-profesor` | Directorio de correos (iframe) |
| Soy egresado | `/soy-egresado` | Titulación, documentación, pasos |

Las rutas están definidas en `src/routes/AppRoutes.tsx`.  
Si agregas una página nueva, **también** hay que registrar la ruta ahí y, si aplica, el enlace en el header (`src/components/layout/Header.tsx`).

---

## 4. Regla de oro: español e inglés juntos

Casi todo texto visible al usuario tiene **dos versiones**.

| Archivo | Idioma |
|---------|--------|
| `src/i18n/locales/es.json` | Español |
| `src/i18n/locales/en.json` | Inglés |

**Flujo recomendado al cambiar un texto:**

1. Localiza la clave en `es.json`.
2. Cambia el texto en español.
3. Cambia la **misma clave** en `en.json`.
4. Guarda ambos archivos.
5. Recarga el navegador y verifica en ES y en EN.

Si solo actualizas un idioma, el otro quedará desactualizado o mostrará el respaldo en español.

Guía detallada: [`mantenimiento/i18next-traducciones.md`](mantenimiento/i18next-traducciones.md).

---

## 5. Tareas frecuentes (operación diaria)

Usa esta tabla como índice rápido. Para el detalle paso a paso, abre la guía enlazada.

| Tarea | Dónde tocar | Guía |
|-------|-------------|------|
| Cambiar un título o párrafo de la interfaz | `es.json` / `en.json` | [i18n](mantenimiento/i18next-traducciones.md) |
| Actualizar imágenes del carrusel de inicio | `src/assets/images/inicio/` + `convocatoriasData.ts` | [Convocatorias](mantenimiento/inicio-carrusel-convocatorias.md) |
| Actualizar carrusel de Programa académico | datos + imágenes en `programaAcademico/` | [Carrusel institucional](mantenimiento/programa-academico-carrusel-institucional.md) |
| Cambiar calendario / tutores / prácticas | componentes e iframes en Soy alumno | [Iframes alumno](mantenimiento/soy-alumno-iframes-embebidos.md) |
| Actualizar directorio de correos | Soy profesor / iframe | [Correos](mantenimiento/soy-profesor-iframe-correos.md) |
| Editar ponderaciones de horas complementarias | `src/data/horasCompTablas.es.json` y `.en.json` | Sección 6 de esta guía |
| Cambiar PDFs de extraordinarios | `src/assets/pdfs/` + componente relacionado | Código en `ExtraordinariosPdfs.tsx` |
| Favicon o título de la pestaña | `public/favicon.png`, `index.html` | — |

### Flujo seguro para cualquier cambio

1. Arranca el sitio en local (`npm run dev`).
2. Haz el cambio en los archivos correspondientes (**ES y EN** si aplica).
3. Verifica en el navegador (desktop y, si puedes, una ventana estrecha / móvil).
4. Ejecuta `npm run build` para confirmar que no hay errores de compilación.
5. Publica según el procedimiento de la unidad (sección 8).

---

## 6. Horas de formación complementaria (edición rápida)

Página: `/soy-alumno/horas-comp`.

### Textos de la página (introducciones, títulos de tarjetas)

- Claves bajo `pages.soyAlumno.formacionComp` en:
  - `src/i18n/locales/es.json`
  - `src/i18n/locales/en.json`

### Contenido de las tablas

| Archivo | Idioma de la tabla |
|---------|--------------------|
| `src/data/horasCompTablas.es.json` | Español |
| `src/data/horasCompTablas.en.json` | Inglés |

Hay cuatro bloques: `culturales`, `deportivas`, `emprendimiento`, `investigacion`.

**Campos por celda:**

| Campo | Significado |
|-------|-------------|
| `c1a` | Parte izquierda de «Actividad» (~30 %) |
| `c1b` | Parte derecha de «Actividad» (~70 %) |
| `c1` | Actividad en una sola celda (cuando la fila no se divide) |
| `c2` | Horas |

**Importante:** la estructura visual (celdas unidas con `rowspan`, filas de ancho completo) está definida en código (`src/components/alumno/HorasCompTabla.tsx`).  
Si solo cambias **textos o números**, edita los JSON.  
Si necesitas **unir/separar filas o agregar columnas**, hace falta ajustar también ese componente (pide apoyo a alguien con experiencia en React).

Al agregar una fila nueva en el JSON, usa la siguiente clave disponible (`fila8`, `fila9`, …) y **repítela en ES y EN**.

---

## 7. Dependencias externas (qué se puede romper sin tocar el código)

Algunos contenidos dependen de sistemas fuera del repositorio:

| Contenido | Dependencia | Si falla |
|-----------|-------------|----------|
| Prácticas de redes | Google Drive (permisos públicos de vista) | Revisar enlace/ID en `redesData.ts` y permisos del archivo |
| Correos / directorio | Fuente embebida en Soy profesor | Ver guía de correos |
| Enlaces a sitios UNAM / FES | Sitios externos | Actualizar URL en el componente o en i18n según corresponda |
| PDFs locales | Archivos en `public/` o `src/assets/pdfs/` | Reemplazar el archivo y mantener el mismo nombre, o actualizar la ruta en código |

Si un iframe aparece vacío o con error de permisos, **no asumas que el código se “rompió”**: revisa primero el archivo externo y sus permisos.

---

## 8. Publicar cambios (producción)

### En local, antes de publicar

```bash
npm run build
```

- Si el comando termina bien, se genera/actualiza la carpeta `dist/`.
- Opcional: `npm run preview` para revisar el build como se vería en producción.

### Qué entregar al hosting

En general se publica el contenido de **`dist/`** (no toda la carpeta del proyecto con `node_modules`).

> El procedimiento exacto (FTP, panel del hosting, GitHub Pages, servidor de la facultad, etc.) lo define la **unidad académica**. Documenta aquí, cuando lo sepan, el paso a paso interno:

```
TODO unidad académica:
- Hosting / servidor: _______________
- Quién tiene acceso: _______________
- Cómo subir dist/: _______________
- URL pública del sitio: _______________
```

### Después de publicar

Checklist rápida:

- [ ] Abre la URL pública
- [ ] Prueba Inicio, Soy alumno, Soy profesor, Soy egresado
- [ ] Cambia idioma ES ↔ EN
- [ ] Revisa el cambio concreto que publicaste
- [ ] En móvil o ventana estrecha, confirma que el menú hamburguesa funciona

---

## 9. Organización del código (solo lo necesario)

No hace falta memorizar todo el árbol. Orientación mínima:

| Carpeta | Para qué sirve en operación |
|---------|-----------------------------|
| `src/i18n/locales/` | Textos ES / EN |
| `src/data/` | Datos de tablas (horas complementarias) |
| `src/assets/` | Imágenes y algunos PDF |
| `public/` | Favicon y documentos servidos tal cual (p. ej. calendario) |
| `src/pages/` | Página completa por ruta |
| `src/components/` | Piezas de cada sección |
| `src/routes/` | Lista de URLs |
| `docs/mantenimiento/` | Guías detalladas por tema |

---

## 10. Qué no hacer (para no romper el sitio)

1. **No** edites a mano la carpeta `dist/` como fuente de verdad: se regenera con `npm run build`.
2. **No** subas `node_modules/` al servidor de producción como sitio: se instala con `npm install` en desarrollo; en producción suele bastar `dist/`.
3. **No** borres claves de `es.json` sin borrarlas también en `en.json` (y viceversa).
4. **No** cambies nombres de archivos de imagen/PDF sin actualizar la referencia en el código o en el archivo de datos.
5. **No** asumas que copiar un PDF a una carpeta “alcanza”: muchos contenidos hay que **registrarlos** en un archivo de datos o componente (ver guías de iframes y carruseles).

---

## 11. Checklist de recepción del proyecto

Para quien asume el mantenimiento por primera vez:

- [ ] Pude ejecutar `npm install` y `npm run dev`
- [ ] Entiendo el mapa de rutas (sección 3)
- [ ] Sé dónde están `es.json` y `en.json`
- [ ] Leí al menos las guías de i18n y de la sección que más se actualiza
- [ ] Sé cómo generar `dist/` con `npm run build`
- [ ] Tengo claro (o pedí) el procedimiento de publicación de la unidad
- [ ] Sé a quién escalar problemas de código (layout, tablas complejas, nuevas rutas)

---

## 12. Documentación relacionada

| Documento | Contenido |
|-----------|-----------|
| [`README.md`](../README.md) | Instalación, stack, estructura, rutas |
| [`mantenimiento/i18next-traducciones.md`](mantenimiento/i18next-traducciones.md) | Sistema de idiomas |
| [`mantenimiento/inicio-carrusel-convocatorias.md`](mantenimiento/inicio-carrusel-convocatorias.md) | Carrusel de inicio |
| [`mantenimiento/programa-academico-carrusel-institucional.md`](mantenimiento/programa-academico-carrusel-institucional.md) | Carrusel institucional |
| [`mantenimiento/soy-alumno-iframes-embebidos.md`](mantenimiento/soy-alumno-iframes-embebidos.md) | Calendario, tutores, prácticas |
| [`mantenimiento/soy-profesor-iframe-correos.md`](mantenimiento/soy-profesor-iframe-correos.md) | Directorio de correos |

---

## 13. Alcance de esta entrega

Este sitio se entrega como producto de **servicio social**. La documentación en `docs/` busca que otra persona pueda:

- levantar el proyecto en local
- actualizar textos e imágenes frecuentes
- generar un build
- seguir las guías de mantenimiento por sección

Los cambios de arquitectura, nuevas secciones complejas o rediseño visual requieren perfil de desarrollo web (React/TypeScript).
