'use client'

import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useWalletBalance } from '@/hooks/useWalletBalance'
import { useWalletStore } from '@/stores'

export default function TabTransferToken() {
  const [destination, setDestination] = useState('')
  const [selectToken, setSelectToken] = useState('')
  const [selectTokens, setSelectTokens] = useState<any[]>([])
  const [amount, setAmount] = useState('')

  const { address } = useWalletStore()

  const { data: destinationLines, isLoading } = useWalletBalance(
    destination && destination.length > 20 ? destination : undefined
  )

  const handleSelectToken = (e: SelectChangeEvent<string>) => {
    setSelectToken(e.target.value)
  }

  useEffect(() => {
    if (destinationLines) {
      setSelectTokens(destinationLines)
    }
  }, [destinationLines])

  return (
    <Box sx={{ mt: 2 }}>
      <Alert severity="warning" sx={{ mb: 2 }}>
        Please work in the issuer wallet.
      </Alert>
      <Grid container spacing={2}>
        <Grid size={12}>
          <TextField
            label="Destination"
            fullWidth
            placeholder="e.g. rLQ23456789012345678901234567890123456789"
            autoComplete="off"
            disabled={isLoading}
            value={destination}
            helperText={isLoading ? 'Fetching trustlines...' : ''}
            onChange={(e) => setDestination(e.target.value)}
          />
        </Grid>
        {destination && (
          <>
            <Grid size={12}>
              <FormControl fullWidth>
                <InputLabel id="currency-select-label">
                  Currency - Issuer
                </InputLabel>
                <Select
                  labelId="currency-select-label"
                  label="Currency - Issuer"
                  fullWidth
                  disabled={isLoading}
                  value={selectToken}
                  onChange={handleSelectToken}
                >
                  {selectTokens
                    .filter((token) => token.account === address)
                    .map((token) => (
                      <MenuItem key={token.currency} value={token.currency}>
                        {`${token.currency} - ${token.account}`}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={12}>
              <TextField
                label="Amount"
                fullWidth
                disabled={isLoading}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                helperText={`Limit: ${
                  selectTokens.find((t) => t.currency === selectToken)?.limit
                } ${selectToken}`}
              />
            </Grid>
          </>
        )}
        <Grid size={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disableElevation
            size="large"
          >
            Transfer token
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
