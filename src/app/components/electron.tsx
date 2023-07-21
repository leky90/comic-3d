import { Trail } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Color, Mesh } from 'three';

export function Electron({ radius = 5, speed = 6, ...props }) {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.getElapsedTime() * speed;
    ref.current.position.set(
      Math.sin(t) * radius,
      (Math.cos(t) * radius * Math.atan(t)) / Math.PI / 1.25,
      0
    );
  });
  return (
    <group {...props}>
      <Trail
        local
        width={2}
        length={6}
        color={new Color(2, 1, 10)}
        attenuation={(t) => t * t}
      >
        <mesh ref={ref}>
          <sphereGeometry args={[0.25]} />
          <meshBasicMaterial color={[10, 1, 10]} toneMapped={false} />
        </mesh>
      </Trail>
    </group>
  );
}
