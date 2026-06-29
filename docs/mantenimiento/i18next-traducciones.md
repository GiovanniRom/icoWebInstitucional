# Internacionalización (i18next)

El sitio usa **i18next** con **react-i18next** para mostrar textos en español e inglés. El idioma se cambia desde el interruptor **ES / EN** del header y se recuerda en el navegador.

---

## Archivos del sistema de traducción

| Archivo | Función |
|---------|---------|
| `src/i18n/index.ts` | Configuración de i18next, carga de idiomas y función `setLanguage` |
| `src/i18n/locales/es.json` | **Todas las claves en español** |
| `src/i18n/locales/en.json` | **Todas las claves en inglés** (misma estructura que `es.json`) |
| `src/components/LanguageToggle.tsx` | Botón ES/EN del header |
| `src/main.tsx` | Importa `./i18n` al arrancar la aplicación |

---

## Cómo funciona

### 1. Inicialización

Al cargar la app, `src/i18n/index.ts`:

1. Lee el idioma guardado en `localStorage` (clave `ico-lang`).
2. Si no hay valor válido, usa **español** (`es`) por defecto.
3. Registra los recursos `es` y `en` importados desde los JSON.
4. Define **español como idioma de respaldo** (`fallbackLng: 'es'`): si falta una clave en inglés, i18next muestra la versión en español.

```ts
resources: {
  es: { translation: es },
  en: { translation: en },
},
lng: initialLang,
fallbackLng: 'es',
```

### 2. Uso en componentes React

Los componentes obtienen textos con el hook `useTranslation`:

```tsx
import { useTranslation } from 'react-i18next'

export function MiComponente() {
  const { t } = useTranslation()

  return <h1>{t('pages.inicio.title')}</h1>
}
```

- **`t('clave.anidada')`** — devuelve el texto del idioma activo.
- **`t('clave', { num: 3 })`** — reemplaza variables como `{{num}}` en el JSON.
- **`i18n.language`** — código del idioma actual (`es`, `en`, …).
- **`i18n.exists('clave')`** — comprueba si una clave existe (útil para textos opcionales).

Ejemplo con interpolación (prácticas de redes):

```json
"practica": "Práctica {{num}}"
```

```tsx
t('pages.soyAlumno.practicaRedes.practica', { num: 2 })
// → "Práctica 2"
```

### 3. Cambio de idioma

`LanguageToggle` alterna entre español e inglés llamando a:

```ts
setLanguage('es' | 'en')
```

Esa función:

1. Ejecuta `i18n.changeLanguage(lang)`.
2. Guarda la preferencia en `localStorage` (`ico-lang`).

Los componentes que usan `t()` se re-renderizan automáticamente con el nuevo idioma.

---

## Dónde están las claves

Ambos archivos comparten **exactamente la misma jerarquía de claves**. Solo cambian los valores traducidos.

```
src/i18n/locales/es.json   ← español
src/i18n/locales/en.json   ← inglés
```

### Secciones principales (raíz del JSON)

| Sección | Contenido |
|---------|-----------|
| `nav` | Menú de navegación, logos, título del programa en header |
| `schedulesView` | Títulos del iframe de horarios |
| `tutorsView` | Títulos del iframe de tutores |
| `language` | Etiquetas «ES» y «EN» del interruptor de idioma |
| `pages` | Textos por página del sitio |
| `footer` | Pie de página (contacto, redes, aniversario) |

### Dentro de `pages`

| Clave | Página |
|-------|--------|
| `pages.inicio` | Inicio (carrusel, accesos, enlaces) |
| `pages.programaAcademico` | Programa académico (cabecera, filas, carrusel institucional, misión/visión) |
| `pages.soyAlumno` | Soy alumno (calendario, accesos, prácticas de redes, extraordinarios) |
| `pages.soyProfesor` | Soy profesor (directorio de correos) |
| `pages.soyEgresado` | Soy egresado (pasos, documentación, modalidades de titulación, pasos detallados) |

### Convención de nombres

- Claves en **camelCase**: `tituloCorreos`, `carouselSlide1Alt`.
- Rutas con **punto** en código: `t('pages.soyAlumno.calendarioEscolar')` → objeto anidado en JSON.
- Textos de **accesibilidad** (`alt`, `ariaLabel`, `iframeTitle`) van en i18n igual que el resto.
- Claves **dinámicas** construidas en código (p. ej. `pages.soyEgresado.documentacionBasica.documentos.${docKey}.texto`) deben existir en ambos JSON.

