export enum WalletTypes {
  GEM_WALLET = 'gem-wallet'
}
export type WalletType = (typeof WalletTypes)[keyof typeof WalletTypes]

export enum SwitchTypes {
  ON = 'true',
  OFF = 'false'
}
export type SwitchType = (typeof SwitchTypes)[keyof typeof SwitchTypes]
