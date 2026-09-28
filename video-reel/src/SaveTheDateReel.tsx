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

// ==================== STYLES & CONSTANTS ====================
const FONT_SERIF = "'Playfair Display', Georgia, serif";
const FONT_EDITORIAL = "'Cormorant Garamond', Garamond, serif";
const FONT_SANS = "'Outfit', -apple-system, sans-serif";

const GOLD_METALLIC = 'linear-gradient(135deg, #A98338 0%, #D4AF37 35%, #FFF2B2 50%, #C5A059 70%, #8C6726 100%)';

export const SaveTheDateReel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Floating background ambient particles
  const particles = [
    { x: 180, y: 320, r: 4, speed: 0.8 },
    { x: 880, y: 460, r: 6, speed: 1.2 },
    { x: 300, y: 1200, r: 5, speed: 0.6 },
    { x: 750, y: 1450, r: 7, speed: 1.1 },
    { x: 540, y: 800, r: 3, speed: 0.9 },
    { x: 220, y: 1650, r: 6, speed: 1.4 },
    { x: 920, y: 1100, r: 5, speed: 0.7 },
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
      {/* Background Wedding Music Audio with smooth fade-in / fade-out */}
      <Audio
        src={staticFile('wedding_music.mp3')}
        volume={(f) =>
          interpolate(f, [0, 25, 420, 450], [0, 0.9, 0.9, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })
        }
      />

      {/* Ambient Floating Gold Dust Particles */}
      {particles.map((p, idx) => {
        const floatY = (frame * p.speed * 1.5) % 1920;
        const opacity = interpolate(Math.sin(frame * 0.05 + idx), [-1, 1], [0.2, 0.75]);
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
          inset: 50,
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
      {/* SCENE 1: WAX SEAL OPENING & SAVE THE DATE (Frames 0 - 110 / 0s - 3.6s) */}
      {/* ========================================================================= */}
      <Sequence from={0} durationInFrames={115}>
        <Scene1WaxSeal frame={frame} fps={fps} />
      </Sequence>

      {/* ========================================================================= */}
      {/* SCENE 2: COUPLE PORTRAIT & DESTELLO FLASH (Frames 105 - 230 / 3.5s - 7.6s) */}
      {/* ========================================================================= */}
      <Sequence from={105} durationInFrames={125}>
        <Scene2PhotoReveal frame={frame - 105} fps={fps} />
      </Sequence>

      {/* ========================================================================= */}
      {/* SCENE 3: DUAL CELEBRATION DATES (Frames 220 - 345 / 7.3s - 11.5s) */}
      {/* ========================================================================= */}
      <Sequence from={220} durationInFrames={125}>
        <Scene3Itinerary frame={frame - 220} fps={fps} />
      </Sequence>

      {/* ========================================================================= */}
      {/* SCENE 4: FINAL CALL TO ACTION & RSVP (Frames 335 - 450 / 11.1s - 15.0s) */}
      {/* ========================================================================= */}
      <Sequence from={335} durationInFrames={115}>
        <Scene4RSVPClose frame={frame - 335} fps={fps} />
      </Sequence>
    </AbsoluteFill>
  );
};

// ==================== SCENE 1: WAX SEAL OPENING ====================
const Scene1WaxSeal: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const sealScale = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

  const sealOpacity = interpolate(frame, [0, 15, 95, 110], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const letterSpacing = interpolate(frame, [0, 80], [6, 18], {
    extrapolateRight: 'clamp',
  });

  const pulse = Math.sin(frame * 0.1) * 0.04;

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
      <div style={{ transform: `scale(${sealScale + pulse})`, marginBottom: 60, position: 'relative' }}>
        {/* Pulsing Golden Aura */}
        <div
          style={{
            position: 'absolute',
            inset: -30,
            borderRadius: '50%',
            border: '2px solid rgba(212, 175, 55, 0.5)',
            boxShadow: '0 0 50px 10px rgba(212, 175, 55, 0.35)',
            transform: `scale(${1 + pulse * 2})`,
          }}
        />

        {/* 3D Real Wax Seal */}
        <div
          style={{
            width: 220,
            height: 220,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 30%, #FFFBE6 0%, #F8DA89 22%, #D4AF37 45%, #9E7422 75%, #593A0B 100%)',
            boxShadow: '0 35px 60px -10px rgba(60, 36, 10, 0.65), 0 15px 25px rgba(0, 0, 0, 0.3), inset 0 4px 8px rgba(255, 255, 255, 0.9), inset 0 -6px 12px rgba(45, 25, 5, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Inner stamped ring */}
          <div
            style={{
              width: 170,
              height: 170,
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
                fontSize: 68,
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
          fontSize: 82,
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
            fontSize: 90,
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
        Países Bajos • 2027
      </p>
    </AbsoluteFill>
  );
};

// ==================== SCENE 2: COUPLE PHOTO & FLASH FLARE ====================
const Scene2PhotoReveal: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const cardY = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9 },
  });

  const cardOpacity = interpolate(frame, [0, 15, 105, 120], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Destello flash opacity at reveal
  const flashOpacity = interpolate(frame, [15, 25, 45], [0, 0.95, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const photoScale = interpolate(frame, [0, 120], [1.08, 1.0], {
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
        transform: `translateY(${interpolate(cardY, [0, 1], [100, 0])}px)`,
        padding: '0 80px',
      }}
    >
      <div
        style={{
          backgroundColor: '#FAF7F0',
          borderRadius: 36,
          padding: '48px 40px',
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
            marginBottom: 24,
          }}
        >
          ✦ Nuestra Boda ✦
        </span>

        {/* Photo Container with Gilded Frame */}
        <div
          style={{
            width: 580,
            height: 720,
            borderRadius: 24,
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

          {/* Golden Flash Flare (Destello) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle, rgba(255,248,210,1) 0%, rgba(212,175,55,0.6) 50%, transparent 80%)',
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
              PAÍSES BAJOS • 2027
            </p>
          </div>
        </div>

        <p
          style={{
            fontFamily: FONT_EDITORIAL,
            fontStyle: 'italic',
            fontSize: 34,
            color: '#6E5020',
            marginTop: 32,
            marginBottom: 0,
            textAlign: 'center',
          }}
        >
          "Junto a nuestras familias, queremos compartir este sueño con ustedes"
        </p>
      </div>
    </AbsoluteFill>
  );
};

// ==================== SCENE 3: DUAL DATES & ITINERARY ====================
const Scene3Itinerary: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const cardOpacity = interpolate(frame, [0, 15, 105, 120], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const slideY = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9 },
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: cardOpacity,
        transform: `translateY(${interpolate(slideY, [0, 1], [80, 0])}px)`,
        padding: '0 80px',
      }}
    >
      <div
        style={{
          backgroundColor: '#FAF7F0',
          borderRadius: 36,
          padding: '54px 44px',
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
            marginBottom: 12,
          }}
        >
          ✦ Dos Momentos Inolvidables ✦
        </span>

        <h2
          style={{
            fontFamily: FONT_SERIF,
            fontSize: 56,
            color: '#2A1B0E',
            marginTop: 0,
            marginBottom: 44,
          }}
        >
          Fechas de Celebración
        </h2>

        {/* Event 1: Civil Ceremony */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#FFFDF9',
            border: '1.5px solid rgba(197, 160, 89, 0.45)',
            borderRadius: 24,
            padding: '28px 36px',
            marginBottom: 28,
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
              Ceremonia Civil
            </span>
            <h3 style={{ fontFamily: FONT_SERIF, fontSize: 38, color: '#2A1B0E', margin: '12px 0 4px' }}>
              Enlace Civil & Firma
            </h3>
            <p style={{ fontFamily: FONT_EDITORIAL, fontSize: 24, color: '#6E5020', margin: 0 }}>
              Países Bajos • 14:00 hrs
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontFamily: FONT_SERIF, fontSize: 52, fontWeight: 700, color: '#A98338' }}>21</span>
            <span style={{ display: 'block', fontFamily: FONT_SANS, fontSize: 18, letterSpacing: 2, color: '#58351C', fontWeight: 600 }}>
              ABRIL 2027
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
              Gran Celebración
            </span>
            <h3 style={{ fontFamily: FONT_SERIF, fontSize: 38, color: '#FFF', margin: '12px 0 4px' }}>
              Banquete & Gala
            </h3>
            <p style={{ fontFamily: FONT_EDITORIAL, fontSize: 24, color: '#DFBE7D', margin: 0 }}>
              Kasteel & Hotel Holandés • 16:30 hrs
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontFamily: FONT_SERIF, fontSize: 52, fontWeight: 700, color: '#FFF2B2' }}>01</span>
            <span style={{ display: 'block', fontFamily: FONT_SANS, fontSize: 18, letterSpacing: 2, color: '#DFBE7D', fontWeight: 600 }}>
              MAYO 2027
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ==================== SCENE 4: FINAL CALL TO ACTION & RSVP ====================
const Scene4RSVPClose: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const cardOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const scale = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.8 },
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
            width: 140,
            height: 140,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 30%, #FFFBE6 0%, #D4AF37 45%, #6B4716 100%)',
            boxShadow: '0 20px 40px rgba(60, 36, 10, 0.5), inset 0 2px 4px rgba(255,255,255,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 36,
          }}
        >
          <span style={{ fontFamily: FONT_EDITORIAL, fontSize: 52, fontWeight: 700, color: '#FFF8DB' }}>
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
          ✦ Confirmación de Asistencia ✦
        </p>

        <h2
          style={{
            fontFamily: FONT_SERIF,
            fontSize: 72,
            color: '#2A1B0E',
            margin: '0 0 24px',
          }}
        >
          ¡Los Esperamos!
        </h2>

        <div
          style={{
            backgroundColor: '#2A1B0E',
            color: '#FFF',
            border: '2px solid rgba(212, 175, 55, 0.7)',
            borderRadius: 50,
            padding: '20px 48px',
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
          <span>RSVP vía WhatsApp</span>
          <span>→</span>
        </div>

        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: 20,
            letterSpacing: 3,
            color: '#8C6726',
            fontWeight: 600,
            marginTop: 28,
            textTransform: 'uppercase',
          }}
        >
          ✦ Confirmar antes del 01 de Febrero 2027 ✦
        </p>
      </div>
    </AbsoluteFill>
  );
};
