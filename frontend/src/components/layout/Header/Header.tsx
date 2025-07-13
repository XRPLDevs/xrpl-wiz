'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import AppBar from '@mui/material/AppBar'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import WalletConnectButton from '@/components/ui/WalletConnectButton/WalletConnectButton'

const Box = dynamic(
  () => import('@mui/material/Box').then((mod) => mod.default),
  {
    ssr: false
  }
)

const drawerWidth = 240

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <Box>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            XRPL Wiz
          </Typography>
          <WalletConnectButton open={open} setOpen={setOpen} />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} href="/">
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  )
}
