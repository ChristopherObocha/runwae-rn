import * as React from 'react';
import Svg, { Path, Mask } from 'react-native-svg';

interface LogoProps {
  width?: number;
  height?: number;
  color?: string;
}

export function Logo({ width = 293, height = 109, color = '#fff' }: LogoProps) {
  // Calculate the scaling factor to maintain aspect ratio
  const aspectRatio = 293 / 109;
  const calculatedHeight = typeof height === 'number' ? height : width / aspectRatio;
  const calculatedWidth = typeof width === 'number' ? width : height * aspectRatio;

  return (
    <Svg
      width={calculatedWidth}
      height={calculatedHeight}
      viewBox="0 0 293 109"
      fill="none"
      preserveAspectRatio="xMidYMid meet">
      <Mask id="a" width={228} height={45} x={6} y={26} fill="#000" maskUnits="userSpaceOnUse">
        <Path fill={color} d="M6 26h228v45H6z" />
        <Path d="M20.048 51.06h-7.44V69h-5.52V28.2h13.68c4.64 0 8.16 1 10.56 3 2.4 2 3.6 4.74 3.6 8.22 0 2.92-.78 5.32-2.34 7.2-1.56 1.84-3.86 3.06-6.9 3.66L39.008 69h-6.42l-12.54-17.94Zm-7.44-4.2h8.16c5.76 0 8.64-2.42 8.64-7.26 0-2.28-.74-4.06-2.22-5.34-1.48-1.28-3.62-1.92-6.42-1.92h-8.16v14.52Zm51.28 23.1c-5.32 0-9.42-1.48-12.3-4.44-2.84-2.96-4.26-6.88-4.26-11.76V28.2h5.52v25.5c0 3.8.96 6.74 2.88 8.82s4.64 3.12 8.16 3.12c3.52 0 6.22-1.04 8.1-3.12 1.92-2.08 2.88-5.02 2.88-8.82V28.2h5.52v25.44c0 4.96-1.42 8.92-4.26 11.88-2.84 2.96-6.92 4.44-12.24 4.44Zm62.334-41.76V69l-4.8.06-23.04-32.04.3 14.22V69h-5.52V28.2h4.8l23.04 32.1-.3-15.9V28.2h5.52Zm66.565 0-13.26 41.28h-5.28l-10.86-33.72-10.86 33.72h-5.28l-12.6-41.28h5.64l9.72 34.62 10.98-34.62h4.86l11.1 34.74 10.2-34.74h5.64Zm29.305 28.14h-16.38L201.092 69h-5.52l15.84-41.34h5.1l15.9 41.34h-5.64l-4.68-12.66Zm-1.5-4.14-6.66-18.12-6.66 18.12h13.32Z" />
      </Mask>
      <Path
        fill={color}
        d="M20.048 51.06h-7.44V69h-5.52V28.2h13.68c4.64 0 8.16 1 10.56 3 2.4 2 3.6 4.74 3.6 8.22 0 2.92-.78 5.32-2.34 7.2-1.56 1.84-3.86 3.06-6.9 3.66L39.008 69h-6.42l-12.54-17.94Zm-7.44-4.2h8.16c5.76 0 8.64-2.42 8.64-7.26 0-2.28-.74-4.06-2.22-5.34-1.48-1.28-3.62-1.92-6.42-1.92h-8.16v14.52Zm51.28 23.1c-5.32 0-9.42-1.48-12.3-4.44-2.84-2.96-4.26-6.88-4.26-11.76V28.2h5.52v25.5c0 3.8.96 6.74 2.88 8.82s4.64 3.12 8.16 3.12c3.52 0 6.22-1.04 8.1-3.12 1.92-2.08 2.88-5.02 2.88-8.82V28.2h5.52v25.44c0 4.96-1.42 8.92-4.26 11.88-2.84 2.96-6.92 4.44-12.24 4.44Zm62.334-41.76V69l-4.8.06-23.04-32.04.3 14.22V69h-5.52V28.2h4.8l23.04 32.1-.3-15.9V28.2h5.52Zm66.565 0-13.26 41.28h-5.28l-10.86-33.72-10.86 33.72h-5.28l-12.6-41.28h5.64l9.72 34.62 10.98-34.62h4.86l11.1 34.74 10.2-34.74h5.64Zm29.305 28.14h-16.38L201.092 69h-5.52l15.84-41.34h5.1l15.9 41.34h-5.64l-4.68-12.66Zm-1.5-4.14-6.66-18.12-6.66 18.12h13.32Z"
      />
      <Path stroke={color} strokeWidth={6} d="M240 32h37M240 49h53M240 66h37" />
    </Svg>
  );
}
