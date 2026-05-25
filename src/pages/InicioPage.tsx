import { ConvocatoriasCarousel } from '../components/inicio/ConvocatoriasCarousel'
import { InicioAccesos } from '../components/inicio/InicioAccesos'
import './InicioPage.css'

export function InicioPage() {
  return (
    <div className="inicio-page">
      <ConvocatoriasCarousel />
      <div className="inicio-page__content">
        <InicioAccesos />
      </div>
    </div>
  )
}
