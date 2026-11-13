import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { EDUCATION, SITE } from '@/lib/site';

// The picture that Telegram, LinkedIn, KakaoTalk and others show when the
// site's link is shared. Next.js renders it once at build time and adds the
// og:image and twitter:image tags on its own.
export const alt = `${SITE.name}, ${SITE.role} at ${SITE.company}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), 'public/images/profile/profile.jpg'));
  const photoSrc = `data:image/jpeg;base64,${photo.toString('base64')}`;
  const [firstName, lastName] = SITE.name.split(' ');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 84px',
          backgroundColor: '#0A1A0F',
          backgroundImage: 'radial-gradient(circle at 30% 40%, #1A3D26 0%, #0A1A0F 70%)',
          color: '#D4E8D8',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 92, lineHeight: 1.05, letterSpacing: -3 }}>{firstName}</div>
          <div style={{ fontSize: 92, lineHeight: 1.05, letterSpacing: -3, color: '#C9A84C' }}>
            {lastName}
          </div>
          {/* One string per box: the image renderer wants a single text child. */}
          <div style={{ marginTop: 40, fontSize: 36 }}>{`${SITE.role} at ${SITE.company}`}</div>
          <div style={{ marginTop: 10, fontSize: 28, color: '#7AAA88' }}>
            {`${EDUCATION.field} student at ${EDUCATION.schoolShort}`}
          </div>
          <div style={{ marginTop: 52, fontSize: 26, color: '#C9A84C' }}>{SITE.domain}</div>
        </div>

        <div
          style={{
            display: 'flex',
            width: 310,
            height: 310,
            borderRadius: 155,
            padding: 6,
            backgroundImage: 'linear-gradient(135deg, #C9A84C, #3D8A5A)',
          }}
        >
          <img
            src={photoSrc}
            alt=""
            width={298}
            height={298}
            style={{ borderRadius: 149, objectFit: 'cover' }}
          />
        </div>
      </div>
    ),
    size,
  );
}
