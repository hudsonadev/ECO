// backend/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Cria usuário de teste (se ainda não existir)
  const cpf = '123.456.789-00';
  const existing = await prisma.aluno.findUnique({ where: { cpf } });
  if (!existing) {
    const passwordHash = await bcrypt.hash('123456', 10);
    await prisma.aluno.create({
      data: {
        cpf,
        passwordHash,
        name: 'Usuário Teste',
      },
    });
    console.log('✅ Usuário de teste criado');
  } else {
    console.log('⚠️ Usuário já existe, nada a fazer');
  }

  // Cria algumas músicas de exemplo
  const musicas = [
    { title: 'Alucinação', artist: 'Belchior', explicit: false },
    { title: 'Sobrevivendo ao Inferno', artist: "Racionais Mc's", explicit: true },
    { title: 'Grana Azul', artist: 'Rodrigo Zin', explicit: false },
  ];

  for (const m of musicas) {
    const exist = await prisma.musica.findFirst({
      where: { title: m.title, artist: m.artist },
    });
    if (!exist) {
      await prisma.musica.create({ data: m });
    }
  }

  // Cria alguns pedidos vinculados ao usuário de teste
  const aluno = await prisma.aluno.findUnique({ where: { cpf } });
  if (aluno) {
    const todasMusicas = await prisma.musica.findMany();
    for (let i = 0; i < todasMusicas.length; i++) {
      await prisma.pedido.create({
        data: {
          alunoId: aluno.id,
          musicaId: todasMusicas[i].id,
          status: 'PENDING',
        },
      });
    }
    console.log('✅ Pedidos de teste criados');
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
