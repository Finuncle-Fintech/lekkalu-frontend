import React from 'react'
import Lottie from 'lottie-react'
import chartAnimation from '@/assets/features/charts-animation.json'

const FinancialGoal = () => {
  return (
    <>
      <div className='bg-white py-6 sm:py-8 lg:py-12' data-aos='fade-up'>
        <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
          <div className='rounded-lg bg-gray-100 px-4 py-6 md:py-8 lg:py-12'>
            <p className='mb-2 text-center font-semibold text-primary md:mb-3 lg:text-lg'>Empower</p>
            <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>
              Master Your Finances
            </h2>
            <p className='mx-auto max-w-screen-md text-center text-gray-500 text-sm md:text-lg'>
              Navigate the complexities of personal finance with our intuitive tools. From budgeting to goal-setting,
              unlock the potential for financial freedom and success. Start your journey today
            </p>
          </div>
        </div>
      </div>
      <div className='bg-white pb-6' data-aos='fade-up'>
        <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
          <section className='flex flex-col justify-around gap-6 sm:gap-10 md:gap-16 lg:flex-row'>
            <div className='flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12 xl:py-24'>
              <p className='mb-2 font-semibold text-primary md:text-lg xl:text-xl'>Visuals</p>
              <h1 className='mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl'>Insightful Charts</h1>
              <p className='mb-8 leading-relaxed text-gray-500 md:mb-12 lg:w-4/5 text-sm md:text-base xl:text-lg'>
                Gain valuable insights into your financial landscape with our dynamic charts. Visualize expenses, track
                goals, and understand your financial journey at a glance. Make informed decisions for a secure financial
                future
              </p>
              <div className='flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start'>
                <a
                  href='/goals'
                  className='inline-block rounded-lg bg-primary px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 focus-visible:ring md:text-base'
                >
                  Start now
                </a>
                <a
                  href='#goals'
                  className='inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base'
                >
                  Take tour
                </a>
              </div>
            </div>
            <div className='max-w-lg'>
              <Lottie animationData={chartAnimation} />
            </div>
          </section>
        </div>
      </div>

      <div className='bg-white py-6 sm:py-8 lg:py-12 mb-12' id='goals' data-aos='fade-up'>
        <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
          {/* text - start */}
          <div className='mb-10 md:mb-16'>
            <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>Financial Goals</h2>
            <p className='mx-auto max-w-screen-md text-center text-gray-500 text-sm sm:text-base md:text-lg'>
              Embark on a journey towards financial prosperity by setting and achieving your personalized financial
              goals. Explore our powerful tools designed to empower your financial success.
            </p>
          </div>
          {/* text - end */}
          <div className='grid gap-6 sm:grid-cols-2'>
            <a
              data-aos='fade-up'
              href='#'
              className='group relative flex h-80 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg'
            >
              <img
                src='https://niveshshubharambh.com/wp-content/uploads/2023/03/Untitled-design-69.png'
                loading='lazy'
                alt='Photo of Financial Goals'
                className='absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110'
              />
              <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50' />
              <div className='relative flex flex-col'>
                <span className='text-gray-200'>Savings</span>
                <span className='text-lg font-semibold text-white lg:text-xl'>Emergency Fund</span>
              </div>
            </a>
            <a
              data-aos='fade-up'
              href='#'
              className='group relative flex h-80 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg'
            >
              <img
                src='https://www.maxlifeinsurance.com/content/dam/corporate/images/Benefits_of_Retirement_Planning-2.png'
                loading='lazy'
                alt='Photo of Financial Goals'
                className='absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110'
              />
              <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50' />
              <div className='relative flex flex-col'>
                <span className='text-gray-200'>Investment</span>
                <span className='text-lg font-semibold text-white lg:text-xl'>Retirement Plan</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default FinancialGoal
