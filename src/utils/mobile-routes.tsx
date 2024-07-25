export const mobileRoutes = [
  {
    id: 'signin',
    web: '/signin',
    mobile: 'login',
  },
  {
    id: 'signup',
    web: '/signup',
    mobile: 'signup',
  },
  {
    id: 'comparisons',
    web: '/comparisons/[id]',
    mobile: '(authenticated)/comparisons/[id]',
  },
  {
    id: 'scenarios',
    web: '/scenarios/[id]',
    mobile: '(authenticated)/scenarios/[id]',
  },
  {
    id: 'goals',
    web: '/goals/[id]',
    mobile: '(authenticated)/goal-details',
  },
]
