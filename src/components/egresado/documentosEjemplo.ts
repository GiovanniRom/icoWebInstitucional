import creditosSvg from '../../assets/images/egresado/documentos/creditos.svg'
import liberacionssSvg from '../../assets/images/egresado/documentos/liberacionss.svg'
import idiomaSvg from '../../assets/images/egresado/documentos/idioma.svg'
import formacionSvg from '../../assets/images/egresado/documentos/formacion.svg'
import certificadoEstudiosSvg from '../../assets/images/egresado/documentos/certificadoestudios.svg'
import certificadoEstudiosBachSvg from '../../assets/images/egresado/documentos/certificadoestudiosbach.svg'
import consultaSvg from '../../assets/images/egresado/documentos/consulta.svg'

export const DOCUMENTOS_EJEMPLO = {
  doc1: creditosSvg,
  doc2: liberacionssSvg,
  doc3: idiomaSvg,
  doc4: formacionSvg,
  doc5: certificadoEstudiosSvg,
  doc6: certificadoEstudiosBachSvg,
  doc7: consultaSvg,
} as const

export type DocumentoEjemploKey = keyof typeof DOCUMENTOS_EJEMPLO
