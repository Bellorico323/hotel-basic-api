import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateReservationBodySchema = z.object({
    roomId: z.string().optional(),
    guestId: z.string().optional(),
    checkIn: z
      .string()
      .transform((str) => new Date(str))
      .optional(),
    checkOut: z
      .string()
      .transform((str) => new Date(str))
      .optional(),
  })

  const updateReservationParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = updateReservationParamsSchema.parse(request.params)

  const { roomId, guestId, checkIn, checkOut } =
    updateReservationBodySchema.parse(request.body)

  if (!id) {
    return reply.status(400).send({ message: 'id not included' })
  }

  const updatedReservation = await prisma.reservation.update({
    where: { id },
    data: {
      roomId,
      guestId,
      checkIn,
      checkOut,
    },
  })

  return reply.status(200).send({ updatedReservation })
}
