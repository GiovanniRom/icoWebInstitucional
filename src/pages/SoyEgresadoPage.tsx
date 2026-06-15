import { useTranslation } from 'react-i18next'
import { DocumentacionBasica } from '../components/egresado/DocumentacionBasica'
import { ModalidadTitulacion } from '../components/egresado/ModalidadTitulacion'
import { PasosTitulacion } from '../components/egresado/PasosTitulacion'
import { PageShell } from '../components/PageShell'
import './SoyEgresadoPage.css'

export function SoyEgresadoPage() {
  const { t } = useTranslation()

  return (
    <div className="soy-egresado-page">
      <PageShell
        className="soy-egresado-page__content"
        title={t('pages.soyEgresado.title')}
        description={t('pages.soyEgresado.description')}
      >
        <PasosTitulacion />
        <DocumentacionBasica />
        <ModalidadTitulacion />
      </PageShell>
    </div>
  )
}
