'use client';

import { useMemo, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import {
  Check,
  Download,
  Eye,
  EyeOff,
  Link as LinkIcon,
  MessageCircle,
  RotateCcw,
  Sparkles,
  Type as TypeIcon,
  Wifi,
} from 'lucide-react';
import { useLocale } from '@/components/locale-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  buildWhatsAppPayload,
  buildWifiPayload,
  generatePng,
  generateSvg,
  normalizeBrazilianPhone,
  normalizeUrl,
  validatePayload,
} from '@/lib/qr';
import type { QrResult, QrType, WifiSecurity } from '@/lib/qr-types';

const tabs: Array<{ id: QrType; icon: typeof LinkIcon }> = [
  { id: 'link', icon: LinkIcon },
  { id: 'whatsapp', icon: MessageCircle },
  { id: 'wifi', icon: Wifi },
  { id: 'text', icon: TypeIcon },
];

export function QrCodeGenerator() {
  const { messages } = useLocale();
  const [type, setType] = useState<QrType>('link');
  const [link, setLink] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [security, setSecurity] = useState<WifiSecurity>('WPA');
  const [text, setText] = useState('');
  const [result, setResult] = useState<QrResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloaded, setDownloaded] = useState<'png' | 'svg' | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const currentPayload = useMemo(() => {
    switch (type) {
      case 'link':
        return normalizeUrl(link);
      case 'whatsapp':
        return buildWhatsAppPayload(phone, message) ?? '';
      case 'wifi':
        return ssid.trim() ? buildWifiPayload(ssid.trim(), password, security) : '';
      case 'text':
        return text.trim();
    }
  }, [link, message, password, phone, security, ssid, text, type]);

  const reset = () => {
    setLink('');
    setPhone('');
    setMessage('');
    setSsid('');
    setPassword('');
    setSecurity('WPA');
    setText('');
    setResult(null);
    setError(null);
    setDownloaded(null);
    setShowPassword(false);
  };

  const selectType = (nextType: QrType) => {
    setType(nextType);
    setError(null);
    setDownloaded(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setDownloaded(null);

    if (type === 'link') {
      try {
        const url = new URL(normalizeUrl(link));
        if (!['http:', 'https:'].includes(url.protocol)) throw new Error();
      } catch {
        setError('invalidUrl');
        return;
      }
    }

    if (type === 'whatsapp' && !normalizeBrazilianPhone(phone)) {
      setError('invalidPhone');
      return;
    }

    if (type === 'wifi' && security !== 'nopass' && !password.trim()) {
      setError('required');
      return;
    }

    const payloadError = validatePayload(currentPayload);
    if (payloadError) {
      setError(payloadError);
      return;
    }

    setIsGenerating(true);
    try {
      const [pngDataUrl, svg] = await Promise.all([
        generatePng(currentPayload),
        generateSvg(currentPayload),
      ]);
      setResult({ payload: currentPayload, pngDataUrl, svg });
    } catch {
      setError('tooLong');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPng = () => {
    if (!result) return;
    const anchor = document.createElement('a');
    anchor.href = result.pngDataUrl;
    anchor.download = 'qr-code.png';
    anchor.click();
    setDownloaded('png');
  };

  const downloadSvg = () => {
    if (!result) return;
    const blob = new Blob([result.svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'qr-code.svg';
    anchor.click();
    URL.revokeObjectURL(url);
    setDownloaded('svg');
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.8fr)]">
        <div className="p-5 sm:p-7 lg:p-8">
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4" role="tablist" aria-label="Tipo de QR Code">
            {tabs.map(({ id, icon: Icon }) => {
              const active = type === id;
              const label = messages.tabs[id];
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => selectType(id)}
                  className={`inline-flex min-h-10 items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
                    active
                      ? 'bg-slate-950 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-950'
                  }`}
                >
                  <Icon size={16} aria-hidden="true" />
                  {label}
                </button>
              );
            })}
          </div>

          <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
            {type === 'link' && (
              <Field label={messages.generator.linkLabel} htmlFor="link">
                <Input
                  id="link"
                  type="text"
                  value={link}
                  onChange={(event) => setLink(event.target.value)}
                  placeholder={messages.generator.linkPlaceholder}
                  autoComplete="url"
                  required
                />
              </Field>
            )}

            {type === 'whatsapp' && (
              <>
                <Field label={messages.generator.whatsappNumber} htmlFor="phone">
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder={messages.generator.whatsappNumberPlaceholder}
                    autoComplete="tel"
                    inputMode="tel"
                    required
                  />
                </Field>
                <Field label={messages.generator.whatsappMessage} htmlFor="message">
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder={messages.generator.whatsappMessagePlaceholder}
                    maxLength={500}
                  />
                </Field>
              </>
            )}

            {type === 'wifi' && (
              <>
                <Field label={messages.generator.wifiSsid} htmlFor="ssid">
                  <Input
                    id="ssid"
                    value={ssid}
                    onChange={(event) => setSsid(event.target.value)}
                    placeholder={messages.generator.wifiSsidPlaceholder}
                    autoComplete="off"
                    required
                  />
                </Field>
                <Field label={messages.generator.wifiPassword} htmlFor="password">
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder={messages.generator.wifiPasswordPlaceholder}
                      autoComplete="new-password"
                      disabled={security === 'nopass'}
                      className="pr-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      disabled={security === 'nopass'}
                      aria-label={showPassword ? messages.generator.hidePassword : messages.generator.showPassword}
                      aria-pressed={showPassword}
                      className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate-400 transition hover:text-slate-700 disabled:pointer-events-none disabled:opacity-50"
                    >
                      {showPassword ? <EyeOff size={17} aria-hidden="true" /> : <Eye size={17} aria-hidden="true" />}
                    </button>
                  </div>
                </Field>
                <Field label={messages.generator.wifiSecurity} htmlFor="security">
                  <Select
                    id="security"
                    value={security}
                    onChange={(event) => setSecurity(event.target.value as WifiSecurity)}
                  >
                    <option value="WPA">{messages.generator.wifiWpa}</option>
                    <option value="WEP">{messages.generator.wifiWep}</option>
                    <option value="nopass">{messages.generator.wifiNone}</option>
                  </Select>
                </Field>
              </>
            )}

            {type === 'text' && (
              <Field label={messages.generator.textLabel} htmlFor="text">
                <Textarea
                  id="text"
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  placeholder={messages.generator.textPlaceholder}
                  maxLength={1800}
                  required
                />
              </Field>
            )}

            {error && (
              <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error === 'invalidUrl' && messages.generator.invalidUrl}
                {error === 'invalidPhone' && messages.generator.invalidPhone}
                {error === 'tooLong' && messages.generator.tooLong}
                {error === 'required' && messages.generator.required}
              </div>
            )}

            <div className="flex flex-col gap-2 pt-1 sm:flex-row">
              <Button type="submit" disabled={isGenerating} className="flex-1 bg-slate-950 text-white hover:bg-slate-800">
                <Sparkles size={17} aria-hidden="true" />
                {isGenerating ? messages.generator.generating : messages.generator.generate}
              </Button>
              <Button type="button" onClick={reset} className="bg-slate-100 text-slate-700 hover:bg-slate-200">
                <RotateCcw size={16} aria-hidden="true" />
                {messages.generator.reset}
              </Button>
            </div>
          </form>
        </div>

        <div className="border-t border-slate-200 bg-slate-50 p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-8">
          <div className="flex min-h-[420px] flex-col">
            <div>
              <p className="text-sm font-semibold text-slate-500">{messages.generator.preview}</p>
              <h2 className="mt-1 text-xl font-bold text-slate-950">{result ? messages.generator.previewReady : messages.generator.previewTitle}</h2>
            </div>

            <div className="my-7 flex flex-1 items-center justify-center">
              {result ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <img src={result.pngDataUrl} alt="QR Code gerado" className="h-64 w-64" />
                </div>
              ) : (
                <div className="flex max-w-xs flex-col items-center text-center text-sm text-slate-500">
                  <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white text-slate-300">
                    <QrPlaceholder />
                  </div>
                  {messages.generator.previewEmpty}
                </div>
              )}
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <Button
                type="button"
                onClick={downloadPng}
                disabled={!result}
                className="bg-slate-950 text-white hover:bg-slate-800"
              >
                {downloaded === 'png' ? <Check size={17} /> : <Download size={17} />}
                {messages.generator.downloadPng}
              </Button>
              <Button
                type="button"
                onClick={downloadSvg}
                disabled={!result}
                className="bg-white text-slate-800 ring-1 ring-inset ring-slate-300 hover:bg-slate-100"
              >
                {downloaded === 'svg' ? <Check size={17} /> : <Download size={17} />}
                {messages.generator.downloadSvg}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-slate-800">
        {label}
      </label>
      {children}
    </div>
  );
}

function QrPlaceholder() {
  return (
    <svg viewBox="0 0 80 80" className="h-14 w-14" aria-hidden="true">
      <path d="M8 8h24v24H8zM48 8h24v24H48zM8 48h24v24H8z" fill="currentColor" />
      <path d="M16 16h8v8h-8zM56 16h8v8h-8zM16 56h8v8h-8zM48 48h8v8h-8zM60 48h12v8H60zM48 60h8v12h-8zM60 60h12v12H60z" fill="white" />
    </svg>
  );
}
