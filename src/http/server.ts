import fastify from 'fastify'
import { createGoal } from '../functions/create-goal'
import z from 'zod'

const app = fastify()

const PORT = 3333

app.post('/goals', async request => {
  const createGoalSchema = z.object({
    title: z.string(),
    desiredWeeklyFrequency: z.number().int().min(1).max(7),
  })

  const body = createGoalSchema.parse(request.body)

  await createGoal({
    title: body.title,
    desiredWeeklyFrequency: body.desiredWeeklyFrequency,
  })
})

app.listen({ port: PORT }).then(() => {
  console.log(`HTTP server running on http://localhost:${PORT}`)
})
