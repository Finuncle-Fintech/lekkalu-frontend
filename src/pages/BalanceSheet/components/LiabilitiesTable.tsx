import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { fetchLiabilities } from '@/queries/balance-sheet'
import { BALANCE_SHEET } from '@/utils/query-keys'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AddOrEditLiabilityDialog from './AddOrEditLiabilityDialog'

export default function LiabilitiesTable() {
  const { data } = useQuery([BALANCE_SHEET.LIABILITIES], fetchLiabilities)

  return (
    <div className='space-y-2'>
      <div className='flex justify-end'>
        <AddOrEditLiabilityDialog />
      </div>

      <Table className='border rounded'>
        <TableCaption className='text-center'>A list of liabilities</TableCaption>
        <TableHeader className='bg-gray-100/50'>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Market Value</TableHead>
            <TableHead>Principal</TableHead>
            <TableHead>Interest</TableHead>
            <TableHead>Tenure</TableHead>
            <TableHead>Closure</TableHead>
            <TableHead>Disbursement</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((liability) => (
            <TableRow key={liability.id}>
              <TableCell>{liability.name}</TableCell>
              <TableCell>{liability.balance}</TableCell>
              <TableCell>{liability.principal}</TableCell>
              <TableCell>{liability.interest_rate}</TableCell>
              <TableCell>{liability.tenure}</TableCell>
              <TableCell>{liability.closure_charges}</TableCell>
              <TableCell>{liability.disbursement_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
