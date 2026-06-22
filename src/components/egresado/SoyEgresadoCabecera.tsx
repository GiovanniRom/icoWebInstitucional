import { useTranslation } from 'react-i18next'
import gorraIcon from '../../assets/images/egresado/gorraicon.png'
import './SoyEgresadoCabecera.css'

export function SoyEgresadoCabecera() {
  const { t } = useTranslation()

  return (
    <header className="soy-egresado-cabecera">
      <div className="soy-egresado-cabecera__identidad">
        <div className="soy-egresado-cabecera__tooltip-envoltorio">
          <img
            src={gorraIcon}
            alt=""
            className="soy-egresado-cabecera__icono-principal"
            draggable={false}
            aria-describedby="soy-egresado-cabecera-tooltip"
            tabIndex={0}
          />
          <div
            id="soy-egresado-cabecera-tooltip"
            className="soy-egresado-cabecera__tooltip"
            role="tooltip"
          >
            {t('pages.soyEgresado.description')}
          </div>
        </div>
        <h1 className="soy-egresado-cabecera__titulo">
          {t('pages.soyEgresado.title')}
        </h1>
      </div>
    </header>
  )
}
