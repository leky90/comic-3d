import { Stars } from '@react-three/drei';
import { ReflectorPlane } from './reflector-plane';

export function SceneBackground() {
  return (
    <>
      <Stars
        fade
        radius={1.5}
        depth={50}
        saturation={5}
        count={2000}
        speed={1}
        factor={3}
      />
      <ReflectorPlane />
    </>
  );
}
