import { createIcons, icons } from "lucide";
import { demoRecords, modules } from "./data";
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

        <section class="section-wrap contact-section" id="contacto"><div class="contact-panel"><div class="contact-copy"><div class="eyebrow">O PRÓXIMO PASSO</div><h2>Vamos construir algo<br><em>com impacto.</em></h2><p>Conta-nos o que tens em mente. A KORA AI ajuda-te a transformar a ideia numa solução digital concreta.</p><div class="contact-meta"><span>${icon("globe-2", 16)} Angola · Portugal · Brasil</span><span>${icon("mail", 16)} Contacto por configurar</span></div></div><form id="contact-form" class="contact-form"><label>Nome<input name="name" autocomplete="name" placeholder="O teu nome" required minlength="2" /></label><label>Email<input name="email" type="email" autocomplete="email" placeholder="nome@empresa.com" required /></label><label>Mercado<select name="market" required><option value="">Selecionar mercado</option><option>Angola</option><option>Portugal</option><option>Brasil</option><option>Outro</option></select></label><label>Como podemos ajudar?<textarea name="message" rows="3" placeholder="Descreve brevemente o teu projeto..." required minlength="10"></textarea></label><button class="button button-primary form-submit" type="submit">Preparar pedido ${icon("arrow-up-right", 17)}</button><p class="form-feedback" id="form-feedback" role="status">Demonstração: o envio de emails ainda não está ligado.</p></form></div></section>
      </main>
      <footer class="site-footer"><div class="section-wrap footer-inner"><a class="brand" href="#/"><span class="brand-mark">K</span><span class="brand-name">KORA<span>AI</span></span></a><span>ESTRATÉGIA · DESIGN · TECNOLOGIA</span><a href="#/login" class="footer-team">Área da equipa ${icon("arrow-up-right", 13)}</a><small>© 2026 KORA AI. Todos os direitos reservados.</small></div></footer>
    </div>`;
  refreshIcons();
}

function renderLogin(): void {
  app!.innerHTML = `
    <main class="login-screen">
      <a class="brand login-brand" href="#/"><span class="brand-mark">K</span><span class="brand-name">KORA<span>AI</span></span></a>
      <section class="login-card">
        <div class="eyebrow">KORA COMMAND CENTER</div>
        <h1>Área de acesso</h1>
        <p>O acesso de equipa será ligado a um serviço de autenticação seguro antes da entrada em produção.</p>
        <div class="login-lock">${icon("shield-check", 25)}</div>
        <div class="login-notice"><b>Autenticação ainda não configurada</b><span>Este repositório contém a base visual. Não existem contas, palavras-passe ou sessões reais nesta versão.</span></div>
        <button class="button button-primary login-demo" data-action="demo-dashboard">Abrir painel de demonstração ${icon("arrow-up-right", 16)}</button>
        <a class="login-back" href="#/">Voltar ao website</a>
      </section>
      <span class="login-foot">ACESSO RESTRITO · KORA AI</span>
    </main>`;
  refreshIcons();
}

function renderDashboard(): void {
  const grouped = ["Workspace", "Gestão", "Administração"];
  const nav = grouped.map((group) => {
    const items = modules.filter((item) => item.group === group).map((item) =>
      '<button class="side-link ' + (activeModule === item.name ? "active" : "") + '" data-module="' + item.name + '">' +
      icon(item.icon, 17) + '<span>' + item.name + '</span>' + (item.name === "Leads" ? '<small>3</small>' : '') + '</button>'
    ).join("");
    return '<div class="side-group"><span class="side-group-label">' + group + '</span>' + items + '</div>';
  }).join("");

  const records = demoRecords[activeModule];
  const tableRows = records.map((record) =>
    '<tr><td><b>' + record.name + '</b><small>' + record.detail + '</small></td><td><span class="table-status">' + record.status + '</span></td><td>' + record.date + '</td><td><button class="row-more" aria-label="Mais opções">···</button></td></tr>'
  ).join("");

  const overview = activeModule === "Visão geral";
  const content = overview ? `
    <div class="metric-grid">
      <article class="metric-card"><span>Visitas ao website</span><b>1.284</b><small class="metric-up">${icon("trending-up", 13)} +12,8% <i>vs. período anterior</i></small><div class="metric-icon">${icon("eye", 18)}</div></article>
      <article class="metric-card"><span>Pedidos recebidos</span><b>24</b><small class="metric-up">${icon("trending-up", 13)} +8,2% <i>vs. período anterior</i></small><div class="metric-icon">${icon("inbox", 18)}</div></article>
      <article class="metric-card"><span>Projetos ativos</span><b>06</b><small class="metric-neutral">Em diferentes fases</small><div class="metric-icon">${icon("layers-3", 18)}</div></article>
      <article class="metric-card"><span>Clientes</span><b>12</b><small class="metric-neutral">Registos de demonstração</small><div class="metric-icon">${icon("users", 18)}</div></article>
    </div>
    <div class="dashboard-middle">
      <section class="dash-panel analytics-panel"><div class="panel-head"><div><h3>Atividade do website</h3><p>Visitas ilustrativas · últimos 7 dias</p></div><button class="period-select">7 dias ${icon("chevron-down", 14)}</button></div><div class="chart-legend"><span><i></i> Visitas</span><b>1.284</b></div><div class="line-chart"><div class="chart-y"><span>400</span><span>300</span><span>200</span><span>100</span><span>0</span></div><svg viewBox="0 0 620 190" preserveAspectRatio="none" role="img" aria-label="Gráfico ilustrativo de visitas"><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#4f8cff" stop-opacity=".25"/><stop offset="100%" stop-color="#4f8cff" stop-opacity="0"/></linearGradient></defs><path d="M0 150 C35 140 45 120 86 128 S145 98 175 112 S230 76 265 92 S330 95 350 72 S420 86 445 55 S510 62 535 39 S585 48 620 18 L620 190 L0 190Z" fill="url(#chartFill)"/><path d="M0 150 C35 140 45 120 86 128 S145 98 175 112 S230 76 265 92 S330 95 350 72 S420 86 445 55 S510 62 535 39 S585 48 620 18" fill="none" stroke="#5b91ff" stroke-width="2.5" vector-effect="non-scaling-stroke"/></svg></div><div class="chart-x"><span>12 Nov</span><span>13 Nov</span><span>14 Nov</span><span>15 Nov</span><span>16 Nov</span><span>17 Nov</span><span>18 Nov</span></div></section>
      <section class="dash-panel sources-panel"><div class="panel-head"><div><h3>Origem dos pedidos</h3><p>Distribuição ilustrativa</p></div>${icon("more-horizontal", 19)}</div><div class="source-donut"><div><b>24</b><span>pedidos</span></div></div><div class="source-list"><div><i class="source-blue"></i><span>Website</span><b>58%</b></div><div><i class="source-purple"></i><span>WhatsApp</span><b>25%</b></div><div><i class="source-cyan"></i><span>Referência</span><b>17%</b></div></div></section>
    </div>
    <section class="dash-panel activity-panel"><div class="panel-head"><div><h3>Atividade recente</h3><p>Registos fictícios para demonstração da interface</p></div><button class="quiet-button" data-module="Leads">Ver leads ${icon("arrow-up-right", 14)}</button></div><div class="table-wrap"><table><thead><tr><th>Registo</th><th>Estado</th><th>Data</th><th></th></tr></thead><tbody>${tableRows}</tbody></table></div></section>
  ` : `
    <section class="module-intro"><div><div class="eyebrow">KORA COMMAND CENTER / ${activeModule.toUpperCase()}</div><h2>${activeModule}</h2><p>${getModuleDescription(activeModule)}</p></div><button class="button button-primary" data-action="demo-action">Novo registo ${icon("plus", 16)}</button></section>
    <section class="dash-panel module-panel"><div class="panel-head"><div><h3>Registos</h3><p>Conteúdo ilustrativo — ainda não ligado a uma base de dados.</p></div><label class="table-search">${icon("search", 15)}<input id="table-search" type="search" placeholder="Pesquisar registos..." /></label></div><div class="table-wrap"><table><thead><tr><th>Nome / detalhe</th><th>Estado</th><th>Data</th><th></th></tr></thead><tbody id="records-body">${tableRows}</tbody></table></div></section>
    <div class="module-footnote">${icon("info", 15)} Os registos apresentados são dados de demonstração. A persistência, permissões e operações serão ligadas ao backend nas próximas fases.</div>
  `;

  app!.innerHTML = `
    <div class="dashboard-shell ${sidebarOpen ? "sidebar-visible" : ""}">
      <aside class="sidebar">
        <a class="brand sidebar-brand" href="#/"><span class="brand-mark">K</span><span class="brand-name">KORA<span>AI</span></span></a>
        <div class="workspace-switch"><span class="workspace-avatar">K</span><div><b>KORA AI</b><small>Workspace principal</small></div>${icon("chevrons-up-down", 14)}</div>
        <nav class="sidebar-nav" aria-label="Menu administrativo">${nav}</nav>
        <div class="sidebar-bottom"><div class="support-card"><span>${icon("life-buoy", 17)}</span><b>Precisas de apoio?</b><small>Centro de suporte</small></div><button class="side-link" data-action="logout">${icon("log-out", 17)}<span>Voltar ao website</span></button><div class="user-profile"><span class="user-avatar">K</span><div><b>Administrador</b><small>Perfil de demonstração</small></div>${icon("more-horizontal", 18)}</div></div>
      </aside>
      <main class="dashboard-main">
        <header class="dash-topbar"><button class="mobile-menu dash-menu" data-action="sidebar">${icon("menu", 20)}</button><div class="breadcrumb">KORA AI <span>/</span> <b>${activeModule}</b></div><div class="top-actions"><span class="demo-pill">MODO DEMONSTRAÇÃO</span><button class="icon-button" aria-label="Notificações">${icon("bell", 18)}<i></i></button><span class="top-avatar">K</span></div></header>
        <div class="dashboard-content"><div class="page-title-row"><div><span class="page-kicker">TERÇA-FEIRA, 18 DE NOVEMBRO DE 2026</span><h1>${overview ? "Visão geral" : activeModule}</h1><p>${overview ? "Acompanha a atividade da KORA AI num só lugar." : "Gere e acompanha esta área da operação."}</p></div><button class="date-filter">${icon("calendar-days", 15)} Últimos 7 dias ${icon("chevron-down", 14)}</button></div>${content}</div>
      </main>
      <div class="toast" id="toast" role="status"></div>
    </div>`;
  refreshIcons();
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
    Definições: "Configura mercados, preferências e futuras integrações."
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
  if (route.startsWith("#/ceo")) renderDashboard();
  else if (route.startsWith("#/login")) renderLogin();
  else renderHome();
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
    renderDashboard();
    return;
  }

  const actionButton = target.closest<HTMLButtonElement>("[data-action]");
  if (!actionButton) return;
  const action = actionButton.dataset.action;
  if (action === "demo-dashboard") window.location.hash = "#/ceo";
  if (action === "logout") window.location.hash = "#/";
  if (action === "sidebar") { sidebarOpen = !sidebarOpen; document.querySelector(".dashboard-shell")?.classList.toggle("sidebar-visible", sidebarOpen); }
  if (action === "menu") document.querySelector(".main-nav")?.classList.toggle("nav-open");
  if (action === "demo-action") showToast("Modo de demonstração: esta operação será ligada ao backend.");
});

app.addEventListener("submit", (event: SubmitEvent) => {
  const form = event.target;
  if (form instanceof HTMLFormElement && form.id === "contact-form") {
    event.preventDefault();
    const feedback = document.getElementById("form-feedback");
    if (feedback) feedback.textContent = "Formulário validado nesta demonstração. O pedido não foi enviado nem guardado: falta ligar o serviço de email e a API.";
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
