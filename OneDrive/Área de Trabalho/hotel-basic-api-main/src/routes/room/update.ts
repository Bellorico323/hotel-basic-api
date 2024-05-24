import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateRoomSchema = z.object({
    number: z.number().optional(),
    pricePerNight: z.number().optional(),
    avaibility: z.string().optional()
  });

  const updateRoomParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = updateRoomParamsSchema.parse(request.params)

  if (!id) {
    return reply.status(400)
  }

  const { number, pricePerNight, avaibility } = updateRoomSchema.parse(request.body);

  const updatedRoom = await prisma.room.update({
    where: { id },
    data: {
      number,
      pricePerNight,
      avaibility
    }
  });

  return reply.status(200).send({ updatedRoom });
}
