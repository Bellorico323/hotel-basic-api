import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const deleteReservationSchema = z.object({
    id: z.string()
  });

  const { id } = deleteReservationSchema.parse(request.body);

  await prisma.reservation.delete({
    where: { id }
  });

  return reply.status(204).send();
}
