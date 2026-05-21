import type { ReactNode } from 'react'
import './PageShell.css'

type PageShellProps = {
  title: string
  description: string
  children?: ReactNode
  className?: string
}

export function PageShell({
  title,
  description,
  children,
  className,
}: PageShellProps) {
  const articleClass = className
    ? `page-shell ${className}`
    : 'page-shell'

  return (
    <article className={articleClass}>
      <h1>{title}</h1>
      <p className="page-shell__description">{description}</p>
      {children}
    </article>
  )
}
