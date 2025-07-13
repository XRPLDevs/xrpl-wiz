'use client'

import dynamic from 'next/dynamic'

const MuiContainer = dynamic(
  () => import('@mui/material/Container').then((mod) => mod.default),
  {
    ssr: false
  }
)

type PageContainerProps = {
  children: React.ReactNode
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export default function Container({
  children,
  maxWidth = 'lg'
}: PageContainerProps) {
  return (
    <MuiContainer maxWidth={maxWidth} sx={{ mt: 10 }}>
      {children}
    </MuiContainer>
  )
}
