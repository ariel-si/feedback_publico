# 🚀 Mini SaaS de Feedback Público

Aplicação web para coleta de feedback público através de links compartilháveis.

## 🧠 Visão Geral

Este projeto permite que usuários:

* Criem uma conta
* Criem páginas de feedback personalizadas
* Compartilhem um link público
* Recebam feedbacks de qualquer pessoa (sem login)

Cada feedback contém:

* Mensagem
* Nota de 1 a 5

---

## 🛠️ Stack utilizada

* **Frontend/Backend:** Next.js (App Router)
* **Linguagem:** TypeScript
* **Banco de dados:** PostgreSQL
* **ORM:** Prisma
* **Autenticação:** NextAuth (Auth.js)
* **Estilização:** TailwindCSS

---

## 📁 Estrutura do projeto

```
src/
  app/
    (auth)/
      login/
      register/
    dashboard/
    p/[slug]/

  components/
  actions/
  lib/
  types/
```

---

## ⚙️ Setup do projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/ariel-si/feedback_publico.git
cd feedback_publico
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env`:

```env
DATABASE_URL="postgresql://user:password@host:port/db"
NEXTAUTH_SECRET="sua_secret"
NEXTAUTH_URL="http://localhost:3000"
```

---

### 4. Configurar banco de dados

```bash
npx prisma migrate dev
```

---

### 5. Rodar o projeto

```bash
npm run dev
```

Acesse:

```
http://localhost:3000
```

---

## 🧩 Funcionalidades

### 🔐 Autenticação

* Registro com email e senha
* Login com credentials
* Proteção de rotas privadas

---

### 📄 Páginas de Feedback

* Criar página com:

  * Nome
  * Descrição
* Geração de link público único (slug)

Exemplo:

```
/p/minha-pagina-x7k2
```

---

### 🌍 Feedback público

* Qualquer pessoa pode acessar o link
* Não requer login
* Envio de:

  * Mensagem
  * Nota (1 a 5)

---

### 📊 Dashboard

* Visualização de páginas criadas
* Listagem de feedbacks recebidos
* Ordenação por mais recente

---

## 🧱 Modelagem do banco

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  pages     Page[]
  createdAt DateTime @default(now())
}

model Page {
  id          String     @id @default(cuid())
  name        String
  description String?
  slug        String     @unique
  userId      String
  user        User       @relation(fields: [userId], references: [id])
  feedbacks   Feedback[]
  createdAt   DateTime   @default(now())
}

model Feedback {
  id        String   @id @default(cuid())
  message   String
  rating    Int
  pageId    String
  page      Page     @relation(fields: [pageId], references: [id])
  createdAt DateTime @default(now())
}
```

---

## 🔐 Regras de negócio

* Apenas o dono pode ver seus feedbacks
* Feedback público não exige autenticação
* Rating deve ser entre 1 e 5
* Slug deve ser único

---

## 📌 Scripts úteis

```bash
# Rodar projeto
npm run dev

# Build
npm run build

# Prisma
npx prisma studio
npx prisma migrate dev
```

---

## 🚀 Deploy

Sugestão:

* **Frontend:** Vercel
* **Banco:** Neon / Supabase

Passos:

1. Subir projeto no GitHub
2. Conectar na Vercel
3. Configurar variáveis de ambiente
4. Deploy automático

---

## 🔮 Próximos passos (evolução)

* Autenticação social (Google)
* Respostas a feedbacks
* Dashboard com métricas
* Notificação por email
* Customização de página
* Multi-tenant mais robusto
* Plano pago (Stripe)

---

## 📄 Licença

Projeto para fins educacionais / MVP.

---

## 👨‍💻 Autor

Desenvolvido como projeto de estudo e validação de SaaS.
