import { create } from 'zustand'

export type WalletState = {
  isConnected: boolean
  address: string
  balances: TokenBalance[]
  isLoading: boolean
}

export type TokenBalance = {
  id: string
  account: string
  currency: string
  balance: string
  limit: string
  limitPeer: string
  qualityIn: number
  qualityOut: number
}

export type WalletActions = {
  connect: (address: string) => void
  disconnect: () => void
  setBalances: (balances: TokenBalance[]) => void
  startLoading: () => void
  stopLoading: () => void
}

export const useWalletStore = create<WalletState & WalletActions>(
  (set, get) => ({
    isConnected: false,
    address: '',
    balances: [],
    isLoading: false,

    connect: (address: string) => {
      set({ isConnected: true, address })
    },

    disconnect: () => {
      set({ isConnected: false, address: '' })
    },

    setBalances: (balances: TokenBalance[]) => {
      set({ balances })
    },

    startLoading: () => {
      set({ isLoading: true })
    },

    stopLoading: () => {
      set({ isLoading: false })
    }
  })
)
