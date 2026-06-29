import profesoresImg from '../../assets/images/programaacademico/profesores.png'
import programaAcademicoImg from '../../assets/images/inicio/programaacademico.png'

export type InstitucionalCarouselSlide = {
  readonly id: string
  readonly src: string
  readonly altKey: string
}

/** Añade más entradas aquí para nuevas imágenes en el carrusel institucional. */
export const INSTITUCIONAL_CAROUSEL_SLIDES: readonly InstitucionalCarouselSlide[] = [
  {
    id: 'institucional-profesores',
    src: profesoresImg,
    altKey: 'carouselSlide1',
  },
  {
    id: 'institucional-programa',
    src: programaAcademicoImg,
    altKey: 'carouselSlide2',
  },
]
