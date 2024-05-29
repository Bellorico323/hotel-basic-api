import fastify from 'fastify'
import { roomRoutes } from './routes/room/routes'
import { reservationRoutes } from './routes/reservations/routes'
import { guestsRoutes } from './routes/guests/routes'
import cors from '@fastify/cors'

export const app = fastify()

app.register(roomRoutes)
app.register(reservationRoutes)
app.register(guestsRoutes)

app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
})
