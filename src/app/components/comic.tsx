import { MeshProps, ThreeEvent } from '@react-three/fiber';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import {
  Group,
  Mesh,
  MeshLambertMaterial,
  MeshPhongMaterial,
  Vector3,
} from 'three';
import type { Comic as ComicEntity } from '../types/comic.model';
import { Box, Sparkles, useCursor, useTexture } from '@react-three/drei';
import { ROUTES } from '../constants/route.constant';
import { Chapter } from './chapter';
import { Text2d } from './text2d';
import { useHashLocation } from '../hooks/use-hash-location';

type ComicProps = MeshProps & {
  enabled: boolean;
  comic: ComicEntity;
};

const CENTER_POINT = new Vector3(0, 0, 0);
const DEFAULT_POSITION = [0, 100, 0] as unknown as Vector3;
const BOX_COLOR_MATERIAL = new MeshPhongMaterial({ color: '#FFC300' });

export const Comic = memo(
  function ({
    position = DEFAULT_POSITION,
    rotation,
    enabled,
    comic,
  }: ComicProps) {
    const basePosition = position as Vector3;
    const groupRef = useRef<Group>(null);
    const boxRef = useRef<Mesh>(null);
    const [hovered, hover] = useState(false);
    const [, setLocation] = useHashLocation();
    const texture = useTexture(comic.thumbnail);

    useCursor(hovered);

    useEffect(() => {
      if (!boxRef.current || !enabled) return;

      boxRef.current.material = new MeshLambertMaterial({
        map: texture,
      });
    }, [texture, enabled]);

    useEffect(() => {
      if (!groupRef.current) return;

      const objectPosition = groupRef.current.position;

      // Calculate the rotation axis
      const rotationAxis = new Vector3();
      rotationAxis.subVectors(CENTER_POINT, objectPosition);
      rotationAxis.y = 0; // Only rotate yAxis

      // Calculate the rotation angle
      const angle = Math.PI / 2 - Math.atan2(rotationAxis.z, rotationAxis.x);

      groupRef.current.rotation.y = angle;
    }, []);

    const latestChapters = useMemo(
      () =>
        comic.lastest_chapters.map((lastest_chapter, index) => (
          <Chapter
            key={lastest_chapter.id}
            comicId={comic.id}
            {...lastest_chapter}
            position={[6.5, index * 1.5, 1] as unknown as Vector3}
          />
        )),
      [comic.id, comic.lastest_chapters]
    );

    function onClick(e: ThreeEvent<MouseEvent>) {
      e.stopPropagation();
      setLocation(ROUTES['detail-comic'].replace(':id', comic.id));
    }

    function onPointerEnter(e: ThreeEvent<MouseEvent>) {
      e.stopPropagation();
      hover(true);
    }

    function handlePointerLeave(e: ThreeEvent<MouseEvent>) {
      e.stopPropagation();
      hover(false);
    }

    return (
      <group
        position={[basePosition.x, basePosition.y, basePosition.z]}
        rotation={rotation}
        ref={groupRef}
        visible={enabled}
      >
        <Sparkles visible={hovered} count={30} scale={10} size={20} speed={4} />
        <Text2d visible={enabled} position={[0, -6, 2] as unknown as Vector3}>
          {comic.title.slice(0, 24)} {comic.title.length > 24 && '...'}
          <meshPhongMaterial color="#FFC300" />
        </Text2d>
        <Box
          ref={boxRef}
          args={[7.35, 10, 1]}
          onClick={onClick}
          onPointerOver={onPointerEnter}
          onPointerOut={handlePointerLeave}
          material={BOX_COLOR_MATERIAL}
        />
        <Text2d visible={enabled} position={[0, 6, 2] as unknown as Vector3}>
          {comic.updated_at}
          <meshPhongMaterial color="royalblue" />
        </Text2d>

        {latestChapters}
        <pointLight visible={hovered} intensity={0.1} position={[0, 0, 5]} />
      </group>
    );
  },
  (prevProps, nextProps) =>
    prevProps.comic.id === nextProps.comic.id &&
    prevProps.enabled === nextProps.enabled
);
