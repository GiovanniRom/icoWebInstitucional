import { useTranslation } from 'react-i18next'
import { PageShell } from '../components/PageShell'

export function SoyProfesorPage() {
  const { t } = useTranslation()

  return (
    <PageShell
      title={t('pages.soyProfesor.title')}
      description={t('pages.soyProfesor.description')}
    />
  )
}
