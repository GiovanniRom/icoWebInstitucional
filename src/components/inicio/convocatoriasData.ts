import convocatoriaImg from '../../assets/images/inicio/convocatoria.png'

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
]
