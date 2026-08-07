import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { app } from '@/lib/brand';

export const alt = `${app.name} — ${app.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * The card that shows up when the site is pasted into WhatsApp, Messenger,
 * Slack or X. Without this the link previews as a bare title on a blank
 * rectangle, which for a finance product reads as untrustworthy.
 *
 * Built in code rather than exported from a design tool so it can't drift
 * from the brand tokens — the greens below are the same values
 * `lib/brand.ts` mirrors from the app's `constants/theme.js`. It uses the
 * dark theme unconditionally: an OG card has no way to know the viewer's
 * preference, and the dark composition is the one with the accent glow.
 *
 * No custom font is loaded. Urbanist would have to be fetched or vendored as
 * a .ttf purely for this one image, and Satori's fallback sans renders the
 * three lines of text here cleanly enough that it isn't worth the build-time
 * dependency. If the card ever grows real typographic personality, vendor
 * the font then.
 *
 * Note for editing: this is rendered by Satori, not a browser. Every element
 * with more than one child needs an explicit `display: 'flex'`, and there is
 * no cascade — style each node directly.
 */
export default async function Image() {
  const icon = await readFile(
    join(process.cwd(), 'public', 'islamic-expense-tracker-icon.png')
  );
  const iconSrc = `data:image/png;base64,${icon.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#06110a',
          padding: 80,
          position: 'relative',
        }}
      >
        {/* Accent bloom, echoing the hero's ambient glow. */}
        <div
          style={{
            position: 'absolute',
            top: -260,
            right: -160,
            width: 760,
            height: 760,
            // Exactly half the box. A browser clamps an oversized radius to
            // half automatically; Satori doesn't, and the un-clamped corner
            // leaves a faint straight seam where the bloom meets the edge.
            borderRadius: 380,
            background:
              'radial-gradient(circle, rgba(25,204,80,0.28) 0%, rgba(25,204,80,0) 70%)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={iconSrc} width={64} height={64} alt="" style={{ borderRadius: 16 }} />
          <span style={{ fontSize: 30, color: 'rgba(255,255,255,0.72)' }}>{app.name}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: 82,
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            {app.tagline}
          </span>
          <span
            style={{
              marginTop: 26,
              fontSize: 32,
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.35,
              maxWidth: 860,
            }}
          >
            Net worth, Zakat, goals and an AI coach — with your bank SMS logged automatically.
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 10, height: 10, borderRadius: 10, background: '#19cc50' }} />
          {/* Latin script only. Setting the language names in their own
              scripts (বাংলা, العربية, اردو) fails the build outright —
              Satori's fallback font has no shaping tables for them and
              throws "lookupType: 5 - substFormat: 3 is not yet supported".
              Rendering them natively would mean vendoring a Bengali and an
              Arabic font just for this card; not worth it for one line. */}
          <span style={{ fontSize: 26, color: 'rgba(255,255,255,0.45)' }}>
            English · Bangla · Arabic · Urdu
          </span>
        </div>
      </div>
    ),
    size
  );
}
