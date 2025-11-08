#!/bin/bash
echo "🌱 Iniciando carga de dados..."

echo "➡️  Executando seed_clients.sh..."
bash ./seed_clients.sh

if [ $? -ne 0 ]; then
  echo "❌ Erro ao executar seed_clients.sh"
  exit 1
fi

echo "➡️  Executando seed_invoices.sh..."
bash ./seed_invoices.sh

if [ $? -ne 0 ]; then
  echo "❌ Erro ao executar seed_invoices.sh"
  exit 1
fi

echo "✅ Todos os seeds executados com sucesso!"
