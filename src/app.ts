import fastify from 'fastify'
import { roomRoutes } from './routes/room/routes'
import { reservationRoutes } from './routes/reservations/routes'
import { guestsRoutes } from './routes/guests/routes'

export const app = fastify()

app.register(roomRoutes)
app.register(reservationRoutes)
app.register(guestsRoutes)
