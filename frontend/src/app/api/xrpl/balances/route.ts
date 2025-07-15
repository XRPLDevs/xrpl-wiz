import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

const XRPL_API_URL = 'https://s.altnet.rippletest.net:51234/'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const address = searchParams.get('address')

  console.log('address: ', address)
  if (!address) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 })
  }

  const response = await fetch(XRPL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      method: 'account_lines',
      params: [
        {
          account: address,
          api_version: 2
        }
      ]
    })
  })

  const json = await response.json()
  const result = json.result

  return NextResponse.json({
    lines: result.lines.map((line: any) => ({
      id: uuidv4(),
      currency: line.currency,
      account: line.account,
      balance: line.balance,
      limit: line.limit,
      limitPeer: line.limit_peer,
      qualityIn: line.quality_in,
      qualityOut: line.quality_out
    }))
  })
}
