import { InputField } from '@/components/InputFieldsRenderer/InputFieldsRenderer'

export const ASSET_INPUTS: InputField[] = [
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
    defaultDate: undefined,
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
    defaultDate: undefined,
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

export const LIABILITY_INPUTS: InputField[] = [
  {
    id: 'name',
    label: 'Liability Name',
    type: 'text',
  },
  {
    id: 'balance',
    label: 'Balance',
    type: 'number',
  },
  {
    id: 'principal',
    label: 'Principal',
    type: 'number',
  },
  {
    id: 'disbursement_date',
    label: 'Disbursement Date',
    type: 'date',
    defaultDate: undefined,
  },
  {
    id: 'emi_day',
    label: 'EMI Day',
    type: 'number',
  },
  {
    id: 'emi',
    label: 'EMI',
    type: 'number',
  },
  {
    id: 'tenure',
    label: 'Tenure',
    type: 'number',
  },
  {
    id: 'interest_rate',
    label: 'Interest Rate',
    type: 'number',
  },
  {
    id: 'closure_charges',
    label: 'Closure Charges',
    type: 'number',
  },
]
