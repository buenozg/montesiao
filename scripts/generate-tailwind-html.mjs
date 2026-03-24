import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'tailwind-html');

const siteConfig = {
  name: 'Monte Sião',
  legalName: 'Monte Sião Holding',
  description:
    'Holding com visão integrada e atuação multissetorial, conectando governança, operação e sustentação de serviços essenciais.',
  email: 'relacionamento@montesiao.com.br',
  phone: '+55 (11) 4000-2407',
  address: 'São Paulo, SP · Brasil',
};

const navigation = [
  { href: '/index.html', label: 'Home' },
  { href: '/sobre.html', label: 'Sobre' },
  { href: '/solucoes/index.html', label: 'Soluções' },
  { href: '/contato.html', label: 'Contato' },
];

const homeHero = {
  eyebrow: 'Holding multissetorial com governança integrada',
  title:
    'Monte Sião conecta competências estratégicas para sustentar operações críticas com escala, continuidade e credibilidade.',
  description:
    'Com atuação coordenada em saúde, tecnologia, infraestrutura, finanças e logística, a Monte Sião estrutura operações de ponta a ponta com visão 360°, compliance e excelência operacional.',
};

const values = [
  {
    title: 'Missão',
    description:
      'Integrar competências e sustentar operações essenciais com excelência, continuidade e inteligência de gestão.',
  },
  {
    title: 'Visão',
    description:
      'Ser referência em integração multissetorial, construindo um ecossistema sólido, escalável e reconhecido por confiança institucional.',
  },
  {
    title: 'Valores',
    description:
      'Responsabilidade, governança, excelência operacional, ética, inovação e compromisso com resultados sustentáveis.',
  },
];

const metrics = [
  { value: '10', label: 'soluções integradas' },
  { value: '360°', label: 'cobertura operacional' },
  { value: '24/7', label: 'operação contínua' },
  { value: '5', label: 'segmentos estratégicos' },
];

const segments = [
  {
    title: 'Saúde',
    description:
      'Serviços médicos, telemedicina, benefícios em saúde, diagnósticos e sustentação assistencial com visão contínua.',
  },
  {
    title: 'Tecnologia',
    description:
      'Infraestrutura tecnológica, ERP, consultoria, integração sistêmica e continuidade de ambientes críticos.',
  },
  {
    title: 'Infraestrutura',
    description:
      'Manutenção predial, higienização, equipamentos biomédicos e suporte técnico para ambientes de alta exigência.',
  },
  {
    title: 'Finanças',
    description:
      'Soluções financeiras com abordagem ágil, inteligente e aderente a contextos operacionais diversos.',
  },
  {
    title: 'Logística',
    description:
      'Locação, mobilidade corporativa e suporte logístico com eficiência, previsibilidade e disponibilidade contínua.',
  },
];

const differentiators = [
  {
    title: 'Governança unificada',
    description:
      'Modelo institucional que padroniza decisões, desempenho, compliance e expansão com leitura consolidada do grupo.',
  },
  {
    title: 'Escalabilidade operacional',
    description:
      'Estrutura pensada para crescer com segurança, adaptando-se a demandas regionais, setoriais e de volume.',
  },
  {
    title: 'Operação contínua',
    description:
      'Presença 24/7 em frentes críticas, com integração entre tecnologia, pessoas, processos e suporte técnico.',
  },
  {
    title: 'Compliance total',
    description:
      'Rastreabilidade, rigor regulatório e cultura de conformidade apoiam relações institucionais mais sólidas.',
  },
];

const aboutHighlights = [
  'Visão integrada para decisões mais consistentes',
  'Sinergia entre frentes operacionais e estratégicas',
  'Padronização de governança e indicadores',
  'Capacidade de expansão com base sustentável',
];

const operatingModel = [
  {
    title: 'Direcionamento estratégico',
    description:
      'Definição de prioridades, leitura consolidada de performance e governança de portfólio para crescimento sustentável.',
  },
  {
    title: 'Integração de competências',
    description:
      'Especialidades complementares operam de forma coordenada, ampliando eficiência e reduzindo fricção entre áreas.',
  },
  {
    title: 'Execução contínua',
    description:
      'Capacidade de resposta contínua, suporte técnico e operação assistida para frentes críticas e essenciais.',
  },
];

