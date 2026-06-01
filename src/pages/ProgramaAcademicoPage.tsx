import { useTranslation } from 'react-i18next'
import { ProgramaAcademicoGrid } from '../components/programaAcademico/ProgramaAcademicoGrid'
import { ProgramaAcademicoInstitucional } from '../components/programaAcademico/ProgramaAcademicoInstitucional'
import { ProgramaAcademicoMisionVision } from '../components/programaAcademico/ProgramaAcademicoMisionVision'
import { PageShell } from '../components/PageShell'
import './ProgramaAcademicoPage.css'

export function ProgramaAcademicoPage() {
  const { t } = useTranslation()

  return (
    <div className="programa-academico-page">
      <PageShell
        className="programa-academico-page__content"
        title={t('pages.programaAcademico.title')}
      >
        <ProgramaAcademicoGrid />
      </PageShell>
      <ProgramaAcademicoInstitucional />
      <ProgramaAcademicoMisionVision />
    </div>
  )
}
