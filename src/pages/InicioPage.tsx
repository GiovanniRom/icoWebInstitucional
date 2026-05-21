import { useTranslation } from 'react-i18next'
import { PageShell } from '../components/PageShell'

export function InicioPage() {
  const { t } = useTranslation()

  return (
    <PageShell
      title={t('pages.inicio.title')}
      description={t('pages.inicio.description')}
    />
  )
}
