import { useTranslation } from 'react-i18next'
import planIcon from '../../assets/images/programaacademico/plandeestudiosicon.png'
import './ProgramaAcademicoCabecera.css'

export function ProgramaAcademicoCabecera() {
  const { t } = useTranslation()

  return (
    <header className="programa-academico-cabecera">
      <div className="programa-academico-cabecera__identidad">
        <div className="programa-academico-cabecera__tooltip-envoltorio">
          <img
            src={planIcon}
            alt=""
            className="programa-academico-cabecera__icono-principal"
            draggable={false}
            aria-describedby="programa-academico-cabecera-tooltip"
            tabIndex={0}
          />
          <div
            id="programa-academico-cabecera-tooltip"
            className="programa-academico-cabecera__tooltip"
            role="tooltip"
          >
            {t('pages.programaAcademico.cabecera.tooltipPrincipal')}
          </div>
        </div>
        <h1 className="programa-academico-cabecera__titulo">
          {t('pages.programaAcademico.title')}
        </h1>
      </div>
    </header>
  )
}
