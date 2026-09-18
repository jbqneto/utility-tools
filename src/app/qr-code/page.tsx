import type { Metadata } from 'next';
import { QrCodeGenerator } from '@/components/qr-code-generator';

export const metadata: Metadata = {
  title: 'Gerador de QR Code Grátis',
  description:
    'Crie QR Codes grátis para links, WhatsApp, Wi-Fi e textos. Gere e baixe seu QR Code em PNG ou SVG em segundos.',
  alternates: {
    canonical: '/qr-code',
  },
};

const faqs = [
  {
    question: 'Como criar um QR Code grátis?',
    answer:
      'Escolha o tipo de QR Code, informe o conteúdo e clique em gerar. O QR Code é criado diretamente no seu navegador e pode ser baixado em PNG ou SVG.',
  },
  {
    question: 'Como criar um QR Code de um link?',
    answer:
      'Selecione a opção Link, informe o endereço da página e gere o QR Code. Ao escanear, a pessoa será direcionada para o endereço informado.',
  },
  {
    question: 'Como criar um QR Code para WhatsApp?',
    answer:
      'Selecione WhatsApp, informe o número brasileiro e, opcionalmente, uma mensagem. O QR Code abrirá uma conversa do WhatsApp com os dados configurados.',
  },
  {
    question: 'Posso baixar o QR Code em PNG ou SVG?',
    answer:
      'Sim. O gerador permite baixar o QR Code em PNG ou SVG, sem cadastro.',
  },
  {
    question: 'Como criar um qrcode online grátis?',
    answer:
      'Basta acessar esta ferramenta, escolher o tipo de qrcode (link, WhatsApp, Wi-Fi ou texto) e clicar em gerar. Não é necessário instalar nada nem criar conta.',
  },
  {
    question: 'O QR Code expira?',
    answer:
      'Não. Os QR Codes gerados nesta ferramenta são estáticos. Eles continuam funcionando enquanto o conteúdo codificado, como um endereço de site, continuar válido.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

const howToSteps = [
  'Escolha entre Link, WhatsApp, Wi-Fi ou Texto.',
  'Preencha as informações solicitadas.',
  'Clique em gerar e confira o preview.',
  'Baixe o resultado em PNG ou SVG.',
];

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Como criar um QR Code grátis',
  step: howToSteps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    text: step,
  })),
};

export default function QrCodePage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-6xl px-4 pb-14 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold tracking-wide text-slate-500">THE DEV LAB</p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Gerador de QR Code grátis
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Crie um QR Code em segundos para links, WhatsApp, redes Wi-Fi ou qualquer texto.
          </p>
        </div>

        <div className="mt-10">
          <QrCodeGenerator />
        </div>

        <div className="mx-auto mt-16 max-w-3xl space-y-12 text-slate-700">
          <section>
            <h2 className="text-2xl font-bold text-slate-950">Como criar um QR Code?</h2>
            <p className="mt-4 leading-7">
              Escolha o tipo de QR Code acima, preencha os dados e gere o código. A criação acontece
              diretamente no navegador, sem cadastro e sem enviar o conteúdo para um servidor.
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-6 leading-7">
              {howToSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">Criar QR Code de um link</h2>
            <p className="mt-4 leading-7">
              Um QR Code de link é útil para compartilhar sites, páginas de produtos, formulários,
              cardápios, portfólios e outros endereços. Informe o endereço, com ou sem
              <code className="mx-1 rounded bg-slate-100 px-1.5 py-0.5 text-sm">https://</code>,
              como <code className="mx-1 rounded bg-slate-100 px-1.5 py-0.5 text-sm">exemplo.com</code>,
              e o gerador ajusta o formato automaticamente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">Criar QR Code para WhatsApp</h2>
            <p className="mt-4 leading-7">
              Você pode gerar um QR Code que abre uma conversa no WhatsApp com um número brasileiro.
              Também é possível adicionar uma mensagem inicial para facilitar o contato.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">Criar QR Code para Wi-Fi</h2>
            <p className="mt-4 leading-7">
              Compartilhe o acesso a uma rede Wi-Fi sem precisar digitar a senha. Informe o nome da
              rede, a senha e o tipo de segurança utilizado pelo roteador.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">Perguntas frequentes</h2>
            <div className="mt-5 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
              {faqs.map((faq) => (
                <details key={faq.question} className="group p-5">
                  <summary className="cursor-pointer list-none font-semibold text-slate-950">
                    {faq.question}
                  </summary>
                  <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </main>
  );
}
