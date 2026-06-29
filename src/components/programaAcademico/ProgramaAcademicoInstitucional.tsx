import { useTranslation } from 'react-i18next'
import { ProgramaAcademicoInstitucionalCarousel } from './ProgramaAcademicoInstitucionalCarousel'
import './ProgramaAcademicoInstitucional.css'

export function ProgramaAcademicoInstitucional() {
  const { t } = useTranslation()

  return (
    <section
      className="programa-academico-institucional"
      aria-label={t('pages.programaAcademico.institucional.ariaLabel')}
    >
      <p className="programa-academico-institucional__fila programa-academico-institucional__fila--unam">
        {t('pages.programaAcademico.institucional.todosSomosUnam')}
      </p>
      <div className="programa-academico-institucional__fila programa-academico-institucional__fila--carrusel">
        <ProgramaAcademicoInstitucionalCarousel />
      </div>
      <p className="programa-academico-institucional__fila programa-academico-institucional__fila--aragon">
        {t('pages.programaAcademico.institucional.hechoEnAragon')}
      </p>
    </section>
  )
}
