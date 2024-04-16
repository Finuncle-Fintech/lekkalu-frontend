import React from 'react'
import { ArrowLeftIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

type PageTitleType = {
  title: string
  backUrl: string
  backUrlTitle: string
  noBackButton?: false
}

type PageTitleTypeWithoutBackButton = {
  title: string
  noBackButton: true
}

const PageTitle = (props: PageTitleType | PageTitleTypeWithoutBackButton) => {
  if (props.noBackButton) {
    return (
      <div className='space-y-8'>
        <div>
          <h1 className='text-2xl font-bold'>{props.title}</h1>
        </div>
      </div>
    )
  }
  const { title, backUrl, backUrlTitle } = props
  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-2xl font-bold'>{title}</h1>
      </div>
      <Link className='flex items-center gap-2 text-muted-foreground w-52' to={backUrl}>
        <ArrowLeftIcon className='w-4 h-4' />
        {backUrlTitle}
      </Link>
    </div>
  )
}

export default PageTitle
