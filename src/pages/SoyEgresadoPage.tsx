import { useTranslation } from 'react-i18next'
import { PageShell } from '../components/PageShell'

export function SoyEgresadoPage() {
  const { t } = useTranslation()

  return (
    <PageShell
      title={t('pages.soyEgresado.title')}
      description={t('pages.soyEgresado.description')}
    />
  )
}
