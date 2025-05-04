# 1. Build stage: gera os artefatos de produção
FROM node:18 AS builder
WORKDIR /app

# Copia manifestos e instala deps
COPY package*.json ./
RUN npm install            
# usa npm para compatibilidade com scripts :contentReference[oaicite:1]{index=1}

# Copia todo o código e gera o build Next.js
COPY . .
RUN npm run build          
# executa 'next build' definido no package.json :contentReference[oaicite:2]{index=2}

# 2. Production stage: imagem enxuta para rodar
FROM node:18-alpine
WORKDIR /app

# Ajustes de ambiente
ENV NODE_ENV=production    
# assegura modo produção :contentReference[oaicite:3]{index=3}

# Copia apenas artefatos necessários
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]       
 # 'next start' inicia servidor Next.js :contentReference[oaicite:4]{index=4}