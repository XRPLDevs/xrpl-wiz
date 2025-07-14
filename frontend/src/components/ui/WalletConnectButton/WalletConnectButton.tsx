'use client'

import { isInstalled, getAddress } from '@gemwallet/api'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { useWalletStore } from '@/stores'
import { fetchAllBalances } from '@/utils/xrpl'

type WalletConnectButtonProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function WalletConnectButton({
  open,
  setOpen
}: WalletConnectButtonProps) {
  const { connect, setBalances } = useWalletStore()

  const handleConnectGemWallet = async () => {
    try {
      if (!(await isInstalled())) {
        throw new Error('Gem wallet is not installed')
      }

      const response = await getAddress()

      if (response.type === 'reject' || !response.result) {
        throw new Error('User rejected the request')
      }

      const address = response.result.address

      connect(address)

      const balances = await fetchAllBalances(address)

      setBalances(balances)
    } catch (error) {
      console.error(error)
    } finally {
      setOpen(false)
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
