import { Carousel, type CarouselRef } from 'antd'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { INSTITUCIONAL_CAROUSEL_SLIDES } from './institucionalCarouselData'
import './ProgramaAcademicoInstitucionalCarousel.css'

const AUTOPLAY_MS = 5000

export function ProgramaAcademicoInstitucionalCarousel() {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<CarouselRef>(null)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const ensureAutoplay = () => {
      carouselRef.current?.autoPlay()
    }

    const mountTimer = window.setTimeout(ensureAutoplay, 150)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ensureAutoplay()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(node)

    return () => {
      window.clearTimeout(mountTimer)
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="programa-academico-institucional-carousel"
      aria-label={t('pages.programaAcademico.institucional.carouselLabel')}
      aria-roledescription="carousel"
    >
      <Carousel
        ref={carouselRef}
        className="programa-academico-institucional-carousel__slider"
        autoplay
        autoplaySpeed={AUTOPLAY_MS}
        dots
        infinite
        centerMode
        slidesToShow={1}
        centerPadding="28%"
        speed={500}
        draggable
        swipe
        swipeToSlide
        focusOnSelect
        pauseOnHover={false}
        pauseOnFocus={false}
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
