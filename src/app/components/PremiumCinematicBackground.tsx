'use client';

import { useMemo } from 'react';

export function PremiumCinematicBackground() {
  // Generate background particles (12 particles)
  const backgroundParticles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const xStartPercent = Math.random() * 100;
        const yStartPercent = Math.random() * 100;

        // Calculate pixel offsets (using typical viewport for SSR)
        const vw = typeof window !== 'undefined' ? window.innerWidth : 1920;
        const vh = typeof window !== 'undefined' ? window.innerHeight : 1080;

        const xOffsetPx = (Math.random() - 0.5) * (vw * 0.4); // -20% to +20% of viewport
        const yOffsetPx = (Math.random() - 0.5) * (vh * 0.4);

        const lightDuration = 25 + Math.random() * 15; // 25-40s for light mode
        const darkDuration = 40 + Math.random() * 15; // 40-55s for dark mode

        const colorIndex = Math.floor(Math.random() * 4);

        return {
          id: i,
          xStart: `${xStartPercent}%`,
          yStart: `${yStartPercent}%`,
          xStartPx: '0px', // Start at element position (no translation)
          yStartPx: '0px',
          xMidPx: `${xOffsetPx}px`, // Offset from start
          yMidPx: `${yOffsetPx}px`,
          duration: `${lightDuration}s`,
          darkDuration: `${darkDuration}s`,
          color: [
            'rgba(255, 255, 255, 0.12)',
            'rgba(79, 227, 193, 0.08)',
            'rgba(255, 119, 233, 0.08)',
            'rgba(198, 156, 255, 0.08)',
          ][colorIndex],
          darkColor: [
            'rgba(255, 255, 255, 0.06)',
            'rgba(52, 209, 172, 0.04)',
            'rgba(163, 128, 242, 0.04)',
            'rgba(227, 96, 207, 0.035)',
          ][colorIndex],
        };
      }),
    [],
  );

  // Generate midground (bokeh) particles (8 particles)
  const bokehParticles = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => {
        const xStartPercent = Math.random() * 100;
        const yStartPercent = Math.random() * 100;

        const vw = typeof window !== 'undefined' ? window.innerWidth : 1920;
        const vh = typeof window !== 'undefined' ? window.innerHeight : 1080;

        const xOffsetPx = (Math.random() - 0.5) * (vw * 0.3); // -15% to +15%
        const yOffsetPx = (Math.random() - 0.5) * (vh * 0.3);

        const lightDuration = 20 + Math.random() * 15; // 20-35s for light mode
        const darkDuration = 28 + Math.random() * 12; // 28-40s for dark mode

        const colorIndex = Math.floor(Math.random() * 3);

        return {
          id: i,
          xStart: `${xStartPercent}%`,
          yStart: `${yStartPercent}%`,
          xStartPx: '0px',
          yStartPx: '0px',
          xMidPx: `${xOffsetPx}px`,
          yMidPx: `${yOffsetPx}px`,
          duration: `${lightDuration}s`,
          darkDuration: `${darkDuration}s`,
          color: [
            'rgba(255, 255, 255, 0.12)',
            'rgba(79, 227, 193, 0.08)',
            'rgba(255, 119, 233, 0.08)',
          ][colorIndex],
          darkColor: [
            'rgba(255, 255, 255, 0.11)',
            'rgba(52, 209, 172, 0.10)',
            'rgba(163, 128, 242, 0.09)',
          ][colorIndex],
        };
      }),
    [],
  );

  // Generate foreground dust particles (30 particles)
  const foregroundParticles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => {
        const xStartPercent = Math.random() * 100;
        const yStartPercent = Math.random() * 100;

        const vw = typeof window !== 'undefined' ? window.innerWidth : 1920;
        const vh = typeof window !== 'undefined' ? window.innerHeight : 1080;

        const xOffsetPx = (Math.random() - 0.5) * (vw * 0.2); // -10% to +10%
        const yOffsetPx = (Math.random() - 0.5) * (vh * 0.2);

        const lightDuration = 15 + Math.random() * 10; // 15-25s for light mode
        const darkDuration = 14 + Math.random() * 8; // 14-22s for dark mode

        const colorIndex = Math.floor(Math.random() * 2);

        return {
          id: i,
          xStart: `${xStartPercent}%`,
          yStart: `${yStartPercent}%`,
          xStartPx: '0px',
          yStartPx: '0px',
          xMidPx: `${xOffsetPx}px`,
          yMidPx: `${yOffsetPx}px`,
          duration: `${lightDuration}s`,
          darkDuration: `${darkDuration}s`,
          color: ['rgba(255, 255, 255, 0.12)', 'rgba(79, 227, 193, 0.08)'][
            colorIndex
          ],
          darkColor: ['rgba(255, 255, 255, 0.22)', 'rgba(220, 220, 220, 0.18)'][
            colorIndex
          ],
        };
      }),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Background layer */}
      <div className="absolute inset-0" id="layer-bg">
        {backgroundParticles.map((particle) => (
          <span
            key={particle.id}
            className="particle-bg animate-drift-slow absolute block size-[12px] rounded-full opacity-[0.12] blur-[2px]"
            style={
              {
                left: particle.xStart,
                top: particle.yStart,
                backgroundColor: particle.color,
                '--x-start': particle.xStartPx,
                '--y-start': particle.yStartPx,
                '--x-mid': particle.xMidPx,
                '--y-mid': particle.yMidPx,
                '--duration': particle.duration,
                '--dark-duration': particle.darkDuration,
                '--dark-bg-color': particle.darkColor,
              } as React.CSSProperties & {
                '--dark-bg-color': string;
                '--dark-duration': string;
              }
            }
          />
        ))}
      </div>

      {/* Midground (bokeh) layer */}
      <div className="absolute inset-0" id="layer-bokeh">
        {bokehParticles.map((particle) => (
          <span
            key={particle.id}
            className="particle-bokeh animate-bokeh-drift absolute block size-[14px] rounded-full opacity-[0.12] blur-[4px]"
            style={
              {
                left: particle.xStart,
                top: particle.yStart,
                backgroundColor: particle.color,
                '--x-start': particle.xStartPx,
                '--y-start': particle.yStartPx,
                '--x-mid': particle.xMidPx,
                '--y-mid': particle.yMidPx,
                '--duration': particle.duration,
                '--dark-duration': particle.darkDuration,
                '--dark-bg-color': particle.darkColor,
              } as React.CSSProperties & {
                '--dark-bg-color': string;
                '--dark-duration': string;
              }
            }
          />
        ))}
      </div>

      {/* Foreground dust layer */}
      <div className="absolute inset-0" id="layer-fg">
        {foregroundParticles.map((particle) => (
          <span
            key={particle.id}
            className="particle-fg animate-drift-fast absolute block size-[3px] rounded-full opacity-[0.12] blur-[1px]"
            style={
              {
                left: particle.xStart,
                top: particle.yStart,
                backgroundColor: particle.color,
                '--x-start': particle.xStartPx,
                '--y-start': particle.yStartPx,
                '--x-mid': particle.xMidPx,
                '--y-mid': particle.yMidPx,
                '--duration': particle.duration,
                '--dark-duration': particle.darkDuration,
                '--dark-bg-color': particle.darkColor,
              } as React.CSSProperties & {
                '--dark-bg-color': string;
                '--dark-duration': string;
              }
            }
          />
        ))}
      </div>
    </div>
  );
}
