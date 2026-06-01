import { useTranslation } from 'react-i18next'
import './ProgramaAcademicoMisionVision.css'

const PILARES = ['mision', 'vision', 'valores'] as const

export function ProgramaAcademicoMisionVision() {
  const { t } = useTranslation()

  return (
    <section
      className="programa-academico-mvv"
      aria-label={t('pages.programaAcademico.misionVision.ariaLabel')}
    >
      <div className="programa-academico-mvv__fila programa-academico-mvv__fila--titulos">
        {PILARES.map((pilar) => (
          <h2 key={pilar} className="programa-academico-mvv__titulo">
            {t(`pages.programaAcademico.misionVision.${pilar}.titulo`)}
          </h2>
        ))}
      </div>
      <div className="programa-academico-mvv__fila programa-academico-mvv__fila--descripciones">
        {PILARES.map((pilar) => (
          <p key={pilar} className="programa-academico-mvv__descripcion">
            {t(`pages.programaAcademico.misionVision.${pilar}.descripcion`)}
          </p>
        ))}
      </div>
    </section>
  )
}
