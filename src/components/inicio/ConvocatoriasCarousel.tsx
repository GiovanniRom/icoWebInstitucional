import { Carousel } from 'antd'
import { useTranslation } from 'react-i18next'
import { CONVOCATORIAS_SLIDES } from './convocatoriasData'
import './ConvocatoriasCarousel.css'

const AUTOPLAY_MS = 5000

export function ConvocatoriasCarousel() {
  const { t } = useTranslation()

  return (
    <section
      className="convocatorias-carousel"
      aria-label={t('pages.inicio.carouselLabel')}
      aria-roledescription="carousel"
    >
      <Carousel
        className="convocatorias-carousel__slider"
        autoplay
        autoplaySpeed={AUTOPLAY_MS}
        dots
        effect="fade"
        pauseOnHover
      >
        {CONVOCATORIAS_SLIDES.map((slide) => (
          <div key={slide.id}>
            <div className="convocatorias-carousel__slide">
              <img
                src={slide.src}
                alt={t(`pages.inicio.${slide.altKey}Alt`)}
                className="convocatorias-carousel__imagen"
                draggable={false}
              />
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  )
}
