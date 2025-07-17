// truncate a string to a given length
export function truncate(str: string, length: number = 10) {
  return `${str.slice(0, length)}...${str.slice(-length)}`
}

export function fromHex160bit(str: string): string {
  const encoder = new TextEncoder()
  const bytes = encoder.encode(str)

  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()
}
