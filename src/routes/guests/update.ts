import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateGuestSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
  })

  const updateGuestParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = updateGuestParamsSchema.parse(request.params)

  if (!id) {
    return reply.status(400)
  }

  const { name, email, phone } = updateGuestSchema.parse(request.body)

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
