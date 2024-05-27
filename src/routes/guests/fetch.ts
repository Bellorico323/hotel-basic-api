import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const guests = await prisma.guest.findMany()

  return reply.status(200).send({ guests })
}
