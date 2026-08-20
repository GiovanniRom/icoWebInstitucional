# Programa académico — Carrusel institucional

Segmento de la página **Programa académico**, dentro de la franja azul de identidad institucional. Se ubica entre los textos `#TodosSomosUNAM` y `#HechoEnAragón`.

> **Tip:** las rutas en azul son enlaces. Al hacer clic (en Cursor, VS Code o GitHub) abres el archivo o la línea que debes editar.

---

## Comportamiento del carrusel

El carrusel **no** solo cambia cuál imagen se destaca en el mismo sitio: **rota las posiciones**.

- En cada momento se ve la imagen **central** (más grande y opaca) y, a los costados, las imágenes vecinas (más pequeñas y atenuadas).
- Cada ~5 s (o al deslizar / hacer clic en una lateral), las imágenes **se desplazan**: la que estaba a un costado pasa al centro y pasa a ser la destacada.
- La que destaca **siempre** es la que ocupa la posición central física.

Esto se logra con Ant Design Carousel (`centerMode` + `slidesToShow={1}` + `centerPadding` + `infinite`). **No** uses `slidesToShow: 3` con pocas imágenes: en ese modo suele destacarse una slide sin mover el carrusel.

Archivo del comportamiento: [`ProgramaAcademicoInstitucionalCarousel.tsx`](../../src/components/programaAcademico/ProgramaAcademicoInstitucionalCarousel.tsx)  
Estilos de centro vs laterales: [`ProgramaAcademicoInstitucionalCarousel.css`](../../src/components/programaAcademico/ProgramaAcademicoInstitucionalCarousel.css) (clases `.slick-center` vs `.slick-slide`)

---

## Ubicación de las imágenes

Coloca los archivos de imagen en:

[`src/assets/images/programaacademico/carrusel/`](../../src/assets/images/programaacademico/carrusel/)

Ejemplos actuales:

- [`carrusel1.png`](../../src/assets/images/programaacademico/carrusel/carrusel1.png)
- [`carrusel2.png`](../../src/assets/images/programaacademico/carrusel/carrusel2.png)
- [`carrusel3.png`](../../src/assets/images/programaacademico/carrusel/carrusel3.png)

**Formatos recomendados:** PNG o JPG.  
**Proporción:** horizontal o cuadrada. La imagen se escala al ancho disponible con altura máxima de ~14 rem (responsive).

> Las imágenes **no** se detectan solas al copiarlas en la carpeta. Hay que registrarlas en el archivo de datos (paso siguiente).

---

## Archivos que hay que editar

