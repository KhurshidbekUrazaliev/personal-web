import { ImageResponse } from 'next/og';

// The icon phones use when the site is saved to the home screen.
// No rounded corners here: the phone rounds them itself.
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
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
          backgroundImage: 'radial-gradient(circle at 50% 40%, #1A3D26 0%, #0A1A0F 75%)',
          color: '#C9A84C',
          fontSize: 96,
          letterSpacing: -5,
        }}
      >
        KU
      </div>
    ),
    size,
  );
}
