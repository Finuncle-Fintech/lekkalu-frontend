import z from 'zod'

export const signupSchemaNew = z.object({
  username: z
    .string({ required_error: 'Username is required!' })
    .min(6, 'Enter at least 6 characters!')
    .max(20, 'Enter at most 30 characters!'),
  email: z.string({ required_error: 'Email is required!' }).email('Invalid Email!'),
  password1: z
    .string({ required_error: 'Password is required!' })
    .min(8, 'Enter at least 8 characters!')
    .max(20, 'Enter at most 30 characters!'),
  password2: z
    .string({ required_error: 'Password is required!' })
    .min(8, 'Enter at least 8 characters!')
    .max(20, 'Enter at most 30 characters!'),
  termsAndConditions: z.boolean({ required_error: 'Please accept our terms and conditions!' }),
  privacyPolicy: z.boolean({ required_error: 'Please agree to the privacy policies!' }),
}).refine(data => data.password1 === data.password2, {
  // This message will be shown if the validation fails
  message: 'Passwords must match',
  // Specify the path of the fields that this validation is about
  // It helps to identify where the error comes from in the validation error object
  path: ['password2'], // or ["password1"], depending on which you want to highlight
})
export type SignupSchemaNew = z.infer<typeof signupSchemaNew>

export const loginSchema = z.object({
  username: z
    .string({ required_error: 'Username is required!' })
    .min(6, 'Enter at least 6 characters!')
    .max(20, 'Enter at most 30 characters!'),
  password: z.string({ required_error: 'Password is required!' }),
  rememberMe: z.boolean().optional(),
})
export type LoginSchema = z.infer<typeof loginSchema>

export const emailVerifyPayloadType = z.object({
  email: z.string({ required_error: 'Email is required!' }).email('Invalid Email!'),
})
export type EmailVerifyPayloadType = z.infer<typeof emailVerifyPayloadType>
