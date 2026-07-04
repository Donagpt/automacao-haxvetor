# HaxVetor Dedetizadora — Sistema interno

Primeira versão responsiva de um sistema interno para organização operacional da HaxVetor Dedetizadora. A aplicação funciona em navegadores de celular e computador e utiliza somente dados fictícios nesta etapa.

## Funcionalidades

- Painel inicial com indicadores rápidos e próximos atendimentos.
- Cadastro de clientes com criação, edição e exclusão de registros.
- Cadastro de funcionários com criação, edição e exclusão de registros.
- Cadastro de tipos de serviços com criação, edição e exclusão de registros.
- Quadro de programação por data e horário.
- Cada atendimento contém cliente, endereço, contato, tipo de serviço, equipe escalada, veículo, materiais necessários, observações, valor, situação do pagamento e status do atendimento.
- Busca textual, filtro por data e filtro por status na programação.
- Layout responsivo para uso em campo pelo celular ou no computador do escritório.

## Observações da versão

- Todos os registros são fictícios e servem apenas para demonstração.
- Não há integração com WhatsApp nesta versão.
- O sistema não está publicado e não deve receber dados reais ainda.
- Os dados ficam em memória no navegador; ao recarregar a página, voltam para a base fictícia inicial.

## Como executar

Pré-requisitos: Node.js 20 ou superior e npm.

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173` no navegador.

## Como testar e verificar erros

Execute os testes automatizados:

```bash
npm test
```

Gere a versão de produção para verificar erros de arquivos e empacotamento estático:

```bash
npm run build
```

Opcionalmente, visualize o build local:

```bash
npm run preview
```

.
