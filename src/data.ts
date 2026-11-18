import type { DemoRecord, ModuleName } from "./types";

export const modules: Array<{ name: ModuleName; icon: string; group: string }> = [
  { name: "Visão geral", icon: "layout-dashboard", group: "Workspace" },
  { name: "Leads", icon: "target", group: "Workspace" },
  { name: "Clientes", icon: "users", group: "Workspace" },
  { name: "Projetos", icon: "layers-3", group: "Workspace" },
  { name: "Propostas", icon: "file-text", group: "Workspace" },
  { name: "Agenda", icon: "calendar-days", group: "Workspace" },
  { name: "Serviços", icon: "briefcase-business", group: "Gestão" },
  { name: "Portefólio", icon: "gallery-horizontal", group: "Gestão" },
  { name: "Manutenção", icon: "wrench", group: "Gestão" },
  { name: "Financeiro", icon: "wallet", group: "Gestão" },
  { name: "Analytics", icon: "chart-no-axes-combined", group: "Gestão" },
  { name: "Equipa", icon: "user-round-cog", group: "Administração" },
  { name: "Auditoria", icon: "clipboard-list", group: "Administração" },
  { name: "Definições", icon: "settings-2", group: "Administração" }
];

export const demoRecords: Record<ModuleName, DemoRecord[]> = {
  "Visão geral": [
    { name: "Website institucional", detail: "Projeto de demonstração", status: "Em curso", date: "18 Nov 2026" },
    { name: "Pedido de proposta", detail: "Lead demonstrativa", status: "Novo", date: "17 Nov 2026" },
    { name: "Loja digital", detail: "Projeto de demonstração", status: "Em revisão", date: "15 Nov 2026" }
  ],
  Leads: [
    { name: "Atelier Norte", detail: "Website institucional · Portugal", status: "Novo", date: "18 Nov 2026" },
    { name: "Casa Amora", detail: "Loja digital · Brasil", status: "Em contacto", date: "17 Nov 2026" },
    { name: "Mboa Studio", detail: "Identidade digital · Angola", status: "Qualificado", date: "15 Nov 2026" }
  ],
  Clientes: [
    { name: "Atelier Norte", detail: "Portugal · Cliente de demonstração", status: "Ativo", date: "18 Nov 2026" },
    { name: "Casa Amora", detail: "Brasil · Cliente de demonstração", status: "Em integração", date: "17 Nov 2026" }
  ],
  Projetos: [
    { name: "Website Atelier Norte", detail: "Website · START", status: "Em curso", date: "18 Nov 2026" },
    { name: "Experiência Casa Amora", detail: "E-commerce · CUSTOM", status: "Em revisão", date: "15 Nov 2026" }
  ],
  Propostas: [
    { name: "PR-2026-004", detail: "Website institucional", status: "Rascunho", date: "18 Nov 2026" },
    { name: "PR-2026-003", detail: "Loja online", status: "Enviada", date: "16 Nov 2026" }
  ],
  Agenda: [
    { name: "Reunião de descoberta", detail: "Evento de demonstração · 10:00", status: "Agendada", date: "20 Nov 2026" },
    { name: "Revisão de projeto", detail: "Evento de demonstração · 15:30", status: "Por confirmar", date: "21 Nov 2026" }
  ],
  Serviços: [
    { name: "Websites", detail: "Design e desenvolvimento", status: "Publicado", date: "—" },
    { name: "Automação e IA", detail: "Soluções digitais", status: "Em preparação", date: "—" }
  ],
  Portefólio: [
    { name: "Atelier Norte", detail: "Conceito · Website institucional", status: "Demonstração", date: "—" },
    { name: "Casa Amora", detail: "Conceito · Loja online", status: "Demonstração", date: "—" }
  ],
  Manutenção: [
    { name: "Plano de suporte", detail: "Registo de demonstração", status: "Ativo", date: "30 Nov 2026" }
  ],
  Financeiro: [
    { name: "Fatura demonstrativa", detail: "Sem valor contabilístico", status: "Rascunho", date: "18 Nov 2026" }
  ],
  Analytics: [
    { name: "Tráfego do website", detail: "Métricas ilustrativas", status: "Demonstração", date: "Últimos 30 dias" }
  ],
  Equipa: [
    { name: "Proprietário", detail: "Perfil de demonstração", status: "Administrador", date: "—" },
    { name: "Colaborador", detail: "Perfil de demonstração", status: "Pendente", date: "—" }
  ],
  Definições: [
    { name: "Mercados", detail: "Portugal · Brasil · Angola", status: "Por configurar", date: "—" },
    { name: "Integrações", detail: "Email · Analytics · Pagamentos", status: "Não ligadas", date: "—" }
  ]
};
