import type { ReactNode } from 'react'
import './CabeceraTitulo.css'

type CabeceraTituloProps = {
  children: ReactNode
  variante: 'dorado' | 'azul'
}

export function CabeceraTitulo({ children, variante }: CabeceraTituloProps) {
  return (
    <div className={`cabecera-titulo cabecera-titulo--${variante}`}>{children}</div>
  )
}
