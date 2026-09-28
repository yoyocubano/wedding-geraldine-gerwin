import React from 'react';
import { Composition } from 'remotion';
import { SaveTheDateReel } from './SaveTheDateReel';

export const Root: React.FC = () => {
  return (
    <>
      {/* Spanish Version - 30 seconds at 30 fps (900 frames) */}
      <Composition
        id="SaveTheDateReel-ES"
        component={SaveTheDateReel}
        defaultProps={{ lang: 'es' }}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Dutch (Neerlandés) Version - 30 seconds at 30 fps (900 frames) */}
      <Composition
        id="SaveTheDateReel-NL"
        component={SaveTheDateReel}
        defaultProps={{ lang: 'nl' }}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
