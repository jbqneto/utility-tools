import QRCode from 'qrcode';
import type { WifiSecurity } from '@/lib/qr-types';

const MAX_PAYLOAD_LENGTH = 1800;

export function normalizeBrazilianPhone(value: string): string | null {
  let digits = value.replace(/\D/g, '');

  if (digits.startsWith('55') && (digits.length === 12 || digits.length === 13)) {
    digits = digits.slice(2);
  }

  if (digits.length !== 10 && digits.length !== 11) return null;
  return `55${digits}`;
}

export function normalizeUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed || /^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function buildWhatsAppPayload(phone: string, message: string): string | null {
  const normalizedPhone = normalizeBrazilianPhone(phone);
  if (!normalizedPhone) return null;

  const normalizedMessage = message.trim();
  return normalizedMessage
    ? `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(normalizedMessage)}`
    : `https://wa.me/${normalizedPhone}`;
}

function escapeWifi(value: string): string {
  return value.replace(/([\\;,:"])/g, '\\$1');
}

export function buildWifiPayload(
  ssid: string,
  password: string,
  security: WifiSecurity,
): string {
  const fields = [`WIFI:T:${security};S:${escapeWifi(ssid)}`];

  if (security !== 'nopass') {
    fields.push(`P:${escapeWifi(password)}`);
  }

  fields.push(';;');
  return fields.join(';');
}

export function validatePayload(payload: string): string | null {
  if (!payload.trim()) return 'required';
  if (payload.length > MAX_PAYLOAD_LENGTH) return 'tooLong';
  return null;
}

export async function generatePng(payload: string): Promise<string> {
  return QRCode.toDataURL(payload, {
    errorCorrectionLevel: 'M',
    margin: 2,
    width: 640,
    color: {
      dark: '#111827',
      light: '#ffffff',
    },
  });
}

export async function generateSvg(payload: string): Promise<string> {
  return QRCode.toString(payload, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 2,
    width: 640,
    color: {
      dark: '#111827',
      light: '#ffffff',
    },
  });
}
