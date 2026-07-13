import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ModalidadPasosDetalle } from './ModalidadPasosDetalle'
import './ModalidadTitulacion.css'

const MODALIDADES = ['conReplicaOral', 'sinReplicaOral', 'sinTrabajoEscrito'] as const

const SUBMODALIDADES = {
  conReplicaOral: ['tesisTesina', 'actividadInvestigacion', 'seminarioTesisTesina'],
  sinReplicaOral: ['apoyoDocencia', 'trabajoProfesional', 'servicioSocial', 'articuloAcademico'],
  sinTrabajoEscrito: [
    'examenGeneralCeneval',
    'altoNivelAcademico',
    'estudiosPosgrado',
    'cursosAmpliacion',
    'diplomado',
  ],
} as const satisfies Partial<Record<(typeof MODALIDADES)[number], readonly string[]>>

const SUBGRID_IDS = {
  conReplicaOral: 'egresado-modalidad-subgrid-replica-oral',
  sinReplicaOral: 'egresado-modalidad-subgrid-sin-replica-oral',
  sinTrabajoEscrito: 'egresado-modalidad-subgrid-sin-trabajo-escrito',
} as const satisfies Partial<Record<(typeof MODALIDADES)[number], string>>

const SUBGRID_CLASES = {
  conReplicaOral: ' egresado-modalidad__subgrid--tres',
  sinReplicaOral: ' egresado-modalidad__subgrid--cuatro',
  sinTrabajoEscrito: ' egresado-modalidad__subgrid--cinco',
} as const satisfies Partial<Record<(typeof MODALIDADES)[number], string>>

type ModalidadKey = (typeof MODALIDADES)[number]
type ModalidadConSubmodalidades = keyof typeof SUBMODALIDADES

function modalidadTieneSubmodalidades(
  modalidadKey: ModalidadKey,
): modalidadKey is ModalidadConSubmodalidades {
  return modalidadKey in SUBMODALIDADES
}

export function ModalidadTitulacion() {
  const { t } = useTranslation()
  const [modalidadActiva, setModalidadActiva] = useState<ModalidadKey | null>(null)
  const [submodalidadActiva, setSubmodalidadActiva] = useState<string | null>(null)

  const alternarModalidad = (modalidadKey: ModalidadKey) => {
    setSubmodalidadActiva(null)
    setModalidadActiva((actual) => (actual === modalidadKey ? null : modalidadKey))
  }

  const alternarSubmodalidad = (submodalidadKey: string) => {
    setSubmodalidadActiva((actual) => (actual === submodalidadKey ? null : submodalidadKey))
  }

  return (
    <section
      id="seccion-modalidad-titulacion"
      className="egresado-modalidad"
      aria-labelledby="egresado-modalidad-titulo"
    >
      <div className="egresado-modalidad__titulo-cabecera">
        <h2 id="egresado-modalidad-titulo" className="egresado-modalidad__titulo-seccion">
          <span className="egresado-modalidad__titulo-etiqueta">
            {t('pages.soyEgresado.modalidadTitulacion.tituloSeccion')}
          </span>
        </h2>
      </div>

      <p className="egresado-modalidad__intro">
        {t('pages.soyEgresado.modalidadTitulacion.intro')}
      </p>

      <div className="egresado-modalidad__grid">
        {MODALIDADES.map((modalidadKey) => {
          const activa = modalidadActiva === modalidadKey
          const tieneSubmodalidades = modalidadTieneSubmodalidades(modalidadKey)

          return (
            <article
              key={modalidadKey}
              className={`egresado-modalidad__tarjeta${activa ? ' egresado-modalidad__tarjeta--activa' : ''}`}
            >
              <button
                type="button"
                className="egresado-modalidad__tarjeta-btn"
                aria-pressed={activa}
                aria-expanded={tieneSubmodalidades ? activa : undefined}
                aria-controls={tieneSubmodalidades && activa ? SUBGRID_IDS[modalidadKey] : undefined}
                onClick={() => alternarModalidad(modalidadKey)}
              >
                <h3 className="egresado-modalidad__tarjeta-titulo">
                  {t(`pages.soyEgresado.modalidadTitulacion.modalidades.${modalidadKey}.titulo`)}
                </h3>
                <p className="egresado-modalidad__tarjeta-descripcion">
                  {t(`pages.soyEgresado.modalidadTitulacion.modalidades.${modalidadKey}.descripcion`)}
                </p>
              </button>
            </article>
          )
        })}
      </div>

      <p className="egresado-modalidad__hint">
        {t('pages.soyEgresado.modalidadTitulacion.hintModalidad')}
      </p>

      {modalidadActiva && modalidadTieneSubmodalidades(modalidadActiva) && (
        <div
          id={SUBGRID_IDS[modalidadActiva]}
          className={`egresado-modalidad__subgrid${SUBGRID_CLASES[modalidadActiva] ?? ''}`}
        >
          {SUBMODALIDADES[modalidadActiva].map((submodalidadKey) => {
            const subActiva = submodalidadActiva === submodalidadKey
            const detalleId = `egresado-modalidad-pasos-${modalidadActiva}-${submodalidadKey}`

            return (
              <article
                key={submodalidadKey}
                className={`egresado-modalidad__subtarjeta${subActiva ? ' egresado-modalidad__subtarjeta--activa' : ''}`}
              >
                <button
                  type="button"
                  className="egresado-modalidad__subtarjeta-btn"
                  aria-pressed={subActiva}
                  aria-expanded={subActiva}
                  aria-controls={detalleId}
                  onClick={() => alternarSubmodalidad(submodalidadKey)}
                >
                  <h4 className="egresado-modalidad__subtarjeta-titulo">
                    {t(
                      `pages.soyEgresado.modalidadTitulacion.modalidades.${modalidadActiva}.submodalidades.${submodalidadKey}.titulo`,
                    )}
                  </h4>
                  <p className="egresado-modalidad__subtarjeta-descripcion">
                    {t(
                      `pages.soyEgresado.modalidadTitulacion.modalidades.${modalidadActiva}.submodalidades.${submodalidadKey}.descripcion`,
                    )}
                  </p>
                </button>
              </article>
            )
          })}
        </div>
      )}

      {modalidadActiva && submodalidadActiva && modalidadTieneSubmodalidades(modalidadActiva) && (
        <div id={`egresado-modalidad-pasos-${modalidadActiva}-${submodalidadActiva}`}>
          <ModalidadPasosDetalle
            key={`${modalidadActiva}-${submodalidadActiva}`}
            baseI18nKey={`pages.soyEgresado.modalidadTitulacion.modalidades.${modalidadActiva}.submodalidades.${submodalidadActiva}`}
          />
        </div>
      )}

      {modalidadActiva && modalidadTieneSubmodalidades(modalidadActiva) && (
        <p className="egresado-modalidad__hint">
          {t('pages.soyEgresado.modalidadTitulacion.hintModalidad')}
        </p>
      )}
    </section>
  )
}
