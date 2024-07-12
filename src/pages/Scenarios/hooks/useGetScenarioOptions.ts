import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchLiabilities, fetchPhysicalAssets } from '@/queries/balance-sheet'
import { BALANCE_SHEET, INCOME_STATEMENT } from '@/utils/query-keys'
import { fetchIncomeSources } from '@/queries/income-statement'

const useGetScenarioOptions = () => {
  const [isFetchingOptions, setIsFetchingOptions] = useState(true)

  const { data: assests, isFetched: hasAssetsOptionFetched } = useQuery({
    queryKey: [BALANCE_SHEET.ASSETS],
    queryFn: fetchPhysicalAssets,
  })
  const { data: liabilities, isFetched: hasLiabilitiesOptionFetched } = useQuery({
    queryKey: [BALANCE_SHEET.LIABILITIES],
    queryFn: fetchLiabilities,
  })
  const { data: income, isFetched: hasIncomeOptionFetched } = useQuery({
    queryKey: [INCOME_STATEMENT.INCOME_STATEMENT],
    queryFn: fetchIncomeSources,
  })

  useEffect(() => {
    if (hasAssetsOptionFetched && hasLiabilitiesOptionFetched && hasIncomeOptionFetched) {
      setIsFetchingOptions(false)
    }
  }, [hasAssetsOptionFetched, hasLiabilitiesOptionFetched, hasIncomeOptionFetched])

  return {
    isFetchingOptions,
    liabilities,
    assests,
    income,
  }
}

export { useGetScenarioOptions }
