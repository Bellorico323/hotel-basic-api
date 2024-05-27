import { create } from './create'
import { fetch } from './fetch'
import { update } from './update'
import { remove } from './delete'
import { FastifyInstance } from 'fastify'

export async function roomRoutes(app: FastifyInstance) {
  app.post('/rooms', create)
  app.get('/rooms', fetch)
  app.put('/rooms/:id', update)
  app.delete('/rooms/:id', remove)
}
