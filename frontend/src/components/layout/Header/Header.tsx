'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import AppBar from '@mui/material/AppBar'
import Collapse from '@mui/material/Collapse'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import InboxIcon from '@mui/icons-material/Inbox'
import StarBorder from '@mui/icons-material/StarBorder'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
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

  const [openDocumentMenu, setOpenDocumentMenu] = useState(false)

  const handleClick = () => {
    setOpenDocumentMenu(!openDocumentMenu)
  }

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
            <ListItemButton onClick={handleClick}>
              <ListItemText primary="Documents" />
              {openDocumentMenu ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openDocumentMenu} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  component={Link}
                  href="/documents/xrp-ledger"
                >
                  <ListItemText primary="XRP Ledger" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  component={Link}
                  href="/documents/dev-tools"
                >
                  <ListItemText primary="Dev Tools" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>
    </Box>
  )
}
