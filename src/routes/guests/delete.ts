import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const deleteGuestSchema = z.object({
    id: z.string(),
  })

  const { id } = deleteGuestSchema.parse(request.params)

  if (!id) {
    return reply.status(400).send({ message: 'id not included' })
  }

  await prisma.guest.delete({
    where: { id },
  })

  return reply.status(204).send()
}
