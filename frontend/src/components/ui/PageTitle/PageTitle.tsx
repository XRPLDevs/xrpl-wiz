'use client'

import Typography from '@mui/material/Typography'

export default function PageTitle({ title }: { title: string }) {
  return (
    <Typography variant="h4" component="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
      {title}
    </Typography>
  )
}
