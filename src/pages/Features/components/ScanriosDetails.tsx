import React from 'react'
import Lottie from 'lottie-react'
import comparisonAnimation from '@/assets/features/comparison-animation.json'
import scenarioAnimation from '@/assets/features/scenario-animation.json'
import '@/pages/Features/styles/scenarios.css'

export default function ScanriosDetails() {
  return (
    <>
      <div>
        <div className='bg-white py-6 sm:py-8 lg:py-12' data-aos='fade-up'>
          <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
            <div className='rounded-lg bg-gray-100 px-4 py-6 md:py-8 lg:py-12'>
              <p className='mb-2 text-center font-semibold text-primary md:mb-3 lg:text-lg'>Empower</p>
              <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>
                Simulate Your Finances
              </h2>
              <p className='mx-auto max-w-screen-md text-center text-gray-500 text-sm md:text-lg'>
                Create multiple financial scenarios by adding your chosen expenses, liabilities, and assets. This allows
                you to view the timeline of your finances by simulating various scenarios and visualizing them
                graphically.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white pb-6' data-aos='fade-up'>
        <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
          <section className='flex flex-col justify-around gap-6 sm:gap-10 md:gap-16 lg:flex-row'>
            <div className='flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12 xl:py-24'>
              <p className='mb-2 font-semibold text-primary md:text-lg xl:text-xl'>Question</p>
              <h1 className='mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl'>
                What is a scenario?
              </h1>
              <p className='mb-8 leading-relaxed text-gray-500 md:mb-12 lg:w-4/5 text-sm md:text-base xl:text-lg'>
                A financial scenario is a combination of assets, liabilities, and expenses that depicts a possible or
                desired financial situation. Users can create multiple scenarios to reflect different financial goals,
                which can then be simulated to analyze potential outcomes and inform decision-making.
              </p>
            </div>
            <div className='max-w-lg self-center'>
              <Lottie animationData={scenarioAnimation} />
            </div>
          </section>
        </div>
      </div>
      <div className='bg-white pb-6' data-aos='fade-up'>
        <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
          <section className='flex flex-col-reverse justify-around gap-6 sm:gap-10 md:gap-16 lg:flex-row'>
            <div className='max-w-lg comparison-animation-parent-div shadow rounded self-center'>
              <Lottie animationData={comparisonAnimation} />
            </div>
            <div className='flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12 xl:py-24'>
              <p className='mb-2 font-semibold text-primary md:text-lg xl:text-xl'>Question</p>
              <h1 className='mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl'>
                What is a comparison?
              </h1>
              <p className='mb-8 leading-relaxed text-gray-500 md:mb-12 lg:w-4/5 text-sm md:text-base xl:text-lg'>
                A comparison involves a collection of scenarios that can be simulated to visualize different financial
                outcomes. These scenarios are then displayed on a graph, allowing for easy comparison and analysis.
              </p>
            </div>
          </section>
        </div>
      </div>
      <div className='bg-white py-6 sm:py-8 lg:py-12 mb-12' id='goals' data-aos='fade-up'>
        <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
          {/* text - start */}
          <div className='mb-10 md:mb-16'>
            <p className='mx-auto max-w-screen-md text-center text-gray-500 text-sm sm:text-base md:text-lg'>
              Both scenarios and comparisons can be made public and shared with other users, allowing them to copy and
              analyze your financial conditions. This facilitates the exchange of insights and expertise. By sharing
              your scenarios, you can gain valuable feedback and expert opinions for better decision-making.
            </p>
            <div className='flex flex-col gap-2.5 sm:flex-row sm:justify-center mt-5'>
              <a
                href='/scenarios'
                className='inline-block rounded-lg bg-primary px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 focus-visible:ring md:text-base'
              >
                Start now
              </a>
            </div>
          </div>
          {/* text - end */}
        </div>
      </div>
    </>
  )
}
