'use client'

import { useForm } from '@tanstack/react-form'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { fromHex160bit } from '@/utils/string'

const defaultValues = {
  currency: '',
  account: '',
  amount: ''
}

export default function TabSetTrustline() {
  const form = useForm({
    defaultValues,
    onSubmit: ({ value }) => {
      console.log(value)
      const currency = fromHex160bit(value.currency)
      console.log(currency)
    }
  })

  return (
    <Box sx={{ mt: 2 }}>
      <Alert severity="warning" sx={{ mb: 2 }}>
        Please work in the wallet that will receive the issued token.
      </Alert>
      <Typography variant="h6" sx={{ mb: 2 }}>
        <Link
          href="https://xrpl.org/docs/references/protocol/data-types/currency-formats#currency-codes"
          target="_blank"
          underline="hover"
          color="inherit"
        >
          Currency codes
        </Link>
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <Grid container spacing={2}>
          <Grid size={12}>
            <form.Field
              name="currency"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return 'Required'
                  if (!/^[A-Za-z?!@#$%^&*<>(){}\[\]|]+$/.test(value))
                    return 'Only letters and ?!@#$%^&*<>(){}[]| allowed'
                  if (value.length > 20) return 'Maximum 20 characters allowed'
                  return undefined
                }
              }}
              children={(field) => (
                <TextField
                  label="Currency"
                  fullWidth
                  placeholder="e.g. XRP"
                  autoComplete="off"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  error={field.state.meta.errors.length > 0}
                  helperText={field.state.meta.errors.join(', ')}
                />
              )}
            />
          </Grid>
          <Grid size={12}>
            <form.Field
              name="account"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return 'Required'
                  if (!/^[rL][a-zA-Z0-9]{20,33}$/.test(value))
                    return 'Invalid account address'
                  return undefined
                }
              }}
              children={(field) => (
                <TextField
                  label="Issuer"
                  fullWidth
                  placeholder="e.g. rLQ23456789012345678901234567890123456789"
                  autoComplete="off"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  error={field.state.meta.errors.length > 0}
                  helperText={field.state.meta.errors.join(', ')}
                />
              )}
            />
          </Grid>
          <Grid size={12}>
            <form.Field
              name="amount"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return 'Required'
                  if (!/^[0-9]+$/.test(value)) return 'Invalid amount'
                  return undefined
                }
              }}
              children={(field) => (
                <TextField
                  label="Amount"
                  fullWidth
                  placeholder="e.g. 100"
                  autoComplete="off"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  error={field.state.meta.errors.length > 0}
                  helperText={field.state.meta.errors.join(', ')}
                />
              )}
            />
          </Grid>
          <Grid size={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disableElevation
              size="large"
              type="submit"
            >
              Set trustline
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}
