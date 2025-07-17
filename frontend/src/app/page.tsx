'use client'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Container from '@/components/layout/Container/Container'
import PageTitle from '@/components/ui/PageTitle/PageTitle'
import WalletBalanceTable from '@/components/ui/WalletBalanceTable/WalletBalanceTable'
import { useWalletStore } from '@/stores'

export default function Home() {
  const { isConnected } = useWalletStore()

  return (
    <Container>
      <PageTitle title="Dashboard" />
      {!isConnected && <p>Please connect your wallet to continue.</p>}
      {isConnected && (
        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography variant="h6" sx={{ mb: 2 }}>Trustlines</Typography>
            <WalletBalanceTable />
          </Grid>
        </Grid>
      )}
    </Container>
  )
}
