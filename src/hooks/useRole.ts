import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchComparisons } from '@/queries/comparisons'
import { fetchScenarios } from '@/queries/scenarios'
import { COMPARISON, SCENARIOS } from '@/utils/query-keys'

/**
 * owner -> The owner of the scenario or comparison.
 * neighbour -> Authenticated user but not the owner of the sceanrio or comparison.
 * guest -> Unauthenticated user.
 */

export type UserRole = 'owner' | 'neighbour' | 'guest'
export type RoleFor = 'comparison' | 'scenario'

type RolePropsType = {
  userId: number | null
  roleFor: RoleFor
  id: number
}

const useRole = ({ userId, roleFor, id }: RolePropsType) => {
  const [role, setRole] = useState<UserRole>()

  const { data: allScenarios, isSuccess: scenarioFetchSuccess } = useQuery({
    queryKey: [SCENARIOS.SCENARIOS],
    queryFn: fetchScenarios,
    enabled: roleFor === 'scenario',
  })

  const { data: allComparisons, isSuccess: comparisonFetchSuccess } = useQuery({
    queryKey: [COMPARISON.COMPARISON],
    queryFn: fetchComparisons,
    enabled: roleFor === 'comparison',
  })

  useEffect(() => {
    if (userId === null) {
      setRole('guest')
    }
  }, [userId])

  useEffect(() => {
    if (roleFor === 'comparison' && comparisonFetchSuccess) {
      const idExists = allComparisons.map((each) => each?.id).includes(id)
      if (idExists) {
        setRole('owner')
      } else {
        setRole('neighbour')
      }
    }
  }, [roleFor, comparisonFetchSuccess, id, allComparisons])

  useEffect(() => {
    if (roleFor === 'scenario' && scenarioFetchSuccess) {
      const idExists = allScenarios.map((each) => each?.id).includes(id)
      if (idExists) {
        setRole('owner')
      } else {
        setRole('neighbour')
      }
    }
  }, [roleFor, scenarioFetchSuccess, id, allScenarios])

  return { role }
}

export default useRole
