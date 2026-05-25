import type { CSSProperties } from 'react'
import './VistaPreviaDocumento.css'

export type VistaPreviaDocumentoProps = {
  readonly url: string
  readonly title?: string
  readonly iframeStyle?: CSSProperties
  readonly className?: string
}

export function VistaPreviaDocumento({
  url,
  title = 'Vista previa del documento',
  iframeStyle,
  className,
}: VistaPreviaDocumentoProps) {
  return (
    <div className={className ?? 'vista-previa-documento'}>
      <iframe
        src={url}
        title={title}
        className="vista-previa-documento__iframe"
        style={iframeStyle}
        allow="autoplay"
      />
    </div>
  )
}
