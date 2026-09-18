import { ImageResponse } from 'next/og';
import { OgImageContent, ogImageContentType, ogImageSize } from '@/lib/og-image';

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(<OgImageContent />, size);
}
