import { useTranslation } from 'react-i18next'
import aniv50Url from '../../assets/images/footer/50aniv.png'
import mailIconUrl from '../../assets/images/footer/mail-icon-white.png'
import waIconUrl from '../../assets/images/footer/waicon.png'
import facebookIconUrl from '../../assets/images/footer/facebooicon.png'
import './Footer.css'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <img
          src={aniv50Url}
          alt={t('footer.anivAlt')}
          className="site-footer__aniv"
        />

        <div className="site-footer__staff">
          <p className="site-footer__role">{t('footer.roleHead')}</p>
          <p className="site-footer__name">{t('footer.nameHead')}</p>
          <p className="site-footer__role">{t('footer.roleSecretary')}</p>
          <p className="site-footer__name">{t('footer.nameSecretary')}</p>
        </div>

        <div className="site-footer__social">
          <a
            href="mailto:contacto@ico.edu.mx"
            className="site-footer__social-link"
            aria-label={t('footer.mailAlt')}
          >
            <img src={mailIconUrl} alt="" />
          </a>
          <a
            href="https://wa.me/"
            className="site-footer__social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('footer.whatsappAlt')}
          >
            <img src={waIconUrl} alt="" />
          </a>
          <a
            href="https://facebook.com/"
            className="site-footer__social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('footer.facebookAlt')}
          >
            <img src={facebookIconUrl} alt="" />
          </a>
        </div>
      </div>
    </footer>
  )
}
