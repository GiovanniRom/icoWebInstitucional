import { useTranslation } from 'react-i18next'
import tablasEn from '../../data/horasCompTablas.en.json'
import tablasEs from '../../data/horasCompTablas.es.json'

type CategoriaTablaId = keyof Omit<typeof tablasEs, 'col1' | 'col2'>

type FilaTabla = {
  c1?: string
  c1a?: string
  c1b?: string
  c2: string
}

type HorasCompTablaProps = {
  readonly categoriaId: CategoriaTablaId
}

const TABLAS_POR_IDIOMA = {
  es: tablasEs,
  en: tablasEn,
} as const

const TABLA_ACTIVIDAD_DIVIDIDA = {
  culturales: {
    filasActividadUnica: ['fila6', 'fila7'],
    c1aRowspan: { fila1: 3, fila4: 2 },
    c1aOmitidas: ['fila2', 'fila3', 'fila5'],
  },
  deportivas: {
    filasActividadUnica: [],
    c1aRowspan: { fila1: 3, fila4: 2, fila6: 3 },
    c1aOmitidas: ['fila2', 'fila3', 'fila5', 'fila7', 'fila8'],
  },
  emprendimiento: {
    filasActividadUnica: ['fila10'],
    c1aRowspan: { fila1: 7, fila8: 2 },
    c1aOmitidas: ['fila2', 'fila3', 'fila4', 'fila5', 'fila6', 'fila7', 'fila9'],
  },
  investigacion: {
    filasActividadUnica: ['fila6'],
    c1aRowspan: { fila1: 3, fila4: 2, fila7: 2 },
    c1aOmitidas: ['fila2', 'fila3', 'fila5', 'fila8'],
  },
} as const

type TablaActividadDivididaId = keyof typeof TABLA_ACTIVIDAD_DIVIDIDA

function esTablaActividadDividida(
  categoriaId: CategoriaTablaId,
): categoriaId is TablaActividadDivididaId {
  return categoriaId in TABLA_ACTIVIDAD_DIVIDIDA
}

function obtenerClavesFilas(filas: Record<string, FilaTabla>) {
  return Object.keys(filas).sort(
    (a, b) => Number(a.replace('fila', '')) - Number(b.replace('fila', '')),
  )
}

export function HorasCompTabla({ categoriaId }: HorasCompTablaProps) {
  const { i18n, t } = useTranslation()
  const tablas = i18n.language.startsWith('en') ? TABLAS_POR_IDIOMA.en : TABLAS_POR_IDIOMA.es
  const filas = tablas[categoriaId] as Record<string, FilaTabla>
  const clavesFilas = obtenerClavesFilas(filas)
  const esTablaDividida = esTablaActividadDividida(categoriaId)

  return (
    <div className="horascomp-page__tabla-envoltorio">
      <table
        className={
          esTablaDividida
            ? 'horascomp-page__tabla horascomp-page__tabla--dividida'
            : 'horascomp-page__tabla'
        }
        aria-label={t('pages.soyAlumno.formacionComp.tablaLabel')}
      >
        {esTablaDividida ? (
          <colgroup>
            <col className="horascomp-page__tabla-col-act-a" />
            <col className="horascomp-page__tabla-col-act-b" />
            <col className="horascomp-page__tabla-col-pond" />
          </colgroup>
        ) : null}
        <thead>
          <tr>
            {esTablaDividida ? (
              <th colSpan={2} scope="colgroup">
                {tablas.col1}
              </th>
            ) : (
              <th scope="col">{tablas.col1}</th>
            )}
            <th scope="col">{tablas.col2}</th>
          </tr>
        </thead>
        <tbody>
          {clavesFilas.map((clave) => {
            const celdas = filas[clave]

            if (esTablaActividadDividida(categoriaId)) {
              const config = TABLA_ACTIVIDAD_DIVIDIDA[categoriaId]

              if (!(config.filasActividadUnica as readonly string[]).includes(clave)) {
                const omitirC1a = (config.c1aOmitidas as readonly string[]).includes(clave)
                const rowspanC1a = config.c1aRowspan[clave as keyof typeof config.c1aRowspan] ?? 1

                return (
                  <tr key={clave}>
                    {!omitirC1a ? <td rowSpan={rowspanC1a}>{celdas.c1a}</td> : null}
                    <td>{celdas.c1b}</td>
                    <td>{celdas.c2}</td>
                  </tr>
                )
              }

              return (
                <tr key={clave}>
                  <td colSpan={2}>{celdas.c1}</td>
                  <td>{celdas.c2}</td>
                </tr>
              )
            }

            return (
              <tr key={clave}>
                <td>{celdas.c1}</td>
                <td>{celdas.c2}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
