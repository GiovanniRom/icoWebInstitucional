import convocatoriaImg from '../../assets/images/inicio/convocatoria.png'
import convocatoria2Img from '../../assets/images/inicio/convocatoria2.png'

export type ConvocatoriaSlide = {
  readonly id: string
  readonly src: string
  readonly altKey: string
}

/** Añade más entradas aquí para nuevas convocatorias en el carrusel. */
export const CONVOCATORIAS_SLIDES: readonly ConvocatoriaSlide[] = [
  {
    id: 'convocatoria-1',
    src: convocatoriaImg,
    altKey: 'convocatoria1',
  },
  {
    id: 'convocatoria-2',
    src: convocatoria2Img,
    altKey: 'convocatoria2',
  },
]
