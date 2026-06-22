import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import alumnoIcon from '../../assets/images/inicio/alumnoicon.png'
import horariosIcon from '../../assets/images/alumno/horariosicon.png'
import calendarioIcon from '../../assets/images/alumno/calendarioicon.png'
import tutoresIcon from '../../assets/images/alumno/tutoresicon.png'
import horariosLabIcon from '../../assets/images/alumno/horarioslabicon.png'
import './SoyAlumnoNavegacion.css'

const SECCIONES = [
  { icon: horariosIcon, labelKey: 'horarios', to: '/soy-alumno/horarios' },
  { id: 'seccion-calendario', icon: calendarioIcon, labelKey: 'calendario' },
  { id: 'seccion-tutores', icon: tutoresIcon, labelKey: 'tutores' },
  { id: 'seccion-redes', icon: horariosLabIcon, labelKey: 'redes' },
] as const

function scrollToSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

export function SoyAlumnoNavegacion() {
  const { t } = useTranslation()

  return (
    <nav
      className="soy-alumno-nav"
      aria-label={t('pages.soyAlumno.navegacion.label')}
    >
      <div className="soy-alumno-nav__identidad">
        <div className="soy-alumno-nav__tooltip-envoltorio">
          <img
            src={alumnoIcon}
            alt=""
            className="soy-alumno-nav__icono-principal"
            draggable={false}
            aria-describedby="soy-alumno-nav-tooltip"
            tabIndex={0}
          />
          <div
            id="soy-alumno-nav-tooltip"
            className="soy-alumno-nav__tooltip"
            role="tooltip"
          >
            {t('pages.soyAlumno.navegacion.tooltipPrincipal')}
          </div>
        </div>
        <h1 className="soy-alumno-nav__titulo">{t('pages.soyAlumno.title')}</h1>
      </div>

      <ul className="soy-alumno-nav__secciones">
        {SECCIONES.map((seccion) => {
          const etiqueta = t(`pages.soyAlumno.navegacion.${seccion.labelKey}`)
          const contenido = (
            <>
              <span className="soy-alumno-nav__icono-contenedor">
                <img
                  src={seccion.icon}
                  alt=""
                  className="soy-alumno-nav__icono"
                  draggable={false}
                />
              </span>
              <span className="soy-alumno-nav__etiqueta">{etiqueta}</span>
            </>
          )

          return (
            <li key={'to' in seccion ? seccion.to : seccion.id} className="soy-alumno-nav__item">
              {'to' in seccion ? (
                <Link
                  to={seccion.to}
                  className="soy-alumno-nav__boton"
                  aria-label={etiqueta}
                >
                  {contenido}
                </Link>
              ) : (
                <button
                  type="button"
                  className="soy-alumno-nav__boton"
                  onClick={() => scrollToSection(seccion.id)}
                  aria-label={etiqueta}
                >
                  {contenido}
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
