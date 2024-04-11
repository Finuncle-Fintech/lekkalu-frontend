import axios from 'axios'
import * as dotenv from 'dotenv'

dotenv.config()

interface PRDetails {
  title: string;
  body: string;
}

async function getPRDetails(): Promise<PRDetails> {
  const eventPath = process.env.GITHUB_EVENT_PATH as string
  const event = require(eventPath)
  const pr = event.pull_request
  return { title: pr.title, body: pr.body }
}

async function sendToGPT(title: string, body: string): Promise<string> {
  const response = await axios.post('https://api.openai.com/v1/completions', {
    model: 'text-davinci-002',
    prompt: `Review the following PR:\nTitle: ${title}\nDescription: ${body}\n`,
    max_tokens: 150,
  }, {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
  })
  return response.data.choices[0].text
}

async function postReviewComment(review: string): Promise<void> {
  const eventPath = process.env.GITHUB_EVENT_PATH as string
  const event = require(eventPath)
  const prNumber = event.number
  const repo = event.repository.full_name
  const commentsUrl = `https://api.github.com/repos/${repo}/issues/${prNumber}/comments`
  await axios.post(commentsUrl, { body: review }, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  })
}

async function run(): Promise<void> {
  const { title, body } = await getPRDetails()
  const review = await sendToGPT(title, body)
  await postReviewComment(review)
}

run().catch(error => console.error(error))
