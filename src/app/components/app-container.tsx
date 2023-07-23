import { Canvas } from '@react-three/fiber';
import { EnvironmentSettings } from './environment-settings';
import { EntryComicHeading } from './entry-comic-heading';
import { CameraControl } from './camera-control';
import { Comics } from './comics';
import useTabActivity from '../hooks/use-tab-activity.hook';
import { SceneBackground } from './scene-background';
import { DevelopTools } from './develop-tools';
import { ComicChapter } from './comic-chapter';

export function AppContainer() {
  const { browserActive, tabActive } = useTabActivity();
  return (
    <Canvas
      frameloop={browserActive && tabActive ? 'always' : 'demand'}
      camera={{ fov: 75, near: 0.1, far: 500, position: [0, 2, 40] }}
      style={{ width: '100vw', height: '100vh' }}
    >
      <DevelopTools viewport={false} performance={false} />
      <CameraControl />
      <EnvironmentSettings />
      <SceneBackground />

      <Comics />
      <ComicChapter />
      <EntryComicHeading />
    </Canvas>
  );
}
