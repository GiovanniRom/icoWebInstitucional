import { useTranslation } from 'react-i18next'
import extraLargoIco from '../../assets/pdfs/extra_largo_ico.pdf'
import extrasPrimeraVuelta from '../../assets/pdfs/extras_primera_vuelta.pdf'
import { VistaPreviaDocumento } from '../VistaPreviaDocumento'
import './ExtraordinariosPdfs.css'

const EXTRAORDINARIOS_PDFS = [
  { id: 'primeraVuelta', url: extrasPrimeraVuelta, titleKey: 'primeraVuelta' },
  { id: 'extraLargo', url: extraLargoIco, titleKey: 'extraLargo' },
] as const

export function ExtraordinariosPdfs() {
  const { t } = useTranslation()

  return (
    <section
      className="extraordinarios-pdfs"
      aria-label={t('pages.soyAlumno.extraordinarios.listaAriaLabel')}
    >
      <ul className="extraordinarios-pdfs__lista">
        {EXTRAORDINARIOS_PDFS.map(({ id, url, titleKey }) => (
          <li key={id} className="extraordinarios-pdfs__item">
            <h2 className="extraordinarios-pdfs__titulo">
              {t(`pages.soyAlumno.extraordinarios.pdfs.${titleKey}`)}
            </h2>
            <VistaPreviaDocumento
              url={url}
              title={t(`pages.soyAlumno.extraordinarios.pdfs.${titleKey}`)}
              className="extraordinarios-pdfs__vista"
              iframeStyle={{ minHeight: 'min(75vh, 900px)' }}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
