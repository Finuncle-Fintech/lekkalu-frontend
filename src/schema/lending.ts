import z from 'zod'

export const addAccountSchema = z.object({
  name: z.string(),
  partner_email: z.string({ required_error: 'Email is required!' }).email('Invalid Email!'),
  principal: z.number(),
  started: z.date(),
})
