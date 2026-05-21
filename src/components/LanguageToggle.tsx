import { useTranslation } from 'react-i18next'
import { setLanguage } from '../i18n'
import './LanguageToggle.css'

export function LanguageToggle() {
  const { i18n, t } = useTranslation()
  const isEnglish = i18n.language.startsWith('en')

  const handleToggle = () => {
    setLanguage(isEnglish ? 'es' : 'en')
  }

  return (
    <button
      type="button"
      className="lang-toggle"
      role="switch"
      aria-checked={isEnglish}
      aria-label={isEnglish ? 'Switch to Spanish' : 'Cambiar a inglés'}
      onClick={handleToggle}
    >
      <span className={!isEnglish ? 'lang-toggle__label--active' : ''}>
        {t('language.es')}
      </span>
      <span className="lang-toggle__track" aria-hidden="true">
        <span
          className={`lang-toggle__thumb ${isEnglish ? 'lang-toggle__thumb--en' : ''}`}
        />
      </span>
      <span className={isEnglish ? 'lang-toggle__label--active' : ''}>
        {t('language.en')}
      </span>
    </button>
  )
}