| Qué cambiar | Archivo (clic para abrir) |
|-------------|---------------------------|
| Qué imágenes muestra el carrusel | [`institucionalCarouselData.ts`](../../src/components/programaAcademico/institucionalCarouselData.ts#L12) — `INSTITUCIONAL_CAROUSEL_SLIDES` |
| Texto alternativo y etiqueta del carrusel (ES/EN) | [`es.json`](../../src/i18n/locales/es.json#L84) · [`en.json`](../../src/i18n/locales/en.json#L84) → `pages.programaAcademico.institucional` |
| Velocidad / modo de rotación (opcional) | [`ProgramaAcademicoInstitucionalCarousel.tsx`](../../src/components/programaAcademico/ProgramaAcademicoInstitucionalCarousel.tsx#L6) |
| Tamaño y apariencia (centro vs laterales) | [`ProgramaAcademicoInstitucionalCarousel.css`](../../src/components/programaAcademico/ProgramaAcademicoInstitucionalCarousel.css) |
| Espaciado alrededor del carrusel (opcional) | [`ProgramaAcademicoInstitucional.css`](../../src/components/programaAcademico/ProgramaAcademicoInstitucional.css) |

Para **solo cambiar o añadir fotos**, edita la carpeta de imágenes + [`institucionalCarouselData.ts`](../../src/components/programaAcademico/institucionalCarouselData.ts#L12) + textos alt en i18n. El componente del carrusel normalmente **no** requiere cambios.

---

## Agregar o reemplazar una imagen

### 1. Copiar la imagen

Guarda el archivo en [`src/assets/images/programaacademico/carrusel/`](../../src/assets/images/programaacademico/carrusel/), por ejemplo:

`src/assets/images/programaacademico/carrusel/carrusel4.png`

### 2. Registrarla en los datos

Edita [`institucionalCarouselData.ts`](../../src/components/programaAcademico/institucionalCarouselData.ts#L12):

```ts
import carrusel4Img from '../../assets/images/programaacademico/carrusel/carrusel4.png'

export const INSTITUCIONAL_CAROUSEL_SLIDES = [
  // ... slides existentes ...
  {
    id: 'institucional-carrusel-4',
    src: carrusel4Img,
    altKey: 'carouselSlide4',
  },
]
```

- **`id`:** identificador único (solo para React; no visible al usuario).
- **`src`:** import de la imagen (ruta bajo `images/programaacademico/carrusel/`).
- **`altKey`:** clave base para el texto alternativo en i18n (sin el sufijo `Alt`).
- El **orden** del array es el orden de rotación (izquierda → centro → derecha en el ciclo).

### 3. Texto alternativo en ambos idiomas

En [`es.json`](../../src/i18n/locales/es.json#L84), dentro de `pages.programaAcademico.institucional`:

```json
"carouselSlide4Alt": "Descripción breve de la imagen en español"
```

En [`en.json`](../../src/i18n/locales/en.json#L84), la misma clave:

```json
"carouselSlide4Alt": "Brief description of the image in English"
```

El componente usa `t('pages.programaAcademico.institucional.{altKey}Alt')`, por eso la clave debe terminar en `Alt`.

### 4. Verificar

Con el servidor de desarrollo (`npm run dev`), abre **Programa académico** y comprueba:

1. Se ven la imagen central y peeks de las laterales entre `#TodosSomosUNAM` y `#HechoEnAragón`.
2. Al pasar unos segundos, las imágenes **se mueven** y otra queda en el centro (destacada).
3. La nueva imagen entra en el ciclo (aparece en el centro en algún momento).

---

## Reemplazar una imagen existente

1. Sustituye el archivo en [`src/assets/images/programaacademico/carrusel/`](../../src/assets/images/programaacademico/carrusel/) **manteniendo el mismo nombre** (p. ej. `carrusel1.png`), **o**
2. Añade un archivo nuevo y actualiza el `import` correspondiente en [`institucionalCarouselData.ts`](../../src/components/programaAcademico/institucionalCarouselData.ts#L12).

Si solo cambias el contenido del PNG/JPG con el mismo nombre, basta con guardar el archivo; Vite recargará la vista en desarrollo.

---

## Quitar una diapositiva

Elimina la entrada del array `INSTITUCIONAL_CAROUSEL_SLIDES` en [`institucionalCarouselData.ts`](../../src/components/programaAcademico/institucionalCarouselData.ts#L12). Opcionalmente borra la imagen y las claves `carouselSlide*Alt` en los JSON de i18n.

Conviene dejar **al menos 2–3 imágenes** para que el efecto de laterales + centro se note bien.

---

## Textos de la sección (no son imágenes)

Los hashtags `#TodosSomosUNAM` y `#HechoEnAragón` se editan en i18n, no en el carrusel:

| Clave | Uso |
|-------|-----|
| `pages.programaAcademico.institucional.todosSomosUnam` | Texto superior izquierdo |
| `pages.programaAcademico.institucional.hechoEnAragon` | Texto inferior derecho |
| `pages.programaAcademico.institucional.carouselLabel` | Etiqueta de accesibilidad del carrusel |

Archivos: [`es.json`](../../src/i18n/locales/es.json#L84) y [`en.json`](../../src/i18n/locales/en.json#L84).

---

## Opciones del carrusel

En [`ProgramaAcademicoInstitucionalCarousel.tsx`](../../src/components/programaAcademico/ProgramaAcademicoInstitucionalCarousel.tsx):

| Constante / prop | Valor actual | Efecto |
|------------------|--------------|--------|
| `AUTOPLAY_MS` | `5000` | Milisegundos entre cambios (5 s) |
| `autoplay` | `true` | Rotación automática de posiciones |
| `centerMode` | `true` | Destaca siempre la imagen en el centro físico |
| `slidesToShow` | `1` | Una imagen en el centro; las demás se asoman a los costados |
| `centerPadding` | `28%` (desktop) / `16%` (móvil) | Cuánto se ve de las imágenes vecinas |
| `infinite` | `true` | Bucle continuo |
| `focusOnSelect` | `true` | Clic en una lateral la lleva al centro |
| `draggable` | `true` | Permite deslizar con el mouse (Ant Design v6 lo desactiva por defecto) |
| `pauseOnHover` | `false` | El autoplay no se detiene al pasar el cursor |
| `pauseOnFocus` | `false` | El autoplay no se detiene al enfocar una diapositiva |

Para que se vea **más** o **menos** de las laterales, ajusta `centerPadding` (porcentaje mayor = más peek lateral).

Para opacidad/escala del centro vs laterales, edita las reglas `.slick-slide` y `.slick-center` en el CSS.

El autoplay se reactiva al entrar en pantalla (Intersection Observer) por si la sección queda fuera del viewport al cargar la página.

---

## Resumen rápido

| Paso | Ir a |
|------|------|
| Imagen nueva | [`src/assets/images/programaacademico/carrusel/`](../../src/assets/images/programaacademico/carrusel/) |
| Registro | [`institucionalCarouselData.ts`](../../src/components/programaAcademico/institucionalCarouselData.ts#L12) |
| Texto alt | [`es.json`](../../src/i18n/locales/es.json#L84) + [`en.json`](../../src/i18n/locales/en.json#L84) |
| Comportamiento (rotar centro) | [`ProgramaAcademicoInstitucionalCarousel.tsx`](../../src/components/programaAcademico/ProgramaAcademicoInstitucionalCarousel.tsx) |
| Hashtags | mismas claves i18n (`todosSomosUnam` / `hechoEnAragon`) |
