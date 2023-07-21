import { useState } from 'react';
import { Text2d, Text2dProps } from './text2d';
import { useCursor } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';

type LiftRowProps = Text2dProps;

export function LiftRow({ children, position, onClick }: LiftRowProps) {
  const [hovered, hover] = useState(false);
  useCursor(hovered);

  function onPointerOver(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();
    hover(true);
  }

  function onPointerOut(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();
    hover(false);
  }

  return (
    <Text2d
      fontSize={3}
      position={position}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {children}
      <meshPhongMaterial color={hovered ? 'orange' : 'white'} />
    </Text2d>
  );
}
