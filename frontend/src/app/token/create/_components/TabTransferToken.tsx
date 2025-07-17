'use client'

import { useState } from 'react'
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

  const { isLoading, isSuccess, refetch } = useWalletBalance(destination)

  const handleSelectToken = (e: SelectChangeEvent<string>) => {
    setSelectToken(e.target.value)
  }

  const handleCheckTrustlines = async () => {
    if (destination && destination.length > 20) {
      const { data } = await refetch()
      const filteredData = data.filter(
        (line: any) => line.account === destination
      )
      if (filteredData) setSelectTokens(filteredData)
    }
  }

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
            helperText={
              isLoading
                ? 'Fetching trustlines...'
                : isSuccess
                  ? 'No trustlines found'
                  : ''
            }
            error={isSuccess && selectTokens.length === 0 ? true : false}
            onChange={(e) => setDestination(e.target.value)}
          />
        </Grid>
        <Grid size={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disableElevation
            size="large"
            onClick={handleCheckTrustlines}
          >
            Check trustlines
          </Button>
        </Grid>
        <Grid size={12}>
          <FormControl fullWidth>
            <InputLabel id="currency-select-label">
              Currency - Issuer
            </InputLabel>
            <Select
              labelId="currency-select-label"
              label="Currency - Issuer"
              fullWidth
              disabled={isSuccess && selectTokens.length > 0 ? false : true}
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
            disabled={isSuccess && selectTokens.length > 0 ? false : true}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            helperText={`Limit: ${
              selectTokens.find((t) => t.currency === selectToken)?.limit
            } ${selectToken}`}
          />
        </Grid>
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