---

## Agregar o editar una traducción (ES / EN)

### Pasos

1. Identifica la clave usada en el componente: busca `t('…')` en el `.tsx` correspondiente.
2. Añade o modifica la clave en **`es.json`** con el texto en español.
3. Añade la **misma clave** en **`en.json`** con el texto en inglés.
4. Recarga la app y alterna ES/EN para comprobar ambos idiomas.

### Ejemplo: nuevo texto en Soy alumno

En `es.json`, dentro de `pages.soyAlumno`:

```json
"nuevoAviso": "Consulta el reglamento actualizado."
```

En `en.json`, misma ruta:

```json
"nuevoAviso": "Check the updated regulations."
```

En el componente:

```tsx
{t('pages.soyAlumno.nuevoAviso')}
```

> **Regla:** toda clave nueva debe existir en **los dos** archivos. Si falta en inglés, i18next mostrará el fallback en español.

---

## Contenido que NO pasa por i18n

Algunos bloques embebidos en iframe llevan el texto **dentro del HTML** del componente, no en los JSON:

| Contenido | Archivo | Idioma actual |
|-----------|---------|---------------|
| Directorio de correos (Soy profesor) | `src/components/embeded/correo.tsx` | Solo español en el HTML embebido |
| Búsqueda de tutores | `src/components/embeded/tutores.tsx` | Solo español |
| Horarios | `src/components/embeded/horarios.tsx` | Solo español |

Para traducir esos bloques habría que duplicar el HTML por idioma o generar el `srcDoc` según `i18n.language` (no está implementado hoy).

El archivo `src/data/guiaTitulacion.json` es **referencia de contenido**; los textos visibles de titulación están en `pages.soyEgresado` dentro de `es.json` / `en.json`.

---

## Agregar un tercer idioma (ejemplo: francés `fr`)

Hoy el sitio solo expone **es** y **en**. Para añadir otro idioma hay que tocar varios puntos:

### 1. Crear el archivo de traducción

Copia la estructura completa de `es.json`:

```
src/i18n/locales/fr.json
```

Traduce **todos** los valores manteniendo las mismas claves.

### 2. Registrar el idioma en i18n

Edita `src/i18n/index.ts`:

```ts
import fr from './locales/fr.json'

// En resources:
fr: { translation: fr },

// Ampliar setLanguage:
export function setLanguage(lang: 'es' | 'en' | 'fr') {
  void i18n.changeLanguage(lang)
  localStorage.setItem(STORAGE_KEY, lang)
}

// Ampliar validación del idioma guardado:
const initialLang =
  savedLang === 'en' || savedLang === 'es' || savedLang === 'fr'
    ? savedLang
    : 'es'
```

### 3. Actualizar el selector de idioma

`LanguageToggle.tsx` hoy solo alterna ES ↔ EN. Para tres o más idiomas conviene sustituirlo por un `<select>` o botones por idioma, y añadir en cada JSON:

```json
"language": {
  "es": "ES",
  "en": "EN",
  "fr": "FR"
}
```

### 4. Revisar textos fijos fuera de i18n

- `aria-label` hardcodeados en `LanguageToggle.tsx`.
- HTML embebido en iframes (correo, tutores, horarios).
- Atributo `lang` del `<html>` en esos iframes (`lang="es"`).

### 5. Verificar

1. `npm run build` — JSON mal formado rompe la compilación.
2. Probar cada página en el nuevo idioma.
3. Buscar claves huérfanas: textos que siguen en español indican claves faltantes en el nuevo JSON.

---

## Resumen rápido

```
Configuración     →  src/i18n/index.ts
Español           →  src/i18n/locales/es.json
Inglés            →  src/i18n/locales/en.json
Uso en UI         →  useTranslation() + t('ruta.de.clave')
Cambio de idioma  →  LanguageToggle → setLanguage() → localStorage 'ico-lang'
Idioma por defecto / fallback  →  es (español)
Nuevo idioma      →  nuevo JSON + registrar en index.ts + ampliar selector
```

### Checklist al mantener traducciones

- [ ] Misma clave en `es.json` y `en.json`
- [ ] Probar ES y EN en la pantalla afectada
- [ ] Si el texto lleva variables, usar `{{nombre}}` y pasar el objeto a `t()`
- [ ] Textos de accesibilidad (`Alt`, `ariaLabel`, `title` de iframes) también en i18n
- [ ] Contenido dentro de iframes HTML: recordar que hoy no se traduce solo con los JSON
