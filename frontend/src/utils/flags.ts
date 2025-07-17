import { TrustSetFlags } from 'xrpl'
import { SwitchTypes } from '@/utils/enums'

export function buildTrustSetFlags(flags: {
  fAuth: string
  noRipple: string
  freeze: string
  deepFreeze?: string
}): number {
  let result = 0
  if (flags.fAuth === SwitchTypes.ON) result |= TrustSetFlags.tfSetfAuth
  if (flags.noRipple === SwitchTypes.ON) result |= TrustSetFlags.tfSetNoRipple
  if (flags.noRipple === SwitchTypes.OFF) result |= TrustSetFlags.tfClearNoRipple
  if (flags.freeze === SwitchTypes.ON) result |= TrustSetFlags.tfSetFreeze
  if (flags.freeze === SwitchTypes.OFF) result |= TrustSetFlags.tfClearFreeze
  if (flags.deepFreeze === SwitchTypes.ON) result |= TrustSetFlags.tfSetDeepFreeze
  if (flags.deepFreeze === SwitchTypes.OFF) result |= TrustSetFlags.tfClearDeepFreeze
  return result
}