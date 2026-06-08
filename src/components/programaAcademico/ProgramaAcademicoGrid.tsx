import { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import mallaIcon from '../../assets/images/programaacademico/mallaicon.png'
import planIcon from '../../assets/images/programaacademico/planicon.png'
import profesoresImg from '../../assets/images/programaacademico/profesores.png'
import './ProgramaAcademicoGrid.css'

type FilaTextoProps = {
  readonly titulo: string
  readonly descripcion: string
  readonly boton: string
}

type FilaTextoImagenBaseProps = FilaTextoProps & {
  readonly imagenSrc?: string
  readonly imagenAlt: string
  readonly invertido?: boolean
  readonly imagenPlaceholder?: boolean
}

type FilaTextoImagenProps = FilaTextoImagenBaseProps & {
  readonly extraVisible: boolean
  readonly extraId: string
  readonly onBotonClick: () => void
}

type ProgramaAcademicoBloqueProps = FilaTextoImagenBaseProps & {
  readonly textoExtra: string
}

function ProgramaAcademicoFilaExtra({
  id,
  texto,
  visible,
}: {
  readonly id: string
  readonly texto: string
  readonly visible: boolean
}) {
  if (!texto) {
    return null
  }

  return (
    <div
      id={id}
      className={`programa-academico-fila-extra${visible ? ' programa-academico-fila-extra--visible' : ''}`}
      aria-hidden={!visible}
    >
      <div className="programa-academico-fila-extra__inner">
        <p className="programa-academico-fila-extra__texto">{texto}</p>
      </div>
    </div>
  )
}

function ProgramaAcademicoBloque({
  textoExtra,
  ...filaProps
}: ProgramaAcademicoBloqueProps) {
  const [extraVisible, setExtraVisible] = useState(false)
  const extraId = useId()

  return (
    <section className="programa-academico-bloque">
      <FilaTextoImagen
        {...filaProps}
        extraVisible={extraVisible}
        extraId={extraId}
        onBotonClick={() => setExtraVisible((visible) => !visible)}
      />
      <ProgramaAcademicoFilaExtra id={extraId} texto={textoExtra} visible={extraVisible} />
    </section>
  )
}

function FilaTextoImagen({
  titulo,
  descripcion,
  boton,
  imagenSrc,
  imagenAlt,
  invertido = false,
  imagenPlaceholder = false,
  extraVisible,
  extraId,
  onBotonClick,
}: FilaTextoImagenProps) {
  const filaClass = invertido
    ? 'programa-academico-fila programa-academico-fila--invertida'
    : 'programa-academico-fila'

  return (
    <div className={filaClass}>
      <div className="programa-academico-fila__imagen">
        {imagenSrc && !imagenPlaceholder ? (
          <img
            src={imagenSrc}
            alt={imagenAlt}
            className="programa-academico-fila__imagen-media"
            draggable={false}
          />
        ) : (
          <div
            className="programa-academico-fila__imagen-vacia"
            role="img"
            aria-label={imagenAlt}
          />
        )}
      </div>
      <div className="programa-academico-fila__contenido">
        <div className="programa-academico-fila__titulo programa-academico-fila__titulo-cabecera">
          <span className="programa-academico-fila__titulo-etiqueta">
            <span className="programa-academico-fila__titulo-texto">{titulo}</span>
          </span>
        </div>
        <p className="programa-academico-fila__descripcion">{descripcion}</p>
        <button
          type="button"
          className={`programa-academico-fila__boton${extraVisible ? ' programa-academico-fila__boton--activo' : ''}`}
          onClick={onBotonClick}
          aria-expanded={extraVisible}
          aria-controls={extraId}
        >
          {boton}
        </button>
      </div>
    </div>
  )
}

type ProgramaAcademicoAccesoProps = {
  readonly imagenSrc: string
  readonly imagenAlt: string
  readonly tituloLinea1: string
  readonly tituloLinea2: string
  readonly href?: string
  readonly enlaceAriaLabel?: string
}

function ProgramaAcademicoAcceso({
  imagenSrc,
  imagenAlt,
  tituloLinea1,
  tituloLinea2,
  href,
  enlaceAriaLabel,
}: ProgramaAcademicoAccesoProps) {
  const tituloAccesible = enlaceAriaLabel ?? `${tituloLinea1} ${tituloLinea2}`

  const contenidoTarjeta = (
    <>
      <div className="programa-academico-acceso__imagen">
        <img src={imagenSrc} alt={imagenAlt} className="programa-academico-acceso__imagen-media" draggable={false} />
      </div>
      <div className="programa-academico-acceso__titulo" aria-hidden={href ? true : undefined}>
        <span className="programa-academico-acceso__titulo-linea">{tituloLinea1}</span>
        <span className="programa-academico-acceso__titulo-linea">{tituloLinea2}</span>
      </div>
    </>
  )

  return (
    <article className="programa-academico-acceso">
      {href ? (
        <a
          href={href}
          className="programa-academico-acceso__tarjeta programa-academico-acceso__tarjeta--enlace"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={tituloAccesible}
        >
          {contenidoTarjeta}
        </a>
      ) : (
        <div className="programa-academico-acceso__tarjeta" aria-label={tituloAccesible}>
          {contenidoTarjeta}
        </div>
      )}
    </article>
  )
}

export function ProgramaAcademicoGrid() {
  const { t } = useTranslation()

  return (
    <div className="programa-academico-grid">
      <ProgramaAcademicoBloque
        imagenSrc={profesoresImg}
        imagenAlt={t('pages.programaAcademico.fila1.imagenAlt')}
        titulo={t('pages.programaAcademico.fila1.titulo')}
        descripcion={t('pages.programaAcademico.fila1.descripcion')}
        boton={t('pages.programaAcademico.fila1.boton')}
        textoExtra={t('pages.programaAcademico.fila1.textoExtra')}
      />

      <ProgramaAcademicoBloque
        invertido
        imagenSrc={profesoresImg}
        imagenAlt={t('pages.programaAcademico.fila2.imagenAlt')}
        titulo={t('pages.programaAcademico.fila2.titulo')}
        descripcion={t('pages.programaAcademico.fila2.descripcion')}
        boton={t('pages.programaAcademico.fila2.boton')}
        textoExtra={t('pages.programaAcademico.fila2.textoExtra')}
      />

      <div className="programa-academico-fila programa-academico-fila--doble-imagen">
        <ProgramaAcademicoAcceso
          imagenSrc={mallaIcon}
          imagenAlt={t('pages.programaAcademico.fila3.malla.imagenAlt')}
          tituloLinea1={t('pages.programaAcademico.fila3.malla.tituloLinea1')}
          tituloLinea2={t('pages.programaAcademico.fila3.malla.tituloLinea2')}
          href="https://ingenierias-aragon.net/ICO/PlanEstudios2119/"
          enlaceAriaLabel={t('pages.programaAcademico.fila3.malla.enlaceAriaLabel')}
        />
        <ProgramaAcademicoAcceso
          imagenSrc={planIcon}
          imagenAlt={t('pages.programaAcademico.fila3.plan.imagenAlt')}
          tituloLinea1={t('pages.programaAcademico.fila3.plan.tituloLinea1')}
          tituloLinea2={t('pages.programaAcademico.fila3.plan.tituloLinea2')}
          href="https://drive.google.com/file/d/1mnPvcATbixSNaC_qd6pNSgXWvtD2N_1M/view"
          enlaceAriaLabel={t('pages.programaAcademico.fila3.plan.enlaceAriaLabel')}
        />
      </div>
    </div>
  )
}
