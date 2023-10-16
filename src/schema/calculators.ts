import z from 'zod'

export const sipCalculatorSchema = z.object({
  monthlyAmount: z.coerce.number(),
  durationInvestment: z.coerce.number(),
  rateReturn: z.coerce.number(),
})

export const cagrCalculatorSchema = z.object({
  initialValue: z.coerce.number(),
  finalValue: z.coerce.number(),
  durationOfInvestment: z.coerce.number(),
})
