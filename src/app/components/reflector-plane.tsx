import { MeshReflectorMaterial, Plane } from '@react-three/drei';
import { PropsWithChildren } from 'react';

type ReflectorPlaneProps = PropsWithChildren & { color?: string };

export function ReflectorPlane({
  children,
  color = '#191920',
}: ReflectorPlaneProps) {
  return (
    <group position={[0, -0.5, 0]}>
      <Plane args={[200, 200]} rotation={[-Math.PI / 2, 0, 0]}>
        {children}
        <MeshReflectorMaterial
          resolution={1024}
          mixBlur={1}
          mixStrength={80}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color={color}
          metalness={0.1}
          mirror={1}
        />
      </Plane>
    </group>
  );
}
