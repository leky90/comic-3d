import { MeshProps, ThreeEvent, useLoader } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Group, TextureLoader, Vector3 } from 'three';
import type { RecommendComic as RecommendComicEntity } from '../types/comic.model';
import { Box, Html, Text as Text2D } from '@react-three/drei';
import { Text } from './text';
import { suspend } from 'suspend-react';
import { useHashLocation } from '../hooks/use-hash-location';

type RecommendComicProps = MeshProps & {
  index: number;
  comic: RecommendComicEntity;
};

const DEFAULT_POSITION = [0, 100, 0] as unknown as Vector3;

const regular = import('../../assets/ThuphapCongthuy.ttf');

export function RecommendComic({
  position = DEFAULT_POSITION,
  index,
  comic,
}: RecommendComicProps) {
  const basePosition = position as Vector3;
  const meshRef = useRef<Group>(null);
  const texture = useLoader(TextureLoader, comic.thumbnail);
  const [, setLocation] = useHashLocation();
  const [hovered, hover] = useState(false);

  function onPointerOver(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();
    hover(true);
  }

  function onPointerOut(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();
    hover(false);
  }

  return (
    <group
      position={[basePosition.x, basePosition.y, basePosition.z]}
      ref={meshRef}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <Text position={[0, 0, 2] as unknown as Vector3}>
        {comic.title} <meshPhongMaterial color="#FFC300" />
      </Text>
      <Box
        args={[7.35, 10, 1]}
        onClick={() => {
          return;
        }}
        onDoubleClick={(e) => (
          e.stopPropagation(), setLocation('/comic/' + comic.id)
        )}
      >
        <meshBasicMaterial attach="material" map={texture} />
      </Box>
      <Html distanceFactor={5} position={[0, 5, 0]}>
        <div className="comic-info">{comic.updated_at}</div>
      </Html>
      <Text2D
        font={(suspend(regular) as any).default}
        fontSize={1}
        anchorY="top"
        anchorX="center"
        lineHeight={0.8}
        position={[0, 7, 2] as unknown as Vector3}
        material-toneMapped={false}
      >
        {comic.lastest_chapter.name}
      </Text2D>
    </group>
  );
}
