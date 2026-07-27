import { Carousel } from 'antd'
import { useTranslation } from 'react-i18next'
import { INSTITUCIONAL_CAROUSEL_SLIDES } from './institucionalCarouselData'
import './ProgramaAcademicoInstitucionalCarousel.css'

const AUTOPLAY_MS = 5000

export function ProgramaAcademicoInstitucionalCarousel() {
  const { t } = useTranslation()

  return (
    <div
      className="programa-academico-institucional-carousel"
      aria-label={t('pages.programaAcademico.institucional.carouselLabel')}
      aria-roledescription="carousel"
    >
      <Carousel
        className="programa-academico-institucional-carousel__slider"
        autoplay
        autoplaySpeed={AUTOPLAY_MS}
        dots
        infinite
        centerMode
        slidesToShow={1}
        centerPadding="28%"
        speed={500}
        pauseOnHover
        swipeToSlide
        focusOnSelect
        responsive={[
          {
            breakpoint: 768,
            settings: {
              centerPadding: '16%',
            },
          },
        ]}
      >
        {INSTITUCIONAL_CAROUSEL_SLIDES.map((slide) => (
          <div key={slide.id}>
            <div className="programa-academico-institucional-carousel__slide">
              <img
                src={slide.src}
                alt={t(`pages.programaAcademico.institucional.${slide.altKey}Alt`)}
                className="programa-academico-institucional-carousel__imagen"
                draggable={false}
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}
