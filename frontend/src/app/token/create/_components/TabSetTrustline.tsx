'use client'

import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default function TabSetTrustline() {
  return (
    <Box sx={{ mt: 2 }}>
      <Alert severity="warning" sx={{ mb: 2 }}>
        Please work in the wallet that will receive the issued token.
      </Alert>
      <Grid container spacing={2}>
        <Grid size={12}>
          <TextField
            label="Currency"
            fullWidth
            placeholder="e.g. XRP"
            autoComplete="off"
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label="Issuer"
            fullWidth
            placeholder="e.g. rLQ23456789012345678901234567890123456789"
            autoComplete="off"
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label="Amount"
            fullWidth
            placeholder="e.g. 100"
            autoComplete="off"
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
            Set trustline
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
