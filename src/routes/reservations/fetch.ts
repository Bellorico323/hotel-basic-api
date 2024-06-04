import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const reservations = await prisma.reservation.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return reply.status(200).send({ reservations })
}
