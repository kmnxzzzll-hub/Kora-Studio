# KORA AI — Digital Studio Platform

Base inicial do website institucional e do KORA Command Center.

## Direção do produto

A KORA AI apresenta serviços de estratégia digital, websites e plataformas, UI/UX, automação e IA, comércio digital e sistemas empresariais. A experiência foi estruturada para os mercados de Angola (AOA), Portugal (EUR) e Brasil (BRL).

## Estrutura

```text
.
├── backend/
│   └── app/
│       ├── config.py
│       ├── main.py
│       └── routers/
│           └── health.py
├── src/
│   ├── data.ts
│   ├── main.ts
│   ├── styles.css
│   └── types.ts
├── .env.example
├── index.html
├── package.json
├── requirements.txt
├── tsconfig.json
└── vite.config.ts
```

## Executar o frontend

Requisitos: Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Para validar e gerar a versão de produção:

```bash
npm run typecheck
npm run build
npm run preview
```

## Executar a API Python

Requisitos: Python 3.10 ou superior.

```bash
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --app-dir backend
```

A verificação de disponibilidade fica em `http://127.0.0.1:8000/api/health`. A documentação OpenAPI fica em `http://127.0.0.1:8000/docs`.

## O que esta primeira versão contém

- Website público responsivo com serviços, conceitos de portefólio, processo, soluções e formulário de contacto demonstrativo.
- KORA Command Center com navegação por módulos, cartões, gráficos SVG, tabelas e pesquisa local.
- Base de API FastAPI com configuração por variáveis de ambiente e endpoint de saúde.
- Estilos responsivos, estados de foco e respeito pela preferência de movimento reduzido.

## Limites importantes desta entrega

Esta é a **fundação visual e técnica**, não uma plataforma empresarial pronta para produção. Os conteúdos, números do painel e registos são dados ilustrativos. O formulário apenas valida os campos no navegador e não envia nem guarda pedidos. O painel de demonstração não tem autenticação, controlo de permissões ou persistência de dados. Não estão ligadas bases de dados, email, pagamentos, WhatsApp, analytics externo, serviços de IA ou integrações de terceiros.

Antes de publicar a área CEO ou receber dados de clientes, é obrigatório implementar autenticação segura no servidor, autorização por função, base de dados, validação e proteção de API, gestão de segredos, logs, backups e testes. Não usar a rota de demonstração como área administrativa real.

Os cartões de soluções não fixam preços comerciais. Os valores por mercado, impostos, faturação e condições de manutenção ainda terão de ser aprovados e configurados. Os projetos Atelier Norte, Casa Amora e Nova Studio são conceitos de demonstração, não clientes nem trabalhos reais.

O símbolo apresentado na interface é um monograma tipográfico temporário. Deve ser substituído pelo ficheiro original do símbolo K aprovado para a marca, sem redesenhar ou alterar o logótipo.

## Próximas fases técnicas

1. Autenticação e recuperação de conta, com permissões CEO, administrador, colaborador e cliente.
2. Base de dados e modelos para leads, clientes, projetos, propostas, agenda, serviços e manutenção.
3. Integração de email, formulários e notificações.
4. Gestão do portefólio e conteúdos a partir do painel.
5. Analytics real, financeiro e relatórios, com separação por mercado e moeda.
6. Testes automatizados, segurança, acessibilidade, desempenho e preparação de produção.
