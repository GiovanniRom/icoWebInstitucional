# ICO FES Aragón — Sitio web institucional

Sitio web institucional de la carrera de **Ingeniería en Computación** de la **FES Aragón, UNAM**.

Permite consultar información académica y de servicios para:

- aspirantes y comunidad general (**Inicio**, **Programa académico**)
- alumnado (**Soy alumno**)
- profesorado (**Soy profesor**)
- egresados (**Soy egresado**)

El contenido está disponible en **español** e **inglés**.

---

## Stack técnico

| Tecnología | Uso |
|------------|-----|
| [React](https://react.dev/) 19 | Interfaz de usuario |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático |
| [Vite](https://vite.dev/) 8 | Desarrollo y empaquetado |
| [React Router](https://reactrouter.com/) | Navegación por rutas |
| [i18next](https://www.i18next.com/) + react-i18next | Traducciones ES / EN |

---

## Requisitos

- **Node.js** 20 o superior (recomendado LTS)
- **npm** (incluido con Node.js)

Comprueba las versiones:

```bash
node -v
npm -v
```

---

## Instalación y arranque

Desde la raíz del repositorio:

```bash
# 1. Instalar dependencias
npm install

# 2. Servidor de desarrollo (con recarga en caliente)
npm run dev
```

Por defecto Vite abre en `http://localhost:5173` (el puerto puede variar si está ocupado).

### Otros comandos

| Comando | Descripción |
|---------|-------------|
| `npm run build` | Compila TypeScript y genera la carpeta `dist/` para producción |
| `npm run preview` | Sirve localmente el build de producción (`dist/`) |
| `npm run lint` | Ejecuta ESLint sobre el código |

---

## Estructura del proyecto

```
icoWebInstitucional/
├── public/                 # Archivos estáticos (favicon, etc.)
├── docs/mantenimiento/     # Guías de mantenimiento por sección
├── src/
│   ├── assets/             # Imágenes, PDF y recursos visuales
│   ├── components/         # Componentes por área (alumno, egresado, layout, …)
│   ├── data/               # Datos editables (p. ej. tablas de horas)
│   ├── i18n/               # Configuración y archivos de traducción
│   │   └── locales/        # es.json / en.json
│   ├── pages/              # Páginas asociadas a las rutas
│   ├── routes/             # Definición de rutas (AppRoutes.tsx)
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
└── README.md
```

---

## Rutas principales

| Ruta | Página |
|------|--------|
| `/` | Inicio |
| `/programa-academico` | Programa académico |
| `/soy-alumno` | Soy alumno |
| `/soy-alumno/horarios` | Horarios |
| `/soy-alumno/extraordinarios` | Extraordinarios |
| `/soy-alumno/horas-comp` | Horas de formación complementaria |
| `/soy-profesor` | Soy profesor |
| `/soy-egresado` | Soy egresado |

Las rutas se definen en `src/routes/AppRoutes.tsx`.

---

## Idioma (ES / EN)

- El interruptor **ES / EN** está en el header.
- Los textos de interfaz viven en:
  - `src/i18n/locales/es.json`
  - `src/i18n/locales/en.json`
- El idioma elegido se guarda en el navegador (`localStorage`, clave `ico-lang`).

Guía detallada: [`docs/mantenimiento/i18next-traducciones.md`](docs/mantenimiento/i18next-traducciones.md).

---

## Guía de entrega (operación)

Si recibes el repositorio por primera vez y debes operarlo o actualizar contenido, empieza aquí:

- **[`docs/ENTREGA.md`](docs/ENTREGA.md)** — guía de operación para quien no conoce el proyecto (primeros pasos, mapa del sitio, tareas frecuentes, publicación y checklist de recepción).

## Documentación de mantenimiento

Guías prácticas para actualizar contenido sin reescribir la aplicación:

| Documento | Tema |
|-----------|------|
| [Carrusel de convocatorias (Inicio)](docs/mantenimiento/inicio-carrusel-convocatorias.md) | Imágenes y datos del carrusel de inicio |
| [Carrusel institucional (Programa académico)](docs/mantenimiento/programa-academico-carrusel-institucional.md) | Carrusel entre secciones institucionales |
| [Iframes embebidos (Soy alumno)](docs/mantenimiento/soy-alumno-iframes-embebidos.md) | Calendario, tutores, prácticas / Drive |
| [Directorio de correos (Soy profesor)](docs/mantenimiento/soy-profesor-iframe-correos.md) | Iframe de correos institucionales |
| [Traducciones i18next](docs/mantenimiento/i18next-traducciones.md) | Cómo agregar o corregir textos ES / EN |

> **Nota:** otras secciones frecuentes de edición (por ejemplo, tablas de horas de formación complementaria en `src/data/horasCompTablas.*.json`) se irán documentando en esta misma carpeta.

---

## Edición frecuente de contenido

| Qué actualizar | Dónde |
|----------------|-------|
| Textos de interfaz | `src/i18n/locales/es.json` y `en.json` |
| Convocatorias del inicio | `src/components/inicio/convocatoriasData.ts` + imágenes en `src/assets/images/inicio/` |
| Carrusel institucional | `src/components/programaAcademico/institucionalCarouselData.ts` |
| Tablas de horas complementarias | `src/data/horasCompTablas.es.json` y `horasCompTablas.en.json` |
| Favicon y título de pestaña | `public/favicon.png` e `index.html` |

---

## Build de producción

```bash
npm run build
```

El resultado queda en `dist/`. Esa carpeta es la que se publica en el servidor o hosting estático que indique la unidad académica.

Para revisar el build en local:

```bash
npm run preview
```

---

## Contacto y continuidad

Este repositorio se entrega como producto del **servicio social**.

Orden recomendado para quien hereda el proyecto:

1. Este **README** (instalación y visión general)
2. **[`docs/ENTREGA.md`](docs/ENTREGA.md)** (operación día a día)
3. Las guías en **`docs/mantenimiento/`** según la tarea

Si se agrega documentación nueva, conviene enlazarla aquí y en `docs/ENTREGA.md`.
