import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ExtraordinariosPdfs } from '../components/alumno/ExtraordinariosPdfs'
import { PageShell } from '../components/PageShell'
import './SoyAlumnoPage.css'
import './SoyAlumnoExtraordinariosPage.css'

export function SoyAlumnoExtraordinariosPage() {
  const { t } = useTranslation()

  return (
    <div className="soy-alumno-page soy-alumno-extraordinarios-page">
      <PageShell
        className="soy-alumno-page__content"
        title={t('pages.soyAlumno.extraordinarios.pageTitle')}
        description={t('pages.soyAlumno.extraordinarios.description')}
      >
        <Link to="/soy-alumno" className="soy-alumno-extraordinarios-page__volver">
          {t('pages.soyAlumno.extraordinarios.volver')}
        </Link>
        <ExtraordinariosPdfs />
      </PageShell>
    </div>
  )
}
