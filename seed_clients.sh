#!/bin/bash
# Este script executa 10 requisições POST para o endpoint de clientes.
# É necessário que o seu servidor Node.js esteja rodando em http://localhost:3000.

ENDPOINT="http://localhost:3000/clients"
HEADER="Content-Type: application/json"

send_client() {
  PAYLOAD=$1
  CLIENT_NAME=$(echo "$PAYLOAD" | grep -o '"name": *"[^"]*"' | head -1 | cut -d ':' -f 2 | tr -d ' "')
  echo "--- ➡️ Enviando cliente: $CLIENT_NAME ---"
  
  curl -s --location --request POST "$ENDPOINT" \
       --header "$HEADER" \
       --data-raw "$PAYLOAD"
  
  echo ""
}

# CLIENTE 1: São Paulo, SP
send_client '{
  "name": "João Silva",
  "email": "joao.silva@example.com",
  "document": "123.456.789-01",
  "address": {
    "street": "Rua das Flores",
    "number": "123",
    "complement": "Apto 45",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "01234-567"
  }
}'

# CLIENTE 2: Rio de Janeiro, RJ
send_client '{
  "name": "Maria Oliveira",
  "email": "maria.oliveira@exemplo.com",
  "document": "222.333.444-55",
  "address": {
    "street": "Avenida Atlântica",
    "number": "1500",
    "complement": "Cobertura 1",
    "city": "Rio de Janeiro",
    "state": "RJ",
    "zipCode": "22010-000"
  }
}'

# CLIENTE 3: Belo Horizonte, MG
send_client '{
  "name": "Pedro Souza",
  "email": "pedro.souza@exemplo.com",
  "document": "333.444.555-66",
  "address": {
    "street": "Rua da Paz",
    "number": "88",
    "complement": null,
    "city": "Belo Horizonte",
    "state": "MG",
    "zipCode": "30112-000"
  }
}'

# CLIENTE 4: Porto Alegre, RS
send_client '{
  "name": "Ana Santos",
  "email": "ana.santos@exemplo.com",
  "document": "444.555.666-77",
  "address": {
    "street": "Rua dos Andradas",
    "number": "777",
    "complement": "Sala 101",
    "city": "Porto Alegre",
    "state": "RS",
    "zipCode": "90020-000"
  }
}'

# CLIENTE 5: Curitiba, PR
send_client '{
  "name": "Carlos Lima",
  "email": "carlos.lima@exemplo.com",
  "document": "555.666.777-88",
  "address": {
    "street": "Rua 24 Horas",
    "number": "10",
    "complement": null,
    "city": "Curitiba",
    "state": "PR",
    "zipCode": "80250-000"
  }
}'

# CLIENTE 6: Salvador, BA
send_client '{
  "name": "Fernanda Costa",
  "email": "fernanda.costa@exemplo.com",
  "document": "666.777.888-99",
  "address": {
    "street": "Avenida Oceânica",
    "number": "500",
    "complement": "Bl. C",
    "city": "Salvador",
    "state": "BA",
    "zipCode": "40155-000"
  }
}'

# CLIENTE 7: Fortaleza, CE
send_client '{
  "name": "Ricardo Melo",
  "email": "ricardo.melo@exemplo.com",
  "document": "777.888.999-00",
  "address": {
    "street": "Rua Sol Nascente",
    "number": "333",
    "complement": "Casa",
    "city": "Fortaleza",
    "state": "CE",
    "zipCode": "60115-000"
  }
}'

# CLIENTE 8: Manaus, AM
send_client '{
  "name": "Juliana Pereira",
  "email": "juliana.pereira@exemplo.com",
  "document": "888.999.000-11",
  "address": {
    "street": "Av. Eduardo Ribeiro",
    "number": "1111",
    "complement": "Escritório 3",
    "city": "Manaus",
    "state": "AM",
    "zipCode": "69010-000"
  }
}'

# CLIENTE 9: Recife, PE
send_client '{
  "name": "Guilherme Alves",
  "email": "guilherme.alves@exemplo.com",
  "document": "999.000.111-22",
  "address": {
    "street": "Rua do Imperador",
    "number": "20",
    "complement": null,
    "city": "Recife",
    "state": "PE",
    "zipCode": "50010-000"
  }
}'

# CLIENTE 10: Brasília, DF
send_client '{
  "name": "Leticia Gomes",
  "email": "leticia.gomes@exemplo.com",
  "document": "000.111.222-33",
  "address": {
    "street": "Asa Sul",
    "number": "404",
    "complement": "Bloco D",
    "city": "Brasília",
    "state": "DF",
    "zipCode": "70297-400"
  }
}'
