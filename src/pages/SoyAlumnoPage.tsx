import { useTranslation } from 'react-i18next'
import { CalendarioEscolar } from '../components/embeded/CalendarioEscolar'
import { CabeceraTitulo } from '../components/embeded/CabeceraTitulo'
import { Horarios } from '../components/embeded/horarios'
import { Tutores } from '../components/embeded/tutores'
import { AlumnoAccesos } from '../components/alumno/AlumnoAccesos'
import { PracticaRedes } from '../components/alumno/PracticaRedes'
import { PageShell } from '../components/PageShell'
import './SoyAlumnoPage.css'

export function SoyAlumnoPage() {
  const { t } = useTranslation()

  return (
    <div className="soy-alumno-page">
      <PageShell
        className="soy-alumno-page__content"
        title={t('pages.soyAlumno.title')}
        description={t('pages.soyAlumno.description')}
      >
        <Horarios />
        <CabeceraTitulo variante="dorado">
          {t('pages.soyAlumno.calendarioEscolar')}
        </CabeceraTitulo>
        <CalendarioEscolar />
        <Tutores />
        <AlumnoAccesos />
        <PracticaRedes />
      </PageShell>
    </div>
  )
}
