import React from 'react'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { max, min } from 'date-fns'

export type ScenarioDumbbellChartType = {
  name: string
  start_date: Date
  finish_date: Date
}
export type GoalDumbbellChartProps = {
  name: string
  Scenarios: ScenarioDumbbellChartType[]
}

export type DumbbellChartProps = {
  Goals: GoalDumbbellChartProps[]
}

const DumbbellChart = ({ Goals }: DumbbellChartProps) => {
  // Transform the nested data into the format required by ApexCharts
  const transformedData = Goals.flatMap((goal) => {
    return goal.Scenarios.map((scenario) => ({
      x: `${goal.name} - ${scenario.name}`, // Label each scenario with the goal and scenario name
      y: [scenario.start_date.getTime(), scenario.finish_date.getTime()],
    }))
  })

  // Calculate min and max dates dynamically from transformed data
  const allDates = transformedData.flatMap((item) => item.y)
  let minDate = min(allDates).getTime()
  let maxDate = max(allDates).getTime()
  const today = new Date().getTime()

  // Ensure x-axis range includes today's date
  if (today < minDate) {
    minDate = today - 24 * 60 * 60 * 1000
  }
  if (today > maxDate) {
    maxDate = today + 24 * 60 * 60 * 1000
  }

  const options: ApexOptions = {
    chart: {
      height: 390,
      type: 'rangeBar',
      zoom: {
        enabled: true,
        type: 'x',
        autoScaleYaxis: true,
      },
      toolbar: {
        show: true,
        tools: {
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
        autoSelected: 'zoom',
      },
    },
    colors: ['#EC7D31', '#36BDCB'],
    plotOptions: {
      bar: {
        horizontal: true,
        isDumbbell: true,
        dumbbellColors: [['#EC7D31', '#36BDCB']],
      },
    },
    xaxis: {
      type: 'datetime',
      min: minDate,
      max: maxDate,
    },
    title: { text: 'Goal Scenarios Timeline' },
    legend: {
      show: true,
      showForSingleSeries: true,
      position: 'top',
      horizontalAlign: 'left',
      customLegendItems: ['Start', 'Finish'],
    },
    fill: {
      type: 'gradient',
      gradient: {
        gradientToColors: ['#36BDCB'],
        inverseColors: false,
        stops: [0, 100],
      },
    },
    grid: {
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: false } },
    },
    annotations: {
      xaxis: [
        {
          x: today,
          borderColor: '#FF4560',
          label: {
            text: 'Today',
            style: {
              color: '#fff',
              background: '#FF4560',
            },
          },
        },
      ],
    },
  }

  const series = [
    {
      name: 'Scenario Timeline',
      data: transformedData,
    },
  ]

  return (
    <div id='chart'>
      <Chart options={options} series={series} type='rangeBar' height={390} />
    </div>
  )
}

export default DumbbellChart
