import { useTranslation } from 'react-i18next'
import { CalendarioEscolar } from '../components/embeded/CalendarioEscolar'
import { CabeceraTitulo } from '../components/embeded/CabeceraTitulo'
import { Tutores } from '../components/embeded/tutores'
import { AlumnoAccesos } from '../components/alumno/AlumnoAccesos'
import { PracticaRedes } from '../components/alumno/PracticaRedes'
import { SoyAlumnoNavegacion } from '../components/alumno/SoyAlumnoNavegacion'
import { PageShell } from '../components/PageShell'
import './SoyAlumnoPage.css'

export function SoyAlumnoPage() {
  const { t } = useTranslation()

  return (
    <div className="soy-alumno-page">
      <PageShell
        className="soy-alumno-page__content"
        beforeTitle={<SoyAlumnoNavegacion />}
      >
        <div id="seccion-calendario" className="soy-alumno-page__ancla">
        <CabeceraTitulo variante="dorado">
          {t('pages.soyAlumno.calendarioEscolar')}
        </CabeceraTitulo>
        <CalendarioEscolar />
        </div>
        <div id="seccion-tutores" className="soy-alumno-page__ancla">
        <Tutores />
        </div>
        <AlumnoAccesos />
        <div id="seccion-redes" className="soy-alumno-page__ancla">
        <PracticaRedes />
        </div>
      </PageShell>
    </div>
  )
}
