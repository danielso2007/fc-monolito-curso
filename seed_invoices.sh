#!/bin/bash
# seed_invoices.sh
# Gera e envia 10 faturas aleatórias para a API

URL="http://localhost:3000/invoices"

NAMES=("Loja do Zé Eletrônicos" "TechPlus Informática" "Casa das Baterias" "Oficina do João" "SuperCell Shop" "MegaTec" "InfoBrasil" "Eletrônicos Center" "SmartStore" "CompuCity")
CITIES=("São Paulo" "Rio de Janeiro" "Curitiba" "Belo Horizonte" "Salvador" "Recife" "Porto Alegre" "Florianópolis" "Fortaleza" "Campinas")
STREETS=("Av. Paulista" "Rua das Flores" "Av. Brasil" "Rua XV de Novembro" "Av. Independência" "Rua Dom Pedro II" "Av. das Américas" "Rua São João" "Av. Atlântica" "Rua Augusta")

for i in {1..10}; do
  id=$(uuidgen)
  name=${NAMES[$((RANDOM % ${#NAMES[@]}))]}
  document="$(shuf -i 10-99 -n 1).$((RANDOM % 900 + 100)).$((RANDOM % 900 + 100))/0001-$((RANDOM % 90 + 10))"
  street=${STREETS[$((RANDOM % ${#STREETS[@]}))]}
  number=$((RANDOM % 999 + 1))
  city=${CITIES[$((RANDOM % ${#CITIES[@]}))]}
  state="SP"
  zipcode="$(shuf -i 10000-99999 -n 1)-$((RANDOM % 900 + 100))"

  item1_id=$(uuidgen)
  item2_id=$(uuidgen)
  item3_id=$(uuidgen)

  json=$(cat <<EOF
{
  "name": "$name",
  "document": "$document",
  "street": "$street",
  "number": "$number",
  "complement": "Sala ${RANDOM}",
  "city": "$city",
  "state": "$state",
  "zipCode": "$zipcode",
  "items": [
    {
      "name": "Produto $((RANDOM % 100))",
      "price": $((RANDOM % 900 + 100)).99
    },
    {
      "name": "Item $((RANDOM % 200))",
      "price": $((RANDOM % 500 + 50)).49
    },
    {
      "name": "Serviço $((RANDOM % 50))",
      "price": $((RANDOM % 800 + 80)).00
    }
  ]
}
EOF
)

  echo ">>> Enviando fatura $i: $name ($id)"
  curl -s --silent --location "$URL" \
    --header 'Content-Type: application/json' \
    --data "$json" \
    --output /dev/null --write-out "Status: %{http_code}\n"
done

echo "✅ 10 faturas enviadas com sucesso!"
