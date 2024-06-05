import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createReservationSchema = z.object({
    roomId: z.string(),
    guestId: z.string(),
    checkIn: z.string().transform((str) => new Date(str)),
    checkOut: z.string().transform((str) => new Date(str)),
  })

  const { roomId, guestId, checkIn, checkOut } = createReservationSchema.parse(
    request.body,
  )

  const newReservation = await prisma.reservation.create({
    data: {
      roomId,
      guestId,
      checkIn,
      checkOut,
    },
  })

  await prisma.room.update({
    data: {
      avaibility: 'unavailable',
    },
    where: {
      id: roomId,
    },
  })

  return reply.status(201).send({ newReservation })
}
