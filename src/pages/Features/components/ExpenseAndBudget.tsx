import React from 'react'

// ** Constants **
import Lottie from 'lottie-react'
import { EXPENSE_BUDGET_FEATURES } from '@/utils/details-page-data'
import { cn } from '@/utils/utils'

const ExpenseAndBudget = () => {
  return (
    <>
      {/* Hero Section  */}
      <div className='flex max-w-5xl flex-col items-center pb-0 pt-8 text-center mx-5 sm:mx-auto sm:pb-16 lg:pb-20 sm:pt-14 md:pt-20'>
        <h1 className='mb-8 text-3xl font-bold text-black sm:text-4xl md:mb-12 md:text-5xl'>
          Expense and Budget Management
        </h1>
        <p className='mb-8 leading-relaxed text-gray-500 md:mb-12 text-sm sm:text-base xl:text-lg'>
          Discover the power of financial control with our Expense and Budget Management tool. From seamless expense
          tracking to dynamic budget adjustments, embark on a journey towards financial freedom. Empower yourself,
          transform your life.
        </p>
        <div className='flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center'>
          <a
            href='#'
            className='inline-block rounded-lg bg-primary px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base'
          >
            Start now
          </a>
          <a
            href='#overview'
            className='inline-block rounded-lg border bg-white px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base'
          >
            Take tour
          </a>
        </div>
      </div>
      {/* Features Section */}
      <div className='bg-white py-6 max-sm:mt-20 sm:py-8 lg:py-12' id='overview'>
        <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
          {/* text - start */}
          <div className='mb-10 md:mb-16'>
            <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>
              Overview of Features
            </h2>
            <p className='mx-auto max-w-screen-lg text-center text-gray-500 md:text-lg'>
              Empower your financial journey with our comprehensive Expense and Budget Tool.
            </p>
          </div>
          <div className='grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10'>
            {EXPENSE_BUDGET_FEATURES.map(({ title, icon }) => {
              return (
                <div
                  key={title}
                  className='flex flex-col items-center overflow-hidden rounded-lg border shadow-lg bg-white'
                >
                  <div className='mt-4 max-sm:h-12 max-sm:w-12 flex p-2 items-center justify-center rounded-lg bg-primary text-white shadow-lg md:h-14 md:w-14 md:rounded-xl'>
                    {icon}
                  </div>
                  <div className='flex flex-1 flex-col p-4 sm:p-6'>
                    <h2 className='mb-2 text-base sm:text-lg font-semibold max-sm:text-center text-gray-800'>
                      {title}
                    </h2>
                    {/* <p className='text-gray-500 text-sm sm:text-base'>{description}</p> */}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {/* How it Works */}
      <div className='bg-white py-6 sm:py-8 lg:py-12'>
        <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
          <div className='mb-8 sm:mb-16'>
            <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>Usage of Features</h2>
            <p className='mx-auto max-w-screen-lg text-center text-gray-500 md:text-lg'>
              Explore our feature-rich platform to streamline your workflow. From intuitive expense tracking to seamless
              collaboration, our tools are designed to enhance productivity and provide you with a smooth user
              experience.
            </p>
          </div>
          {EXPENSE_BUDGET_FEATURES.map((ele, index) => (
            <div key={ele.title} className='grid gap-8 md:grid-cols-2 lg:gap-12 items-center my-10'>
              <Lottie
                animationData={ele.animation}
                className={cn('max-w-sm mx-auto', index % 2 === 0 ? 'md:order-first' : 'md:order-last')}
              />
              <div className={cn('md:pt-8', index % 2 === 0 ? 'md:text-start' : 'md:text-end')}>
                <p className='font-bold text-indigo-500'>{ele.title}</p>
                <h1 className='mb-4 text-2xl font-bold text-gray-800 sm:text-3xl md:mb-4'>{ele?.subTitle}</h1>
                <p className='mb-6 text-gray-500 sm:text-lg md:mb-8'>{ele.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ExpenseAndBudget
