import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateReservationSchema = z.object({
    id: z.string(),
    roomId: z.string().optional(),
    guestId: z.string().optional(),
    checkIn: z.string().transform((str) => new Date(str)).optional(),
    checkOut: z.string().transform((str) => new Date(str)).optional()
  });

  const { id, roomId, guestId, checkIn, checkOut } = updateReservationSchema.parse(request.body);

  const updatedReservation = await prisma.reservation.update({
    where: { id },
    data: {
      roomId,
      guestId,
      checkIn,
      checkOut
    }
  });

  return reply.status(200).send({ updatedReservation });
}
