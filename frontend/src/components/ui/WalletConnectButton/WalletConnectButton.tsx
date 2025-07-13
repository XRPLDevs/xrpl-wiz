'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

type WalletConnectButtonProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function WalletConnectButton({
  open,
  setOpen
}: WalletConnectButtonProps) {
  const handleConnectGemWallet = async () => {
    try {
      console.log('connect gem wallet')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Button variant="outlined" color="inherit" onClick={() => setOpen(true)}>
        Connect
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Connect Wallet</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handleConnectGemWallet}
            >
              Gem wallet
            </Button>
            <Button variant="outlined" color="primary" fullWidth>
              Xaman
            </Button>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}
