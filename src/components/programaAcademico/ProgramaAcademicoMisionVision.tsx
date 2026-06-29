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
      <div className="programa-academico-mvv__grid">
        {PILARES.map((pilar) => (
          <article key={pilar} className="programa-academico-mvv__bloque">
            <h2 className="programa-academico-mvv__titulo">
              {t(`pages.programaAcademico.misionVision.${pilar}.titulo`)}
            </h2>
            <p className="programa-academico-mvv__descripcion">
              {t(`pages.programaAcademico.misionVision.${pilar}.descripcion`)}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
