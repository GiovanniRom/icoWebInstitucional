import { useTranslation } from 'react-i18next'
import { PageShell } from '../components/PageShell'

export function ProgramaAcademicoPage() {
  const { t } = useTranslation()

  return (
    <PageShell
      title={t('pages.programaAcademico.title')}
      description={t('pages.programaAcademico.description')}
    />
  )
}
