import { useTranslation } from 'react-i18next'
import { ProfesoresCorreo } from '../components/embeded/correo'
import './SoyProfesorPage.css'

export function SoyProfesorPage() {
  const { t } = useTranslation()

  return (
    <div className="soy-profesor-page">
      <div className="soy-profesor-page__titulo-cabecera">
        <h1 className="soy-profesor-page__titulo-texto">{t('pages.soyProfesor.tituloCorreos')}</h1>
      </div>
      <article className="soy-profesor-page__content page-shell">
        <ProfesoresCorreo iframeTitle={t('pages.soyProfesor.correosIframeTitle')} />
      </article>
    </div>
  )
}
