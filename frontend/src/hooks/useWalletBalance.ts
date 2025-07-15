import { useQuery } from '@tanstack/react-query'
import { useWalletStore } from '@/stores'

export function useWalletBalance(address?: string) {
  const { address: storeAddress } = useWalletStore()
  const targetAddress = address ?? storeAddress

  const { data, isLoading, isSuccess, error, refetch } = useQuery({
    queryKey: ['wallet-balance', targetAddress],
    queryFn: async () => {
      if (!targetAddress) throw new Error('No address')
      const response = await fetch(
        `/api/xrpl/balances?address=${targetAddress}`
      )
      if (!response.ok) throw new Error('Failed to fetch wallet balances')
      const json = await response.json()
      return json.lines
    },
    enabled: false
  })

  return {
    data,
    isLoading,
    isSuccess,
    error,
    refetch
  }
}
