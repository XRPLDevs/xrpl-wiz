import { Client } from 'xrpl'

const client = new Client('wss://s.altnet.rippletest.net:51233/')

export const fetchAllBalances = async (
  address: string
): Promise<
  {
    account: string
    balance: string
    currency: string
    limit: string
    limitPeer: string
    qualityIn: number
    qualityOut: number
  }[]
> => {
  await client.connect()

  try {
    const response = await client.request({
      command: 'account_lines',
      account: address,
      ledger_index: 'current'
    })

    if (response.type !== 'response') {
      throw new Error('Invalid response')
    }

    const lines = response.result.lines

    return lines.map((line) => {
      return {
        account: line.account,
        balance: line.balance,
        currency: line.currency,
        limit: line.limit,
        limitPeer: line.limit_peer,
        qualityIn: line.quality_in,
        qualityOut: line.quality_out
      }
    })
  } catch (error) {
    console.error('fetchAllBalances error: ', error)
    throw error
  } finally {
    await client.disconnect()
  }
}
