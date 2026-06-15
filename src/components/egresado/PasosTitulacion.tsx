import { useTranslation } from 'react-i18next'
import './PasosTitulacion.css'

const PASOS = ['paso1', 'paso2', 'paso3'] as const

export function PasosTitulacion() {
  const { t } = useTranslation()

  return (
    <section
      id="seccion-pasos-titulacion"
      className="egresado-pasos"
      aria-labelledby="egresado-pasos-titulo"
    >
      <div className="egresado-pasos__titulo-cabecera">
        <h2 id="egresado-pasos-titulo" className="egresado-pasos__titulo-seccion">
          <span className="egresado-pasos__titulo-etiqueta">
            {t('pages.soyEgresado.pasos.tituloSeccion')}
          </span>
        </h2>
      </div>
      <div className="egresado-pasos__grid">
        {PASOS.map((pasoKey, index) => (
          <article key={pasoKey} className="egresado-paso" tabIndex={0}>
            <div className="egresado-paso__circulo" aria-hidden="true">
              {index + 1}
            </div>
            <div className="egresado-paso__contenido">
              <h3 className="egresado-paso__titulo">
                {t(`pages.soyEgresado.pasos.${pasoKey}.titulo`)}
              </h3>
              <p className="egresado-paso__descripcion">
                {t(`pages.soyEgresado.pasos.${pasoKey}.descripcion`)}
              </p>
            </div>
          </article>
        ))}
      </div>
      <p className="egresado-pasos__hint">
        {t('pages.soyEgresado.pasos.hintInteraccion')}
      </p>
    </section>
  )
}
