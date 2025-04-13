
# ✅ Visão Geral do Projeto: Gerenciamento Zoológico CIEE/PR

---

## 💻 Frontend (`zoo-app`)

### 🚀 Tecnologias Principais
- **Next.js 15** — framework para SSR/SSG com suporte ao `Turbopack`.
- **React 19** + **TypeScript**
- **Tailwind CSS** — estilização moderna e responsiva.
- **NextAuth.js** — autenticação segura com OAuth via GitHub.

### 📦 Dependências de Produção
- `next`, `react`, `react-dom`
- `axios` — requisições HTTP
- `next-auth` — autenticação
- `react-hook-form` + `zod` — gerenciamento e validação de formulários
- `react-icons` — ícones diversos
- `@hookform/resolvers` — integração entre `zod` e `react-hook-form`

### 🧪 Dependências de Desenvolvimento
- `typescript`, `eslint`, `tailwindcss`, `postcss`, `autoprefixer`
- `@types/*` — para suporte a TypeScript

### 🔧 Scripts Disponíveis (`package.json`)
```bash
npm run dev       # Inicia o servidor em desenvolvimento (usa Turbopack)
npm run build     # Compila o projeto para produção
npm start         # Inicia o servidor em modo produção
npm run lint      # Verifica o código com ESLint
```

### 🌍 Arquivos `.env`
- `.env.local` (para desenvolvimento)
- `.env.production` (para produção)

#### Ambos devem conter:
```
GITHUB_ID=seu_client_id
GITHUB_SECRET=seu_client_secret
NEXTAUTH_URL=http://localhost:3000
```

#### Apenas `.env.production`:
```
NEXTAUTH_SECRET=sua_chave_segura_gerada
```

### 🔐 Gerando o `NEXTAUTH_SECRET`
Execute no terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
> Funciona em cmd, PowerShell, Terminal do VS Code, bash (Linux/macOS)

---

## 🧪 Backend (`zoo-api`)

### 🚀 Tecnologias Principais
- **.NET Core (provavelmente .NET 8 ou 9)**

### 🌐 Perfis de Execução (`launchSettings.json`)
- **http://localhost:5032**
- **https://localhost:7252**

### ⚙️ Ambiente
- Ambiente padrão: `Development`
- Navegador **não será iniciado automaticamente**
- Mensagens do `dotnet run` habilitadas

### 🧰 Comandos
- Restauração de pacotes:
```bash
dotnet restore
```

- Execução (dev):
```bash
dotnet run
```

- Build produção (com executável):
```bash
dotnet publish -c Release -r win-x64 --self-contained true
```
> Executável estará em `zoo-api\bin\Release\net9.0\ZooApi.exe`

### 🗃️ Banco de Dados
- **PostgreSQL**
- Configuração no `appsettings.json`:
```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=ZooDb;Username=postgres;Password=root"
}
```

---

## 🔗 Repositório
Clone com:
```bash
git clone https://github.com/Robsonnsbr/desafio-gerenciamento-zoologico.git
```


# Passos para iniciar o projeto: Desafio Gerenciamento Zoológico CIEE/PR

## 🔁 Clonar o projeto
Abra seu terminal (cmd) e execute o comando abaixo:

```bash
git clone https://github.com/Robsonnsbr/desafio-gerenciamento-zoologico.git
```

---

## 🧩 Frontend (`zoo-app`)

### 1. Acesse a pasta do frontend
Abra o terminal na pasta `zoo-app`.

### 2. Configure os arquivos de ambiente
Utilize o arquivo `.env.exemplo` como base para criar dois arquivos:
- `.env.local` (para desenvolvimento)
- `.env.production` (para produção)

#### Ambos devem conter:
```
GITHUB_ID=seu_client_id_aqui
GITHUB_SECRET=seu_client_secret_aqui
NEXTAUTH_URL=http://localhost:3000
```

#### Apenas o `.env.production` deve conter também:
```
NEXTAUTH_SECRET=your_generated_secure_secret_here
```

### 2.1 Como configurar as chaves GitHub OAuth
1. Acesse: [https://github.com/settings/developers](https://github.com/settings/developers)
2. Clique em **"New OAuth App"**
3. Preencha os dados:
   - **Application name:** (ex: MeuAppLoginGitHub)
   - **Homepage URL:** `http://localhost:3000`
   - **Authorization callback URL:** `http://localhost:3000/api/auth/callback/github`

> 🔐 Essas URLs são importantes se estiver usando NextAuth.js ou similar.

*(Apenas para build de produção)*

### 2.2 Como configurar a chave NEXTAUTH_SECRET

1. No terminal(bash, zsh, etc) execute: "openssl rand -hex 32"
2. add a chave gerada ao seu .env.production

*(Apenas para build de produção)*

### 3. Instale as dependências
```bash
npm install
```

### 4. Executando o projeto
- **Desenvolvimento:**
```bash
npm run dev
```
> Requer o `.env.local` configurado.

- **Produção (build):**
```bash
npm run build
```
> Requer o `.env.production` configurado.

### 5. Acesse o app
[http://localhost:3000/](http://localhost:3000/)

---

## 🧪 Backend (`zoo-api`)

### 1. Restaure os pacotes do projeto .NET
```bash
dotnet restore
```

### 2. Executando o projeto
- **Desenvolvimento:**
```bash
dotnet run
```

- **Produção (build):**
```bash
dotnet publish -c Release -r win-x64 --self-contained true
```
> O executável estará em: `zoo-api\bin\Release\net9.0\ZooApi.exe`

### 3. Configure o banco de dados PostgreSQL
Edite o arquivo `appsettings.json`, atualizando a string de conexão com os dados corretos de porta e senha do seu PostgreSQL.

Exemplo:
```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=ZooDb;Username=postgres;Password=root"
}
```
