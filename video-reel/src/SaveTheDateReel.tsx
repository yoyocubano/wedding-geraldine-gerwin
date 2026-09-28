import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

// ==================== STYLES & FONTS ====================
const FONT_SERIF = "'Playfair Display', Georgia, serif";
const FONT_EDITORIAL = "'Cormorant Garamond', Garamond, serif";
const FONT_SANS = "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const GOLD_METALLIC = 'linear-gradient(135deg, #A98338 0%, #D4AF37 35%, #FFF2B2 50%, #C5A059 70%, #8C6726 100%)';

export interface ReelProps {
  lang?: 'es' | 'nl';
}

export const SaveTheDateReel: React.FC<ReelProps> = ({ lang = 'es' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Floating background ambient particles
  const particles = [
    { x: 160, y: 300, r: 4, speed: 0.6 },
    { x: 900, y: 420, r: 6, speed: 0.8 },
    { x: 280, y: 1150, r: 5, speed: 0.5 },
    { x: 780, y: 1400, r: 7, speed: 0.7 },
    { x: 520, y: 750, r: 3, speed: 0.6 },
    { x: 200, y: 1600, r: 6, speed: 0.9 },
    { x: 920, y: 1050, r: 5, speed: 0.5 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FAF5EB',
        backgroundImage: 'radial-gradient(circle at 50% 30%, #FFFDF7 0%, #FAF5EB 60%, #EFE8DA 100%)',
        color: '#2A1B0E',
        fontFamily: FONT_EDITORIAL,
        overflow: 'hidden',
      }}
    >
      {/* 30-Second Extended Wedding Music with gentle fade-in and luxury fade-out */}
      <Audio
        src={staticFile('wedding_music_30s.mp3')}
        volume={(f) =>
          interpolate(f, [0, 45, 830, 900], [0, 0.9, 0.9, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })
        }
      />

      {/* Ambient Floating Gold Dust Particles */}
      {particles.map((p, idx) => {
        const floatY = (frame * p.speed * 1.2) % 1920;
        const opacity = interpolate(Math.sin(frame * 0.03 + idx), [-1, 1], [0.2, 0.7]);
        return (
          <div
            key={idx}
            style={{
              position: 'absolute',
              left: p.x,
              top: (p.y - floatY + 1920) % 1920,
              width: p.r * 2,
              height: p.r * 2,
              borderRadius: '50%',
              background: 'radial-gradient(circle, #FFF5C0 0%, #D4AF37 60%, transparent 100%)',
              opacity,
              pointerEvents: 'none',
            }}
          />
        );
      })}

      {/* Decorative Outer Hairline Stationery Border */}
      <div
        style={{
          position: 'absolute',
          inset: 48,
          border: '1.5px solid rgba(197, 160, 89, 0.45)',
          borderRadius: 40,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 16,
            border: '1px solid rgba(197, 160, 89, 0.25)',
            borderRadius: 28,
          }}
        />
        {/* Corner florets */}
        <span style={{ position: 'absolute', top: 24, left: 24, fontSize: 24, color: '#C5A059' }}>✦</span>
        <span style={{ position: 'absolute', top: 24, right: 24, fontSize: 24, color: '#C5A059' }}>✦</span>
        <span style={{ position: 'absolute', bottom: 24, left: 24, fontSize: 24, color: '#C5A059' }}>✦</span>
        <span style={{ position: 'absolute', bottom: 24, right: 24, fontSize: 24, color: '#C5A059' }}>✦</span>
      </div>

      {/* ========================================================================= */}
      {/* SCENE 1: WAX SEAL OPENING & SAVE THE DATE (Frames 0 - 190 / ~6.3s)         */}
      {/* ========================================================================= */}
      <Sequence from={0} durationInFrames={195}>
        <Scene1WaxSeal frame={frame} fps={fps} lang={lang} />
      </Sequence>

      {/* ========================================================================= */}
      {/* SCENE 2: COUPLE PORTRAIT & SOFT GOLD FLARE (Frames 175 - 375 / ~6.6s)     */}
      {/* ========================================================================= */}
      <Sequence from={175} durationInFrames={200}>
        <Scene2PhotoReveal frame={frame - 175} fps={fps} lang={lang} />
      </Sequence>

      {/* ========================================================================= */}
      {/* SCENE 3: DUAL CELEBRATION DATES (Frames 355 - 555 / ~6.6s)                */}
      {/* ========================================================================= */}
      <Sequence from={355} durationInFrames={200}>
        <Scene3Itinerary frame={frame - 355} fps={fps} lang={lang} />
      </Sequence>

      {/* ========================================================================= */}
      {/* SCENE 4: FAQ & TRAVEL GUIDE (Frames 535 - 735 / ~6.6s)                    */}
      {/* ========================================================================= */}
      <Sequence from={535} durationInFrames={200}>
        <Scene4FAQ frame={frame - 535} fps={fps} lang={lang} />
      </Sequence>

      {/* ========================================================================= */}
      {/* SCENE 5: FINAL CALL TO ACTION & RSVP (Frames 715 - 900 / ~6.2s)           */}
      {/* ========================================================================= */}
      <Sequence from={715} durationInFrames={185}>
        <Scene5RSVPClose frame={frame - 715} fps={fps} lang={lang} />
      </Sequence>
    </AbsoluteFill>
  );
};

