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
const FONT_SCRIPT = "'Great Vibes', 'Alex Brush', cursive";
const FONT_SANS = "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const GOLD_METALLIC = 'linear-gradient(135deg, #A98338 0%, #D4AF37 35%, #FFF2B2 50%, #C5A059 70%, #8C6726 100%)';
const BURGUNDY = '#5B1E28';

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
          zIndex: 10,
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
      </div>

      {/* ==================== 5 MASTER VIDEO SEQUENCES (900 FRAMES = 30 SEC) ==================== */}

      {/* SCENE 1 (Frames 0 - 195 | 6.5s): THE EMBROIDERED ENVELOPE & WAX SEAL REVEAL */}
      <Sequence from={0} durationInFrames={195}>
        <Scene1Envelope frame={frame} fps={fps} lang={lang} />
      </Sequence>

      {/* SCENE 2 (Frames 175 - 375 | 6.6s): THE BAROQUE FLORAL ARCH CARTUCHE */}
      <Sequence from={175} durationInFrames={200}>
        <Scene2BaroqueCard frame={frame - 175} fps={fps} lang={lang} />
      </Sequence>

      {/* SCENE 3 (Frames 355 - 555 | 6.6s): THE WATERCOLOR VENUE (HOTEL REEHORST) */}
      <Sequence from={355} durationInFrames={200}>
        <Scene3Venue frame={frame - 355} fps={fps} lang={lang} />
      </Sequence>

      {/* SCENE 4 (Frames 535 - 735 | 6.6s): ITINERARY & OPEN BAR CELEBRATION */}
      <Sequence from={535} durationInFrames={200}>
        <Scene4Itinerary frame={frame - 535} fps={fps} lang={lang} />
      </Sequence>

      {/* SCENE 5 (Frames 715 - 900 | 6.2s): SAVE THE DATE & RSVP */}
      <Sequence from={715} durationInFrames={185}>
        <Scene5SaveTheDate frame={frame - 715} fps={fps} lang={lang} />
      </Sequence>
    </AbsoluteFill>
  );
};

