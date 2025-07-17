import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

const XRPL_API_URL = 'https://s.altnet.rippletest.net:51234/'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const txBlob = searchParams.get('txBlob')

  console.log('txBlob: ', txBlob)
  if (!txBlob) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 })
  }

  const response = await fetch(XRPL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      method: 'submit',
      params: [
        {
          tx_blob: txBlob
        }
      ]
    })
  })

  const json = await response.json()
  const result = json.result

  console.log('result: ', result)

  return NextResponse.json({
    result
  })
}
