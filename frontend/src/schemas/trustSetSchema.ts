import { z } from 'zod'
import { SwitchTypes } from '@/utils/enums'

export const trustSetFormSchema = z.object({
  currency: z
    .string()
    .min(1, 'Required')
    .regex(
      /^[A-Za-z?!@#$%^&*<>(){}\[\]|]+$/,
      'Only letters and ?!@#$%^&*<>(){}[]| allowed'
    )
    .max(20, 'Maximum 20 characters allowed'),
  value: z.string().min(1, 'Required'),
  issuer: z.string().min(1, 'Required'),
  qualityIn: z.string().optional(),
  qualityOut: z.string().optional(),
  flags: z.object({
    fAuth: z.enum(SwitchTypes),
    noRipple: z.enum(SwitchTypes),
    freeze: z.enum(SwitchTypes),
    deepFreeze: z.enum(SwitchTypes)
  })
})

export type TrustSetFormType = z.infer<typeof trustSetFormSchema>
