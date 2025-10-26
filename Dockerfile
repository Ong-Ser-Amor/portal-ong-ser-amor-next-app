# =================================================================
# ESTÁGIO 1: "base" ou "development" - Ambiente para Desenvolvimento
# =================================================================
# Define a imagem Node.js base
FROM node:22.19.0-trixie-slim AS base

# Instala pacotes do sistema operacional úteis
RUN apt-get update && apt-get install -y git curl && apt-get clean -y

# Define o diretório de trabalho padrão dentro do container
WORKDIR /usr/src/app

# Copia os arquivos de definição de dependências
# COPY package*.json ./

# Instala todas as dependências (incluindo devDependencies)
# RUN npm ci
# RUN npm install

# Copia o restante do código-fonte (pode ser sobrescrito por volumes)
# COPY . .

# Muda para o usuário não-root 'node'
USER node

# =================================================================
# ESTÁGIO 2: "production" - Imagem final otimizada para produção
# =================================================================
FROM node:22.19.0-trixie-slim AS production

# Define o diretório de trabalho padrão
WORKDIR /usr/src/app

# Define o ambiente Node.js como produção
ENV NODE_ENV=production

# Copia os arquivos de definição de dependências
# COPY package*.json ./

# Instala apenas as dependências de produção
# RUN npm ci --omit=dev

# Copia o código-fonte necessário para o build
# COPY . .

# Gera o build otimizado da aplicação Next.js
# RUN npm run build

# Muda para o usuário não-root 'node' (existente na imagem base)
USER node

# Comando para iniciar o servidor Next.js em modo produção
CMD ["npm", "start"]