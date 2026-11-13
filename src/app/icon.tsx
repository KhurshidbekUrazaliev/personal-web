import { ImageResponse } from 'next/og';

// The browser-tab icon: my initials in the site's gold on its dark green.
export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0A1A0F',
          border: '4px solid #C9A84C',
          borderRadius: 14,
          color: '#C9A84C',
          fontSize: 34,
          letterSpacing: -2,
        }}
      >
        KU
      </div>
    ),
    size,
  );
}
