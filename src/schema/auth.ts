import z from 'zod'

export const signupSchema = z.object({
  username: z.string().min(6, 'Enter at least 6 characters!').max(20, 'Enter at most 30 characters!'),
  email: z.string().email('Invalid Email!'),
  password: z.string().min(8, 'Enter at least 6 characters!').max(20, 'Enter at most 30 characters!'),
  termsAndConditions: z.boolean({ required_error: 'Please accept our terms and conditions!' }),
  privacyPolicy: z.boolean({ required_error: 'Please agree to the privacy policies!' }),
})
export type SignupSchema = z.infer<typeof signupSchema>
