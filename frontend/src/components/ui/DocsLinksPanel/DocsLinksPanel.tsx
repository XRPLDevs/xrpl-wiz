'use client'

import Link from 'next/link'

type DocsLinksPanelProps = {
  links: {
    title: string
    href: string
  }[]
}

export default function DocsLinksPanel({ links }: DocsLinksPanelProps) {
  return (
    <ul style={{ margin: 0 }}>
      {links.map((link) => (
        <li key={link.title}>
          <Link href={link.href} target="_blank">
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
