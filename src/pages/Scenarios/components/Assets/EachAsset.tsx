import React, { useState } from 'react'
import { MoreVerticalIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import AddOrEditAssetsForScenarios from './AddOrEditAssetsForScenarios'
import DeleteAssetForScenario from './DeleteAssetForScenario'
import { PhysicalAsset } from '@/types/balance-sheet'
import { AddPhysicalAssetSchemaForScenario } from '@/schema/balance-sheet'
import { formatIndianMoneyNotation } from '@/utils/format-money'
import ViewScenarioEntity from '../ViewScenarioEntity'

type EachIncomeForScenarioType = {
  asset: PhysicalAsset
  createAsset: (dto: AddPhysicalAssetSchemaForScenario) => Promise<any>
  updateAsset: (id: number, dto: Partial<AddPhysicalAssetSchemaForScenario>) => Promise<any>
  deleteAsset: (id: number) => Promise<any>
  IS_AUTHENTICATED_USER?: boolean
}

const EachIncomeExpenseForScenario = ({
  asset,
  createAsset,
  updateAsset,
  deleteAsset,
  IS_AUTHENTICATED_USER,
}: EachIncomeForScenarioType) => {
  const [viewDetail, setViewDetail] = useState(false)

  const handleViewDetail = () => {
    setViewDetail(true)
  }
  return (
    <>
      <div
        className={'border flex flex-col rounded-lg bg-green-500 min-h-[150px] min-w-[190px] cursor-pointer'}
        onClick={handleViewDetail}
      >
        <div className='flex justify-between'>
          <p className='p-2 text-white text-xs'>Asset</p>
          {IS_AUTHENTICATED_USER && (
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button variant={'ghost'} className='hover:bg-green-600'>
                    <MoreVerticalIcon className='text-white' size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='flex flex-col' onClick={(e) => e.stopPropagation()}>
                  <DropdownMenuItem asChild>
                    <AddOrEditAssetsForScenarios
                      trigger={<Button variant={'ghost'}>Edit</Button>}
                      asset={asset}
                      addAsset={createAsset}
                      editAsset={updateAsset}
                    />
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <DeleteAssetForScenario id={asset.id} deleteAsset={deleteAsset} />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
        <div className='flex flex-col items-center text-white'>
          <p>{formatIndianMoneyNotation(asset.market_value)}</p>
          <p className='mt-5'>{asset.name}</p>
        </div>
      </div>
      <ViewScenarioEntity data={asset} isOpen={viewDetail} setIsOpen={setViewDetail} entityType='Asset' />
    </>
  )
}

export default EachIncomeExpenseForScenario
