import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const cpf = '123.456.789-00';
  const passwordHash = await bcrypt.hash('123456', 10);

  const aluno = await prisma.aluno.upsert({
    where: { cpf },
    update: { name: 'Usuário Teste', passwordHash },
    create: { cpf, name: 'Usuário Teste', passwordHash },
  });

  const musicas = [
    { title: 'Alucinação', artist: 'Belchior', explicit: false },
    { title: 'Sobrevivendo ao Inferno', artist: "Racionais MC's", explicit: true },
    { title: 'Ruas Vazias', artist: 'Shawlin', explicit: false },
    { title: 'Grana Azul', artist: 'Rodrigo Zin', explicit: false },
    { title: 'God Is', artist: 'Kanye West', explicit: false },
  ];

  const catalogo = await Promise.all(
    musicas.map((musica) => prisma.musica.upsert({
      where: { title_artist: { title: musica.title, artist: musica.artist } },
      update: { explicit: musica.explicit },
      create: musica,
    })),
  );

  await prisma.pedido.deleteMany({ where: { alunoId: aluno.id } });
  await prisma.pedido.createMany({
    data: catalogo.map((musica) => ({
      alunoId: aluno.id,
      musicaId: musica.id,
      status: 'PENDING',
    })),
  });

  console.log('Seed concluído.');
  console.log('CPF: 123.456.789-00');
  console.log('Senha: 123456');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
