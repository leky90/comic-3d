import { Text } from '@react-three/drei';
import { Vector3 } from 'three';
import { PropsWithChildren } from 'react';
import { suspend } from 'suspend-react';
import { ThreeEvent } from '@react-three/fiber';

const regular = import('../../assets/ThuphapCongthuy.ttf');

export type Text2dProps = {
  position?: Vector3;
  font?: string;
  useDefault?: boolean;
  fontSize?: number;
  visible?: boolean;
  onPointerOver?: (e: ThreeEvent<MouseEvent>) => void;
  onPointerOut?: (e: ThreeEvent<MouseEvent>) => void;
  onClick?: (e: ThreeEvent<MouseEvent>) => void;
} & PropsWithChildren;

export function Text2d({
  children,
  position = [0, 0, 0] as unknown as Vector3,
  visible = true,
  fontSize = 1,
  font,
  useDefault = true,
  onClick,
  onPointerOver,
  onPointerOut,
}: Text2dProps) {
  return (
    <Text
      font={useDefault ? (suspend(regular) as any).default : font}
      fontSize={fontSize}
      anchorY="top"
      anchorX="center"
      position={position}
      material-toneMapped={false}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onClick={onClick}
      visible={visible}
    >
      {children}
    </Text>
  );
}
