'use client'

import type { SubmittableTransaction } from 'xrpl'
import { signTransaction, getAddress } from '@gemwallet/api'
import { useForm } from '@tanstack/react-form'
import Button from '@mui/material/Button'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Switch from '@mui/material/Switch'
import { trustSetFormSchema, type TrustSetFormType } from '@/schemas'
import { SwitchTypes } from '@/utils/enums'
import { buildTrustSetFlags } from '@/utils/flags'

const defaultValues: TrustSetFormType = {
  currency: '',
  value: '',
  issuer: '',
  qualityIn: '',
  qualityOut: '',
  flags: {
    fAuth: SwitchTypes.OFF,
    noRipple: SwitchTypes.OFF,
    freeze: SwitchTypes.OFF,
    deepFreeze: SwitchTypes.OFF
  }
}

export default function FormTrustline() {
  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: trustSetFormSchema
    },
    onSubmit: async ({ value }) => {
      const res = await getAddress()

      if (res && res.type === 'reject') {
        console.error(res)
        throw new Error('Failed to get address')
      }

      if (!res.result) {
        throw new Error('Failed to get address')
      }

      const transaction: SubmittableTransaction = {
        TransactionType: 'TrustSet',
        Account: res.result.address,
        LimitAmount: {
          currency: value.currency,
          issuer: value.issuer,
          value: value.value
        },
        QualityIn: value.qualityIn ? Number(value.qualityIn) : undefined,
        QualityOut: value.qualityOut ? Number(value.qualityOut) : undefined,
        Flags: buildTrustSetFlags(value.flags)
      }

      const response = await signTransaction({ transaction })
      const signature = response?.result?.signature

      console.log(response)

      if (!signature) {
        throw new Error('Failed to sign transaction')
      }

      const txBlob = await fetch(`/api/xrpl/submit?txBlob=${signature}`)
      const txBlobData = await txBlob.json()

      console.log('txBlobData: ', txBlobData)
    }
  })

  return (
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
            children={(field) => (
              <TextField
                label="Currency"
                fullWidth
                placeholder="e.g. USD"
                autoComplete="off"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                error={field.state.meta.errors.length > 0}
                helperText={field.state.meta.errors[0]?.message}
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <form.Field
            name="issuer"
            children={(field) => (
              <TextField
                label="Issuer"
                fullWidth
                placeholder="e.g. rLQ23456789012345678901234567890123456789"
                autoComplete="off"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                error={field.state.meta.errors.length > 0}
                helperText={field.state.meta.errors[0]?.message}
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <form.Field
            name="value"
            children={(field) => (
              <TextField
                label="Value"
                fullWidth
                placeholder="e.g. 100"
                autoComplete="off"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                error={field.state.meta.errors.length > 0}
                helperText={field.state.meta.errors[0]?.message}
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <form.Field
            name="flags"
            children={(field) => (
              <FormGroup>
                <FormControlLabel
                  control={<Switch />}
                  label="fAuth"
                  checked={field.state.value.fAuth === SwitchTypes.ON}
                  onChange={(e) =>
                    field.handleChange({
                      ...field.state.value,
                      fAuth: (e.target as HTMLInputElement).checked
                        ? SwitchTypes.ON
                        : SwitchTypes.OFF
                    })
                  }
                />
                <FormControlLabel
                  control={<Switch />}
                  label="noRipple"
                  checked={field.state.value.noRipple === SwitchTypes.ON}
                  onChange={(e) =>
                    field.handleChange({
                      ...field.state.value,
                      noRipple: (e.target as HTMLInputElement).checked
                        ? SwitchTypes.ON
                        : SwitchTypes.OFF
                    })
                  }
                />
                <FormControlLabel
                  control={<Switch />}
                  label="freeze"
                  checked={field.state.value.freeze === SwitchTypes.ON}
                  onChange={(e) =>
                    field.handleChange({
                      ...field.state.value,
                      freeze: (e.target as HTMLInputElement).checked
                        ? SwitchTypes.ON
                        : SwitchTypes.OFF
                    })
                  }
                />
              </FormGroup>
            )}
          />
        </Grid>
        <Grid size={12}>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disableElevation
                size="large"
                type="submit"
                disabled={!canSubmit || isSubmitting}
                loading={isSubmitting}
              >
                {isSubmitting ? 'Setting...' : 'Set trustline'}
              </Button>
            )}
          />
        </Grid>
      </Grid>
    </form>
  )
}
