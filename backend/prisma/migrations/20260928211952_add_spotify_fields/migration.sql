-- CreateEnum
CREATE TYPE "PedidoStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'PLAYED');

-- CreateTable
CREATE TABLE "Aluno" (
    "id" SERIAL NOT NULL,
    "cpf" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Musica" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "explicit" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Musica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" SERIAL NOT NULL,
    "alunoId" INTEGER NOT NULL,
    "musicaId" INTEGER NOT NULL,
    "status" "PedidoStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_cpf_key" ON "Aluno"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Musica_title_artist_key" ON "Musica"("title", "artist");

-- CreateIndex
CREATE INDEX "Pedido_alunoId_idx" ON "Pedido"("alunoId");

-- CreateIndex
CREATE INDEX "Pedido_musicaId_idx" ON "Pedido"("musicaId");

-- CreateIndex
CREATE INDEX "Pedido_status_idx" ON "Pedido"("status");

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_musicaId_fkey" FOREIGN KEY ("musicaId") REFERENCES "Musica"("id") ON DELETE CASCADE ON UPDATE CASCADE;
