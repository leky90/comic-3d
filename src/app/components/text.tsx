import { Center, Text3D, useFont } from '@react-three/drei';
import { PropsWithChildren, Suspense } from 'react';
import type { Vector3 } from 'three';

type TextProps = PropsWithChildren & {
  size?: number;
  height?: number;
  position?: Vector3;
  visible?: boolean;
  onClick?: () => void;
};

export function Text({
  children,
  size = 1,
  height = 0.2,
  position = [0, 0, 0] as unknown as Vector3,
  visible = true,
  onClick,
}: TextProps) {
  const font = useFont('/ThuphapCongthuy_Regular.json');

  return (
    <Suspense fallback={false}>
      <Center visible={visible} onClick={onClick} position={position}>
        <Text3D lineHeight={0} height={height} size={size} font={font.data}>
          {children}
        </Text3D>
      </Center>
    </Suspense>
  );
}
