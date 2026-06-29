import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import culturalesImg from '../assets/images/horascomp/culturales.svg'
import deportivasImg from '../assets/images/horascomp/deportivas.svg'
import emprendimientoImg from '../assets/images/horascomp/emprendimiento.svg'
import investigacionImg from '../assets/images/horascomp/investigacion.svg'
import { HorasCompTabla } from '../components/alumno/HorasCompTabla'
import './horascomp.css'

const CATEGORIAS = [
  { id: 'culturales', src: culturalesImg, altKey: 'culturalesAlt' },
  { id: 'deportivas', src: deportivasImg, altKey: 'deportivasAlt' },
  { id: 'emprendimiento', src: emprendimientoImg, altKey: 'emprendimientoAlt' },
  { id: 'investigacion', src: investigacionImg, altKey: 'investigacionAlt' },
] as const

type CategoriaId = (typeof CATEGORIAS)[number]['id']

export function HorasCompPage() {
  const { t } = useTranslation()
  const [categoriaActiva, setCategoriaActiva] = useState<CategoriaId | null>(null)

  const alternarCategoria = (id: CategoriaId) => {
    setCategoriaActiva((actual) => (actual === id ? null : id))
  }

  return (
    <div className="horascomp-page">
      <div className="horascomp-page__barra">
        <Link to="/soy-alumno" className="horascomp-page__volver">
          {t('pages.soyAlumno.formacionComp.volver')}
        </Link>
      </div>
      <div className="horascomp-page__titulo-cabecera">
        <h1 className="horascomp-page__titulo-texto">
          {t('pages.soyAlumno.formacionComp.pageTitle')}
        </h1>
      </div>
      <article className="page-shell horascomp-page__content">
        <p className="horascomp-page__intro">
          {t('pages.soyAlumno.formacionComp.intro')}
        </p>
        <ul className="horascomp-page__categorias" aria-label={t('pages.soyAlumno.formacionComp.categoriasLabel')}>
          {CATEGORIAS.map(({ id, src, altKey }) => {
            const activa = categoriaActiva === id

            return (
              <li key={id} className="horascomp-page__categoria-item">
                <button
                  type="button"
                  className={`horascomp-page__categoria${activa ? ' horascomp-page__categoria--activa' : ''}`}
                  aria-pressed={activa}
                  aria-label={t(`pages.soyAlumno.formacionComp.${altKey}`)}
                  onClick={() => alternarCategoria(id)}
                >
                  <span className="horascomp-page__categoria-titulo" aria-hidden="true">
                    {t(`pages.soyAlumno.formacionComp.${id}Titulo`)}
                  </span>
                  <img
                    src={src}
                    alt=""
                    className="horascomp-page__categoria-imagen"
                    draggable={false}
                  />
                </button>
              </li>
            )
          })}
        </ul>
        <p className="horascomp-page__categorias-ayuda">
          {t('pages.soyAlumno.formacionComp.categoriasAyuda')}
        </p>

        {categoriaActiva ? (
          <section
            className="horascomp-page__detalle"
            aria-labelledby="horascomp-detalle-titulo"
          >
            <hr className="horascomp-page__separador" />
            <h2 id="horascomp-detalle-titulo" className="horascomp-page__detalle-titulo">
              {t(`pages.soyAlumno.formacionComp.${categoriaActiva}Titulo`)}
            </h2>
            <p className="horascomp-page__detalle-texto">
              {t(`pages.soyAlumno.formacionComp.${categoriaActiva}Texto`)}
            </p>
            <HorasCompTabla categoriaId={categoriaActiva} />
          </section>
        ) : null}
      </article>
    </div>
  )
}
