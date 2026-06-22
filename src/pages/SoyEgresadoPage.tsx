import { SoyEgresadoCabecera } from '../components/egresado/SoyEgresadoCabecera'
import { DocumentacionBasica } from '../components/egresado/DocumentacionBasica'
import { ModalidadTitulacion } from '../components/egresado/ModalidadTitulacion'
import { PasosTitulacion } from '../components/egresado/PasosTitulacion'
import { PageShell } from '../components/PageShell'
import './SoyEgresadoPage.css'

export function SoyEgresadoPage() {
  return (
    <div className="soy-egresado-page">
      <PageShell
        className="soy-egresado-page__content"
        beforeTitle={<SoyEgresadoCabecera />}
      >
        <PasosTitulacion />
        <DocumentacionBasica />
        <ModalidadTitulacion />
      </PageShell>
    </div>
  )
}
