
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



# 𖣂 Estrutura do projeto (Tree):

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
