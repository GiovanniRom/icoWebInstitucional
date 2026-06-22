import { ProgramaAcademicoCabecera } from '../components/programaAcademico/ProgramaAcademicoCabecera'
import { ProgramaAcademicoGrid } from '../components/programaAcademico/ProgramaAcademicoGrid'
import { ProgramaAcademicoInstitucional } from '../components/programaAcademico/ProgramaAcademicoInstitucional'
import { ProgramaAcademicoMisionVision } from '../components/programaAcademico/ProgramaAcademicoMisionVision'
import { PageShell } from '../components/PageShell'
import './ProgramaAcademicoPage.css'

export function ProgramaAcademicoPage() {
  return (
    <div className="programa-academico-page">
      <PageShell
        className="programa-academico-page__content"
        beforeTitle={<ProgramaAcademicoCabecera />}
      >
        <ProgramaAcademicoGrid />
      </PageShell>
      <ProgramaAcademicoInstitucional />
      <ProgramaAcademicoMisionVision />
    </div>
  )
}