// ==================== SCENE 1: WAX SEAL OPENING ====================
const Scene1WaxSeal: React.FC<{ frame: number; fps: number; lang: 'es' | 'nl' }> = ({ frame, fps, lang }) => {
  // Ultra-smooth luxurious damping
  const sealScale = spring({
    frame,
    fps,
    config: { damping: 20, mass: 1.2 },
  });

  // Slow, cinematic fade-in and smooth fade-out
  const sealOpacity = interpolate(frame, [0, 30, 160, 190], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const letterSpacing = interpolate(frame, [0, 120], [6, 16], {
    extrapolateRight: 'clamp',
  });

  const pulse = Math.sin(frame * 0.06) * 0.03;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: sealOpacity,
        textAlign: 'center',
        padding: '0 80px',
      }}
    >
      <div style={{ transform: `scale(${sealScale + pulse})`, marginBottom: 65, position: 'relative' }}>
        {/* Pulsing Golden Aura */}
        <div
          style={{
            position: 'absolute',
            inset: -35,
            borderRadius: '50%',
            border: '2px solid rgba(212, 175, 55, 0.45)',
            boxShadow: '0 0 60px 12px rgba(212, 175, 55, 0.35)',
            transform: `scale(${1 + pulse * 2})`,
          }}
        />

        {/* 3D Real Wax Seal */}
        <div
          style={{
            width: 230,
            height: 230,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 30%, #FFFBE6 0%, #F8DA89 22%, #D4AF37 45%, #9E7422 75%, #593A0B 100%)',
            boxShadow: '0 38px 65px -10px rgba(60, 36, 10, 0.65), 0 15px 25px rgba(0, 0, 0, 0.28), inset 0 4px 8px rgba(255, 255, 255, 0.9), inset 0 -6px 12px rgba(45, 25, 5, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Inner stamped ring */}
          <div
            style={{
              width: 178,
              height: 178,
              borderRadius: '50%',
              border: '3px dashed rgba(255, 245, 200, 0.6)',
              boxShadow: 'inset 0 6px 12px rgba(45, 25, 5, 0.7), inset 0 -2px 5px rgba(255, 255, 255, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'radial-gradient(circle at 40% 35%, #CFA551 0%, #A3792A 60%, #785315 100%)',
            }}
          >
            <span
              style={{
                fontFamily: FONT_EDITORIAL,
                fontWeight: 700,
                fontSize: 70,
                color: '#FFF8DB',
                letterSpacing: -2,
                textShadow: '0 2px 4px rgba(0,0,0,0.7)',
              }}
            >
              G&G
            </span>
            <span
              style={{
                fontFamily: FONT_SANS,
                fontSize: 18,
                letterSpacing: 6,
                color: '#FFE8A3',
                fontWeight: 700,
                marginTop: -4,
              }}
            >
              2027
            </span>
          </div>
        </div>
      </div>

      <p
        style={{
          fontFamily: FONT_SANS,
          fontSize: 26,
          textTransform: 'uppercase',
          letterSpacing,
          color: '#8C6726',
          fontWeight: 600,
          marginBottom: 16,
        }}
      >
        ✦ Save The Date ✦
      </p>

      <h1
        style={{
          fontFamily: FONT_SERIF,
          fontSize: 84,
          color: '#2A1B0E',
          lineHeight: 1.1,
          margin: 0,
        }}
      >
        Geraldine
        <span
          style={{
            display: 'block',
            fontFamily: "'Alex Brush', cursive",
            fontSize: 92,
            background: GOLD_METALLIC,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '8px 0',
          }}
        >
          &
        </span>
        Gerwin
      </h1>

      <p
        style={{
          fontFamily: FONT_EDITORIAL,
          fontStyle: 'italic',
          fontSize: 34,
          color: '#6E5020',
          marginTop: 24,
        }}
      >
        {lang === 'nl' ? 'Nederland • 2027' : 'Países Bajos • 2027'}
      </p>
    </AbsoluteFill>
  );
};

// ==================== SCENE 2: COUPLE PHOTO & SOFT FLARE ====================
const Scene2PhotoReveal: React.FC<{ frame: number; fps: number; lang: 'es' | 'nl' }> = ({ frame, fps, lang }) => {
  const cardY = spring({
    frame,
    fps,
    config: { damping: 22, mass: 1.2 },
  });

  const cardOpacity = interpolate(frame, [0, 25, 165, 195], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Softer, prolonged golden destello flare
  const flashOpacity = interpolate(frame, [20, 45, 80], [0, 0.75, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const photoScale = interpolate(frame, [0, 195], [1.06, 1.0], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: cardOpacity,
        transform: `translateY(${interpolate(cardY, [0, 1], [80, 0])}px)`,
        padding: '0 80px',
      }}
    >
      <div
        style={{
          backgroundColor: '#FAF7F0',
          borderRadius: 38,
          padding: '46px 40px',
          width: '100%',
          maxWidth: 820,
          boxShadow: '0 40px 80px -15px rgba(42, 27, 14, 0.35), 0 0 0 1.5px rgba(212, 175, 55, 0.55)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <span
          style={{
            fontFamily: FONT_SANS,
            fontSize: 20,
            textTransform: 'uppercase',
            letterSpacing: 8,
            color: '#8C6726',
            fontWeight: 600,
            marginBottom: 22,
          }}
        >
          {lang === 'nl' ? '✦ Onze Bruiloft ✦' : '✦ Nuestra Boda ✦'}
        </span>

        {/* Photo Container with Gilded Frame */}
        <div
          style={{
            width: 580,
            height: 720,
            borderRadius: 26,
            overflow: 'hidden',
            border: '3px solid rgba(212, 175, 55, 0.7)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
            position: 'relative',
          }}
        >
          <Img
            src={staticFile('geraldine_profile.jpg')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${photoScale})`,
            }}
          />

          {/* Golden Flash Flare (Destello Suave) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle, rgba(255,248,210,0.95) 0%, rgba(212,175,55,0.45) 50%, transparent 80%)',
              opacity: flashOpacity,
              pointerEvents: 'none',
            }}
          />

          {/* Bottom Gradient Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 'auto 0 0 0',
              padding: '40px 20px 20px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
              textAlign: 'center',
              color: '#FFF',
            }}
          >
            <p style={{ fontFamily: FONT_SERIF, fontSize: 36, margin: 0 }}>Geraldine & Gerwin</p>
            <p style={{ fontFamily: FONT_SANS, fontSize: 16, letterSpacing: 4, color: '#FFE8A3', marginTop: 4 }}>
              {lang === 'nl' ? 'NEDERLAND • 2027' : 'PAÍSES BAJOS • 2027'}
            </p>
          </div>
        </div>

        <p
          style={{
            fontFamily: FONT_EDITORIAL,
            fontStyle: 'italic',
            fontSize: 32,
            color: '#6E5020',
            marginTop: 30,
            marginBottom: 0,
            textAlign: 'center',
            lineHeight: 1.25,
          }}
        >
          {lang === 'nl'
            ? '“Samen met onze families willen we deze droom met jullie delen”'
            : '“Junto a nuestras familias, queremos compartir este sueño con ustedes”'}
        </p>
      </div>
    </AbsoluteFill>
  );
};

// ==================== SCENE 3: DUAL DATES & ITINERARY ====================
const Scene3Itinerary: React.FC<{ frame: number; fps: number; lang: 'es' | 'nl' }> = ({ frame, fps, lang }) => {
  const cardOpacity = interpolate(frame, [0, 25, 165, 195], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const slideY = spring({
    frame,
    fps,
    config: { damping: 22, mass: 1.2 },
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: cardOpacity,
        transform: `translateY(${interpolate(slideY, [0, 1], [70, 0])}px)`,
        padding: '0 80px',
      }}
    >
      <div
        style={{
          backgroundColor: '#FAF7F0',
          borderRadius: 38,
          padding: '50px 42px',
          width: '100%',
          maxWidth: 840,
          boxShadow: '0 40px 80px -15px rgba(42, 27, 14, 0.35), 0 0 0 1.5px rgba(212, 175, 55, 0.55)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: FONT_SANS,
            fontSize: 20,
            textTransform: 'uppercase',
            letterSpacing: 8,
            color: '#8C6726',
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          {lang === 'nl' ? '✦ Twee Onvergetelijke Momenten ✦' : '✦ Dos Momentos Inolvidables ✦'}
        </span>

        <h2
          style={{
            fontFamily: FONT_SERIF,
            fontSize: 54,
            color: '#2A1B0E',
            marginTop: 0,
            marginBottom: 40,
          }}
        >
          {lang === 'nl' ? 'Huwelijksdata' : 'Fechas de Celebración'}
        </h2>

        {/* Event 1: Civil Ceremony */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#FFFDF9',
            border: '1.5px solid rgba(197, 160, 89, 0.45)',
            borderRadius: 24,
            padding: '28px 36px',
            marginBottom: 26,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 10px 25px rgba(140, 103, 38, 0.08)',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: FONT_SANS,
                fontSize: 16,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 3,
                backgroundColor: '#F3E8D2',
                color: '#58351C',
                padding: '4px 14px',
                borderRadius: 20,
              }}
            >
              {lang === 'nl' ? 'Burgerlijk Huwelijk' : 'Ceremonia Civil'}
            </span>
            <h3 style={{ fontFamily: FONT_SERIF, fontSize: 36, color: '#2A1B0E', margin: '12px 0 4px' }}>
              {lang === 'nl' ? 'Huwelijksvoltrekking & Handtekening' : 'Enlace Civil & Firma'}
            </h3>
            <p style={{ fontFamily: FONT_EDITORIAL, fontSize: 24, color: '#6E5020', margin: 0 }}>
              {lang === 'nl' ? 'Nederland • 14:00 uur' : 'Países Bajos • 14:00 hrs'}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontFamily: FONT_SERIF, fontSize: 52, fontWeight: 700, color: '#A98338' }}>21</span>
            <span style={{ display: 'block', fontFamily: FONT_SANS, fontSize: 18, letterSpacing: 2, color: '#58351C', fontWeight: 600 }}>
              {lang === 'nl' ? 'APRIL 2027' : 'ABRIL 2027'}
            </span>
          </div>
        </div>

        {/* Event 2: Grand Gala Celebration */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#2A1B0E',
            border: '2px solid rgba(212, 175, 55, 0.7)',
            borderRadius: 24,
            padding: '28px 36px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 20px 40px rgba(42, 27, 14, 0.35)',
            color: '#FFF',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: FONT_SANS,
                fontSize: 16,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 3,
                backgroundColor: 'rgba(212, 175, 55, 0.3)',
                color: '#FFE8A3',
                padding: '4px 14px',
                borderRadius: 20,
              }}
            >
              {lang === 'nl' ? 'Grote Viering' : 'Gran Celebración'}
            </span>
            <h3 style={{ fontFamily: FONT_SERIF, fontSize: 36, color: '#FFF', margin: '12px 0 4px' }}>
              {lang === 'nl' ? 'Huwelijksfeest & Receptie' : 'Banquete & Gala'}
            </h3>
            <p style={{ fontFamily: FONT_EDITORIAL, fontSize: 24, color: '#DFBE7D', margin: 0 }}>
              {lang === 'nl' ? 'Kasteel & Hotel Nederland • 16:30 uur' : 'Kasteel & Hotel Holandés • 16:30 hrs'}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontFamily: FONT_SERIF, fontSize: 52, fontWeight: 700, color: '#FFF2B2' }}>01</span>
            <span style={{ display: 'block', fontFamily: FONT_SANS, fontSize: 18, letterSpacing: 2, color: '#DFBE7D', fontWeight: 600 }}>
              {lang === 'nl' ? 'MEI 2027' : 'MAYO 2027'}
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ==================== SCENE 4: FAQ / PREGUNTAS FRECUENTES ====================
const Scene4FAQ: React.FC<{ frame: number; fps: number; lang: 'es' | 'nl' }> = ({ frame, fps, lang }) => {
  const cardOpacity = interpolate(frame, [0, 25, 165, 195], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const slideY = spring({
    frame,
    fps,
    config: { damping: 22, mass: 1.2 },
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: cardOpacity,
        transform: `translateY(${interpolate(slideY, [0, 1], [70, 0])}px)`,
        padding: '0 80px',
      }}
    >
      <div
        style={{
          backgroundColor: '#FAF7F0',
          borderRadius: 38,
          padding: '48px 40px',
          width: '100%',
          maxWidth: 840,
          boxShadow: '0 40px 80px -15px rgba(42, 27, 14, 0.35), 0 0 0 1.5px rgba(212, 175, 55, 0.55)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: FONT_SANS,
            fontSize: 20,
            textTransform: 'uppercase',
            letterSpacing: 8,
            color: '#8C6726',
            fontWeight: 600,
            marginBottom: 8,
          }}
        >
          {lang === 'nl' ? '✦ Gastengids ✦' : '✦ Guía del Invitado ✦'}
        </span>

        <h2
          style={{
            fontFamily: FONT_SERIF,
            fontSize: 52,
            color: '#2A1B0E',
            marginTop: 0,
            marginBottom: 36,
          }}
        >
          {lang === 'nl' ? 'Veelgestelde Vragen' : 'Preguntas Frecuentes'}
        </h2>

        {/* Item 1: Dress Code */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#FFFDF9',
            border: '1.5px solid rgba(197, 160, 89, 0.45)',
            borderRadius: 22,
            padding: '22px 28px',
            marginBottom: 20,
            boxShadow: '0 8px 20px rgba(140, 103, 38, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
            <span style={{ fontSize: 24, color: '#C5A059' }}>✦</span>
            <span
              style={{
                fontFamily: FONT_SANS,
                fontSize: 18,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 2,
                color: '#58351C',
              }}
            >
              {lang === 'nl' ? 'Kledingvoorschrift (Dress Code)' : 'Código de Vestimenta'}
            </span>
          </div>
          <p
            style={{
              fontFamily: FONT_EDITORIAL,
              fontSize: 26,
              color: '#2A1B0E',
              margin: '4px 0 0 36px',
              lineHeight: 1.3,
            }}
          >
            {lang === 'nl'
              ? 'Gala & Black Tie Optional • Heren smoking/donker pak, dames lange galajurk.'
              : 'Gala & Black Tie Optional • Hombres traje formal/esmoquin, mujeres vestido largo.'}
          </p>
        </div>

        {/* Item 2: Children & Party */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#FFFDF9',
            border: '1.5px solid rgba(197, 160, 89, 0.45)',
            borderRadius: 22,
            padding: '22px 28px',
            marginBottom: 20,
            boxShadow: '0 8px 20px rgba(140, 103, 38, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
            <span style={{ fontSize: 24, color: '#C5A059' }}>✦</span>
            <span
              style={{
                fontFamily: FONT_SANS,
                fontSize: 18,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 2,
                color: '#58351C',
              }}
            >
              {lang === 'nl' ? 'Kinderen & Viering' : 'Niños y Acompañantes'}
            </span>
          </div>
          <p
            style={{
              fontFamily: FONT_EDITORIAL,
              fontSize: 26,
              color: '#2A1B0E',
              margin: '4px 0 0 36px',
              lineHeight: 1.3,
            }}
          >
            {lang === 'nl'
              ? 'Volwassenenfeest op 1 mei zodat iedereen zorgeloos kan dansen en genieten.'
              : 'Celebración para adultos el 1 de Mayo para bailar y disfrutar al máximo.'}
          </p>
        </div>

        {/* Item 3: Travel & Stay */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#FFFDF9',
            border: '1.5px solid rgba(197, 160, 89, 0.45)',
            borderRadius: 22,
            padding: '22px 28px',
            boxShadow: '0 8px 20px rgba(140, 103, 38, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
            <span style={{ fontSize: 24, color: '#C5A059' }}>✦</span>
            <span
              style={{
                fontFamily: FONT_SANS,
                fontSize: 18,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 2,
                color: '#58351C',
              }}
            >
              {lang === 'nl' ? 'Reis & Verblijf' : 'Vuelos & Alojamiento'}
            </span>
          </div>
          <p
            style={{
              fontFamily: FONT_EDITORIAL,
              fontSize: 26,
              color: '#2A1B0E',
              margin: '4px 0 0 36px',
              lineHeight: 1.3,
            }}
          >
            {lang === 'nl'
              ? 'Vlieg naar Schiphol (AMS) • Kamerblok gereserveerd bij het feesthotel.'
              : 'Vuelos directos a Schiphol (AMS) • Bloque de habitaciones reservado en hotel sede.'}
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ==================== SCENE 5: FINAL CALL TO ACTION & RSVP ====================
const Scene5RSVPClose: React.FC<{ frame: number; fps: number; lang: 'es' | 'nl' }> = ({ frame, fps, lang }) => {
  const cardOpacity = interpolate(frame, [0, 25, 155, 185], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = spring({
    frame,
    fps,
    config: { damping: 20, mass: 1.1 },
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: cardOpacity,
        textAlign: 'center',
        padding: '0 80px',
      }}
    >
      <div style={{ transform: `scale(${scale})`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Monogram Seal */}
        <div
          style={{
            width: 145,
            height: 145,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 30%, #FFFBE6 0%, #D4AF37 45%, #6B4716 100%)',
            boxShadow: '0 25px 45px rgba(60, 36, 10, 0.5), inset 0 2px 4px rgba(255,255,255,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 36,
          }}
        >
          <span style={{ fontFamily: FONT_EDITORIAL, fontSize: 54, fontWeight: 700, color: '#FFF8DB' }}>
            G&G
          </span>
        </div>

        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: 22,
            letterSpacing: 8,
            textTransform: 'uppercase',
            color: '#8C6726',
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          {lang === 'nl' ? '✦ Bevestiging van Aanwezigheid ✦' : '✦ Confirmación de Asistencia ✦'}
        </p>

        <h2
          style={{
            fontFamily: FONT_SERIF,
            fontSize: 72,
            color: '#2A1B0E',
            margin: '0 0 26px',
          }}
        >
          {lang === 'nl' ? 'Wij Verheugen Ons!' : '¡Los Esperamos!'}
        </h2>

        <div
          style={{
            backgroundColor: '#2A1B0E',
            color: '#FFF',
            border: '2px solid rgba(212, 175, 55, 0.7)',
            borderRadius: 50,
            padding: '22px 50px',
            fontSize: 26,
            fontFamily: FONT_SANS,
            letterSpacing: 4,
            textTransform: 'uppercase',
            fontWeight: 700,
            boxShadow: '0 20px 45px rgba(42, 27, 14, 0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <span>{lang === 'nl' ? 'RSVP via WhatsApp' : 'RSVP vía WhatsApp'}</span>
          <span>→</span>
        </div>

        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: 20,
            letterSpacing: 3,
            color: '#8C6726',
            fontWeight: 600,
            marginTop: 30,
            textTransform: 'uppercase',
          }}
        >
          {lang === 'nl' ? '✦ Gelieve te reageren vóór 1 Februari 2027 ✦' : '✦ Confirmar antes del 01 de Febrero 2027 ✦'}
        </p>
      </div>
    </AbsoluteFill>
  );
};
