import { config } from "dotenv"; config();

import fastify from "fastify";
import { PrismaClient } from "@prisma/client";

const app = fastify();
const prisma = new PrismaClient();

app.get("/key/auth", async (req, res) => {
  const { query }: { query: any } = req;

  const user = await prisma.user.findFirst({
    where: { key: query!.key}
  });

  return {
    success: true,
    access: user ? true : false
  };
});

app.listen(process.env.PORT!);