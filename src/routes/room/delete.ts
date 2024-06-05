import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const deleteRoomSchema = z.object({
    id: z.string(),
  })

  const { id } = deleteRoomSchema.parse(request.params)

  if (!id) {
    return reply.status(400).send({ message: 'id not included' })
  }

  try {
    await prisma.room.delete({
      where: { id },
    })
    return reply.status(204).send()
  } catch (error) {
    if (error instanceof Error && 'code' in error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        reply.status(400).send({
          error:
            'Não é possível deletar o quarto, pois ele está sendo usado em reservas',
        })
      } else {
        reply.status(400).send({ error: 'Bad Request' })
      }
    }
  }
}
