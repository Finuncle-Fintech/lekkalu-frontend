/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { cn } from '@/utils/utils'
import NavLink from './NavLink'
import { CALCULATOR_ROUTES, ROUTES as _routes } from '@/utils/app-shell'
import { Button } from '@/components/ui/button'
import { SCENARIOS } from '@/utils/query-keys'
import { fetchScenarios } from '@/queries/scenarios'
import { useAuth } from '@/hooks/use-auth'

type SidebarProps = React.HTMLAttributes<HTMLDivElement>

export function Sidebar({ className, ...restProps }: SidebarProps) {
  const [subMenus, setSubMenus] = useState<any>({})
  const { isOpen, toggle } = useAuth()
  const [status, setStatus] = useState(false)

  const [ROUTES, setRoutes] = useState([..._routes])

  const { data, isSuccess: isScenariosSuccess } = useQuery({
    queryKey: [SCENARIOS.SCENARIOS],
    queryFn: fetchScenarios,
  })

  useEffect(() => {
    if (isScenariosSuccess && data) {
      const _scenarioSubMenu = data.map((each) => ({ path: `/scenarios/${each?.id}`, label: each?.name }))
      const clonedRoutes = [...ROUTES]
      const updatedRoutes = clonedRoutes.map((each, index) => {
        if (each.path === '/scenarios') {
          clonedRoutes[index].subMenu = _scenarioSubMenu
        }
        return each
      })
      setRoutes(updatedRoutes)
    }
  }, [isScenariosSuccess, data])

  useEffect(() => {
    const _subMenus: any = {}
    ROUTES.forEach((route) => {
      if (route.subMenu) {
        _subMenus[route.label] = {
          isExpanded: false,
          show: 3,
        }
      }
    })
    setSubMenus(_subMenus)
  }, [])

  const toggleSubMenuExpand = (label: string) => {
    setSubMenus((each: any) => {
      return {
        ...each,
        [label]: {
          ...each[label],
          isExpanded: !subMenus[label].isExpanded,
        },
      }
    })
  }

  const handleShowMoreSubMenu = (label: string) => {
    setSubMenus((each: any) => {
      return {
        ...each,
        [label]: {
          ...each[label],
          show: subMenus[label].show + 3,
        },
      }
    })
  }

  const handleToggle = () => {
    setStatus(true)
    toggle()
    setTimeout(() => setStatus(false), 500)
    if (isOpen === true) {
      setSubMenus((each: any) => {
        return {
          ...each,
          Scenarios: {
            ...each.Scenarios,
            isExpanded: false,
          },
        }
      })
    }
  }

  return (
    <nav
      className={cn(
        'border-r h-full relative hidden md:block',
        status && 'duration-300',
        isOpen ? 'w-64' : 'w-[78px]',
        className,
      )}
      {...restProps}
    >
      <ArrowLeft
        className={cn(
          'absolute -right-3 top-2 cursor-pointer rounded-full border bg-background text-3xl text-foreground',
          !isOpen && 'rotate-180',
        )}
        size={20}
        onClick={handleToggle}
      />
      <div className='space-y-4 py-2'>
        <div className='px-3'>
          <div className='space-y-1 mt-3'>
            <div className='space-y-1 py-2'>
              {ROUTES.map((route) => {
                if (route?.subMenu?.length) {
                  return (
                    <>
                      <NavLink
                        key={route.path}
                        to={route.path}
                        label={route.label}
                        icon={route.icon}
                        isParent={!!route?.subMenu}
                        isExpanded={subMenus[route.label]?.isExpanded}
                        toggleExpand={() => toggleSubMenuExpand(route?.label)}
                        isOpen={isOpen}
                      />
                      {subMenus[route.label]?.isExpanded &&
                        route?.subMenu?.map((subRoute: any, index: number) => {
                          if (index + 1 <= subMenus[route.label]?.show) {
                            return (
                              <div key={subRoute.path} className='pl-4'>
                                <NavLink
                                  isOpen={isOpen}
                                  to={subRoute.path}
                                  label={subRoute.label}
                                  icon={subRoute.icon}
                                />
                              </div>
                            )
                          }
                          return <></>
                        })}
                      {subMenus[route.label]?.isExpanded && route?.subMenu?.length > subMenus[route?.label]?.show && (
                        <div className='ml-4 pl-4'>
                          <Button variant={'link'} onClick={() => handleShowMoreSubMenu(route.label)}>
                            Show more
                          </Button>
                        </div>
                      )}
                    </>
                  )
                }
                return (
                  <NavLink isOpen={isOpen} key={route.path} to={route.path} label={route.label} icon={route.icon} />
                )
              })}
            </div>

            <hr className={cn(isOpen && 'md:hidden')} />
            <div className={cn('mt-4', !isOpen && 'md:hidden')}>Calculators</div>
            <div className='space-y-1 py-2'>
              {CALCULATOR_ROUTES.map((route) => (
                <NavLink isOpen={isOpen} key={route.path} to={route.path} label={route.label} icon={route.icon} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
