import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Horarios } from '../components/embeded/horarios'
import { PageShell } from '../components/PageShell'
import './SoyAlumnoPage.css'
import './SoyAlumnoHorariosPage.css'

export function SoyAlumnoHorariosPage() {
  const { t } = useTranslation()

  return (
    <div className="soy-alumno-page soy-alumno-horarios-page">
      <PageShell
        className="soy-alumno-page__content"
        title={t('pages.soyAlumno.horarios.pageTitle')}
        description={t('pages.soyAlumno.horarios.description')}
      >
        <Link to="/soy-alumno" className="soy-alumno-horarios-page__volver">
          {t('pages.soyAlumno.horarios.volver')}
        </Link>
        <Horarios />
      </PageShell>
    </div>
  )
}
