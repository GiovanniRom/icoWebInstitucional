import { useTranslation } from 'react-i18next'
import bibliotecaImg from '../../assets/images/inicio/biblioteca.png'
import jefaturaSvg from '../../assets/images/egresado/jefatura.svg'
import './InicioEnlacesFin.css'

export function InicioEnlacesFin() {
  const { t } = useTranslation()

  return (
    <section
      className="inicio-enlaces-fin"
      aria-label={t('pages.inicio.enlacesFin.label')}
    >
      <div className="inicio-enlaces-fin__contenedor">
        <a
          href="https://www.bidi.unam.mx/"
          className="inicio-enlaces-fin__enlace"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('pages.inicio.enlacesFin.bibliotecaAriaLabel')}
        >
          <img
            src={bibliotecaImg}
            alt={t('pages.inicio.enlacesFin.bibliotecaAlt')}
            className="inicio-enlaces-fin__imagen"
            draggable={false}
          />
        </a>
        <img
          src={jefaturaSvg}
          alt={t('pages.inicio.enlacesFin.jefaturaAlt')}
          className="inicio-enlaces-fin__imagen inicio-enlaces-fin__imagen--jefatura"
          draggable={false}
        />
      </div>
    </section>
  )
}
