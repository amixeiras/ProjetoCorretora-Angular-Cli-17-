import { BrokerBrand } from '../../domain/insurance-broker';

export const BROKER_MOCKS: Record<string, BrokerBrand> = {
  'seguranca-total': {
    id: 1,
    slug: 'seguranca-total',
    name: 'Segurança Total',
    logoUrl: '/assets/logos/seguranca-total.svg',
    tagline: 'Corretora de seguros',
    headline: 'Faça sua cotação rápida e personalizada',
    headlineAccent: 'agora!',
    intro: 'Preencha os dados e receba uma proposta exclusiva em minutos.',
    phone: '(71) 97354-1830',
    email: 'segurancatotal.com.br',
    primaryColor: '#087b4b',
    secondaryColor: '#0d4f79',
    products: [
      { iconId: 1, icon: '🚘', name: 'Seguro Auto', description: 'Proteção completa para o seu carro, onde quer que você vá.' },
      { iconId: 2, icon: '⌂', name: 'Seguro Residencial', description: 'Sua casa protegida para você viver com mais tranquilidade.' },
      { iconId: 3, icon: '♧', name: 'Seguro Vida', description: 'Cuidado para sua família hoje e em todos os amanhãs.' },
      { iconId: 4, icon: '+', name: 'Seguro Saúde', description: 'Planos e assistência para cuidar do que importa.' },
      { iconId: 5, icon: '✈', name: 'Seguro Viagem', description: 'Viaje tranquilo com suporte do início ao fim.' },
      { iconId: 6, icon: '▦', name: 'Empresarial', description: 'Soluções para proteger o patrimônio do seu negócio.' }
    ]
  },
  'mx-seguros': {
    id: 2,
    slug: 'mx-seguros',
    name: 'Mx Seguros',
    logoUrl: '/assets/logos/mx-seguros.svg',
    tagline: 'Corretora de seguros',
    headline: 'Proteção para o que realmente importa',
    headlineAccent: 'com a Mx Seguros',
    intro: 'Conte com uma equipe especialista para encontrar as melhores coberturas para você.',
    phone: '(11) 4000-2026',
    email: 'contato@mxseguros.com.br',
    primaryColor: '#e05a2a',
    secondaryColor: '#252f68',
    products: [
      { iconId: 1, icon: '🚘', name: 'Seguro Auto', description: 'Assistência completa para dirigir com tranquilidade.' },
      { iconId: 2, icon: '⌂', name: 'Seguro Residencial', description: 'Sua casa protegida contra imprevistos.' },
      { iconId: 3, icon: '♧', name: 'Seguro Vida', description: 'Proteção financeira para sua família.' },
      { iconId: 4, icon: '+', name: 'Seguro Saúde', description: 'Cuidado e atendimento para todas as fases da vida.' },
      { iconId: 5, icon: '✈', name: 'Seguro Viagem', description: 'Viaje com cobertura e suporte onde estiver.' },
      { iconId: 6, icon: '▦', name: 'Seguro Empresarial', description: 'Proteja seu negócio e mantenha sua operação segura.' }
    ]
  }
};
