import carrusel1Img from '../../assets/images/programaacademico/carrusel/carrusel1.png'
import carrusel2Img from '../../assets/images/programaacademico/carrusel/carrusel2.png'
import carrusel3Img from '../../assets/images/programaacademico/carrusel/carrusel3.png'

export type InstitucionalCarouselSlide = {
  readonly id: string
  readonly src: string
  readonly altKey: string
}

/** Añade más entradas aquí para nuevas imágenes en el carrusel institucional. */
export const INSTITUCIONAL_CAROUSEL_SLIDES: readonly InstitucionalCarouselSlide[] = [
  {
    id: 'institucional-carrusel-1',
    src: carrusel1Img,
    altKey: 'carouselSlide1',
  },
  {
    id: 'institucional-carrusel-2',
    src: carrusel2Img,
    altKey: 'carouselSlide2',
  },
  {
    id: 'institucional-carrusel-3',
    src: carrusel3Img,
    altKey: 'carouselSlide3',
  },
]
