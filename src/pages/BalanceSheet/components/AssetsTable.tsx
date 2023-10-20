import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { BALANCE_SHEET } from '@/utils/query-keys'
import { fetchPhysicalAssets } from '@/queries/balance-sheet'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AddOrEditAssetDialog from './AddOrEditAssetDialog'

export default function AssetsTable() {
  const { data } = useQuery([BALANCE_SHEET.ASSETS], fetchPhysicalAssets)

  return (
    <div className='space-y-2'>
      <div className='flex justify-end'>
        <AddOrEditAssetDialog />
      </div>

      <Table className='border rounded'>
        <TableCaption className='text-center'>A list of physical assets</TableCaption>
        <TableHeader className='bg-gray-100/50'>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Current Value</TableHead>
            <TableHead>Purchase Value</TableHead>
            <TableHead>Sell Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell>{asset.name}</TableCell>
              <TableCell>{asset.market_value}</TableCell>
              <TableCell>{asset.purchase_value}</TableCell>
              <TableCell>{asset.sell_value ?? 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
