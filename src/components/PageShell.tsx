import type { ReactNode } from 'react'
import './PageShell.css'

type PageShellProps = {
  title?: string
  description?: string
  beforeTitle?: ReactNode
  children?: ReactNode
  className?: string
}

export function PageShell({
  title,
  description,
  beforeTitle,
  children,
  className,
}: PageShellProps) {
  const articleClass = className
    ? `page-shell ${className}`
    : 'page-shell'

  return (
    <article className={articleClass}>
      {beforeTitle}
      {title ? <h1>{title}</h1> : null}
      {description ? (
        <p className="page-shell__description">{description}</p>
      ) : null}
      {children}
    </article>
  )
}
