import { ConvocatoriasCarousel } from '../components/inicio/ConvocatoriasCarousel'
import { InicioAccesos } from '../components/inicio/InicioAccesos'
import { InicioEnlacesFin } from '../components/inicio/InicioEnlacesFin'
import './InicioPage.css'

export function InicioPage() {
  return (
    <div className="inicio-page">
      <ConvocatoriasCarousel />
      <div className="inicio-page__content">
        <InicioAccesos />
        <InicioEnlacesFin />
      </div>
    </div>
  )
}