const contactCards = [
  {
    title: 'Relações institucionais',
    description: 'Canal para apresentações corporativas, novos projetos e frentes de relacionamento estratégico.',
    value: 'relacionamento@montesiao.com.br',
  },
  {
    title: 'Comercial e parcerias',
    description: 'Converse sobre integrações, contratação de soluções e iniciativas em expansão.',
    value: '+55 (11) 4000-2407',
  },
  {
    title: 'Base corporativa',
    description: 'Atendimento institucional com atuação nacional e coordenação central em São Paulo.',
    value: 'São Paulo, SP · Brasil',
  },
];

const segmentOrder = ['Saude', 'Tecnologia', 'Infraestrutura', 'Financas', 'Logistica'];
const segmentLabels = {
  Saude: 'Saúde',
  Tecnologia: 'Tecnologia',
  Infraestrutura: 'Infraestrutura',
  Financas: 'Finanças',
  Logistica: 'Logística',
};
const segmentDescriptions = {
  Saude: 'Soluções em assistência, operação clínica, telemedicina, benefícios e diagnósticos.',
  Tecnologia: 'Frentes de infraestrutura tecnológica, ERP, consultoria e continuidade sistêmica.',
  Infraestrutura: 'Equipamentos, manutenção técnica, sustentação predial e higienização.',
  Financas: 'Soluções financeiras para ampliar fôlego, integração e inteligência transacional.',
  Logistica: 'Mobilidade corporativa, locação e suporte operacional com alta disponibilidade.',
};

