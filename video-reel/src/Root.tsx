import React from 'react';
import { Composition } from 'remotion';
import { SaveTheDateReel } from './SaveTheDateReel';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="SaveTheDateReel"
        component={SaveTheDateReel}
        durationInFrames={450} // 15 seconds at 30 fps
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
