import { create } from './create'
import { fetch } from './fetch'
import { update } from './update'
import { remove } from './delete'
import { FastifyInstance } from 'fastify'

export async function guestsRoutes(app: FastifyInstance) {
  app.post('/guests', create)
  app.get('/guests', fetch)
  app.put('/guests/:id', update)
  app.delete('/guests/:id', remove)
}
