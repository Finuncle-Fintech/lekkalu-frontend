import z from 'zod'

export const feedbackSchema = z.object({
  name: z
    .string({ required_error: 'Please enter your name!' })
    .min(3, 'Please enter at least 3 characters!')
    .max(50, 'Please enter at most 50 characters!'),
  email: z.string({ required_error: 'Please enter your email!' }).email('Invalid Email Address!'),
  subject_and_description: z
    .string({ required_error: 'Please enter your message for us!' })
    .min(5, 'Please write at least 5 characters!')
    .max(1000, 'Please write at most 1000 characters!'),
})
export type FeedbackSchema = z.infer<typeof feedbackSchema>
