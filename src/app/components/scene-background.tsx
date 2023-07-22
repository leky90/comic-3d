import { Grid, Stars } from '@react-three/drei';
import { ReflectorPlane } from './reflector-plane';
import { ROUTES } from '../constants/route.constant';
import { useRoute } from 'wouter';

export function SceneBackground() {
  const [isBase] = useRoute(ROUTES.base);
  const [isDetailComic] = useRoute(ROUTES['detail-comic']);
  return (
    <>
      <color attach="background" args={['#191920']} />
      <Stars
        fade
        radius={1.5}
        depth={50}
        saturation={5}
        count={2000}
        speed={1}
        factor={3}
      />
      <ReflectorPlane color={'#191920'} />
      <Grid
        renderOrder={-1}
        infiniteGrid
        cellSize={1}
        cellThickness={0.2}
        fadeDistance={isDetailComic ? 200 : 0}
      />
    </>
  );
}
