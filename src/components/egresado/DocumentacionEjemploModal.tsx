import { useEffect, useId } from 'react'
import { useTranslation } from 'react-i18next'
import './DocumentacionEjemploModal.css'

type DocumentacionEjemploModalProps = {
  readonly abierto: boolean
  readonly titulo: string
  readonly imagenSrc: string
  readonly onCerrar: () => void
}

export function DocumentacionEjemploModal({
  abierto,
  titulo,
  imagenSrc,
  onCerrar,
}: DocumentacionEjemploModalProps) {
  const { t } = useTranslation()
  const tituloId = useId()

  useEffect(() => {
    if (!abierto) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCerrar()
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [abierto, onCerrar])

  if (!abierto) return null

  return (
    <div className="egresado-ejemplo-modal" role="presentation">
      <button
        type="button"
        className="egresado-ejemplo-modal__fondo"
        aria-label={t('pages.soyEgresado.documentacionBasica.cerrarEjemplo')}
        onClick={onCerrar}
      />
      <div
        className="egresado-ejemplo-modal__dialogo"
        role="dialog"
        aria-modal="true"
        aria-labelledby={tituloId}
      >
        <div className="egresado-ejemplo-modal__cabecera">
          <h3 id={tituloId} className="egresado-ejemplo-modal__titulo">
            {titulo}
          </h3>
          <button
            type="button"
            className="egresado-ejemplo-modal__cerrar"
            onClick={onCerrar}
            aria-label={t('pages.soyEgresado.documentacionBasica.cerrarEjemplo')}
          >
            ×
          </button>
        </div>
        <div className="egresado-ejemplo-modal__contenido">
          <img
            src={imagenSrc}
            alt={t('pages.soyEgresado.documentacionBasica.ejemploAlt', { titulo })}
            className="egresado-ejemplo-modal__imagen"
            draggable={false}
          />
        </div>
      </div>
    </div>
  )
}
