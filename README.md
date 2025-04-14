🖼️ Prévia Visual do Projeto: Gerenciamento Zoológico CIEE/PR
<p align="left">
  <img src="https://github.com/user-attachments/assets/453d5862-6425-4bb8-938c-465078f38b7d" width="200"/>
  <img src="https://github.com/user-attachments/assets/eafe5de8-1d7f-485f-9141-ed97a5794f56" width="200"/>
  <img src="https://github.com/user-attachments/assets/4bfd8163-6df4-4ce7-89ea-3896c5d7c2b7" width="200"/>
    <img src="https://github.com/user-attachments/assets/940abada-917a-4d79-bef6-c16482079ccc" width="200"/>
</p>

<p align="left">
  <img src="https://github.com/user-attachments/assets/03a48ec9-1e3d-4f57-9ba1-4977b7af0c40" width="200"/>
  <img src="https://github.com/user-attachments/assets/a43ec644-aa5d-4c7c-b5fb-03a03294b7fa" width="200"/>
  <img src="https://github.com/user-attachments/assets/350c6eee-b42c-4c67-b18c-b218e6594ef7" width="200"/>
  <img src="https://github.com/user-attachments/assets/e18a4daa-58dc-4d43-8abc-11a455737b9a" width="200"/>
</p>


</p>
# ✅ Visão Geral do Projeto: Gerenciamento Zoológico CIEE/PR

---

## 💻 Frontend (`zoo-app`)

### 🚀 Tecnologias
- **Next.js 15** com Turbopack
- **React 19** + **TypeScript**
- **Tailwind CSS**
- **NextAuth.js** (OAuth GitHub)

### 📦 Principais Dependências
- `axios` — HTTP requests
- `next-auth` — autenticação
- `react-hook-form` + `zod` — formulários com validação
- `react-icons`, `@hookform/resolvers`

### 🧪 Desenvolvimento
- `typescript`, `eslint`, `tailwindcss`, `postcss`, `autoprefixer`
- Tipagens `@types/*`

### 🔧 Scripts
```bash
npm run dev       # Dev server com Turbopack
npm run build     # Build de produção
npm start         # Inicia produção
npm run lint      # Lint com ESLint
```

### 🌍 Arquivos `.env`
Crie a partir do `.env.exemplo` os arquivos:
- `.env.local` (desenvolvimento)
- `.env.production` (produção)

#### Chaves comuns:
```
GITHUB_ID=seu_client_id
GITHUB_SECRET=seu_client_secret
NEXTAUTH_URL=http://localhost:3000
```

#### Chave extra em `.env.production`:
```
NEXTAUTH_SECRET=sua_chave_segura_gerada
```

#### Gerar `NEXTAUTH_SECRET`:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 🔐 Configurar GitHub OAuth
1. Acesse: https://github.com/settings/developers
2. Clique em "New OAuth App"
3. Use:
   - **Homepage URL**: http://localhost:3000
   - **Callback URL**: http://localhost:3000/api/auth/callback/github

### ▶️ Iniciar o Frontend
```bash
cd zoo-app
npm install
npm run dev  # ou npm run build
```

App disponível em: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Backend (`zoo-api`)

### 🚀 Tecnologia
- **.NET Core (v9 presumido)**

### 🌐 URLs de Execução
- http: `http://localhost:5032`
- https: `https://localhost:7252`

### ⚙️ Ambiente
- `ASPNETCORE_ENVIRONMENT=Development`
- Navegador não inicia automaticamente

### ▶️ Comandos
```bash
dotnet restore     # Restaura pacotes
dotnet run         # Executa em dev
dotnet publish -c Release -r win-x64 --self-contained true
# Gera executável: zoo-api/bin/Release/net9.0/ZooApi.exe
```

### 🗃️ Banco de Dados
- (Se necessário altere conforme suas configurações  port;dataBase;username;root)
- PostgreSQL
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


## 🦁 Estrutura do Projeto - Zoo Management System

O sistema é dividido em dois projetos principais:

- 📦 **zoo-api**: Backend desenvolvido em .NET para gerenciar os dados de animais e cuidados.
- 💻 **zoo-app**: Frontend em Next.js com Tailwind CSS para interface do usuário.

### 📁 Estrutura dos Diretórios

```text
zoo-api
├── .gitignore
├── Controllers
│   ├── AnimalController.cs
│   ├── CuidadoController.cs
│   └── SeedController.cs
├── DTOs
│   ├── AnimalDTO.cs
│   └── CareDTO.cs
├── Data
│   ├── DbSeeder.cs
│   └── ZooContext.cs
├── Models
│   ├── Animal.cs
│   ├── AnimalCuidado.cs
│   └── Cuidado.cs
├── Program.cs
├── Properties
│   └── launchSettings.json
├── README.md
├── ZooApi.csproj
├── ZooApi.http
├── ZooApi.sln
└── appsettings.json

zoo-app
├── .env.example
├── .env.local
├── .gitignore
├── README.md
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   ├── favicon.png
│   └── sitemap.xml
├── src
│   ├── app
│   │   ├── animals
│   │   │   ├── [id]
│   │   │   │   └── page.tsx
│   │   │   ├── create
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── api
│   │   │   ├── animals
│   │   │   │   ├── [id]
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── auth
│   │   │   │   └── [...nextauth]
│   │   │   │       └── route.ts
│   │   │   └── cares
│   │   │       ├── [id]
│   │   │       │   └── route.ts
│   │   │       └── route.ts
│   │   ├── cares
│   │   │   ├── [id]
│   │   │   │   └── page.tsx
│   │   │   ├── create
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── error.tsx
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   ├── page.tsx
│   │   ├── privacy-policy
│   │   │   └── page.tsx
│   │   ├── providers
│   │   │   └── index.tsx
│   │   ├── robots.txt
│   │   │   └── route.ts
│   │   └── styles
│   │       └── globals.css
│   ├── components
│   │   ├── AnimalCard.tsx
│   │   ├── CareCard.tsx
│   │   ├── LoginButton.tsx
│   │   ├── LogoutButton.tsx
│   │   └── NavBar.tsx
│   ├── font
│   │   └── index.ts
│   └── types
│       └── index.ts
├── tailwind.config.ts
└── tsconfig.json
