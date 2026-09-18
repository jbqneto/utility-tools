export type QrType = 'link' | 'whatsapp' | 'wifi' | 'text';
export type WifiSecurity = 'WPA' | 'WEP' | 'nopass';

export type QrResult = {
  payload: string;
  pngDataUrl: string;
  svg: string;
};
