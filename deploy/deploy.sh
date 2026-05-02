#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="/home/ubuntu/plataforma-instituciones-educativas"
BACKEND_DIR="$PROJECT_ROOT/backend"
FRONTEND_DIR="$PROJECT_ROOT/frontend"

printf '\n[1/7] Pull del repositorio...\n'
cd "$PROJECT_ROOT"
git pull --ff-only origin main

printf '\n[2/7] Instalando dependencias backend...\n'
cd "$BACKEND_DIR"
npm install

printf '\n[3/7] Instalando dependencias frontend...\n'
cd "$FRONTEND_DIR"
npm install

printf '\n[4/7] Compilando backend...\n'
cd "$BACKEND_DIR"
npm run build

printf '\n[5/7] Compilando frontend...\n'
cd "$FRONTEND_DIR"
npm run build

printf '\n[6/7] Reiniciando servicios...\n'
sudo systemctl restart educa-backend.service
sudo systemctl restart educa-frontend.service

printf '\n[7/7] Verificando salud publicada...\n'
curl -fsS https://educa.hacktrickstore.com/api/system/health
printf '\n'
curl -fsS https://educa.hacktrickstore.com/api/system/bootstrap
printf '\n\nDeploy completado correctamente.\n'
