# Programa académico — Carrusel institucional

Segmento de la página **Programa académico**, dentro de la franja azul de identidad institucional. Se ubica entre los textos `#TodosSomosUNAM` y `#HechoEnAragón`, y muestra imágenes en rotación automática.

---

## Ubicación de las imágenes

Coloca los archivos de imagen preferentemente en:

```
src/assets/images/programaacademico/
```

También puedes reutilizar imágenes de otras carpetas del proyecto (por ejemplo `src/assets/images/inicio/`), siempre que las registres con un `import` en el archivo de datos.

**Imágenes actuales del carrusel:**

| Archivo | Ruta |
|---------|------|
| Cuerpo académico | `src/assets/images/programaacademico/profesores.png` |
| Programa académico | `src/assets/images/inicio/programaacademico.png` |

**Formatos recomendados:** PNG o JPG.  
**Proporción:** horizontal o cuadrada. La imagen se escala al ancho disponible con altura máxima de ~14 rem (responsive).

> Las imágenes **no** se detectan solas al copiarlas en la carpeta. Hay que registrarlas en el archivo de datos (paso siguiente).

---

## Archivos que hay que editar

| Qué cambiar | Archivo |
|-------------|---------|
| Qué imágenes muestra el carrusel | `src/components/programaAcademico/institucionalCarouselData.ts` |
| Texto alternativo y etiqueta del carrusel (ES/EN) | `src/i18n/locales/es.json` y `src/i18n/locales/en.json` |
| Velocidad de rotación (opcional) | `src/components/programaAcademico/ProgramaAcademicoInstitucionalCarousel.tsx` |
| Tamaño y apariencia de las imágenes (opcional) | `src/components/programaAcademico/ProgramaAcademicoInstitucionalCarousel.css` |
| Espaciado alrededor del carrusel (opcional) | `src/components/programaAcademico/ProgramaAcademicoInstitucional.css` |

El componente contenedor (`ProgramaAcademicoInstitucional.tsx`) y el carrusel (`ProgramaAcademicoInstitucionalCarousel.tsx`) normalmente **no** requieren cambios al actualizar contenido.

---

## Agregar o reemplazar una imagen

### 1. Copiar la imagen

Guarda el archivo en `src/assets/images/programaacademico/`, por ejemplo:

```
src/assets/images/programaacademico/galeria-institucional-3.png
```

### 2. Registrarla en los datos

Edita `src/components/programaAcademico/institucionalCarouselData.ts`:

```ts
import galeria3Img from '../../assets/images/programaacademico/galeria-institucional-3.png'

export const INSTITUCIONAL_CAROUSEL_SLIDES = [
  // ... slides existentes ...
  {
    id: 'institucional-galeria-3',
    src: galeria3Img,
    altKey: 'carouselSlide3',
  },
]
```

- **`id`:** identificador único (solo para React; no visible al usuario).
- **`src`:** import de la imagen.
- **`altKey`:** clave base para el texto alternativo en i18n (sin el sufijo `Alt`).

### 3. Texto alternativo en ambos idiomas

En `src/i18n/locales/es.json`, dentro de `pages.programaAcademico.institucional`:

```json
"carouselSlide3Alt": "Descripción breve de la imagen en español"
```

En `src/i18n/locales/en.json`, la misma clave:

```json
"carouselSlide3Alt": "Brief description of the image in English"
```

El componente usa `t('pages.programaAcademico.institucional.{altKey}Alt')`, por eso la clave debe terminar en `Alt`.

### 4. Verificar

Con el servidor de desarrollo (`npm run dev`), abre la página **Programa académico** y comprueba que la nueva diapositiva aparece y rota correctamente entre `#TodosSomosUNAM` y `#HechoEnAragón`.

---

## Reemplazar una imagen existente

1. Sustituye el archivo en su carpeta **manteniendo el mismo nombre** (p. ej. `profesores.png`), **o**
2. Añade un archivo nuevo y actualiza el `import` correspondiente en `institucionalCarouselData.ts`.

Si solo cambias el contenido del PNG/JPG con el mismo nombre, basta con guardar el archivo; Vite recargará la vista en desarrollo.

---

## Quitar una diapositiva

Elimina la entrada del array `INSTITUCIONAL_CAROUSEL_SLIDES` en `institucionalCarouselData.ts`. Opcionalmente borra la imagen y las claves `carouselSlide*Alt` en los JSON de i18n.

---

## Textos de la sección (no son imágenes)

Los hashtags `#TodosSomosUNAM` y `#HechoEnAragón` se editan en i18n, no en el carrusel:

| Clave | Uso |
|-------|-----|
| `pages.programaAcademico.institucional.todosSomosUnam` | Texto superior izquierdo |
| `pages.programaAcademico.institucional.hechoEnAragon` | Texto inferior derecho |
| `pages.programaAcademico.institucional.carouselLabel` | Etiqueta de accesibilidad del carrusel |

Archivos: `src/i18n/locales/es.json` y `en.json`.

---

## Opciones del carrusel

En `ProgramaAcademicoInstitucionalCarousel.tsx`:

| Constante / prop | Valor actual | Efecto |
|------------------|--------------|--------|
| `AUTOPLAY_MS` | `5000` | Milisegundos entre cambios (5 s) |
| `autoplay` | `true` | Rotación automática |
| `effect` | `"fade"` | Transición entre slides |
| `pauseOnHover` | `true` | Pausa al pasar el cursor |

---

## Resumen rápido

```
Imagen nueva  →  src/assets/images/programaacademico/
Registro      →  src/components/programaAcademico/institucionalCarouselData.ts
Texto alt     →  src/i18n/locales/es.json + en.json  (pages.programaAcademico.institucional.*Alt)
Hashtags      →  src/i18n/locales/es.json + en.json  (todosSomosUnam / hechoEnAragon)
```