function esc(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function mdBodyToHtml(body) {
  return body
    .trim()
    .split(/\n\s*\n/g)
    .map((p) => `<p class="mt-4 text-base leading-8 text-slate-600">${esc(p.trim())}</p>`)
    .join('\n');
}

function nav(activePath) {
  return navigation
    .map((item) => {
      const active = activePath === item.href;
      return `<a href="${item.href}" class="rounded-full px-4 py-2 text-sm font-medium transition ${
        active ? 'bg-slate-100 text-primary' : 'text-slate-600 hover:bg-slate-100 hover:text-primary'
      }">${item.label}</a>`;
    })
    .join('');
}

function layout({ title, description, activePath, content }) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="icon" href="/favicon.ico" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: '#0f3a46',
            'primary-dark': '#0b2d39',
            accent: '#d8b24a'
          },
          boxShadow: {
            soft: '0 24px 60px rgba(9, 36, 45, 0.12)',
            panel: '0 20px 45px rgba(11, 45, 57, 0.14)'
          }
        }
      }
    }
  </script>
  <style>
    .shell { max-width: 80rem; margin-inline: auto; padding-inline: 1.5rem; }
    .panel { border-radius: 1.5rem; border: 1px solid rgba(148, 163, 184, .25); background: rgba(255,255,255,.9); box-shadow: 0 24px 60px rgba(9, 36, 45, 0.12); }
    .panel-dark { border-radius: 1.5rem; border: 1px solid rgba(255,255,255,.15); background: #0f3a46; color: white; box-shadow: 0 20px 45px rgba(11, 45, 57, 0.14); }
    .section-space { padding-top: 5rem; padding-bottom: 5rem; }
    .eyebrow { display:inline-flex; align-items:center; border-radius:9999px; border:1px solid rgba(216,178,74,.35); background: rgba(216,178,74,.12); padding:.5rem 1rem; font-size:.72rem; font-weight:700; letter-spacing:.22em; text-transform:uppercase; color:#b5850d; }
    .title-display { font-size: clamp(2rem, 3.8vw, 3.6rem); line-height: 1.12; font-weight: 700; letter-spacing: -0.02em; }
    .section-title { font-size: clamp(1.55rem, 2.8vw, 2.4rem); line-height: 1.2; font-weight: 700; letter-spacing: -0.02em; }
    body { background: radial-gradient(circle at 5% 0%, rgba(216,178,74,.12), transparent 20%), radial-gradient(circle at 90% 10%, rgba(15,58,70,.08), transparent 22%), #f8fafc; }
  </style>
</head>
<body class="text-slate-800 antialiased">
  <header class="sticky top-0 z-50 border-b border-white/80 bg-white/85 backdrop-blur">
    <div class="shell flex min-h-20 items-center justify-between gap-6">
      <a href="/index.html" class="flex items-center gap-3" aria-label="Ir para home">
        <img src="/images/solutions/logo_monte.svg" alt="Monte Sião" class="h-12 w-auto" />
      </a>
      <nav class="hidden items-center gap-2 lg:flex" aria-label="Principal">${nav(activePath)}</nav>
      <a href="/contato.html" class="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark lg:inline-flex">Fale com a Monte Sião</a>
      <details class="relative lg:hidden">
        <summary class="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-xl border border-slate-200 bg-white text-primary">
          <span class="text-xl">≡</span>
        </summary>
        <nav class="absolute right-0 top-12 grid min-w-52 gap-1 rounded-2xl border border-slate-200 bg-white p-2 shadow-panel">${nav(activePath)}</nav>
      </details>
    </div>
  </header>

  <main>${content}</main>

  <footer class="mt-20 bg-primary-dark text-white">
    <div class="shell py-14">
      <div class="grid gap-10 md:grid-cols-3">
        <div class="md:col-span-2">
          <p class="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">Ecossistema institucional integrado</p>
          <p class="mt-4 max-w-2xl text-sm leading-7 text-white/75">${esc(siteConfig.description)}</p>
        </div>
        <div class="space-y-2 text-sm text-white/80">
          <p><a class="hover:text-white" href="mailto:${esc(siteConfig.email)}">${esc(siteConfig.email)}</a></p>
          <p><a class="hover:text-white" href="tel:+551140002407">${esc(siteConfig.phone)}</a></p>
          <p>${esc(siteConfig.address)}</p>
        </div>
      </div>
      <div class="mt-8 border-t border-white/10 pt-5 text-xs text-white/60">${esc(siteConfig.legalName)} · <span id="year"></span></div>
    </div>
  </footer>

  <script src="/assets/main.js"></script>
</body>
</html>`;
}

function renderHome(solutions) {
  const top = [...solutions].slice(0, 6);
  return layout({
    title: 'Monte Sião | Holding com visão integrada e atuação multissetorial',
    description:
      'Monte Sião é uma holding com governança unificada, operação contínua e ecossistema integrado de soluções em saúde, tecnologia, infraestrutura, finanças e logística.',
    activePath: '/index.html',
    content: `
      <section class="relative overflow-hidden bg-primary text-white">
        <div class="shell grid gap-10 py-20 md:py-24 lg:grid-cols-2">
          <div>
            <span class="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">${esc(homeHero.eyebrow)}</span>
            <h1 class="title-display mt-6">${esc(homeHero.title)}</h1>
            <p class="mt-6 max-w-2xl text-lg leading-8 text-white/80">${esc(homeHero.description)}</p>
            <div class="mt-8 flex flex-wrap gap-3">
              <a href="/solucoes/index.html" class="rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary">Conhecer soluções</a>
              <a href="/sobre.html" class="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold">Ver visão institucional</a>
            </div>
          </div>
          <div class="panel-dark p-8">
            <p class="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">Base institucional</p>
            <h2 class="mt-4 text-2xl">Governança, integração e continuidade operacional para ambientes que exigem confiança.</h2>
            <div class="mt-6 grid gap-3 sm:grid-cols-2">
              ${metrics
                .map(
                  (m) => `<div class="rounded-2xl border border-white/20 bg-white/10 px-4 py-5"><p class="text-3xl font-bold">${esc(m.value)}</p><p class="mt-1 text-xs uppercase tracking-[0.18em] text-white/70">${esc(m.label)}</p></div>`,
                )
                .join('')}
            </div>
          </div>
        </div>
      </section>

      <section class="section-space">
        <div class="shell">
          <span class="eyebrow">Atuação multissetorial</span>
          <h2 class="section-title mt-5">Competências distribuídas em segmentos que se reforçam mutuamente.</h2>
          <div class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            ${segments
              .map(
                (segment) => `<article class="panel p-6"><h3 class="text-lg font-semibold">${esc(segment.title)}</h3><p class="mt-3 text-sm leading-7 text-slate-600">${esc(segment.description)}</p></article>`,
              )
              .join('')}
          </div>
        </div>
      </section>

      <section class="section-space pt-0">
        <div class="shell">
          <span class="eyebrow">Ecossistema de soluções</span>
          <h2 class="section-title mt-5">Especialidades organizadas em um portfólio integrado.</h2>
          <div class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            ${top
              .map(
                (solution) => `<article class="panel p-6">
                  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">${esc(segmentLabels[solution.segment])}</p>
                  <h3 class="mt-2 text-2xl font-semibold">${esc(solution.title)}</h3>
                  <p class="mt-3 text-sm leading-7 text-slate-600">${esc(solution.summary)}</p>
                  <div class="mt-4 flex flex-wrap gap-2">
                    ${solution.tags.map((tag) => `<span class="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">${esc(tag)}</span>`).join('')}
                  </div>
                  <a href="/solucoes/${esc(solution.slug)}.html" class="mt-6 inline-flex rounded-full border border-primary/20 px-5 py-2.5 text-sm font-semibold text-primary hover:bg-slate-100">Ver solução</a>
                </article>`,
              )
              .join('')}
          </div>
        </div>
      </section>

      <section class="section-space pt-0">
        <div class="shell grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          ${differentiators
            .map(
              (item) => `<article class="panel p-6"><h3 class="text-xl font-semibold">${esc(item.title)}</h3><p class="mt-3 text-sm leading-7 text-slate-600">${esc(item.description)}</p></article>`,
            )
            .join('')}
        </div>
      </section>

      <section class="section-space pt-0">
        <div class="shell">
          <div class="panel-dark p-8">
            <h2 class="section-title text-white">Conecte sua operação a um ecossistema capaz de sustentar crescimento.</h2>
            <p class="mt-4 max-w-3xl text-white/75">A Monte Sião integra competências críticas para operações complexas.</p>
            <div class="mt-6 flex flex-wrap gap-3">
              <a href="/contato.html" class="rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary">Iniciar conversa institucional</a>
              <a href="/sobre.html" class="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white">Conhecer a holding</a>
            </div>
          </div>
        </div>
      </section>
    `,
  });
}

function renderSobre() {
  return layout({
    title: 'Sobre a Monte Sião | Visão institucional e governança integrada',
    description:
      'Conheça a visão institucional da Monte Sião, sua proposta de governança unificada, operação multissetorial e modelo de integração entre competências.',
    activePath: '/sobre.html',
    content: `
      <section class="bg-primary text-white">
        <div class="shell grid gap-10 py-20 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span class="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">Visão institucional</span>
            <h1 class="title-display mt-6">Governança unificada para sustentar um ecossistema multissetorial com excelência operacional.</h1>
            <p class="mt-5 max-w-2xl text-lg leading-8 text-white/80">A Monte Sião atua como holding integradora, conectando empresas, competências e processos para fortalecer serviços essenciais.</p>
          </div>
          <div class="panel-dark p-8">
            <p class="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">Proposta institucional</p>
            <div class="mt-5 grid gap-3">
              ${aboutHighlights.map((item) => `<div class="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/85">${esc(item)}</div>`).join('')}
            </div>
          </div>
        </div>
      </section>

      <section class="section-space">
        <div class="shell grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <span class="eyebrow">Modelo operacional</span>
            <h2 class="section-title mt-5">Integração entre direção estratégica, execução técnica e sustentação contínua.</h2>
          </div>
          <div class="grid gap-5">
            ${operatingModel.map((item) => `<article class="panel p-6"><h3 class="text-2xl font-semibold">${esc(item.title)}</h3><p class="mt-3 text-sm leading-7 text-slate-600">${esc(item.description)}</p></article>`).join('')}
          </div>
        </div>
      </section>

      <section class="section-space pt-0">
        <div class="shell">
          <span class="eyebrow">Missão, visão e valores</span>
          <div class="mt-8 grid gap-6 md:grid-cols-3">
            ${values.map((item) => `<article class="panel p-6"><h3 class="text-xl font-semibold">${esc(item.title)}</h3><p class="mt-3 text-sm leading-7 text-slate-600">${esc(item.description)}</p></article>`).join('')}
          </div>
        </div>
      </section>
    `,
  });
}

function renderContato() {
  return layout({
    title: 'Contato | Monte Sião',
    description: 'Entre em contato com a Monte Sião para oportunidades institucionais, comerciais e parcerias estratégicas.',
    activePath: '/contato.html',
    content: `
      <section class="bg-primary text-white">
        <div class="shell py-20 md:py-24">
          <span class="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">Contato institucional</span>
          <h1 class="title-display mt-6 max-w-4xl">Canais para relacionamento institucional, novas frentes de negócio e parcerias estratégicas.</h1>
          <p class="mt-5 max-w-2xl text-lg leading-8 text-white/80">A Monte Sião está preparada para discutir integrações, expansão operacional e novos projetos.</p>
        </div>
      </section>

      <section class="section-space">
        <div class="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div class="grid gap-4">
            ${contactCards.map((item) => `<article class="panel p-6"><h3 class="text-xl font-semibold">${esc(item.title)}</h3><p class="mt-3 text-sm leading-7 text-slate-600">${esc(item.description)}</p><p class="mt-4 font-semibold text-primary">${esc(item.value)}</p></article>`).join('')}
          </div>
          <div class="panel p-8">
            <h2 class="section-title">Formulário institucional</h2>
            <p class="mt-3 text-sm leading-7 text-slate-600">Estrutura pronta para integração com endpoint estático, automação ou CRM.</p>
            <form class="mt-8 grid gap-5" method="post" action="#">
              <label class="grid gap-2 text-sm font-medium">Nome<input class="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4" name="nome" placeholder="Seu nome" /></label>
              <div class="grid gap-5 md:grid-cols-2">
                <label class="grid gap-2 text-sm font-medium">E-mail<input class="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4" type="email" name="email" placeholder="voce@empresa.com" /></label>
                <label class="grid gap-2 text-sm font-medium">Telefone<input class="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4" name="telefone" placeholder="+55 (11) 99999-9999" /></label>
              </div>
              <label class="grid gap-2 text-sm font-medium">Empresa<input class="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4" name="empresa" placeholder="Nome da empresa" /></label>
              <label class="grid gap-2 text-sm font-medium">Interesse
                <select class="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4" name="interesse">
                  <option>Institucional</option><option>Parceria</option><option>Comercial</option><option>Operação / solução</option>
                </select>
              </label>
              <label class="grid gap-2 text-sm font-medium">Mensagem<textarea class="min-h-36 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3" name="mensagem" placeholder="Descreva seu contexto e objetivo."></textarea></label>
              <button class="h-12 rounded-full bg-primary px-6 text-sm font-semibold text-white hover:bg-primary-dark" type="submit">Solicitar contato</button>
            </form>
          </div>
        </div>
      </section>
    `,
  });
}

function renderSolucoesIndex(solutions) {
  const grouped = segmentOrder.map((segment) => ({
    segment,
    items: solutions.filter((s) => s.segment === segment),
  }));

  return layout({
    title: 'Soluções | Ecossistema Monte Sião',
    description: 'Conheça o ecossistema de soluções da Monte Sião, organizado por segmento e estruturado para atender operações com visão integrada.',
    activePath: '/solucoes/index.html',
    content: `
      <section class="bg-primary text-white">
        <div class="shell py-20 md:py-24">
          <span class="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">Ecossistema de soluções</span>
          <h1 class="title-display mt-6 max-w-4xl">Empresas e soluções organizadas por segmento, integradas por uma visão institucional única.</h1>
          <p class="mt-5 max-w-3xl text-lg leading-8 text-white/80">O portfólio Monte Sião foi estruturado para atender demandas complexas com especialização técnica e consistência operacional.</p>
        </div>
      </section>

      <section class="section-space">
        <div class="shell space-y-14">
          ${grouped
            .map(
              (group) => `<section>
                <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h2 class="section-title">${esc(segmentLabels[group.segment])}</h2>
                    <p class="mt-2 text-sm text-slate-600">${esc(segmentDescriptions[group.segment])}</p>
                  </div>
                  <p class="text-sm font-medium text-slate-500">${group.items.length} soluções</p>
                </div>
                <div class="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  ${group.items
                    .map(
                      (solution) => `<article class="panel p-6">
                        <h3 class="text-2xl font-semibold">${esc(solution.title)}</h3>
                        <p class="mt-3 text-sm leading-7 text-slate-600">${esc(solution.summary)}</p>
                        <div class="mt-4 flex flex-wrap gap-2">${solution.tags.map((tag) => `<span class="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">${esc(tag)}</span>`).join('')}</div>
                        <a href="/solucoes/${esc(solution.slug)}.html" class="mt-6 inline-flex rounded-full border border-primary/20 px-5 py-2.5 text-sm font-semibold text-primary hover:bg-slate-100">Ver solução</a>
                      </article>`,
                    )
                    .join('')}
                </div>
              </section>`,
            )
            .join('')}
        </div>
      </section>
    `,
  });
}

function renderSolucaoPage(solution) {
  return layout({
    title: solution.seoTitle || `${solution.title} | Monte Sião`,
    description: solution.seoDescription || solution.summary,
    activePath: '/solucoes/index.html',
    content: `
      <section class="bg-primary text-white">
        <div class="shell grid gap-10 py-20 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span class="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">${esc(segmentLabels[solution.segment])}</span>
            <h1 class="title-display mt-6">${esc(solution.title)}</h1>
            <p class="mt-4 max-w-2xl text-lg leading-8 text-white/80">${esc(solution.heroSummary)}</p>
            <div class="mt-5 flex flex-wrap gap-2">${solution.tags.map((tag) => `<span class="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium">${esc(tag)}</span>`).join('')}</div>
          </div>
          <div class="panel-dark p-8">
            <p class="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">Tagline institucional</p>
            <h2 class="mt-4 text-2xl">${esc(solution.tagline)}</h2>
            <p class="mt-4 text-sm leading-7 text-white/75">${esc(solution.description)}</p>
          </div>
        </div>
      </section>

      <section class="section-space">
        <div class="shell grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <span class="eyebrow">Descrição institucional</span>
            <h2 class="section-title mt-5">${esc(solution.headline)}</h2>
            <p class="mt-5 text-base leading-8 text-slate-600">${esc(solution.description)}</p>
            <div class="mt-6">${mdBodyToHtml(solution.body)}</div>
          </div>
          <div class="grid gap-5 md:grid-cols-2">
            ${solution.services
              .map((service) => `<article class="panel p-6"><p class="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Frente</p><h3 class="mt-3 text-xl font-semibold">${esc(service.title)}</h3><p class="mt-3 text-sm leading-7 text-slate-600">${esc(service.description)}</p></article>`)
              .join('')}
          </div>
        </div>
      </section>

      <section class="section-space pt-0">
        <div class="shell">
          <div class="panel-dark px-6 py-7">
            <div class="flex flex-wrap gap-2">${solution.highlights.map((item) => `<span class="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium">${esc(item)}</span>`).join('')}</div>
          </div>
        </div>
      </section>

      <section class="section-space pt-0">
        <div class="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span class="eyebrow">Indicadores visuais</span>
            <h2 class="section-title mt-5">Sinais de capacidade, cobertura e especialização.</h2>
            <p class="mt-4 text-base leading-8 text-slate-600">Indicadores que sintetizam a proposta institucional da solução.</p>
          </div>
          <div class="grid gap-4 sm:grid-cols-3">
            ${solution.kpis
              .map((item) => `<article class="panel p-6 text-center"><p class="text-3xl font-bold text-primary">${esc(item.value)}</p><p class="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">${esc(item.label)}</p></article>`)
              .join('')}
          </div>
        </div>
      </section>

      <section class="section-space pt-0">
        <div class="shell grid gap-6 md:grid-cols-3">
          ${solution.differentials.map((item) => `<article class="panel p-6"><h3 class="text-xl font-semibold">${esc(item.title)}</h3><p class="mt-3 text-sm leading-7 text-slate-600">${esc(item.description)}</p></article>`).join('')}
        </div>
      </section>

      <section class="section-space pt-0">
        <div class="shell grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div class="overflow-hidden rounded-[2rem] border border-slate-200 bg-primary/5"><img src="${esc(solution.image.src)}" alt="${esc(solution.image.alt)}" class="h-full w-full object-cover" /></div>
          <div class="panel p-8">
            <span class="eyebrow">Próxima conversa</span>
            <h2 class="section-title mt-5">${esc(solution.ctaTitle)}</h2>
            <p class="mt-4 text-base leading-8 text-slate-600">${esc(solution.ctaDescription)}</p>
            <div class="mt-6 flex flex-wrap gap-3">
              <a href="/contato.html" class="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white">${esc(solution.ctaLabel)}</a>
              <a href="/solucoes/index.html" class="rounded-full border border-primary/20 px-6 py-3 text-sm font-semibold text-primary hover:bg-slate-100">Ver outras soluções</a>
            </div>
          </div>
        </div>
      </section>
    `,
  });
}

async function loadSolutions() {
  const dir = path.join(ROOT, 'src/content/solutions');
  const files = (await fs.readdir(dir)).filter((f) => f.endsWith('.md'));

  const items = await Promise.all(
    files.map(async (filename) => {
      const full = path.join(dir, filename);
      const raw = await fs.readFile(full, 'utf8');
      const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

      if (!match) {
        throw new Error(`Frontmatter inválido em ${filename}`);
      }

      const data = yaml.load(match[1]);
      const body = match[2].trim();
      const slug = filename.replace(/\.md$/, '');

      return { slug, body, ...data };
    }),
  );

  return items.sort((a, b) => a.order - b.order);
}

async function ensureDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function write(filePath, content) {
  await ensureDir(filePath);
  await fs.writeFile(filePath, content, 'utf8');
}

async function copyPublic() {
  const src = path.join(ROOT, 'public');
  const entries = await fs.readdir(src, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      const srcPath = path.join(src, entry.name);
      const outPath = path.join(OUT, entry.name);
      if (entry.isDirectory()) {
        await fs.cp(srcPath, outPath, { recursive: true });
      } else {
        await fs.copyFile(srcPath, outPath);
      }
    }),
  );
}

async function main() {
  await fs.rm(OUT, { recursive: true, force: true });
  await fs.mkdir(OUT, { recursive: true });

  const solutions = await loadSolutions();

  await Promise.all([
    write(path.join(OUT, 'index.html'), renderHome(solutions)),
    write(path.join(OUT, 'sobre.html'), renderSobre()),
    write(path.join(OUT, 'contato.html'), renderContato()),
    write(path.join(OUT, 'solucoes/index.html'), renderSolucoesIndex(solutions)),
    write(
      path.join(OUT, 'assets/main.js'),
      'document.getElementById("year").textContent = new Date().getFullYear();\n',
    ),
  ]);

  await Promise.all(
    solutions.map((solution) =>
      write(path.join(OUT, `solucoes/${solution.slug}.html`), renderSolucaoPage(solution)),
    ),
  );

  await copyPublic();

  console.log(`Site HTML + Tailwind gerado em: ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
