import { Collapse } from 'antd'
import type { CollapseProps } from 'antd'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { VistaPreviaDocumento } from '../VistaPreviaDocumento'
import type { PracticaRedItem } from './redesData'
import './RedesPracticasLista.css'

type RedesPracticasListaProps = {
  readonly practicas: readonly PracticaRedItem[]
}

function getPracticaTitle(
  t: (key: string, options?: { num?: number }) => string,
  practica: PracticaRedItem,
): string {
  if (practica.titleKey === 'practica6y7') {
    return t('pages.soyAlumno.practicaRedes.practica6y7')
  }
  return t('pages.soyAlumno.practicaRedes.practica', { num: practica.titleNum ?? 0 })
}

export function RedesPracticasLista({ practicas }: RedesPracticasListaProps) {
  const { t } = useTranslation()

  const items: CollapseProps['items'] = useMemo(
    () =>
      practicas.map((practica) => ({
        key: practica.key,
        label: (
          <span className="redes-practicas-lista__etiqueta">
            {getPracticaTitle(t, practica)}
          </span>
        ),
        children: (
          <div className="redes-practicas-lista__vistas">
            {practica.previews.map((url, index) => (
              <VistaPreviaDocumento
                key={`${practica.key}-${index}`}
                url={url}
                title={t('pages.soyAlumno.practicaRedes.vistaPrevia', {
                  num: practica.titleNum ?? index + 1,
                })}
                iframeStyle={{ minHeight: 500 }}
              />
            ))}
          </div>
        ),
      })),
    [practicas, t],
  )

  return (
    <Collapse
      className="redes-practicas-lista"
      items={items}
      defaultActiveKey={practicas[0]?.key ? [practicas[0].key] : []}
    />
  )
}
