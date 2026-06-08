import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import evalProfIcon from '../../assets/images/alumno/evalproficon.png'
import horariosLabIcon from '../../assets/images/alumno/horarioslabicon.png'
import extraIcon from '../../assets/images/alumno/extraicon.png'
import formacionIcon from '../../assets/images/alumno/formacionicon.png'
import './AlumnoAccesos.css'

const ACCESOS = [
  {
    id: 'evalProf',
    src: evalProfIcon,
    labelKey: 'evalProf',
    href: 'https://ingenierias-aragon.net/ICO/evaluacionProfesores.php',
  },
  {
    id: 'horariosLab',
    src: horariosLabIcon,
    labelKey: 'horariosLab',
    href: 'https://sites.google.com/aragon.unam.mx/laboratorio-l3/horarios?authuser=0',
  },
  { id: 'extra', src: extraIcon, labelKey: 'extra', to: '/soy-alumno/extraordinarios' },
  { id: 'formacion', src: formacionIcon, labelKey: 'formacion' },
] as const

export function AlumnoAccesos() {
  const { t } = useTranslation()

  return (
    <nav
      className="alumno-accesos"
      aria-label={t('pages.soyAlumno.accesos.navLabel')}
    >
      <ul className="alumno-accesos__lista">
        {ACCESOS.map(({ id, src, labelKey, ...rest }) => {
          const ariaLabel = t(`pages.soyAlumno.accesos.${labelKey}`)
          const tarjeta = (
            <span className="alumno-accesos__tarjeta">
              <span className="alumno-accesos__titulo">
                <span className="alumno-accesos__titulo-linea">
                  {t(`pages.soyAlumno.accesos.${labelKey}Line1`)}
                </span>
                <span className="alumno-accesos__titulo-linea">
                  {t(`pages.soyAlumno.accesos.${labelKey}Line2`)}
                </span>
              </span>
              <img
                src={src}
                alt=""
                className="alumno-accesos__imagen"
                draggable={false}
              />
            </span>
          )

          return (
            <li key={id} className="alumno-accesos__item">
              {'to' in rest && rest.to ? (
                <Link to={rest.to} className="alumno-accesos__boton alumno-accesos__boton--enlace" aria-label={ariaLabel}>
                  {tarjeta}
                </Link>
              ) : 'href' in rest && rest.href ? (
                <a
                  href={rest.href}
                  className="alumno-accesos__boton alumno-accesos__boton--enlace"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ariaLabel}
                >
                  {tarjeta}
                </a>
              ) : (
                <button type="button" className="alumno-accesos__boton" aria-label={ariaLabel}>
                  {tarjeta}
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
