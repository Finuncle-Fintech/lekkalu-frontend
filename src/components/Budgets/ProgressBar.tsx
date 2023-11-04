import React from 'react'
import colors from 'tailwindcss/colors'
import * as Progress from '@radix-ui/react-progress'
interface ProgressBarType {
  data: {
    budgetId: number
    year: number
    month: number
    spent: number
    budget: number
    balance: number
  } | null
}

const months = [
  '',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
export default function CardWithForm({ data }: ProgressBarType) {
  return (
    <div style={{ margin: '16px 10px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          // marginBottom: '14px'
          columnGap: '10px',
          textAlign: 'right',
        }}
      >
        <h6
          style={{
            fontSize: 12,
            fontWeight: '800',
            textTransform: 'capitalize',
            margin: 0,
            width: '60px',
          }}
        >
          {months[data!.month]} {data!.year}
        </h6>
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              //   marginBottom: '4px',
            }}
          >
            <h6
              style={{
                fontSize: 12,
                fontWeight: '500',
                textTransform: 'uppercase',
                margin: 0,
                color: '#777',
              }}
            >
              {`spent ${data?.spent}`}
            </h6>
            <h6
              style={{
                fontSize: 12,
                fontWeight: '500',
                textTransform: 'uppercase',
                margin: 0,
                color:
                  (data!.spent / data!.budget) * 100 < 80
                    ? '#5be19f'
                    : (data!.spent / data!.budget) * 100 < 95
                    ? '#fdba78'
                    : '#fd7878',
              }}
            >
              {`left ${data?.balance}`}
            </h6>
          </div>
          <div>
            <div>
              <Progress.Root
                className='ProgressRoot'
                value={(data!.spent / data!.budget) * 100}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  background: colors.gray[100],
                  borderRadius: '99999px',
                  width: "'100%'",
                  height: '14px',
                  transform: 'translateZ(0)',
                }}
              >
                <Progress.Indicator
                  className='ProgressIndicator'
                  style={{
                    transform: `translateX(-${100 - (data!.spent / data!.budget) * 100}%)`,
                    backgroundColor:
                      (data!.spent / data!.budget) * 100 < 80
                        ? '#5be19f'
                        : (data!.spent / data!.budget) * 100 < 95
                        ? '#fdba78'
                        : '#fd7878',
                    width: '100%',
                    height: '100%',
                    transition: 'transform 660ms cubic-bezier(0.65, 0, 0.35, 1)',
                  }}
                />
              </Progress.Root>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
