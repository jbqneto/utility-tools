import type { Locale } from './config';

export type Messages = {
  brand: string;
  tabs: {
    link: string;
    whatsapp: string;
    wifi: string;
    text: string;
  };
  generator: {
    linkLabel: string;
    linkPlaceholder: string;
    whatsappNumber: string;
    whatsappNumberPlaceholder: string;
    whatsappMessage: string;
    whatsappMessagePlaceholder: string;
    wifiSsid: string;
    wifiSsidPlaceholder: string;
    wifiPassword: string;
    wifiPasswordPlaceholder: string;
    wifiSecurity: string;
    wifiNone: string;
    wifiWpa: string;
    wifiWep: string;
    showPassword: string;
    hidePassword: string;
    textLabel: string;
    textPlaceholder: string;
    generate: string;
    generating: string;
    preview: string;
    previewTitle: string;
    previewReady: string;
    previewEmpty: string;
    downloadPng: string;
    downloadSvg: string;
    reset: string;
    required: string;
    invalidUrl: string;
    invalidPhone: string;
    tooLong: string;
  };
  locale: {
    label: string;
  };
};

const ptBR: Messages = {
  brand: 'The Dev Lab',
  tabs: { link: 'Link', whatsapp: 'WhatsApp', wifi: 'Wi-Fi', text: 'Texto' },
  generator: {
    linkLabel: 'URL',
    linkPlaceholder: 'exemplo.com ou https://exemplo.com',
    whatsappNumber: 'Número do WhatsApp',
    whatsappNumberPlaceholder: '(11) 99999-9999',
    whatsappMessage: 'Mensagem (opcional)',
    whatsappMessagePlaceholder: 'Olá! Vi seu QR Code.',
    wifiSsid: 'Nome da rede (SSID)',
    wifiSsidPlaceholder: 'Minha rede Wi-Fi',
    wifiPassword: 'Senha',
    wifiPasswordPlaceholder: 'Digite a senha da rede',
    wifiSecurity: 'Segurança',
    wifiNone: 'Nenhuma',
    wifiWpa: 'WPA/WPA2',
    wifiWep: 'WEP',
    showPassword: 'Mostrar senha',
    hidePassword: 'Ocultar senha',
    textLabel: 'Texto',
    textPlaceholder: 'Digite o texto que deseja codificar...',
    generate: 'Gerar QR Code',
    generating: 'Gerando...',
    preview: 'Seu QR Code',
    previewTitle: 'Pré-visualização',
    previewReady: 'QR Code pronto',
    previewEmpty: 'Preencha os dados e gere seu QR Code.',
    downloadPng: 'Baixar PNG',
    downloadSvg: 'Baixar SVG',
    reset: 'Limpar',
    required: 'Preencha este campo.',
    invalidUrl: 'Informe uma URL válida, como exemplo.com ou https://exemplo.com.',
    invalidPhone: 'Informe um número de telefone brasileiro válido.',
    tooLong: 'O conteúdo é muito longo para gerar um QR Code legível.',
  },
  locale: { label: 'Idioma' },
};

const catalogs: Record<Locale, Messages> = {
  'pt-BR': ptBR,
  // Catalogs are intentionally present from day one. They can be translated without changing
  // routing when the product expands to Portugal and the United States.
  'pt-PT': ptBR,
  'en-US': ptBR,
};

export function getMessages(locale: Locale): Messages {
  return catalogs[locale];
}
