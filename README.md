# 🎮 Game Deals Tracker

Este projeto é uma aplicação web que exibe uma lista de jogos com os melhores descontos, utilizando dados de uma API de promoções. Com uma interface responsiva e moderna, o usuário pode visualizar os jogos em formato de cards ou tabela, além de acessar detalhes de cada oferta através de um modal interativo.

## 🛠️ Tecnologias Utilizadas

- **[Next.js 15](https://nextjs.org/)** — Framework React moderno para SSR/SSG
- **[React Table](https://tanstack.com/table/v8)** — Biblioteca poderosa para exibir dados em tabelas
- **[Tailwind CSS](https://tailwindcss.com/)** — Framework de utilitários CSS para estilização rápida
- **[Shadcn UI](https://ui.shadcn.com/)** — Componentes acessíveis e prontos para produção
- **TypeScript** — Tipagem estática para maior confiabilidade no desenvolvimento

## 📦 Funcionalidades

- ✅ Listagem de jogos com descontos
- ✅ Exibição em cards e tabela responsiva
- ✅ Modal com detalhes do jogo
- ✅ Preço original, com desconto e histórico do menor preço
- ✅ Link direto para compra na loja (ex: Steam)
- ✅ Destaque para economia e avaliação do jogo

## 📸 Demonstração

(Adicione aqui um gif ou imagem da aplicação em funcionamento)

## 🧪 Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/game-deals-tracker.git

# Acesse a pasta do projeto
cd game-deals-tracker

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev

# Acesse em http://localhost:3000
```

###📁 Estrutura de Pastas

```bash
/app
  /context        -> Context API para gerenciamento global
  /components     -> Componentes reutilizáveis (GameCard, GameModal, Table, etc)
  /games          -> Página da listagem de jogos
  /api            -> Endpoints de API (se houver)
```

###🧠 Aprendizados

Manipulação de estados com Context API

Criação de modais reutilizáveis com Shadcn Dialog

Exibição de dados dinâmicos em tabelas com React Table

Acessibilidade e boas práticas de UI
