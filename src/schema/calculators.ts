import z from 'zod'

export const sipCalculatorSchema = z.object({
  monthlyAmount: z.coerce.number(),
  durationInvestment: z.coerce.number(),
  rateReturn: z.coerce.number(),
})
