import fastify from "fastify";
import { create } from "./routes/room/create";
import { fetch } from "./routes/room/fetch";

export const app = fastify()

app.post('/rooms', create)
app.get('/rooms', fetch)