# -----------------------------
# STAGE 1: Build do React/Vite
# -----------------------------
FROM node:18 AS build-frontend
WORKDIR /app
COPY client/ .
RUN npm install
RUN npm run build

# -----------------------------
# STAGE 2: Backend (FastAPI)
# -----------------------------
FROM python:3.12-slim AS backend
WORKDIR /app

COPY api/ .
RUN pip install --no-cache-dir -r requirements.txt

# Copia os arquivos gerados pelo Vite
COPY --from=build-frontend /app/dist ./static

# Comando para rodar FastAPI servindo os estáticos
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
