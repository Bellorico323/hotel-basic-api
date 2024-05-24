import fastify from 'fastify'
import { roomRoutes } from './routes/room/routes'
export const app = fastify()

app.register(roomRoutes)
