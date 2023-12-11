import React from 'react'
import { BALANCE_SHEET_FEATURES } from '@/utils/details-page-data'

const BalanceSheetDetails = () => {
  return (
    <>
      <div className='bg-white pb-6 sm:pb-8 lg:pb-12'>
        <div className='mx-auto max-w-screen-2xl px-4 md:px-8 pt-12'>
          <section
            data-aos='fade-up'
            className=' relative flex flex-1 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100 py-16 shadow-lg md:py-20 xl:py-48'
          >
            {/* image - start */}
            <img
              src='https://images.unsplash.com/photo-1618004652321-13a63e576b80?auto=format&q=75&fit=crop&w=1500'
              loading='lazy'
              alt='Hero Image'
              className='absolute inset-0 h-full w-full object-cover object-center'
            />
            {/* image - end */}
            {/* overlay - start */}
            <div className='absolute inset-0 bg-primary mix-blend-multiply' />
            {/* overlay - end */}
            {/* text start */}
            <div className='relative flex flex-col items-center p-4 max-w-5xl'>
              <p className='mb-4 text-center text-lg text-indigo-200 sm:text-xl md:mb-8'>
                Achieve Financial Clarity and Efficiency
              </p>
              <h1 className='mb-8 text-center text-4xl font-bold text-white sm:text-5xl md:mb-12 md:text-6xl'>
                Enhance financial control with our Balance Tools
              </h1>
              <div className='flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center'>
                <a
                  href='/balance-sheet'
                  className='inline-block rounded-lg bg-primary px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-primary focus-visible:ring active:bg-primary md:text-base'
                >
                  Start now
                </a>
                <a
                  href='#features'
                  className='inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-700 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base'
                >
                  Take tour
                </a>
              </div>
            </div>
            {/* text end */}
          </section>
        </div>
      </div>

      <section className='bg-white text-gray-900 mb-12'>
        <div className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16'>
          <div data-aos='fade-up' className='mx-auto max-w-2xl text-center'>
            <h2 className='text-3xl font-bold sm:text-4xl'>Key Features</h2>
            <p className='mt-4 text-gray-700'>
              Explore the powerful features that make our Balance Sheet tools indispensable for effective financial
              management.
            </p>
          </div>
          <div className='mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3' data-aos='fade-up'>
            {BALANCE_SHEET_FEATURES.map((ele) => (
              <a
                key={ele.title}
                className='block rounded-xl border border-gray-300 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10'
                href='#'
              >
                {ele.icon}
                <h2 className='mt-4 text-xl font-bold text-black'>{ele.title}</h2>
                <p className='mt-1 text-sm text-gray-800'>{ele.description}</p>
              </a>
            ))}
          </div>
          <div className='mt-12 text-center' id='features'>
            <a
              href='/balance-sheet'
              className='inline-block rounded bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-blue-800 focus:outline-none focus:ring focus:ring-yellow-400'
            >
              Get Started Today
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default BalanceSheetDetails
