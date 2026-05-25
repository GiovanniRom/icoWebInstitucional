import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CabeceraTitulo } from '../embeded/CabeceraTitulo'
import { PRACTICAS_POR_RED } from './redesData'
import { RedesPracticasLista } from './RedesPracticasLista'
import './PracticaRedes.css'

type RedesTab = 'redes1' | 'redes2'

export function PracticaRedes() {
  const { t } = useTranslation()
  const [activo, setActivo] = useState<RedesTab>('redes1')

  return (
    <section
      className="practica-redes"
      aria-labelledby="practica-redes-titulo"
    >
      <CabeceraTitulo variante="dorado">
        <span id="practica-redes-titulo">
          {t('pages.soyAlumno.practicaRedes.titulo')}
        </span>
      </CabeceraTitulo>

      <p className="practica-redes__texto">
        {t('pages.soyAlumno.practicaRedes.descripcion')}
      </p>

      <div
        className="practica-redes__botones"
        role="tablist"
        aria-label={t('pages.soyAlumno.practicaRedes.botonesLabel')}
      >
        <button
          type="button"
          role="tab"
          aria-selected={activo === 'redes1'}
          className={`practica-redes__boton${activo === 'redes1' ? ' practica-redes__boton--activo' : ''}`}
          onClick={() => setActivo('redes1')}
        >
          {t('pages.soyAlumno.practicaRedes.redes1')}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activo === 'redes2'}
          className={`practica-redes__boton${activo === 'redes2' ? ' practica-redes__boton--activo' : ''}`}
          onClick={() => setActivo('redes2')}
        >
          {t('pages.soyAlumno.practicaRedes.redes2')}
        </button>
      </div>

      <div
        className="practica-redes__lista"
        role="tabpanel"
        aria-label={
          activo === 'redes1'
            ? t('pages.soyAlumno.practicaRedes.redes1')
            : t('pages.soyAlumno.practicaRedes.redes2')
        }
      >
        <RedesPracticasLista
          key={activo}
          practicas={PRACTICAS_POR_RED[activo]}
        />
      </div>
    </section>
  )
}