// ==================== SCENE 1: THE EMBROIDERED ENVELOPE & WAX SEAL ====================
const Scene1Envelope: React.FC<{ frame: number; fps: number; lang: 'es' | 'nl' }> = ({ frame, fps, lang }) => {
  const scale = spring({
    frame,
    fps,
    config: { damping: 20, mass: 1.2 },
  });

  const opacity = interpolate(frame, [0, 25, 165, 195], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const bloomOpacity = interpolate(frame, [100, 130, 180], [0, 0.8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        textAlign: 'center',
        padding: '0 60px',
      }}
    >
      {/* Hook Text at top */}
      <p
        style={{
          fontFamily: FONT_SANS,
          fontSize: 32,
          fontWeight: 700,
          color: '#2A1B0E',
          marginBottom: 35,
          letterSpacing: 1,
        }}
      >
        You have never seen a wedding invitation like this 😍💍🥹
      </p>

      {/* Floating Envelope Mockup */}
      <div
        style={{
          transform: `scale(${scale})`,
          width: 760,
          height: 980,
          borderRadius: 36,
          overflow: 'hidden',
          boxShadow: '0 45px 90px -15px rgba(42, 27, 14, 0.4), 0 0 0 2px rgba(212, 175, 55, 0.5)',
          position: 'relative',
        }}
      >
        <Img
          src={staticFile('envelope_yg_hero.jpg')}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* Radiant Golden Light Burst upon opening */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle, rgba(255,248,210,0.9) 0%, rgba(212,175,55,0.4) 60%, transparent 80%)',
            opacity: bloomOpacity,
            pointerEvents: 'none',
          }}
        />

        {/* Tap Badge Overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(36, 23, 17, 0.92)',
            border: '1.5px solid rgba(212, 175, 55, 0.7)',
            borderRadius: 50,
            padding: '12px 34px',
            color: '#F3E8D2',
            fontFamily: FONT_SANS,
            fontSize: 20,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 4,
            boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
          }}
        >
          ✦ {lang === 'nl' ? 'Tik om te openen' : 'Toca el sello para abrir'} ✦
        </div>
      </div>

      <p
        style={{
          fontFamily: FONT_EDITORIAL,
          fontStyle: 'italic',
          fontSize: 34,
          color: '#6E5020',
          marginTop: 40,
        }}
      >
        Yeraldin & Gerwin • 2027
      </p>
    </AbsoluteFill>
  );
};

// ==================== SCENE 2: THE ROYAL BAROQUE FLORAL ARCH CARTUCHE ====================
const Scene2BaroqueCard: React.FC<{ frame: number; fps: number; lang: 'es' | 'nl' }> = ({ frame, fps, lang }) => {
  const cardScale = spring({
    frame,
    fps,
    config: { damping: 22, mass: 1.2 },
  });

  const opacity = interpolate(frame, [0, 25, 170, 200], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transform: `scale(${cardScale})`,
        padding: '0 60px',
      }}
    >
      {/* Baroque Floral Frame */}
      <div
        style={{
          width: 780,
          height: 1200,
          borderRadius: 36,
          overflow: 'hidden',
          boxShadow: '0 45px 90px -15px rgba(42, 27, 14, 0.4), 0 0 0 2px rgba(212, 175, 55, 0.5)',
          position: 'relative',
        }}
      >
        <Img
          src={staticFile('wooow_floral_frame_clean.jpg')}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* Central Overlay Typography */}
        <div
          style={{
            position: 'absolute',
            inset: '130px 100px 160px 100px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {/* Monogram Seal */}
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              border: '1.5px solid rgba(197, 160, 89, 0.6)',
              backgroundColor: 'rgba(255, 253, 247, 0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
              boxShadow: '0 4px 12px rgba(140, 103, 38, 0.15)',
            }}
          >
            <span style={{ fontFamily: FONT_EDITORIAL, fontWeight: 700, fontSize: 32, color: '#58351C' }}>
              Y&G
            </span>
          </div>

          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: 18,
              textTransform: 'uppercase',
              letterSpacing: 6,
              color: BURGUNDY,
              fontWeight: 700,
              margin: '0 0 8px 0',
            }}
          >
            {lang === 'nl' ? 'Huwelijksuitnodiging' : 'Save The Date & Invitación'}
          </p>

          <h2
            style={{
              fontFamily: FONT_SCRIPT,
              fontSize: 90,
              color: BURGUNDY,
              lineHeight: 1.0,
              margin: '6px 0',
            }}
          >
            Yeraldin
          </h2>
          <span
            style={{
              fontFamily: FONT_SCRIPT,
              fontSize: 56,
              background: GOLD_METALLIC,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '0',
            }}
          >
            &
          </span>
          <h2
            style={{
              fontFamily: FONT_SCRIPT,
              fontSize: 90,
              color: BURGUNDY,
              lineHeight: 1.0,
              margin: '6px 0 16px 0',
            }}
          >
            Gerwin
          </h2>

          {/* Diamond Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0' }}>
            <span style={{ fontSize: 16, color: '#A98338' }}>✦</span>
            <div style={{ width: 60, height: 1, backgroundColor: 'rgba(169, 131, 56, 0.5)' }} />
            <span style={{ fontSize: 14, color: '#A98338' }}>❖</span>
            <div style={{ width: 60, height: 1, backgroundColor: 'rgba(169, 131, 56, 0.5)' }} />
            <span style={{ fontSize: 16, color: '#A98338' }}>✦</span>
          </div>

          <p
            style={{
              fontFamily: FONT_SERIF,
              fontSize: 38,
              fontWeight: 700,
              color: '#2A1B0E',
              letterSpacing: 4,
              margin: '10px 0 2px 0',
            }}
          >
            2027-05-01
          </p>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: 16,
              textTransform: 'uppercase',
              letterSpacing: 4,
              color: '#58351C',
              fontWeight: 600,
              margin: 0,
            }}
          >
            {lang === 'nl' ? 'Groot Gala & Feest' : 'Gran Gala & Banquete'}
          </p>
        </div>
      </div>

      {/* Scroll indicator below */}
      <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: FONT_SANS, fontSize: 16, letterSpacing: 4, textTransform: 'uppercase', color: BURGUNDY, fontWeight: 700 }}>
          SCROLL FOR MORE DETAILS
        </span>
        <div style={{ width: 22, height: 38, border: `2px solid ${BURGUNDY}`, borderRadius: 20, display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
          <div style={{ width: 6, height: 10, backgroundColor: BURGUNDY, borderRadius: 4 }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ==================== SCENE 3: THE VENUE (HOTEL REEHORST WATERCOLOR) ====================
const Scene3Venue: React.FC<{ frame: number; fps: number; lang: 'es' | 'nl' }> = ({ frame, fps, lang }) => {
  const opacity = interpolate(frame, [0, 25, 170, 200], [0, 1, 1, 0], {
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
        opacity,
        transform: `translateY(${interpolate(slideY, [0, 1], [60, 0])}px)`,
        padding: '0 60px',
        textAlign: 'center',
      }}
    >
      <h3
        style={{
          fontFamily: FONT_SCRIPT,
          fontSize: 84,
          color: BURGUNDY,
          margin: '0 0 6px 0',
        }}
      >
        {lang === 'nl' ? 'De Locatie' : 'The Venue'}
      </h3>
      <p
        style={{
          fontFamily: FONT_EDITORIAL,
          fontStyle: 'italic',
          fontSize: 34,
          color: '#6E5020',
          margin: '0 0 30px 0',
        }}
      >
        Hotel & Congrescentrum ReeHorst
      </p>

      {/* Watercolor Venue Art */}
      <div
        style={{
          width: 740,
          height: 860,
          borderRadius: 36,
          overflow: 'hidden',
          boxShadow: '0 35px 70px rgba(42, 27, 14, 0.3), 0 0 0 1.5px rgba(212, 175, 55, 0.5)',
          position: 'relative',
        }}
      >
        <Img
          src={staticFile('venue_hotel_reehorst_luxury.jpg')}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* Circular GPS Pin Button */}
        <div
          style={{
            position: 'absolute',
            bottom: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 76,
            height: 76,
            borderRadius: '50%',
            backgroundColor: '#FFF',
            border: '3px solid #059669',
            boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 36,
          }}
        >
          📍
        </div>
      </div>

      <div style={{ marginTop: 28 }}>
        <p style={{ fontFamily: FONT_SERIF, fontSize: 32, fontWeight: 700, color: '#2A1B0E', margin: 0 }}>
          Bennekomseweg 24, 6717 LM Ede
        </p>
        <p style={{ fontFamily: FONT_SANS, fontSize: 20, color: '#8C6726', fontWeight: 600, marginTop: 6 }}>
          Gelderland • {lang === 'nl' ? 'Nederland' : 'Países Bajos'} (3 min NS Ede-Wageningen)
        </p>
      </div>
    </AbsoluteFill>
  );
};

// ==================== SCENE 4: ITINERARY & OPEN BAR ====================
const Scene4Itinerary: React.FC<{ frame: number; fps: number; lang: 'es' | 'nl' }> = ({ frame, fps, lang }) => {
  const opacity = interpolate(frame, [0, 25, 170, 200], [0, 1, 1, 0], {
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
        opacity,
        transform: `translateY(${interpolate(slideY, [0, 1], [60, 0])}px)`,
        padding: '0 60px',
      }}
    >
      <div
        style={{
          backgroundColor: '#FAF7F0',
          borderRadius: 38,
          padding: '48px 46px',
          width: '100%',
          maxWidth: 820,
          boxShadow: '0 40px 80px -15px rgba(42, 27, 14, 0.35), 0 0 0 1.5px rgba(212, 175, 55, 0.55)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h3 style={{ fontFamily: FONT_SCRIPT, fontSize: 72, color: BURGUNDY, margin: '0 0 8px 0' }}>
          Itinerary
        </h3>
        <p style={{ fontFamily: FONT_SANS, fontSize: 18, textTransform: 'uppercase', letterSpacing: 6, color: '#8C6726', fontWeight: 700, marginBottom: 30 }}>
          {lang === 'nl' ? '✦ Belangrijke Tijden ✦' : '✦ Momentos Clave ✦'}
        </p>

        {/* Timeline Row 1: Civil */}
        <div style={{ width: '100%', backgroundColor: '#FFFDF9', border: '1.5px solid rgba(197, 160, 89, 0.45)', borderRadius: 20, padding: '20px 28px', marginBottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontFamily: FONT_SANS, fontSize: 15, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, backgroundColor: '#F3E8D2', color: '#58351C', padding: '3px 12px', borderRadius: 15 }}>
              21 ABRIL 2027
            </span>
            <h4 style={{ fontFamily: FONT_SERIF, fontSize: 30, color: '#2A1B0E', margin: '8px 0 2px' }}>
              {lang === 'nl' ? 'Burgerlijk Huwelijk' : 'Boda Civil Oficial'}
            </h4>
            <p style={{ fontFamily: FONT_EDITORIAL, fontSize: 22, color: '#6E5020', margin: 0 }}>
              10:00 hrs • Países Bajos
            </p>
          </div>
          <span style={{ fontSize: 38 }}>💍</span>
        </div>

        {/* Timeline Row 2: Banquet */}
        <div style={{ width: '100%', backgroundColor: '#1A120B', border: '2px solid rgba(212, 175, 55, 0.7)', borderRadius: 20, padding: '20px 28px', marginBottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#FFF' }}>
          <div>
            <span style={{ fontFamily: FONT_SANS, fontSize: 15, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, backgroundColor: 'rgba(212, 175, 55, 0.3)', color: '#FFE8A3', padding: '3px 12px', borderRadius: 15 }}>
              01 MAYO 2027 • REEHORST
            </span>
            <h4 style={{ fontFamily: FONT_SERIF, fontSize: 30, color: '#FFF', margin: '8px 0 2px' }}>
              {lang === 'nl' ? 'Diner & Feest' : 'Banquete & Gran Fiesta'}
            </h4>
            <p style={{ fontFamily: FONT_EDITORIAL, fontSize: 22, color: '#DFBE7D', margin: 0 }}>
              20:00 - 02:00 hrs • Salón de Gala
            </p>
          </div>
          <span style={{ fontSize: 38 }}>🥂</span>
        </div>

        {/* Open Bar Highlight */}
        <div style={{ width: '100%', backgroundColor: '#FAF2E2', border: '1.5px dashed rgba(212, 175, 55, 0.7)', borderRadius: 20, padding: '18px 24px', textAlign: 'center' }}>
          <p style={{ fontFamily: FONT_SANS, fontSize: 16, textTransform: 'uppercase', letterSpacing: 3, color: BURGUNDY, fontWeight: 700, margin: '0 0 4px 0' }}>
            🍸 {lang === 'nl' ? '4 Uur Open Bar Inbegrepen' : '4 Horas de Barra Libre Incluida'}
          </p>
          <p style={{ fontFamily: FONT_EDITORIAL, fontSize: 22, color: '#2A1B0E', margin: 0 }}>
            {lang === 'nl'
              ? 'Bier, wijn & frisdrank inbegrepen voor alle gasten.'
              : 'Cerveza, vino y refrescos incluidos para todos los invitados.'}
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ==================== SCENE 5: SAVE THE DATE & RSVP ====================
const Scene5SaveTheDate: React.FC<{ frame: number; fps: number; lang: 'es' | 'nl' }> = ({ frame, fps, lang }) => {
  const opacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
  });

  const scale = spring({
    frame,
    fps,
    config: { damping: 20, mass: 1.2 },
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transform: `scale(${scale})`,
        padding: '0 80px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: 140,
          height: 140,
          borderRadius: '50%',
          border: '2px solid rgba(212, 175, 55, 0.6)',
          backgroundColor: '#FFFDF9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 30,
          boxShadow: '0 15px 35px rgba(140, 103, 38, 0.2)',
        }}
      >
        <span style={{ fontFamily: FONT_EDITORIAL, fontWeight: 700, fontSize: 56, color: '#58351C' }}>
          Y&G
        </span>
      </div>

      <h2
        style={{
          fontFamily: FONT_SCRIPT,
          fontSize: 100,
          color: BURGUNDY,
          lineHeight: 1.0,
          margin: 0,
        }}
      >
        Save The Date
      </h2>

      <p
        style={{
          fontFamily: FONT_SERIF,
          fontSize: 48,
          fontWeight: 700,
          color: '#2A1B0E',
          margin: '20px 0 10px',
        }}
      >
        01 • MAYO • 2027
      </p>

      <p
        style={{
          fontFamily: FONT_SANS,
          fontSize: 24,
          textTransform: 'uppercase',
          letterSpacing: 6,
          color: '#8C6726',
          fontWeight: 600,
          margin: '0 0 40px 0',
        }}
      >
        Hotel ReeHorst • Ede, Países Bajos
      </p>

      <div
        style={{
          backgroundColor: BURGUNDY,
          borderRadius: 50,
          padding: '18px 50px',
          color: '#FFF',
          fontFamily: FONT_SANS,
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: 4,
          textTransform: 'uppercase',
          boxShadow: '0 15px 35px rgba(91, 30, 40, 0.4)',
        }}
      >
        ✦ RSVP: yeraldin-gerwin.wedding ✦
      </div>

      <p
        style={{
          fontFamily: FONT_EDITORIAL,
          fontStyle: 'italic',
          fontSize: 30,
          color: '#6E5020',
          marginTop: 40,
        }}
      >
        {lang === 'nl' ? 'We kunnen niet wachten om dit te vieren!' : '¡Los esperamos para celebrar nuestro amor!'}
      </p>
    </AbsoluteFill>
  );
};
