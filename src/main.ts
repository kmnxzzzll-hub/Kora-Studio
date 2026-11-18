import { createIcons, icons } from "lucide";
import { modules } from "./data";
import { apiRequest, clearToken, getToken, setToken } from "./api";
import type { AuditEntry, CurrentUser, DashboardSummary, KoraRecord, RecordPayload, TeamUser } from "./api";
import type { ModuleName } from "./types";
import "./styles.css";

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("Elemento principal #app não encontrado.");

let activeModule: ModuleName = "Visão geral";
let sidebarOpen = false;

const icon = (name: string, size = 18): string =>
  '<i data-lucide="' + name + '" width="' + size + '" height="' + size + '" aria-hidden="true"></i>';

function refreshIcons(): void {
  createIcons({ icons, attrs: { "stroke-width": 1.7 } });
}

function scrollToSection(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderHome(): void {
  app!.innerHTML = `
    <div class="site-shell">
      <header class="site-header">
        <a class="brand" href="#/" aria-label="KORA AI, início">
          <span class="brand-mark">K</span><span class="brand-name">KORA<span>AI</span></span>
        </a>
        <nav class="main-nav" aria-label="Navegação principal">
          <a href="#servicos" data-scroll="servicos">Serviços</a>
          <a href="#trabalho" data-scroll="trabalho">Portefólio</a>
          <a href="#processo" data-scroll="processo">Processo</a>
          <a href="#contacto" data-scroll="contacto">Contacto</a>
        </nav>
        <a class="button button-small button-outline header-cta" href="#contacto" data-scroll="contacto">Pedir proposta <span>↗</span></a>
        <button class="mobile-menu" aria-label="Abrir navegação" data-action="menu">${icon("menu", 21)}</button>
      </header>

      <main>
        <section class="hero section-wrap">
          <div class="hero-copy">
            <div class="eyebrow"><span class="eyebrow-dot"></span> ESTÚDIO DIGITAL · ANGOLA · PORTUGAL · BRASIL</div>
            <h1>O próximo nível do teu negócio começa <em>no digital.</em></h1>
            <p class="hero-description">Estratégia, design e tecnologia unidos para criar experiências digitais que tornam as marcas mais claras, úteis e competitivas.</p>
            <div class="hero-actions">
              <a class="button button-primary" href="#contacto" data-scroll="contacto">Vamos conversar ${icon("arrow-up-right", 17)}</a>
              <a class="text-link" href="#trabalho" data-scroll="trabalho">Explorar projetos <span>↓</span></a>
            </div>
            <div class="hero-proof"><span class="proof-line"></span><span>ESTRATÉGIA COM INTENÇÃO. EXECUÇÃO COM PRECISÃO.</span></div>
          </div>
          <div class="hero-art" aria-label="Composição visual de interfaces digitais">
            <div class="art-glow"></div>
            <div class="art-orbit orbit-one"></div><div class="art-orbit orbit-two"></div>
            <div class="floating-label label-top"><span class="status-live"></span> DIGITAL EXPERIENCE</div>
            <div class="browser-card">
              <div class="browser-top"><div class="browser-dots"><i></i><i></i><i></i></div><span>kora.studio / overview</span><span class="browser-lock">${icon("lock", 12)}</span></div>
              <div class="browser-content">
                <div class="browser-nav"><b>K.</b><span>ABOUT&nbsp;&nbsp; SERVICES&nbsp;&nbsp; WORK</span><small>LET'S TALK ↗</small></div>
                <div class="browser-title">Make your<br><strong>next move.</strong></div>
                <div class="browser-subtitle">Digital products built around people and purpose.</div>
                <div class="browser-visual"><div class="visual-block visual-a"></div><div class="visual-block visual-b"></div><div class="visual-block visual-c"></div><span>DESIGN / BUILD / GROW</span></div>
              </div>
            </div>
            <div class="floating-stat"><span class="stat-icon">${icon("activity", 17)}</span><div><b>Experiência</b><small>DESIGN + PERFORMANCE</small></div><span class="stat-spark">↗</span></div>
            <div class="floating-label label-bottom">KORA / DIGITAL STUDIO <span>2026</span></div>
          </div>
        </section>

        <section class="market-strip">
          <div class="section-wrap market-inner"><span>UM ESTÚDIO, TRÊS MERCADOS</span><div><b>AO</b> Angola</div><div><b>PT</b> Portugal</div><div><b>BR</b> Brasil</div><span class="market-note">Soluções pensadas para cada contexto.</span></div>
        </section>

        <section class="section-wrap section-block" id="servicos">
          <div class="section-heading"><div><div class="eyebrow">O QUE FAZEMOS</div><h2>Tecnologia com propósito.<br><em>Resultados com direção.</em></h2></div><p>Construímos a presença e as ferramentas digitais de que as empresas precisam para evoluir.</p></div>
          <div class="services-grid">
            <article class="service-card"><span class="card-icon">${icon("monitor", 21)}</span><span class="card-index">01 / DIGITAL</span><h3>Websites & plataformas</h3><p>Experiências rápidas, responsivas e desenhadas para transformar visitas em oportunidades.</p><a href="#contacto" data-scroll="contacto">Explorar serviço ${icon("arrow-up-right", 15)}</a></article>
            <article class="service-card"><span class="card-icon">${icon("layers-3", 21)}</span><span class="card-index">02 / EXPERIENCE</span><h3>UI/UX & produto digital</h3><p>Interfaces intuitivas, sistemas de design e fluxos que simplificam tarefas complexas.</p><a href="#contacto" data-scroll="contacto">Explorar serviço ${icon("arrow-up-right", 15)}</a></article>
            <article class="service-card"><span class="card-icon">${icon("workflow", 21)}</span><span class="card-index">03 / INTELLIGENCE</span><h3>IA & automação</h3><p>Processos mais eficientes com automações e inteligência artificial aplicada ao negócio.</p><a href="#contacto" data-scroll="contacto">Explorar serviço ${icon("arrow-up-right", 15)}</a></article>
            <article class="service-card"><span class="card-icon">${icon("shopping-bag", 21)}</span><span class="card-index">04 / COMMERCE</span><h3>Lojas online</h3><p>Canais de venda digitais com catálogo, gestão e experiência de compra consistente.</p><a href="#contacto" data-scroll="contacto">Explorar serviço ${icon("arrow-up-right", 15)}</a></article>
            <article class="service-card"><span class="card-icon">${icon("briefcase-business", 21)}</span><span class="card-index">05 / BUSINESS</span><h3>Sistemas empresariais</h3><p>Ferramentas internas, dashboards e fluxos personalizados para operações reais.</p><a href="#contacto" data-scroll="contacto">Explorar serviço ${icon("arrow-up-right", 15)}</a></article>
            <article class="service-card"><span class="card-icon">${icon("sparkles", 21)}</span><span class="card-index">06 / BRAND</span><h3>Identidade digital</h3><p>Uma presença visual coerente, reconhecível e preparada para crescer em vários canais.</p><a href="#contacto" data-scroll="contacto">Explorar serviço ${icon("arrow-up-right", 15)}</a></article>
          </div>
        </section>

        <section class="work-section" id="trabalho">
          <div class="section-wrap section-block">
            <div class="section-heading"><div><div class="eyebrow">TRABALHO SELECIONADO</div><h2>Ideias que ganham<br><em>forma digital.</em></h2></div><p>Conceitos de demonstração que mostram a qualidade e a variedade de experiências que a KORA AI pode desenvolver.</p></div>
            <div class="work-grid">
              <article class="work-card work-large"><div class="work-preview preview-fashion"><div class="preview-top"><b>ATELIER / N°01</b><span>COLLECTION 2026</span></div><div class="fashion-shape"></div><div class="preview-word">Less,<br><i>but better.</i></div><div class="preview-bottom">DESIGNED TO BE TIMELESS <span>↗</span></div></div><div class="work-caption"><div><span>CONCEITO · E-COMMERCE</span><h3>Atelier Norte</h3></div><span class="work-arrow">↗</span></div></article>
              <article class="work-card"><div class="work-preview preview-food"><div class="food-header"><b>CASA AMORA</b><span>MENU & MOMENTS</span></div><div class="food-title">Feito com<br><i>tempo.</i></div><div class="food-circle"></div><div class="food-footer">COZINHA DE AUTOR · DESDE 2020</div></div><div class="work-caption"><div><span>CONCEITO · RESTAURAÇÃO</span><h3>Casa Amora</h3></div><span class="work-arrow">↗</span></div></article>
              <article class="work-card"><div class="work-preview preview-tech"><div class="tech-sidebar">NOVA<span>STUDIO</span><small>OVERVIEW<br>PROJECTS<br>INSIGHTS</small></div><div class="tech-main"><span>YOUR BUSINESS, IN FOCUS</span><h3>Clarity in<br>every move.</h3><div class="tech-chart"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><small>PERFORMANCE / 2026</small></div></div><div class="work-caption"><div><span>CONCEITO · SISTEMA EMPRESARIAL</span><h3>Nova Studio</h3></div><span class="work-arrow">↗</span></div></article>
            </div>
            <p class="demo-disclaimer">${icon("info", 14)} Projetos conceptuais de demonstração — não representam trabalhos de clientes reais.</p>
          </div>
        </section>

        <section class="section-wrap section-block process-section" id="processo">
          <div class="section-heading"><div><div class="eyebrow">COMO TRABALHAMOS</div><h2>Um processo claro.<br><em>Do primeiro passo ao lançamento.</em></h2></div><p>Alinhamento, execução e acompanhamento. Cada fase tem objetivos definidos e pontos de validação.</p></div>
          <div class="process-grid">
            <div class="process-step"><span>01</span><div class="process-line"></div><h3>Descobrir</h3><p>Compreendemos o negócio, o público, os desafios e os objetivos.</p></div>
            <div class="process-step"><span>02</span><div class="process-line"></div><h3>Definir</h3><p>Estruturamos a solução, a experiência, o âmbito e o plano de execução.</p></div>
            <div class="process-step"><span>03</span><div class="process-line"></div><h3>Construir</h3><p>Desenhamos, desenvolvemos e validamos cada parte do produto.</p></div>
            <div class="process-step"><span>04</span><div class="process-line"></div><h3>Evoluir</h3><p>Preparamos o lançamento e definimos o acompanhamento adequado.</p></div>
          </div>
        </section>

        <section class="pricing-section" id="planos"><div class="section-wrap section-block"><div class="section-heading"><div><div class="eyebrow">SOLUÇÕES À MEDIDA</div><h2>O âmbito certo para<br><em>cada negócio.</em></h2></div><p>O investimento depende do mercado, da complexidade e das integrações necessárias. Cada proposta apresenta entregáveis e condições claros.</p></div><div class="pricing-grid">
          <article class="price-card"><span class="price-label">PRESENÇA DIGITAL</span><h3>START</h3><p>Para negócios que precisam de uma presença digital profissional.</p><ul><li>${icon("check", 15)} Website responsivo</li><li>${icon("check", 15)} Conteúdo e contactos</li><li>${icon("check", 15)} Formulário de contacto</li></ul><a href="#contacto" data-scroll="contacto">Pedir proposta ${icon("arrow-up-right", 15)}</a></article>
          <article class="price-card price-featured"><span class="price-label">CRESCIMENTO DIGITAL</span><h3>BUSINESS</h3><p>Para empresas que procuram uma experiência mais completa.</p><ul><li>${icon("check", 15)} Páginas e secções personalizadas</li><li>${icon("check", 15)} UI/UX dedicado</li><li>${icon("check", 15)} Integrações selecionadas</li></ul><a href="#contacto" data-scroll="contacto">Pedir proposta ${icon("arrow-up-right", 15)}</a></article>
          <article class="price-card"><span class="price-label">SOLUÇÃO PERSONALIZADA</span><h3>CUSTOM</h3><p>Para plataformas, lojas online e operações específicas.</p><ul><li>${icon("check", 15)} Arquitetura à medida</li><li>${icon("check", 15)} Sistemas e automações</li><li>${icon("check", 15)} Plano de evolução</li></ul><a href="#contacto" data-scroll="contacto">Falar com a equipa ${icon("arrow-up-right", 15)}</a></article>
        </div><p class="price-note">Os valores comerciais ainda serão configurados por mercado: EUR, BRL e AOA. Os cartões não constituem uma tabela de preços final.</p></div></section>

        <section class="section-wrap contact-section" id="contacto"><div class="contact-panel"><div class="contact-copy"><div class="eyebrow">O PRÓXIMO PASSO</div><h2>Vamos construir algo<br><em>com impacto.</em></h2><p>Conta-nos o que tens em mente. A KORA AI ajuda-te a transformar a ideia numa solução digital concreta.</p><div class="contact-meta"><span>${icon("globe-2", 16)} Angola · Portugal · Brasil</span><span>${icon("mail", 16)} Contacto por configurar</span></div></div><form id="contact-form" class="contact-form"><label>Nome<input name="name" autocomplete="name" placeholder="O teu nome" required minlength="2" /></label><label>Email<input name="email" type="email" autocomplete="email" placeholder="nome@empresa.com" required /></label><label>Mercado<select name="market" required><option value="">Selecionar mercado</option><option>Angola</option><option>Portugal</option><option>Brasil</option><option>Outro</option></select></label><label>Como podemos ajudar?<textarea name="message" rows="3" placeholder="Descreve brevemente o teu projecto..." required minlength="10"></textarea></label><label class="consent-check"><input type="checkbox" name="consent" value="true" required /> <span>Autorizo a KORA AI a utilizar estes dados para responder ao meu pedido.</span></label><input type="text" name="website" class="honeypot" tabindex="-1" autocomplete="off" aria-hidden="true" /><button class="button button-primary form-submit" type="submit">Preparar pedido ${icon("arrow-up-right", 17)}</button><p class="form-feedback" id="form-feedback" role="status">Demonstração: o envio de emails ainda não está ligado.</p></form></div></section>
      </main>
      <footer class="site-footer"><div class="section-wrap footer-inner"><a class="brand" href="#/"><span class="brand-mark">K</span><span class="brand-name">KORA<span>AI</span></span></a><span>ESTRATÉGIA · DESIGN · TECNOLOGIA</span><a href="#/login" class="footer-team">Área da equipa ${icon("arrow-up-right", 13)}</a><small>© 2026 KORA AI. Todos os direitos reservados.</small></div></footer>
    </div>`;
  refreshIcons();
}

function escapeHtml(value: unknown): string {
  const escapes: Record<string, string> = {
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  };
  return String(value ?? "").replace(/[&<>"']/g, (char) => escapes[char] ?? char);
}

const resourceByModule: Partial<Record<ModuleName, string>> = {
  Leads: "leads",
  Clientes: "clients",
  Projetos: "projects",
  Propostas: "proposals",
  Agenda: "meetings",
  Serviços: "services",
  Portefólio: "portfolio",
  Manutenção: "maintenance",
  Financeiro: "financial"
};

let currentUser: CurrentUser | null = null;
let currentRecords: KoraRecord[] = [];
let currentTeam: TeamUser[] = [];
let currentAudit: AuditEntry[] = [];
let pageEpoch = 0;

function renderLogin(): void {
  app!.innerHTML = [
    '<main class="login-screen">',
    '<a class="brand login-brand" href="#/"><span class="brand-mark">K</span><span class="brand-name">KORA<span>AI</span></span></a>',
    '<section class="login-card">',
    '<div class="eyebrow">KORA COMMAND CENTER</div><h1>Área de acesso</h1>',
    '<p>Entra com a conta da equipa criada pelo responsável da plataforma.</p>',
    '<div class="login-lock">' + icon("shield-check", 25) + '</div>',
    '<form id="login-form" class="auth-form">',
    '<label>Email profissional<input name="email" type="email" autocomplete="username" placeholder="nome@empresa.com" required /></label>',
    '<label>Palavra-passe<input name="password" type="password" autocomplete="current-password" placeholder="A tua palavra-passe" required /></label>',
    '<p class="form-feedback" id="login-feedback" role="alert"></p>',
    '<button class="button button-primary login-demo" type="submit">Iniciar sessão ' + icon("arrow-up-right", 16) + '</button>',
    '</form><a class="login-back" href="#/">Voltar ao website</a>',
    '</section><span class="login-foot">ACESSO RESTRITO · KORA AI</span></main>'
  ].join("");
  refreshIcons();
}

function recordRows(records: KoraRecord[], allowDelete: boolean): string {
  if (!records.length) {
    return '<tr><td colspan="4" class="empty-cell">Ainda não existem registos nesta área. Usa “Novo registo” para adicionar o primeiro.</td></tr>';
  }
  return records.map((record) => {
    const detail = [record.description, record.email, record.phone, record.country].filter(Boolean).join(" · ");
    const amount = record.amount !== null && record.amount !== undefined
      ? '<small>' + escapeHtml(record.amount) + ' ' + escapeHtml(record.currency || "") + '</small>' : "";
    const actions = '<button class="row-action" data-record-edit="' + record.id + '">Editar</button>' +
      (allowDelete ? '<button class="row-action danger" data-record-delete="' + record.id + '">Apagar</button>' : "");
    return '<tr><td><b>' + escapeHtml(record.name) + '</b><small>' + escapeHtml(detail || "—") + '</small>' + amount + '</td>' +
      '<td><span class="table-status">' + escapeHtml(record.status) + '</span></td>' +
      '<td>' + escapeHtml(record.due_date || record.updated_at.slice(0, 10)) + '</td>' +
      '<td><div class="row-actions">' + actions + '</div></td></tr>';
  }).join("");
}

function teamRows(users: TeamUser[]): string {
  if (!users.length) return '<tr><td colspan="4" class="empty-cell">Ainda não existem utilizadores.</td></tr>';
  return users.map((user) => '<tr><td><b>' + escapeHtml(user.display_name) + '</b><small>' + escapeHtml(user.email) + '</small></td>' +
    '<td><span class="table-status">' + escapeHtml(user.role) + '</span></td>' +
    '<td>' + (user.is_active ? "Activo" : "Desactivado") + '</td>' +
    '<td><button class="row-action" data-user-toggle="' + user.id + '" data-active="' + String(user.is_active) + '">' +
    (user.is_active ? "Desactivar" : "Activar") + '</button></td></tr>').join("");
}

function settingsContent(): string {
  return [
    '<div class="settings-grid">',
    '<article class="dash-panel settings-card"><div class="metric-icon">' + icon("globe-2", 18) + '</div><span class="side-group-label">MERCADOS</span><h3>Angola</h3><p>Moeda de referência: AOA (Kz)</p><span class="table-status">Por configurar</span></article>',
    '<article class="dash-panel settings-card"><div class="metric-icon">' + icon("globe", 18) + '</div><span class="side-group-label">MERCADOS</span><h3>Portugal</h3><p>Moeda de referência: EUR (€)</p><span class="table-status">Por configurar</span></article>',
    '<article class="dash-panel settings-card"><div class="metric-icon">' + icon("globe", 18) + '</div><span class="side-group-label">MERCADOS</span><h3>Brasil</h3><p>Moeda de referência: BRL (R$)</p><span class="table-status">Por configurar</span></article>',
    '<article class="dash-panel settings-card wide"><span class="side-group-label">INTEGRAÇÕES EXTERNAS</span><h3>Serviços por ligar</h3><div class="integration-row"><span>Email transaccional</span><b>Não configurado</b></div><div class="integration-row"><span>Pagamentos</span><b>Não configurado</b></div><div class="integration-row"><span>WhatsApp Business</span><b>Não configurado</b></div><div class="integration-row"><span>Analytics do website</span><b>Não configurado</b></div></article>',
    '</div>',
    '<p class="module-footnote">' + icon("info", 15) + ' Estas definições são informativas nesta versão. Não existem ainda ligações a fornecedores externos nem configuração editável de impostos e faturação.</p>'
  ].join("");
}

async function renderDashboard(): Promise<void> {
  const epoch = ++pageEpoch;
  if (!getToken()) {
    if (window.location.hash !== "#/login") window.location.hash = "#/login";
    renderLogin();
    return;
  }

  let summary: DashboardSummary | null = null;
  currentRecords = [];
  currentTeam = [];
  currentAudit = [];
  try {
    currentUser = await apiRequest<CurrentUser>("/api/auth/me");
    if (currentUser.role === "client") {
      app!.innerHTML = '<main class="login-screen"><section class="login-card"><h1>Portal de cliente</h1><p>O portal de cliente ainda não foi disponibilizado. Contacta a equipa KORA AI para obteres acompanhamento.</p><button class="button button-primary login-demo" data-action="logout">Terminar sessão</button></section></main>';
      return;
    }
    if (activeModule === "Visão geral" || activeModule === "Analytics") {
      summary = await apiRequest<DashboardSummary>("/api/dashboard/summary");
    } else if (activeModule === "Equipa" && currentUser.role === "ceo") {
      currentTeam = await apiRequest<TeamUser[]>("/api/users");
    } else if (activeModule === "Auditoria" && (currentUser.role === "ceo" || currentUser.role === "admin")) {
      currentAudit = await apiRequest<AuditEntry[]>("/api/audit");
    } else if (resourceByModule[activeModule]) {
      const kind = resourceByModule[activeModule]!;
      currentRecords = await apiRequest<KoraRecord[]>("/api/records?kind=" + encodeURIComponent(kind));
    }
  } catch (error) {
    if (epoch !== pageEpoch) return;
    if (!getToken()) {
      window.location.hash = "#/login";
      renderLogin();
    } else {
      app!.innerHTML = '<main class="login-screen"><section class="login-card"><h1>Não foi possível carregar o painel</h1><p>' + escapeHtml(error instanceof Error ? error.message : "Erro inesperado") + '</p><button class="button button-primary login-demo" data-action="retry">Tentar novamente</button><a class="login-back" href="#/">Voltar ao website</a></section></main>';
      refreshIcons();
    }
    return;
  }

  if (epoch !== pageEpoch || !window.location.hash.startsWith("#/ceo")) return;

  const grouped = ["Workspace", "Gestão", "Administração"];
  const nav = grouped.map((group) => {
    const items = modules.filter((item) => item.group === group && (currentUser?.role === "ceo" || item.name !== "Equipa") && ((currentUser?.role === "ceo" || currentUser?.role === "admin") || (item.name !== "Financeiro" && item.name !== "Auditoria"))).map((item) =>
      '<button class="side-link ' + (activeModule === item.name ? "active" : "") + '" data-module="' + item.name + '">' +
      icon(item.icon, 17) + '<span>' + item.name + '</span></button>'
    ).join("");
    return '<div class="side-group"><span class="side-group-label">' + group + '</span>' + items + '</div>';
  }).join("");

  const overview = activeModule === "Visão geral";
  const analytics = activeModule === "Analytics";
  const team = activeModule === "Equipa";
  const audit = activeModule === "Auditoria";
  const settings = activeModule === "Definições";
  const isFinancial = activeModule === "Financeiro";
  let content = "";

  if (overview && summary) {
    const metric = (label: string, value: number, detail: string, symbol: string) =>
      '<article class="metric-card"><span>' + label + '</span><b>' + value + '</b><small class="metric-neutral">' + detail + '</small><div class="metric-icon">' + icon(symbol, 18) + '</div></article>';
    const recentRows = summary.recent.length ? summary.recent.map((item) =>
      '<tr><td><b>' + escapeHtml(item.name) + '</b><small>' + escapeHtml(item.kind) + '</small></td><td><span class="table-status">' + escapeHtml(item.status) + '</span></td><td>' + escapeHtml(item.updated_at.slice(0, 10)) + '</td><td></td></tr>'
    ).join("") : '<tr><td colspan="4" class="empty-cell">Ainda não existem actividades registadas.</td></tr>';
    content = '<div class="metric-grid">' +
      metric("Leads", summary.counts.leads || 0, "Registos guardados", "target") +
      metric("Clientes", summary.counts.clients || 0, "Registos guardados", "users") +
      metric("Projectos", summary.counts.projects || 0, "Registos guardados", "layers-3") +
      metric("Propostas", summary.counts.proposals || 0, "Registos guardados", "file-text") +
      '</div><div class="dashboard-middle"><section class="dash-panel analytics-panel"><div class="panel-head"><div><h3>Actividade operacional</h3><p>Actualizada a partir da base de dados</p></div>' + icon("database", 18) + '</div><div class="overview-note"><b>' + Object.values(summary.counts).reduce((a, b) => a + b, 0) + '</b><span>registos totais em todos os módulos</span></div><p class="module-footnote">Os indicadores operacionais são reais. Visitas, origem de tráfego e conversões ainda não estão ligados a analytics.</p></section>' +
      '<section class="dash-panel sources-panel"><div class="panel-head"><div><h3>Leads por estado</h3><p>Distribuição dos registos guardados</p></div></div><div class="status-list">' +
      Object.entries(summary.leads_by_status).map(([key, value]) => '<div><span>' + escapeHtml(key) + '</span><b>' + value + '</b></div>').join("") +
      (Object.keys(summary.leads_by_status).length ? "" : '<p class="empty-note">Ainda não existem leads.</p>') +
      '</div></section></div><section class="dash-panel activity-panel"><div class="panel-head"><div><h3>Actividade recente</h3><p>Últimos registos actualizados</p></div></div><div class="table-wrap"><table><thead><tr><th>Registo</th><th>Estado</th><th>Actualizado</th><th></th></tr></thead><tbody>' + recentRows + '</tbody></table></div></section>';
  } else if (analytics && summary) {
    content = '<div class="metric-grid">' +
      '<article class="metric-card"><span>Leads</span><b>' + summary.counts.leads + '</b><small class="metric-neutral">Registos guardados</small></article>' +
      '<article class="metric-card"><span>Clientes</span><b>' + summary.counts.clients + '</b><small class="metric-neutral">Registos guardados</small></article>' +
      '<article class="metric-card"><span>Projectos</span><b>' + summary.counts.projects + '</b><small class="metric-neutral">Registos guardados</small></article>' +
      '<article class="metric-card"><span>Propostas</span><b>' + summary.counts.proposals + '</b><small class="metric-neutral">Registos guardados</small></article></div>' +
      '<section class="dash-panel activity-panel"><div class="panel-head"><div><h3>Analytics de tráfego</h3><p>Estado da integração</p></div><span class="table-status">Não ligado</span></div><p class="integration-explanation">' + escapeHtml(summary.note) + '</p><p class="module-footnote">Não apresentamos gráficos de visitas inventados. Depois de escolher e configurar o fornecedor de analytics, serão ligados eventos para page views, formulários e cliques em contactos.</p></section>';
  } else if (team) {
    const canManageTeam = currentUser?.role === "ceo";
    const rows = teamRows(currentTeam);
    content = canManageTeam
      ? '<div class="module-intro"><div><div class="eyebrow">ADMINISTRAÇÃO / ACESSOS</div><h2>Equipa</h2><p>Contas, funções e estado de acesso.</p></div><button class="button button-primary" data-action="new-user">Adicionar utilizador ' + icon("user-plus", 16) + '</button></div><section class="dash-panel module-panel"><div class="panel-head"><div><h3>Contas da equipa</h3><p>As palavras-passe nunca são apresentadas nesta lista.</p></div></div><div class="table-wrap"><table><thead><tr><th>Utilizador</th><th>Função</th><th>Estado</th><th>Acção</th></tr></thead><tbody>' + rows + '</tbody></table></div></section><p class="module-footnote">' + icon("shield-check", 15) + ' Apenas o CEO pode criar, activar ou desactivar contas da equipa.</p>'
      : '<section class="dash-panel module-panel"><h3>Acesso reservado ao CEO</h3><p class="integration-explanation">A gestão de utilizadores e permissões não está disponível para esta função.</p></section>';
  } else if (audit) {
    const rows = currentAudit.length ? currentAudit.map((entry) =>
      '<tr><td><b>' + escapeHtml(entry.user_name) + '</b><small>' + escapeHtml(entry.created_at.slice(0, 19).replace("T", " ")) + '</small></td><td><span class="table-status">' + escapeHtml(entry.action) + '</span></td><td>' + escapeHtml(entry.entity) + (entry.entity_id ? ' #' + entry.entity_id : '') + '</td><td>' + escapeHtml(JSON.stringify(entry.details || {})) + '</td></tr>'
    ).join("") : '<tr><td colspan="4" class="empty-cell">Ainda não existem eventos de auditoria.</td></tr>';
    content = '<section class="dash-panel module-panel"><div class="panel-head"><div><h3>Histórico de operações</h3><p>Últimos ' + currentAudit.length + ' eventos registados pela API.</p></div></div><div class="table-wrap"><table><thead><tr><th>Utilizador / data</th><th>Acção</th><th>Área</th><th>Detalhes</th></tr></thead><tbody>' + rows + '</tbody></table></div></section><p class="module-footnote">' + icon("shield-check", 15) + ' O histórico é apenas de consulta e está reservado ao CEO e aos administradores.</p>';
  } else if (settings) {
    content = settingsContent();
  } else {
    const canDelete = currentUser?.role === "ceo" || currentUser?.role === "admin";
    const rows = recordRows(currentRecords, canDelete);
    const resource = resourceByModule[activeModule];
    content = '<section class="dash-panel module-panel"><div class="panel-head"><div><h3>Registos de ' + activeModule + '</h3><p>' + currentRecords.length + ' registo(s) guardado(s) na base de dados.</p></div><label class="table-search">' + icon("search", 15) + '<input id="table-search" type="search" placeholder="Pesquisar registos..." /></label></div><div class="table-wrap"><table><thead><tr><th>Nome / detalhe</th><th>Estado</th><th>Prazo / actualização</th><th>Acções</th></tr></thead><tbody id="records-body">' + rows + '</tbody></table></div></section>' +
      '<p class="module-footnote">' + icon("database", 15) + (isFinancial ? "Os lançamentos ficam guardados, mas não processam pagamentos nem substituem facturação fiscal." : "Os dados são persistidos na base de dados local configurada no backend.") + '</p>';
    if (resource && activeModule !== "Financeiro") {
      content = '<div class="module-intro"><div><div class="eyebrow">KORA COMMAND CENTER / ' + activeModule.toUpperCase() + '</div><h2>' + activeModule + '</h2><p>' + getModuleDescription(activeModule) + '</p></div><button class="button button-primary" data-action="new-record">Novo registo ' + icon("plus", 16) + '</button></div>' + content;
    } else if (resource && isFinancial && (currentUser?.role === "ceo" || currentUser?.role === "admin")) {
      content = '<div class="module-intro"><div><div class="eyebrow">KORA COMMAND CENTER / FINANCEIRO</div><h2>Financeiro</h2><p>Registo de movimentos e valores por moeda.</p></div><button class="button button-primary" data-action="new-record">Novo lançamento ' + icon("plus", 16) + '</button></div>' + content;
    } else {
      content = '<div class="module-intro"><div><div class="eyebrow">KORA COMMAND CENTER / ' + activeModule.toUpperCase() + '</div><h2>' + activeModule + '</h2><p>' + getModuleDescription(activeModule) + '</p></div></div>' + content;
    }
  }

  const title = activeModule === "Visão geral" ? "Visão geral" : activeModule;
  const date = new Intl.DateTimeFormat("pt-PT", { dateStyle: "full" }).format(new Date());
  app!.innerHTML = [
    '<div class="dashboard-shell ' + (sidebarOpen ? "sidebar-visible" : "") + '">',
    '<aside class="sidebar"><a class="brand sidebar-brand" href="#/"><span class="brand-mark">K</span><span class="brand-name">KORA<span>AI</span></span></a>',
    '<div class="workspace-switch"><span class="workspace-avatar">K</span><div><b>KORA AI</b><small>Workspace principal</small></div>' + icon("chevrons-up-down", 14) + '</div>',
    '<nav class="sidebar-nav" aria-label="Menu administrativo">' + nav + '</nav>',
    '<div class="sidebar-bottom"><div class="support-card"><span>' + icon("life-buoy", 17) + '</span><b>Centro de suporte</b><small>Contacto a configurar</small></div>',
    '<button class="side-link" data-action="logout">' + icon("log-out", 17) + '<span>Terminar sessão</span></button>',
    '<div class="user-profile"><span class="user-avatar">' + escapeHtml((currentUser?.display_name || "K").slice(0, 1).toUpperCase()) + '</span><div><b>' + escapeHtml(currentUser?.display_name || "Utilizador") + '</b><small>' + escapeHtml(currentUser?.role || "") + '</small></div>' + icon("more-horizontal", 18) + '</div></div></aside>',
    '<main class="dashboard-main"><header class="dash-topbar"><button class="mobile-menu dash-menu" data-action="sidebar">' + icon("menu", 20) + '</button><div class="breadcrumb">KORA AI <span>/</span> <b>' + escapeHtml(title) + '</b></div><div class="top-actions"><span class="demo-pill live-pill">DADOS REAIS DA BASE DE DADOS</span><button class="icon-button" aria-label="Sessão protegida">' + icon("shield-check", 18) + '</button><span class="top-avatar">' + escapeHtml((currentUser?.display_name || "K").slice(0, 1).toUpperCase()) + '</span></div></header>',
    '<div class="dashboard-content"><div class="page-title-row"><div><span class="page-kicker">' + escapeHtml(date.toUpperCase()) + '</span><h1>' + escapeHtml(title) + '</h1><p>' + escapeHtml(overview ? "Indicadores calculados a partir dos registos guardados." : getModuleDescription(activeModule)) + '</p></div></div>' + content + '</div></main>',
    '<dialog id="record-dialog" class="record-dialog"><form id="record-form"><input type="hidden" name="record_id" /><div class="dialog-head"><div><span class="eyebrow">KORA AI / REGISTO</span><h2 id="record-dialog-title">Novo registo</h2></div><button type="button" class="dialog-close" data-action="close-record" aria-label="Fechar">×</button></div>',
    '<div class="dialog-grid"><label>Nome<input name="name" required minlength="2" maxlength="180" /></label><label>Estado<select name="status"><option>Novo</option><option>Em contacto</option><option>Em curso</option><option>Em revisão</option><option>Concluído</option><option>Activo</option><option>Inactivo</option><option>Enviada</option><option>Aprovada</option><option>Cancelada</option></select></label>',
    '<label class="full-field">Descrição<textarea name="description" rows="3"></textarea></label><label>Email<input name="email" type="email" /></label><label>Telefone<input name="phone" /></label><label>País<input name="country" /></label><label>Moeda<select name="currency"><option value="">—</option><option value="AOA">AOA · Kz</option><option value="EUR">EUR · €</option><option value="BRL">BRL · R$</option></select></label><label>Valor<input name="amount" type="number" min="0" step="0.01" /></label><label>Prazo<input name="due_date" type="date" /></label></div>',
    '<p class="form-feedback" id="record-feedback" role="alert"></p><div class="dialog-actions"><button type="button" class="button button-outline" data-action="close-record">Cancelar</button><button class="button button-primary" type="submit">Guardar registo ' + icon("check", 16) + '</button></div></form></dialog>',
    '<dialog id="team-dialog" class="record-dialog"><form id="team-form"><div class="dialog-head"><div><span class="eyebrow">KORA AI / EQUIPA</span><h2>Adicionar utilizador</h2></div><button type="button" class="dialog-close" data-action="close-team">×</button></div><div class="dialog-grid"><label>Nome<input name="display_name" required minlength="2" /></label><label>Email<input name="email" type="email" required /></label><label>Função<select name="role"><option value="admin">Administrador</option><option value="collaborator">Colaborador</option><option value="client">Cliente</option></select></label><label>Palavra-passe temporária<input name="password" type="password" minlength="14" required /></label></div><p class="form-feedback" id="team-feedback" role="alert">A palavra-passe deve ter pelo menos 14 caracteres. Partilha-a de forma segura e pede ao utilizador para a alterar após a primeira entrada.</p><div class="dialog-actions"><button type="button" class="button button-outline" data-action="close-team">Cancelar</button><button class="button button-primary" type="submit">Criar conta ' + icon("user-plus", 16) + '</button></div></form></dialog>',
    '<div class="toast" id="toast" role="status"></div></div>'
  ].join("");
  refreshIcons();
}

function openRecordDialog(record?: KoraRecord): void {
  const dialog = document.getElementById("record-dialog") as HTMLDialogElement | null;
  const form = document.getElementById("record-form") as HTMLFormElement | null;
  if (!dialog || !form) return;
  form.reset();
  const set = (name: string, value: string) => {
    const field = form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
    if (field) field.value = value;
  };
  set("record_id", record ? String(record.id) : "");
  set("name", record?.name || "");
  set("description", record?.description || "");
  set("status", record?.status || "Novo");
  set("email", record?.email || "");
  set("phone", record?.phone || "");
  set("country", record?.country || "");
  set("currency", record?.currency || "");
  set("amount", record?.amount === null || record?.amount === undefined ? "" : String(record.amount));
  set("due_date", record?.due_date || "");
  const heading = document.getElementById("record-dialog-title");
  if (heading) heading.textContent = record ? "Editar registo" : "Novo registo";
  dialog.showModal();
}

function openTeamDialog(): void {
  const dialog = document.getElementById("team-dialog") as HTMLDialogElement | null;
  (document.getElementById("team-form") as HTMLFormElement | null)?.reset();
  dialog?.showModal();
}

function getModuleDescription(module: ModuleName): string {
  const descriptions: Record<ModuleName, string> = {
    "Visão geral": "Resumo da operação.",
    Leads: "Acompanha oportunidades, origem, qualificação e histórico de contacto.",
    Clientes: "Centraliza os dados e a relação com cada cliente.",
    Projetos: "Organiza entregáveis, responsáveis, prazos e estado de execução.",
    Propostas: "Prepara propostas comerciais, escopo, condições e documentos.",
    Agenda: "Gere reuniões e compromissos da equipa KORA AI.",
    Serviços: "Configura o catálogo de serviços e respetivas descrições.",
    Portefólio: "Publica projetos reais e conceitos claramente identificados como demonstração.",
    Manutenção: "Acompanha planos ativos, pedidos técnicos e intervenções.",
    Financeiro: "Organiza registos financeiros; não substitui um sistema fiscal certificado.",
    Analytics: "Analisa tráfego, conversões e interação com os canais digitais.",
    Equipa: "Gere membros, funções e permissões de acesso.",
    Definições: "Configura mercados, preferências e futuras integrações.",
    Auditoria: "Consulta o histórico de autenticações e operações administrativas."
  };
  return descriptions[module];
}

function showToast(message: string): void {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("visible");
  window.setTimeout(() => toast.classList.remove("visible"), 3200);
}

function render(): void {
  const route = window.location.hash;
  if (route.startsWith("#/ceo")) void renderDashboard();
  else if (route.startsWith("#/login")) renderLogin();
  else { pageEpoch += 1; renderHome(); }
}

app.addEventListener("click", (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const scrollLink = target.closest<HTMLElement>("[data-scroll]");
  if (scrollLink) {
    event.preventDefault();
    const id = scrollLink.dataset.scroll;
    if (window.location.hash !== "#/") window.location.hash = "#/";
    window.setTimeout(() => { if (id) scrollToSection(id); }, 80);
    return;
  }

  const moduleButton = target.closest<HTMLButtonElement>("[data-module]");
  if (moduleButton) {
    activeModule = moduleButton.dataset.module as ModuleName;
    sidebarOpen = false;
    void renderDashboard();
    return;
  }

  const editButton = target.closest<HTMLButtonElement>("[data-record-edit]");
  if (editButton) {
    const record = currentRecords.find((item) => item.id === Number(editButton.dataset.recordEdit));
    if (record) openRecordDialog(record);
    return;
  }

  const deleteButton = target.closest<HTMLButtonElement>("[data-record-delete]");
  if (deleteButton) {
    const id = Number(deleteButton.dataset.recordDelete);
    if (!window.confirm("Apagar este registo? Esta operação não pode ser anulada.")) return;
    const record = currentRecords.find((item) => item.id === id);
    if (record) {
      void apiRequest<void>("/api/records/" + id, { method: "DELETE" })
        .then(() => { showToast("Registo apagado."); return renderDashboard(); })
        .catch((error: unknown) => showToast(error instanceof Error ? error.message : "Não foi possível apagar."));
    }
    return;
  }

  const toggleUser = target.closest<HTMLButtonElement>("[data-user-toggle]");
  if (toggleUser) {
    const id = Number(toggleUser.dataset.userToggle);
    const isActive = toggleUser.dataset.active === "true";
    void apiRequest<TeamUser>("/api/users/" + id, {
      method: "PATCH",
      body: JSON.stringify({ is_active: !isActive })
    }).then(() => renderDashboard())
      .catch((error: unknown) => showToast(error instanceof Error ? error.message : "Não foi possível alterar a conta."));
    return;
  }

  const actionButton = target.closest<HTMLButtonElement>("[data-action]");
  if (!actionButton) return;
  const action = actionButton.dataset.action;
  if (action === "logout") { clearToken(); currentUser = null; window.location.hash = "#/"; }
  if (action === "sidebar") { sidebarOpen = !sidebarOpen; document.querySelector(".dashboard-shell")?.classList.toggle("sidebar-visible", sidebarOpen); }
  if (action === "menu") document.querySelector(".main-nav")?.classList.toggle("nav-open");
  if (action === "new-record") openRecordDialog();
  if (action === "new-user") openTeamDialog();
  if (action === "close-record") (document.getElementById("record-dialog") as HTMLDialogElement | null)?.close();
  if (action === "close-team") (document.getElementById("team-dialog") as HTMLDialogElement | null)?.close();
  if (action === "retry") void renderDashboard();
});

app.addEventListener("submit", (event: SubmitEvent) => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;

  if (form.id === "login-form") {
    event.preventDefault();
    const feedback = document.getElementById("login-feedback");
    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (button) button.disabled = true;
    const formData = new FormData(form);
    clearToken();
    void apiRequest<{ access_token: string }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: String(formData.get("email") || ""),
        password: String(formData.get("password") || "")
      })
    }).then((result) => {
      setToken(result.access_token);
      window.location.hash = "#/ceo";
    }).catch((error: unknown) => {
      if (feedback) feedback.textContent = error instanceof Error ? error.message : "Não foi possível iniciar sessão.";
      if (button) button.disabled = false;
    });
    return;
  }

  if (form.id === "record-form") {
    event.preventDefault();
    const formData = new FormData(form);
    const id = String(formData.get("record_id") || "");
    const amountValue = String(formData.get("amount") || "");
    const payload: RecordPayload = {
      name: String(formData.get("name") || "").trim(),
      description: String(formData.get("description") || "").trim() || null,
      status: String(formData.get("status") || "Novo"),
      email: String(formData.get("email") || "").trim() || null,
      phone: String(formData.get("phone") || "").trim() || null,
      country: String(formData.get("country") || "").trim() || null,
      currency: String(formData.get("currency") || "") || null,
      amount: amountValue ? Number(amountValue) : null,
      due_date: String(formData.get("due_date") || "") || null
    };
    const kind = resourceByModule[activeModule];
    if (!kind) return;
    const feedback = document.getElementById("record-feedback");
    const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (submit) submit.disabled = true;
    const path = id ? "/api/records/" + id : "/api/records?kind=" + encodeURIComponent(kind);
    void apiRequest<KoraRecord>(path, {
      method: id ? "PATCH" : "POST",
      body: JSON.stringify(payload)
    }).then(() => {
      (document.getElementById("record-dialog") as HTMLDialogElement | null)?.close();
      showToast(id ? "Registo actualizado." : "Registo criado.");
      return renderDashboard();
    }).catch((error: unknown) => {
      if (feedback) feedback.textContent = error instanceof Error ? error.message : "Não foi possível guardar o registo.";
    }).finally(() => { if (submit) submit.disabled = false; });
    return;
  }

  if (form.id === "team-form") {
    event.preventDefault();
    const data = new FormData(form);
    const feedback = document.getElementById("team-feedback");
    const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (submit) submit.disabled = true;
    void apiRequest<TeamUser>("/api/users", {
      method: "POST",
      body: JSON.stringify({
        display_name: String(data.get("display_name") || "").trim(),
        email: String(data.get("email") || "").trim(),
        role: String(data.get("role") || "collaborator"),
        password: String(data.get("password") || "")
      })
    }).then(() => {
      (document.getElementById("team-dialog") as HTMLDialogElement | null)?.close();
      showToast("Conta da equipa criada.");
      return renderDashboard();
    }).catch((error: unknown) => {
      if (feedback) feedback.textContent = error instanceof Error ? error.message : "Não foi possível criar a conta.";
    }).finally(() => { if (submit) submit.disabled = false; });
    return;
  }

  if (form.id === "contact-form") {
    event.preventDefault();
    const formData = new FormData(form);
    const feedback = document.getElementById("form-feedback");
    const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (submit) submit.disabled = true;
    void apiRequest<{ id: number; message: string }>("/api/public/inquiries", {
      method: "POST",
      body: JSON.stringify({
        name: String(formData.get("name") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        country: String(formData.get("market") || "").trim(),
        message: String(formData.get("message") || "").trim(),
        consent: formData.get("consent") === "true",
        website: String(formData.get("website") || "")
      })
    }).then((result) => {
      form.reset();
      if (feedback) feedback.textContent = result.id ? "Pedido recebido e registado. A equipa poderá responder quando o canal de email estiver configurado." : "Pedido recebido.";
    }).catch((error: unknown) => {
      if (feedback) feedback.textContent = error instanceof Error ? error.message : "Não foi possível enviar o pedido.";
    }).finally(() => { if (submit) submit.disabled = false; });
  }
});

app.addEventListener("input", (event: Event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || target.id !== "table-search") return;
  const query = target.value.toLocaleLowerCase("pt");
  document.querySelectorAll<HTMLTableRowElement>("#records-body tr").forEach((row) => {
    row.hidden = !row.textContent?.toLocaleLowerCase("pt").includes(query);
  });
});

window.addEventListener("hashchange", render);
render();
