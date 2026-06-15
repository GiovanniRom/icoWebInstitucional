import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import jefaturaSvg from '../../assets/images/egresado/jefatura.svg'
import './DocumentacionBasica.css'

const DOCUMENTOS = ['doc1', 'doc2', 'doc3', 'doc4', 'doc5', 'doc6', 'doc7'] as const

function obtenerTextosDocumento(
  docKey: (typeof DOCUMENTOS)[number],
  t: (key: string) => string,
  i18n: { exists: (key: string) => boolean },
): string[] {
  const base = `pages.soyEgresado.documentacionBasica.documentos.${docKey}.texto`

  if (i18n.exists(`${base}.parrafo1`)) {
    const textos = [t(`${base}.parrafo1`)]
    if (i18n.exists(`${base}.parrafo2`)) {
      textos.push(t(`${base}.parrafo2`))
    }
    return textos
  }

  return [t(base)]
}

export function DocumentacionBasica() {
  const { t, i18n } = useTranslation()
  const [completados, setCompletados] = useState<boolean[]>(() => DOCUMENTOS.map(() => false))

  const alternarDocumento = (indice: number) => {
    setCompletados((estado) =>
      estado.map((valor, i) => (i === indice ? !valor : valor)),
    )
  }

  return (
    <section
      id="seccion-documentacion-basica"
      className="egresado-documentacion"
      aria-labelledby="egresado-documentacion-titulo"
    >
      <div className="egresado-documentacion__titulo-cabecera">
        <h2 id="egresado-documentacion-titulo" className="egresado-documentacion__titulo-seccion">
          <span className="egresado-documentacion__titulo-etiqueta">
            {t('pages.soyEgresado.documentacionBasica.tituloSeccion')}
          </span>
        </h2>
      </div>

      <div className="egresado-documentacion__grid">
        <div className="egresado-documentacion__celda egresado-documentacion__celda--texto">
          <p className="egresado-documentacion__texto">{t('pages.soyEgresado.documentacionBasica.filaInicio.col1.parrafo1')}</p>
          <p className="egresado-documentacion__texto">{t('pages.soyEgresado.documentacionBasica.filaInicio.col1.parrafo2')}</p>
        </div>
        <div className="egresado-documentacion__celda egresado-documentacion__celda--accion">
          <button type="button" className="egresado-documentacion__enviar-btn">
            {t('pages.soyEgresado.documentacionBasica.filaInicio.botonEnviar')}
          </button>
        </div>

        {DOCUMENTOS.map((docKey, indice) => (
          <DocumentacionBasicaFila
            key={docKey}
            numero={indice + 1}
            titulo={t(`pages.soyEgresado.documentacionBasica.documentos.${docKey}.titulo`)}
            textos={obtenerTextosDocumento(docKey, t, i18n)}
            listoLabel={t('pages.soyEgresado.documentacionBasica.listo')}
            completado={completados[indice]}
            onAlternar={() => alternarDocumento(indice)}
          />
        ))}

        <div className="egresado-documentacion__celda egresado-documentacion__celda--texto">
          <p className="egresado-documentacion__texto">{t('pages.soyEgresado.documentacionBasica.filaFin.col1.parrafo1')}</p>
          <p className="egresado-documentacion__texto">{t('pages.soyEgresado.documentacionBasica.filaFin.col1.parrafo2')}</p>
        </div>
        <div className="egresado-documentacion__celda egresado-documentacion__celda--imagen">
          <img
            className="egresado-documentacion__jefatura-img"
            src={jefaturaSvg}
            alt={t('pages.soyEgresado.documentacionBasica.filaFin.jefaturaAlt')}
          />
        </div>
      </div>
    </section>
  )
}

type DocumentacionBasicaFilaProps = {
  readonly numero: number
  readonly titulo: string
  readonly textos: readonly string[]
  readonly listoLabel: string
  readonly completado: boolean
  readonly onAlternar: () => void
}

function DocumentacionBasicaFila({
  numero,
  titulo,
  textos,
  listoLabel,
  completado,
  onAlternar,
}: DocumentacionBasicaFilaProps) {
  return (
    <>
      <div className="egresado-documentacion__celda egresado-documentacion__celda--indicador">
        <div className="egresado-documentacion__indicador-interno">
          <div
            className={`egresado-documentacion__circulo${completado ? ' egresado-documentacion__circulo--completado' : ''}`}
            aria-hidden="true"
          >
            {numero}
          </div>
          <div className="egresado-documentacion__indicador-contenido">
            <h3 className="egresado-documentacion__documento-titulo">{titulo}</h3>
            <label className="egresado-documentacion__listo">
              <input
                type="checkbox"
                className="egresado-documentacion__listo-input"
                checked={completado}
                onChange={onAlternar}
              />
              <span className="egresado-documentacion__listo-marca" aria-hidden="true" />
              <span className="egresado-documentacion__listo-texto">{listoLabel}</span>
            </label>
          </div>
        </div>
      </div>

      <div className="egresado-documentacion__celda egresado-documentacion__celda--texto">
        {textos.map((parrafo, index) => (
          <p key={index} className="egresado-documentacion__texto">
            {parrafo}
          </p>
        ))}
      </div>
    </>
  )
}
