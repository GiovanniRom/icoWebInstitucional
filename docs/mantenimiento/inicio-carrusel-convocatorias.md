# Inicio — Carrusel de convocatorias

Segmento visible en la página de inicio, justo debajo del header. Muestra imágenes de convocatorias en rotación automática.

## Ubicación de las imágenes

Coloca los archivos de imagen en:

```
src/assets/images/inicio/
```

Ejemplos actuales:

- `convocatoria.png`
- `convocatoria2.png`

**Formatos recomendados:** PNG o JPG.  
**Proporción:** horizontal (banner). La imagen se escala al ancho de la pantalla con altura máxima de ~520 px o 55 % del viewport.

> Las imágenes **no** se detectan solas al copiarlas en la carpeta. Hay que registrarlas en el archivo de datos (paso siguiente).

---

## Archivos que hay que editar

| Qué cambiar | Archivo |
|-------------|---------|
| Qué imágenes muestra el carrusel | `src/components/inicio/convocatoriasData.ts` |
| Texto alternativo (accesibilidad, ES/EN) | `src/i18n/locales/es.json` y `src/i18n/locales/en.json` |
| Velocidad de rotación (opcional) | `src/components/inicio/ConvocatoriasCarousel.tsx` |
| Estilos visuales (opcional) | `src/components/inicio/ConvocatoriasCarousel.css` |

El componente que renderiza el carrusel (`ConvocatoriasCarousel.tsx`) normalmente **no** requiere cambios al actualizar contenido.

---

## Agregar o reemplazar una imagen

### 1. Copiar la imagen

Guarda el archivo en `src/assets/images/inicio/`, por ejemplo:

```
src/assets/images/inicio/convocatoria3.png
```

### 2. Registrarla en los datos

Edita `src/components/inicio/convocatoriasData.ts`:

```ts
import convocatoria3Img from '../../assets/images/inicio/convocatoria3.png'

export const CONVOCATORIAS_SLIDES = [
  // ... slides existentes ...
  {
    id: 'convocatoria-3',
    src: convocatoria3Img,
    altKey: 'convocatoria3',
  },
]
```

- **`id`:** identificador único (solo para React; no visible al usuario).
- **`src`:** import de la imagen.
- **`altKey`:** clave base para el texto alternativo en i18n (sin el sufijo `Alt`).

### 3. Texto alternativo en ambos idiomas

En `src/i18n/locales/es.json`, dentro de `pages.inicio`:

```json
"convocatoria3Alt": "Descripción breve de la convocatoria en español"
```

En `src/i18n/locales/en.json`, la misma clave:

```json
"convocatoria3Alt": "Brief description of the announcement in English"
```

El componente usa `t('pages.inicio.{altKey}Alt')`, por eso la clave debe terminar en `Alt`.

### 4. Verificar

Con el servidor de desarrollo (`npm run dev`), recarga la página de inicio y comprueba que la nueva diapositiva aparece y rota correctamente.

---

## Reemplazar una imagen existente

1. Sustituye el archivo en `src/assets/images/inicio/` **manteniendo el mismo nombre** (p. ej. `convocatoria.png`), **o**
2. Añade un archivo nuevo y actualiza el `import` correspondiente en `convocatoriasData.ts`.

Si solo cambias el contenido del PNG/JPG con el mismo nombre, basta con guardar el archivo; Vite recargará la vista en desarrollo.

---

## Quitar una diapositiva

Elimina la entrada del array `CONVOCATORIAS_SLIDES` en `convocatoriasData.ts`. Opcionalmente borra la imagen y las claves `*Alt` en los JSON de i18n.

---

## Opciones del carrusel

En `ConvocatoriasCarousel.tsx`:

| Constante / prop | Valor actual | Efecto |
|------------------|--------------|--------|
| `AUTOPLAY_MS` | `5000` | Milisegundos entre cambios (5 s) |
| `autoplay` | `true` | Rotación automática |
| `effect` | `"fade"` | Transición entre slides |
| `pauseOnHover` | `true` | Pausa al pasar el cursor |

---

## Resumen rápido

```
Imagen nueva  →  src/assets/images/inicio/
Registro      →  src/components/inicio/convocatoriasData.ts
Texto alt     →  src/i18n/locales/es.json + en.json  (pages.inicio.*Alt)
```
