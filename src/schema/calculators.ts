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

export const emiCalculatorSchema = z.object({
  loanPrincipal: z.coerce.number().min(0).max(10000000),
  loanInterest: z.coerce.number(),
  loanTenure: z.coerce.number(),
  disbursementDate: z.date(),
  emiDay: z.coerce.number().min(1).max(31),
})
