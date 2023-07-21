import { MeshReflectorMaterial, Plane } from '@react-three/drei';
import { PropsWithChildren } from 'react';

type ReflectorPlaneProps = PropsWithChildren;

export function ReflectorPlane({ children }: ReflectorPlaneProps) {
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
          color="#050505"
          metalness={0.3}
          mirror={1}
        />
      </Plane>
    </group>
  );
}
