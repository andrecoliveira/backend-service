Comando para executar o Docker Compose

- docker-compose up -d

Comando para iniciar com a configuração do Prisma caso ainda não exista nenhuma

- pnpm prisma init

Comando para execeutar o migrate do Prisma sempre que houver novas alterações

- pnpm prisma migrate dev

Comando para abrir o Prisma Studio

- pnpm prisma studio

Comando para subir o projeto em dev

- pnpm run start:dev

Comando para realizar testes E2E

- pnpm test:e2e

Comando para gerar chave privada no linux/mac

- openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2848

Comando para gerar chave publica a partir de uma chave privada no linux/mac

- openssl rsa -pubout -in private_key.pem -out public_key.pem

Converter chave em Base64

- base64 -i [IN] -o [OUT]
