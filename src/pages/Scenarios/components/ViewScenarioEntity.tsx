import React, { Dispatch, SetStateAction } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '@/components/ui/dialog'

type ViewScenarioEntityType = {
  data: any
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  entityType: string
}

function propertyName(name: string): string {
  return name.replace(/_/g, ' ')
}

const ViewScenarioEntity = ({ data, isOpen, setIsOpen, entityType }: ViewScenarioEntityType) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{entityType} Detail</DialogTitle>
        </DialogHeader>
        <div>
          {Object.keys(data).map(
            (each) =>
              each !== 'id' && (
                <div key={each} className='flex gap-5 py-2'>
                  <p className='capitalize min-w-[50%] max-w-[50%]'>{propertyName(each)}:</p>
                  <p>{data[each]?.length ? data[each] : 'N/A'}</p>
                </div>
              ),
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ViewScenarioEntity
