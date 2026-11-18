# KORA AI — Plataforma do Estúdio Digital

Website institucional e base operacional do **KORA Command Center**.

## Stack

- Frontend: TypeScript, Vite, HTML e CSS.
- Backend: Python, FastAPI e SQLAlchemy.
- Base de dados local: SQLite (configurável por `DATABASE_URL`).
- Sessões: JWT com expiração e palavras-passe protegidas por Argon2.
- Mercados previstos: Angola (AOA), Portugal (EUR) e Brasil (BRL).

## Instalação local

### 1. Frontend

Requisitos: Node.js 20 ou superior.

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

O website fica disponível em `http://localhost:5173`.

### 2. Backend

Requisitos: Python 3.10 ou superior.

```bash
python -m venv .venv
# Windows PowerShell: .venv\Scripts\Activate.ps1
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --app-dir backend
```

A API fica disponível em `http://127.0.0.1:8000`; a documentação interactiva fica em `http://127.0.0.1:8000/docs`.

Copia `.env.example` para `.env` e ajusta as variáveis. Em produção, define um `JWT_SECRET` aleatório com pelo menos 48 caracteres, uma base de dados PostgreSQL, HTTPS e origens CORS exactas. Nunca publiques ficheiros `.env` nem palavras-passe.

### 3. Criar a primeira conta CEO

Não existe palavra-passe padrão nem conta administrativa pré-criada. Define as variáveis no terminal e executa o script uma única vez:

```bash
KORA_CEO_EMAIL=owner@example.com KORA_CEO_PASSWORD='uma-palavra-passe-longa-e-unica' python backend/create_ceo.py
```

No Windows PowerShell:

```powershell
$env:KORA_CEO_EMAIL="owner@example.com"
$env:KORA_CEO_PASSWORD="uma-palavra-passe-longa-e-unica"
python backend/create_ceo.py
```

Usa uma palavra-passe única com pelo menos 14 caracteres. Não a coloques no código, no GitHub ou em mensagens.

## Funcionalidades implementadas nesta fase

- Login pela API, verificação de sessão e terminação de sessão.
- Palavras-passe com hash Argon2 e tokens JWT com expiração.
- Criação inicial do CEO sem credenciais padrão.
- Funções de acesso: CEO, administrador, colaborador e cliente.
- Protecção de rotas de equipa e dados financeiros por função.
- Operações de criar, consultar, editar e apagar para leads, clientes, projectos, propostas, reuniões, serviços, portefólio, manutenção e lançamentos financeiros.
- Pesquisa e paginação de registos, validação de campos e confirmação antes de apagar.
- Gestão de contas da equipa pelo CEO: criar, activar e desactivar utilizadores.
- Indicadores operacionais calculados a partir da base de dados.
- Registo de auditoria para login, operações de escrita e pedidos públicos; visualização reservada a CEO e administradores.
- Formulário público com validação, consentimento e criação de lead na base de dados.
- Limite básico de pedidos públicos por endereço IP (em memória, por processo).
- Website e painel responsivos.
- Workflow de CI para verificar TypeScript, build do frontend e compilação Python.

## O que ainda não está concluído

Esta é uma versão operacional inicial, não um sistema empresarial pronto para utilização pública. Não foram ligadas credenciais nem fornecedores externos.

- Email e notificações automáticas: por integrar; o formulário guarda o lead mas não envia email.
- WhatsApp Business: por integrar.
- Pagamentos, reconciliação e facturação fiscal: por integrar; os lançamentos financeiros não processam dinheiro.
- Analytics de tráfego e conversões: por integrar. O painel não apresenta visitas inventadas.
- Armazenamento de imagens e ficheiros: por integrar.
- Portal de cliente: ainda por desenvolver.
- Recuperação e alteração de palavra-passe: por desenvolver.
- Gestão avançada de propostas, tarefas, contratos, documentos PDF, impostos e preços localizados: por desenvolver.
- Gestão de conteúdos do website e portefólio a partir do painel: por desenvolver.
- Testes automatizados de regras de negócio, migrações de base de dados, limitação de tentativas de login, monitorização e revisão de segurança: necessários antes de produção.

A base SQLite e o limitador público em memória servem apenas para desenvolvimento e testes iniciais. Para produção, usar PostgreSQL, migrações (por exemplo Alembic), rate limiting partilhado, backups, HTTPS, gestão segura de segredos, CSP, política de privacidade e retenção de dados, e revisão de segurança. A autenticação desta versão é uma base funcional que ainda precisa de hardening antes de expor o painel à Internet.

Os conceitos Atelier Norte, Casa Amora e Nova Studio são demonstrações e não devem ser apresentados como clientes reais. O monograma tipográfico temporário deve ser substituído pelo ficheiro original do símbolo K aprovado para a marca.
