import { useTranslation } from 'react-i18next'
import evalProfIcon from '../../assets/images/alumno/evalproficon.png'
import horariosLabIcon from '../../assets/images/alumno/horarioslabicon.png'
import extraIcon from '../../assets/images/alumno/extraicon.png'
import formacionIcon from '../../assets/images/alumno/formacionicon.png'
import './AlumnoAccesos.css'

const ACCESOS = [
  { id: 'evalProf', src: evalProfIcon, labelKey: 'evalProf' },
  { id: 'horariosLab', src: horariosLabIcon, labelKey: 'horariosLab' },
  { id: 'extra', src: extraIcon, labelKey: 'extra' },
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
        {ACCESOS.map(({ id, src, labelKey }) => (
          <li key={id} className="alumno-accesos__item">
            <button
              type="button"
              className="alumno-accesos__boton"
              aria-label={t(`pages.soyAlumno.accesos.${labelKey}`)}
            >
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
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
