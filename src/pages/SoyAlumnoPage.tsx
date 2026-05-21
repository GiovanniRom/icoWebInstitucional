import { useTranslation } from 'react-i18next'
import { Horarios } from '../components/embeded/horarios'
import { PageShell } from '../components/PageShell'
import './SoyAlumnoPage.css'

export function SoyAlumnoPage() {
  const { t } = useTranslation()

  return (
    <div className="soy-alumno-page">
      <PageShell
        className="soy-alumno-page__content"
        title={t('pages.soyAlumno.title')}
        description={t('pages.soyAlumno.description')}
      >
        <Horarios />
      </PageShell>
    </div>
  )
}
