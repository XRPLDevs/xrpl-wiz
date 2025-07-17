'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import WalletConnectButton from '@/components/ui/WalletConnectButton/WalletConnectButton'
import { useWalletStore } from '@/stores'
import { truncate } from '@/utils/string'

const Box = dynamic(
  () => import('@mui/material/Box').then((mod) => mod.default),
  {
    ssr: false
  }
)

const drawerWidth = 240

export default function Header() {
  const [open, setOpen] = useState(false)

  const [openDrawer, setOpenDrawer] = useState(false)

  const [openTransactionMenu, setOpenTransactionMenu] = useState(false)

  const [openDocumentMenu, setOpenDocumentMenu] = useState(true)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const { isConnected, address, disconnect } = useWalletStore()

  const handleClick = () => {
    setOpenDocumentMenu(!openDocumentMenu)
  }

  const handleLogout = () => {
    disconnect()
    setAnchorEl(null)
    setOpenDrawer(false)
  }

  return (
    <Box>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            sx={{ mr: 2 }}
            onClick={() => setOpenDrawer(!openDrawer)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            XRPL Wiz
          </Typography>
          {!isConnected && (
            <WalletConnectButton open={open} setOpen={setOpen} />
          )}
          {isConnected && (
            <>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ textTransform: 'none' }}
                onClick={handleOpenMenu}
              >
                {truncate(address, 6)}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
              >
                <MenuItem onClick={handleLogout} disableRipple>
                  <LogoutIcon sx={{ mr: 1 }} />
                  Sign Out
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Toolbar />
        <Box sx={{ width: drawerWidth }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} href="/">
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItemButton
              onClick={() => setOpenTransactionMenu(!openTransactionMenu)}
            >
              <ListItemText primary="Transactions" />
              {openTransactionMenu ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openDocumentMenu} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  component={Link}
                  href="/transactions/trust-set"
                >
                  <ListItemText primary="Trust Set" />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItem disablePadding>
              <ListItemButton component={Link} href="/token/create">
                <ListItemText primary="Token Creation" />
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
                <ListItemButton
                  sx={{ pl: 4 }}
                  component={Link}
                  href="/documents/services"
                >
                  <ListItemText primary="Services" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>
    </Box>
  )
}
