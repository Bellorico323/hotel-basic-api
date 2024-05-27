import { create } from './create'
import { fetch } from './fetch'
import { update } from './update'
import { remove } from './delete'
import { FastifyInstance } from 'fastify'

export async function reservationRoutes(app: FastifyInstance) {
  app.post('/reservations', create)
  app.get('/reservations', fetch)
  app.put('/reservations/:id', update)
  app.delete('/reservations/:id', remove)
}
