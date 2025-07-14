import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { address } = await request.json()

  console.log('address: ', address)

  return NextResponse.json({ message: 'Hello, world!' })
}
