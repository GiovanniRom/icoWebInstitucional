import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './ModalidadPasosDetalle.css'

const PASOS = ['paso1', 'paso2', 'paso3', 'paso4', 'paso5', 'paso6', 'paso7'] as const
const NUMERO_INICIAL = 8

type PasoKey = (typeof PASOS)[number]

function pasoEstaDefinido(
  pasoKey: PasoKey,
  baseI18nKey: string,
  i18n: { exists: (key: string) => boolean },
): boolean {
  return (
    i18n.exists(`${baseI18nKey}.pasos.${pasoKey}.titulo`) &&
    i18n.exists(`${baseI18nKey}.pasos.${pasoKey}.texto`)
  )
}

type ModalidadPasosDetalleProps = {
  readonly baseI18nKey: string
}

export function ModalidadPasosDetalle({ baseI18nKey }: ModalidadPasosDetalleProps) {
  const { t, i18n } = useTranslation()

  const pasosDefinidos = useMemo(
    () => PASOS.filter((pasoKey) => pasoEstaDefinido(pasoKey, baseI18nKey, i18n)),
    [baseI18nKey, i18n],
  )

  const [completados, setCompletados] = useState<boolean[]>(() =>
    pasosDefinidos.map(() => false),
  )

  const alternarPaso = (indice: number) => {
    setCompletados((estado) =>
      estado.map((valor, i) => (i === indice ? !valor : valor)),
    )
  }

  return (
    <div className="egresado-modalidad-pasos">
      <div className="egresado-modalidad-pasos__grid">
        {pasosDefinidos.map((pasoKey, indice) => (
          <ModalidadPasosDetalleFila
            key={pasoKey}
            numero={NUMERO_INICIAL + indice}
            titulo={t(`${baseI18nKey}.pasos.${pasoKey}.titulo`)}
            texto={t(`${baseI18nKey}.pasos.${pasoKey}.texto`)}
            listoLabel={t('pages.soyEgresado.modalidadTitulacion.listo')}
            completado={completados[indice]}
            onAlternar={() => alternarPaso(indice)}
          />
        ))}
      </div>
    </div>
  )
}

type ModalidadPasosDetalleFilaProps = {
  readonly numero: number
  readonly titulo: string
  readonly texto: string
  readonly listoLabel: string
  readonly completado: boolean
  readonly onAlternar: () => void
}

function ModalidadPasosDetalleFila({
  numero,
  titulo,
  texto,
  listoLabel,
  completado,
  onAlternar,
}: ModalidadPasosDetalleFilaProps) {
  return (
    <>
      <div className="egresado-modalidad-pasos__celda egresado-modalidad-pasos__celda--indicador">
        <div className="egresado-modalidad-pasos__indicador-interno">
          <div
            className={`egresado-modalidad-pasos__circulo${completado ? ' egresado-modalidad-pasos__circulo--completado' : ''}`}
            aria-hidden="true"
          >
            {numero}
          </div>
          <div className="egresado-modalidad-pasos__indicador-contenido">
            <h3 className="egresado-modalidad-pasos__paso-titulo">{titulo}</h3>
            <label className="egresado-modalidad-pasos__listo">
              <input
                type="checkbox"
                className="egresado-modalidad-pasos__listo-input"
                checked={completado}
                onChange={onAlternar}
              />
              <span className="egresado-modalidad-pasos__listo-marca" aria-hidden="true" />
              <span className="egresado-modalidad-pasos__listo-texto">{listoLabel}</span>
            </label>
          </div>
        </div>
      </div>

      <div className="egresado-modalidad-pasos__celda egresado-modalidad-pasos__celda--texto">
        <p className="egresado-modalidad-pasos__texto">{texto}</p>
      </div>
    </>
  )
}
