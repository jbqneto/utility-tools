export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = 'image/png';

export function OgImageContent() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
        backgroundColor: '#020617',
        color: '#ffffff',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 160,
          height: 160,
          borderRadius: 32,
          backgroundColor: '#ffffff',
        }}
      >
        <svg width="104" height="104" viewBox="0 0 64 64">
          <path
            fill="#020617"
            d="M8 8h20v20H8zM36 8h20v20H36zM8 36h20v20H8zM14 14h8v8h-8zM42 14h8v8h-8zM14 42h8v8h-8zM36 36h8v8h-8zM48 36h8v8h-8zM36 48h8v8h-8zM48 48h8v8h-8z"
          />
        </svg>
      </div>
      <div style={{ display: 'flex', fontSize: 64, fontWeight: 700 }}>Gerador de QR Code Grátis</div>
      <div style={{ display: 'flex', fontSize: 32, color: '#94a3b8' }}>
        Link · WhatsApp · Wi-Fi · Texto — The Dev Lab
      </div>
    </div>
  );
}
