import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createRoomSchema = z.object({
    number: z.number(),
    pricePerNight: z.number(),
    avaibility: z.string()
  })

  const { number, pricePerNight, avaibility } = createRoomSchema.parse(request.body)

  const newRoom = await prisma.room.create({
    data: {
      number,
      pricePerNight,
      avaibility
    }
  })

  return reply.status(201).send({ newRoom })
}