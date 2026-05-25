import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import programaAcademicoIcon from '../../assets/images/inicio/programaacademico.png'
import alumnoIcon from '../../assets/images/inicio/alumnoicon.png'
import profesorIcon from '../../assets/images/inicio/profesoricon.png'
import egresadoIcon from '../../assets/images/inicio/egresadoicon.png'
import './InicioAccesos.css'

const ACCESOS = [
  {
    id: 'programa-academico',
    src: programaAcademicoIcon,
    labelKey: 'programaAcademico',
    to: '/programa-academico',
  },
  {
    id: 'soy-alumno',
    src: alumnoIcon,
    labelKey: 'soyAlumno',
    to: '/soy-alumno',
  },
  {
    id: 'soy-profesor',
    src: profesorIcon,
    labelKey: 'soyProfesor',
    to: '/soy-profesor',
  },
  {
    id: 'soy-egresado',
    src: egresadoIcon,
    labelKey: 'soyEgresado',
    to: '/soy-egresado',
  },
] as const

export function InicioAccesos() {
  const { t } = useTranslation()

  return (
    <nav
      className="inicio-accesos"
      aria-label={t('pages.inicio.accesos.navLabel')}
    >
      <ul className="inicio-accesos__lista">
        {ACCESOS.map(({ id, src, labelKey, to }) => (
          <li key={id} className="inicio-accesos__item">
            <Link
              to={to}
              className="inicio-accesos__enlace"
              aria-label={t(`pages.inicio.accesos.${labelKey}`)}
            >
              <span className="inicio-accesos__tarjeta">
                <span className="inicio-accesos__imagen-contenedor">
                  <img
                    src={src}
                    alt=""
                    className="inicio-accesos__imagen"
                    draggable={false}
                  />
                </span>
                <span className="inicio-accesos__titulo">
                  {t(`pages.inicio.accesos.${labelKey}`)}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
