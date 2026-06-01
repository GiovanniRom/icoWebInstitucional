import { useTranslation } from 'react-i18next'
import alumnoIcon from '../../assets/images/inicio/alumnoicon.png'
import horariosIcon from '../../assets/images/alumno/horariosicon.png'
import calendarioIcon from '../../assets/images/alumno/calendarioicon.png'
import tutoresIcon from '../../assets/images/alumno/tutoresicon.png'
import horariosLabIcon from '../../assets/images/alumno/horarioslabicon.png'
import './SoyAlumnoNavegacion.css'

const SECCIONES = [
  { id: 'seccion-horarios', icon: horariosIcon, labelKey: 'horarios' },
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
      </div>

      <ul className="soy-alumno-nav__secciones">
        {SECCIONES.map(({ id, icon, labelKey }) => (
          <li key={id} className="soy-alumno-nav__item">
            <button
              type="button"
              className="soy-alumno-nav__boton"
              onClick={() => scrollToSection(id)}
              aria-label={t(`pages.soyAlumno.navegacion.${labelKey}`)}
            >
              <span className="soy-alumno-nav__icono-contenedor">
                <img
                  src={icon}
                  alt=""
                  className="soy-alumno-nav__icono"
                  draggable={false}
                />
              </span>
              <span className="soy-alumno-nav__etiqueta">
                {t(`pages.soyAlumno.navegacion.${labelKey}`)}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
