'use client'

import {
  ThemeProvider as MuiThemeProvider,
  createTheme
} from '@mui/material/styles'

export default function ThemeProvider({
  children
}: {
  children: React.ReactNode
}) {
  const theme = createTheme({
    palette: {
      mode: 'light'
    }
  })

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}
