import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const deleteReservationSchema = z.object({
    id: z.string(),
  })

  const { id } = deleteReservationSchema.parse(request.params)

  if (!id) {
    return reply.status(400).send({ message: 'id not included' })
  }

  const reservation = await prisma.reservation.findUnique({
    where: {
      id,
    },
  })

  await prisma.reservation.delete({
    where: { id },
  })

  if (reservation) {
    await prisma.room.update({
      data: {
        avaibility: 'available',
      },
      where: {
        id: reservation.roomId,
      },
    })
  }

  return reply.status(204).send()
}
