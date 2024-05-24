import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGuestSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.number()
  });

  const { name, email, phone } = createGuestSchema.parse(request.body)

  const newGuest = await prisma.room.create({
    data: {
      name,
      email,
      phone
    }
  });

  return reply.status(201).send({ newGuest });
}