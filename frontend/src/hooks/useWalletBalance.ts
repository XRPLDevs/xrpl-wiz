import { useQuery } from '@tanstack/react-query'
import { useWalletStore } from '@/stores'

export function useWalletBalance(address?: string) {
  const { isConnected, address: storeAddress } = useWalletStore()
  const targetAddress = address ?? storeAddress

  const { data, isLoading, error } = useQuery({
    queryKey: ['wallet-balance'],
    queryFn: async () => {
      const response = await fetch(
        `/api/xrpl/balances?address=${targetAddress}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch wallet balances')
      }

      const json = await response.json()
      const lines = json.lines

      return lines
    },
    enabled: !!targetAddress && (address ? true : isConnected)
  })

  return {
    data,
    isLoading,
    error
  }
}
