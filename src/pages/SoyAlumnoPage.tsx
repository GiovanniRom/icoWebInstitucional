import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
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
        title={t('pages.soyAlumno.title')}
        beforeTitle={<SoyAlumnoNavegacion />}
      >
        <div id="seccion-horarios" className="soy-alumno-page__ancla">
        <Link
          to="/soy-alumno/horarios"
          className="soy-alumno-page__horarios-enlace"
          aria-label={t('pages.soyAlumno.horarios.verHorarios')}
        >
          <div className="soy-alumno-page__horarios-bloque">
            <CabeceraTitulo variante="dorado">
              {t('schedulesView.tituloSemestre')}
            </CabeceraTitulo>
            <p className="soy-alumno-page__horarios-ayuda">
              {t('pages.soyAlumno.horarios.clicTitulo')}
            </p>
          </div>
        </Link>
        </div>
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
