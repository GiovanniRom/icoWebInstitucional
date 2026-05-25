import { useTranslation } from 'react-i18next'
import './CalendarioEscolar.css'

/** Origen oficial (enlace externo). El iframe usa copia local: el servidor UNAM envía X-Frame-Options: sameorigin. */
const CALENDARIO_PDF_ORIGEN =
  'https://aragon.unam.mx/fes-aragon/public_html/documents/nuestra_facultad/calendario-2026-ll.pdf'

const CALENDARIO_PDF_EMBED = '/documents/calendario-2026-ll.pdf'

export function CalendarioEscolar() {
  const { t } = useTranslation()

  return (
    <section
      className="calendario-escolar-embed"
      aria-label={t('pages.soyAlumno.calendarioEscolar')}
    >
      <iframe
        src={CALENDARIO_PDF_EMBED}
        title={t('pages.soyAlumno.calendarioEscolar')}
        className="calendario-escolar-embed__pdf"
      />
      <p className="calendario-escolar-embed__fallback">
        <a
          href={CALENDARIO_PDF_ORIGEN}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('pages.soyAlumno.abrirCalendarioPdf')}
        </a>
      </p>
    </section>
  )
}
