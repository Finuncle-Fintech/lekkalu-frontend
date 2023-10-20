import { InputField } from '@/components/InputFieldsRenderer/InputFieldsRenderer'

export const BALANCE_SHEET_INPUTS: InputField[] = [
  {
    id: 'name',
    label: 'Asset name',
    type: 'text',
  },
  {
    id: 'purchase_value',
    label: 'Purchase value',
    type: 'number',
  },
  {
    id: 'purchase_date',
    label: 'Choose the purchase date',
    type: 'date',
  },
  {
    id: 'sell_value',
    label: 'Sell value(Optional)',
    type: 'number',
  },
  {
    id: 'sell_date',
    label: 'Choose the sell date',
    type: 'date',
  },
  {
    id: 'depreciation_percent',
    label: 'Choose depreciation %',
    type: 'number',
  },
  {
    id: 'depreciation_frequency',
    label: 'Depreciation Frequency',
    type: 'number',
  },
  {
    id: 'init_dep',
    label: 'Initial depreciation',
    type: 'number',
  },
  {
    id: 'market_value',
    label: 'Market Value',
    type: 'number',
  },
]
