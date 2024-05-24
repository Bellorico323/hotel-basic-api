import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateGuestSchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
  })

  const { id, name, email, phone } = updateGuestSchema.parse(request.body)

  const updatedGuest = await prisma.guest.update({
    where: { id },
    data: {
      name,
      email,
      phone,
    },
  })

  return reply.status(200).send({ updatedGuest })
}
