import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import Fastify from 'fastify';
import type { FastifyRequest } from 'fastify';
import { z } from 'zod';

const app = Fastify({ logger: true });
const prisma = new PrismaClient();

await app.register(cors, { origin: true, credentials: true });
await app.register(jwt, {
  secret: process.env.JWT_SECRET ?? 'eco-local-development-secret',
});

const authenticate = async (request: FastifyRequest) => {
  await request.jwtVerify();
};

app.get('/health', async () => ({ status: 'ok' }));

app.post('/auth/login', async (request, reply) => {
  const parsed = z.object({
    cpf: z.string().min(1),
    password: z.string().min(1),
  }).safeParse(request.body);

  if (!parsed.success) {
    return reply.status(400).send({ message: 'CPF e senha são obrigatórios.' });
  }

  const aluno = await prisma.aluno.findUnique({ where: { cpf: parsed.data.cpf } });
  const passwordIsValid = aluno
    ? await bcrypt.compare(parsed.data.password, aluno.passwordHash)
    : false;

  if (!aluno || !passwordIsValid) {
    return reply.status(401).send({ message: 'CPF ou senha inválidos.' });
  }

  const token = app.jwt.sign({ sub: aluno.id, cpf: aluno.cpf });
  return { token, aluno: { id: aluno.id, name: aluno.name, cpf: aluno.cpf } };
});

app.get('/me', { preHandler: authenticate }, async (request, reply) => {
  const user = request.user as { sub: number };
  const aluno = await prisma.aluno.findUnique({
    where: { id: Number(user.sub) },
    select: { id: true, name: true, cpf: true },
  });

  if (!aluno) return reply.status(404).send({ message: 'Usuário não encontrado.' });
  return aluno;
});

app.get('/musicas', { preHandler: authenticate }, async () => prisma.musica.findMany({
  orderBy: [{ artist: 'asc' }, { title: 'asc' }],
}));

app.get('/pedidos', { preHandler: authenticate }, async () => prisma.pedido.findMany({
  include: {
    aluno: { select: { id: true, name: true } },
    musica: true,
  },
  orderBy: { createdAt: 'asc' },
}));

app.patch('/pedidos/:id/status', { preHandler: authenticate }, async (request, reply) => {
  const params = z.object({ id: z.coerce.number().int().positive() }).safeParse(request.params);
  const body = z.object({
    status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'PLAYED']),
  }).safeParse(request.body);

  if (!params.success || !body.success) {
    return reply.status(400).send({ message: 'Pedido ou status inválido.' });
  }

  return prisma.pedido.update({
    where: { id: params.data.id },
    data: { status: body.data.status },
    include: {
      aluno: { select: { id: true, name: true } },
      musica: true,
    },
  });
});

const port = Number(process.env.PORT ?? 4000);

try {
  await app.listen({ port, host: '0.0.0.0' });
} catch (error) {
  app.log.error(error);
  await prisma.$disconnect();
  process.exit(1);
}

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, async () => {
    await app.close();
    await prisma.$disconnect();
    process.exit(0);
  });
}
