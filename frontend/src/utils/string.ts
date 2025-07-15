// truncate a string to a given length
export function truncate(str: string, length: number = 10) {
  return `${str.slice(0, length)}...${str.slice(-length)}`
}
