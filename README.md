# ECO — Rádio Universitária

ECO é uma aplicação web para gerenciar pedidos musicais de uma rádio universitária. Alunos podem entrar no sistema, consultar a fila de músicas e acompanhar seu perfil. A equipe da rádio dispõe de uma interface para aprovar ou rejeitar pedidos.

O projeto possui duas aplicações independentes:

- `frontend`: React, TypeScript, Vite e Tailwind CSS.
- `backend`: Fastify, TypeScript, Prisma e PostgreSQL.

## Funcionalidades

- Autenticação de usuário por CPF e senha.
- Sessão baseada em token JWT.
- Perfil do aluno autenticado.
- Consulta e pesquisa da fila de músicas.
- Listagem de pedidos pendentes para a rádio.
- Aprovação e rejeição de pedidos.
- Seed idempotente com usuário e catálogo para desenvolvimento.

## Requisitos

Para executar o projeto localmente, instale:

- Node.js 24 ou superior.
- npm 11 ou superior.
- PostgreSQL 17 ou uma versão compatível.
- Git, caso o projeto seja obtido pelo repositório.

As versões de Node.js 24 e PostgreSQL 17 foram utilizadas na validação local deste projeto.

## Estrutura do repositório

```text
ECO/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma    # Modelos e relacionamentos do banco
│   ├── src/
│   │   └── index.ts         # API Fastify e rotas HTTP
│   ├── seed.ts              # Dados locais de desenvolvimento
│   ├── prisma.config.ts     # Configuração do Prisma
│   └── package.json
├── frontend/
│   ├── public/              # Imagens públicas utilizadas pela interface
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── layouts/         # Estruturas de página
│   │   ├── pages/           # Telas da aplicação
│   │   ├── api.ts           # Cliente HTTP e envio do JWT
│   │   ├── auth.ts          # Persistência da sessão local
│   │   └── App.tsx          # Rotas do frontend
│   └── package.json
├── Design_ECO/              # Materiais de design
├── Design_MEUIF/            # Materiais de design complementares
├── Diagramas/               # Diagramas do sistema
└── README.md
```

## Configuração do backend

Entre na pasta do backend e instale as dependências:

```powershell
cd backend
npm install
```

O arquivo `backend/.env` deve conter a conexão com o PostgreSQL:

```dotenv
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/eco_db?schema=public"
JWT_SECRET="substitua-por-um-segredo-local"
PORT=4000
```

Somente `DATABASE_URL` é indispensável para acessar o banco. `JWT_SECRET` possui um valor de desenvolvimento como fallback e `PORT` utiliza `4000` por padrão. Defina um segredo próprio fora do ambiente local.

No Windows, caso o PostgreSQL esteja instalado como serviço, inicie-o em um PowerShell executado como administrador:

```powershell
Start-Service postgresql-x64-17
```

Crie o banco `eco_db` no PostgreSQL antes de aplicar o schema. Em seguida, execute:

```powershell
npm run prisma:generate
npm run prisma:push
npm run seed
```

Inicie a API em modo de desenvolvimento:

```powershell
npm run dev
```

A API ficará disponível em `http://localhost:4000`. Para verificar seu estado:

```text
GET http://localhost:4000/health
```

## Configuração do frontend

Em outro terminal:

```powershell
cd frontend
npm install
npm run dev
```

O Vite exibirá o endereço local, normalmente `http://localhost:5173`.

Por padrão, o frontend utiliza `http://localhost:4000` como backend. Para usar outro endereço, crie `frontend/.env.local`:

```dotenv
VITE_API_BASE_URL="http://localhost:4000"
```

## Usuário de desenvolvimento

Depois de executar `npm run seed`, use:

```text
CPF:   123.456.789-00
Senha: 123456
```

A seed pode ser executada novamente. Ela atualiza o usuário de teste e recria somente os pedidos relacionados a esse usuário, evitando duplicações.

## Comandos disponíveis

### Backend

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Executa a API diretamente com `tsx`. |
| `npm run build` | Compila o TypeScript para `dist/`. |
| `npm start` | Executa o backend compilado. |
| `npm run prisma:generate` | Gera o Prisma Client. |
| `npm run prisma:push` | Sincroniza o schema com o banco local. |
| `npm run prisma:migrate` | Cria e aplica migrations de desenvolvimento. |
| `npm run seed` | Cria os dados locais de teste. |

### Frontend

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor Vite com recarregamento automático. |
| `npm run build` | Valida TypeScript e gera o bundle de produção. |
| `npm run lint` | Executa o Oxlint. |
| `npm run preview` | Serve localmente o bundle já gerado. |

## Rotas da API

| Método | Caminho | Autenticação | Finalidade |
| --- | --- | --- | --- |
| `GET` | `/health` | Não | Verifica se a API está ativa. |
| `POST` | `/auth/login` | Não | Autentica com CPF e senha. |
| `GET` | `/me` | JWT | Retorna o aluno autenticado. |
| `GET` | `/musicas` | JWT | Retorna o catálogo musical. |
| `GET` | `/pedidos` | JWT | Retorna a fila de pedidos. |
| `PATCH` | `/pedidos/:id/status` | JWT | Atualiza o status de um pedido. |

Nas rotas protegidas, envie o token no cabeçalho:

```http
Authorization: Bearer TOKEN
```

## Validação antes de entregar alterações

Execute os seguintes comandos após alterar código:

```powershell
cd backend
npm run build

cd ../frontend
npm run lint
npm run build
```

Alterações no schema também exigem:

```powershell
cd backend
npm run prisma:generate
npm run prisma:push
```

## Orientações para agentes de código

- Leia este arquivo e os `package.json` antes de alterar o projeto.
- Trate `frontend` e `backend` como aplicações separadas, cada uma com dependências próprias.
- Não adicione dados simulados no frontend. A interface deve consumir a API.
- Mantenha o Prisma Client e a CLI do Prisma na mesma versão.
- Preserve a idempotência de `backend/seed.ts`.
- Não grave senhas em texto puro no banco; utilize `bcryptjs`.
- Rotas que manipulam dados do usuário devem usar `request.jwtVerify()` por meio do pre-handler de autenticação.
- Não versionar `node_modules`, `dist`, caches ou arquivos locais de ambiente.
- Não remova documentos, diagramas ou materiais de design durante limpezas de código.
- Antes de concluir uma alteração, execute build e lint e informe qualquer dependência externa que impeça os testes, como um serviço PostgreSQL parado.

## Solução de problemas

### PostgreSQL não responde na porta 5432

Confirme se o serviço está ativo:

```powershell
Get-Service postgresql-x64-17
Start-Service postgresql-x64-17
```

O segundo comando normalmente requer PowerShell como administrador.

### O Prisma não conecta ao banco

Verifique se:

- o serviço PostgreSQL está ativo;
- o banco `eco_db` existe;
- usuário, senha, porta e nome do banco em `DATABASE_URL` estão corretos;
- `npm run prisma:generate` foi executado após alterações no schema.

### O frontend recebe erro 401

Entre novamente pela tela de login. O token fica armazenado no `localStorage` e é enviado automaticamente pelo cliente configurado em `frontend/src/api.ts`.
