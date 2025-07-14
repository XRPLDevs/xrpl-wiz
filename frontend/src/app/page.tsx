'use client'

import Link from 'next/link'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import Container from '@/components/layout/Container/Container'
import PageTitle from '@/components/ui/PageTitle/PageTitle'
import { useWalletStore } from '@/stores'

export default function Home() {
  const { isConnected, balances } = useWalletStore()

  return (
    <Container>
      <PageTitle title="Dashboard" />
      {!isConnected && <p>Please connect your wallet to continue.</p>}
      {isConnected && (
        <Grid container spacing={2}>
          <Grid size={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Balances</Typography>
                <List dense>
                  {balances.map((balance) => (
                    <ListItem key={balance.currency}>
                      <ListItemAvatar>
                        <Avatar />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${balance.currency} (${balance.account})`}
                        secondary={`${balance.balance} ${balance.currency}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  fullWidth
                  component={Link}
                  href="/token/create"
                >
                  Create token
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  )
}
