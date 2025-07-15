import { useQuery } from '@tanstack/react-query'
import { useWalletStore } from '@/stores'

export function useWalletBalance() {
  const { isConnected, address } = useWalletStore()

  const { data, isLoading, error } = useQuery({
    queryKey: ['wallet-balance'],
    queryFn: async () => {
      const response = await fetch(`/api/xrpl/balances?address=${address}`)

      if (!response.ok) {
        throw new Error('Failed to fetch wallet balances')
      }

      const json = await response.json()
      const lines = json.lines

      return lines
    },
    enabled: isConnected && !!address
  })

  return {
    data,
    isLoading,
    error
  }
}
