import React from 'react'
import { CALCULATORS_FEATURES } from '@/utils/details-page-data'
import { cn } from '@/utils/utils'

const Calculators = () => {
  return (
    <>
      <section
        data-aos='fade-up'
        className='overflow-hidden bg-[url(https://images.unsplash.com/photo-1637239983663-e54c8e385510?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2FsY3VsYXRvcnx8fHx8fDE3MDIyMTI2NTE&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1280)] bg-cover bg-center bg-no-repeat'
      >
        <div className='bg-black/25 p-8 md:p-12 lg:px-16 lg:py-24'>
          <div className='text-center sm:text-left'>
            <h2 className='text-2xl font-bold text-white sm:text-3xl md:text-5xl'>Empowering Your Financial Journey</h2>
            <p className='hidden max-w-lg text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed'>
              Plan, invest, and borrow wisely with our SIP, CAGR, and EMI calculators. Make informed financial decisions
              for a prosperous future
            </p>
            <div className='mt-4 sm:mt-8'>
              <a
                href='#calculators'
                className='inline-block rounded-full bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none'
              >
                Take tour
              </a>
            </div>
          </div>
        </div>
      </section>

      <div data-aos='fade-up' className='bg-white pb-6 sm:pb-8 lg:pb-12 mt-10' id='calculators'>
        <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
          {CALCULATORS_FEATURES.map((ele, index) => (
            <section
              key={ele.title}
              className='flex flex-col justify-between gap-6 sm:gap-10 md:gap-16 lg:flex-row my-24'
            >
              <div
                className={cn(
                  'flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12 xl:py-24',
                  index % 2 === 0 ? 'lg:order-first' : 'lg:order-last',
                )}
              >
                <p className='mb-4 font-semibold text-primary md:mb-6 md:text-lg xl:text-xl'>{ele.sub_title}</p>
                <h1 className='mb-8 text-4xl font-bold text-black sm:text-5xl md:mb-12 md:text-6xl'>{ele.title}</h1>
                <p className='mb-8 leading-relaxed text-gray-500 md:mb-12 lg:w-4/5 xl:text-lg'>{ele.description} </p>
                <div className='flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start'>
                  <a
                    href={ele.href}
                    className='inline-block rounded-lg bg-primary px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-800 focus-visible:ring active:bg-indigo-800 md:text-base'
                  >
                    Try it
                  </a>
                </div>
              </div>
              <div className='md:h-80 overflow-hidden lg:h-auto xl:w-5/12 max-lg:order-first'>
                <img
                  src={ele.thumbnail}
                  loading='lazy'
                  alt={ele.sub_title}
                  className='h-full w-full object-contain object-center'
                />
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  )
}

export default Calculators
