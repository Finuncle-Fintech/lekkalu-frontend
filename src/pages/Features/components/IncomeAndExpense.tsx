import React from 'react'
import Lottie from 'lottie-react'
import businessGrowth from '@/assets/features/business-growth.json'
import { INCOME_EXPENSE_FEATURES } from '@/utils/details-page-data'

const IncomeAndExpense = () => {
  return (
    <>
      <div data-aos='fade-up' className='bg-white pb-2 sm:pb-8 pt-4'>
        <section className='mx-auto max-w-screen-xl lg:max-w-screen-2xl px-4 md:px-8'>
          <div className='mb-8 flex flex-col sm:flex-row  justify-around w-full items-center md:mb-16'>
            <div className='mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 pt-10 sm:pt-32 lg:pt-48'>
              <h1 className='mb-4 text-3xl font-bold text-black sm:text-4xl md:mb-8 md:text-5xl lg:text-5xl'>
                Empower Your Finances
              </h1>
              <p className='max-w-md leading-relaxed text-gray-500 text-sm sm:text-base xl:text-lg'>
                Navigate the complexities of personal finance with our comprehensive tools and features. From budgeting
                to goal-setting, unlock the potential for financial freedom and success. Start your journey to a secure
                financial future today.
              </p>
              <div className='flex flex-col gap-2.5 sm:flex-row lg:justify-start mt-7'>
                <a
                  href='/income-statement'
                  className='inline-block rounded-lg bg-primary px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 focus-visible:ring md:text-base'
                >
                  Start now
                </a>
                <a
                  href='#features'
                  className='inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base'
                >
                  Take tour
                </a>
              </div>
            </div>
            <div>
              <Lottie animationData={businessGrowth} className='max-w-md' />
            </div>
          </div>
        </section>
      </div>
      <div className='bg-white py-6 mb-14'>
        <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
          {/* text - start */}
          <div className='mb-10 md:mb-16' data-aos='fade-up' id='features'>
            <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>Key Features</h2>
            <p className='mx-auto max-w-screen-md text-center text-gray-500 md:text-base'>
              Explore the powerful features that make our financial platform a game-changer. From intuitive expense
              tracking to dynamic goal setting, we&apos;ve got everything you need for a holistic approach to managing
              your money
            </p>
          </div>
          {/* text - end */}
          <div className='grid gap-4 sm:grid-cols-1 md:gap-6 lg:grid-cols-2 xl:gap-8' data-aos='fade-up'>
            {INCOME_EXPENSE_FEATURES.map((ele) => (
              <div key={ele.title} className='flex flex-col items-center overflow-hidden rounded-lg border md:flex-row'>
                <a
                  href='#'
                  className='group relative block h-48 w-full shrink-0 self-start overflow-hidden bg-gray-100 md:h-full md:w-32 lg:w-48'
                >
                  <img
                    src={ele.thumbnail}
                    loading='lazy'
                    alt={ele.title}
                    className='absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110'
                  />
                </a>
                <div className='flex flex-col gap-2 p-4 lg:p-6 py-10'>
                  <h2 className='text-xl font-bold text-gray-800'>
                    <a href='#' className='transition duration-100 hover:text-indigo-500 active:text-indigo-600'>
                      {ele.title}
                    </a>
                  </h2>
                  <p className='text-gray-500'>{ele.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default IncomeAndExpense
