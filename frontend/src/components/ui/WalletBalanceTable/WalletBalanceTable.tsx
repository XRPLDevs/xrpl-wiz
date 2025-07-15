'use client'

import { useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { truncate } from '@/utils/string'
import { useWalletStore } from '@/stores'
import { useWalletBalance } from '@/hooks/useWalletBalance'

export default function WalletBalanceTable() {
  const { balances, setBalances } = useWalletStore()
  const { data: balancesData, isLoading: isBalancesLoading } =
    useWalletBalance()

  useEffect(() => {
    if (balancesData) {
      setBalances(balancesData)
    }
  }, [balancesData, setBalances])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="wallet balance table">
        <TableHead>
          <TableRow>
            <TableCell>Currency</TableCell>
            <TableCell>Limit</TableCell>
            <TableCell>Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isBalancesLoading && (
            <TableRow>
              <TableCell colSpan={3} align="center">
                <CircularProgress size={24} />
              </TableCell>
            </TableRow>
          )}
          {!isBalancesLoading && balances.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} align="center">
                No balances found.
              </TableCell>
            </TableRow>
          )}
          {!isBalancesLoading &&
            balances.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  <Typography variant="body1" component="div">
                    {row.currency}
                  </Typography>
                  <Typography variant="caption" component="div">
                    {truncate(row.account, 6)}
                  </Typography>
                </TableCell>
                <TableCell>
                  {row.limit ?? '-'} {row.currency}
                </TableCell>
                <TableCell>
                  {row.balance} {row.currency}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
