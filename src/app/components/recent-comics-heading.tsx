import { SpriteAnimator, useCursor } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { ROUTES } from '../constants/route.constant';
import { Text2d } from './text2d';
import { Group } from 'three';
import { ThreeEvent } from '@react-three/fiber';
import { useHashLocation } from '../hooks/use-hash-location';
import { ROUND_SPACE_Y } from '../constants/app.constant';
import { animate } from 'framer-motion';

type RecentComicsHeadingProps = { page: number };

const BASE_HEADING_Y = 14;

export function RecentComicsHeading({ page }: RecentComicsHeadingProps) {
  const groupRef = useRef<Group>(null);
  const [, setLocation] = useHashLocation();
  const [hovered, hover] = useState(false);
  useCursor(hovered);

  function onClick() {
    setLocation(ROUTES['comics-page'].replace(':page', '1'));
  }

  function onPointerOver(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();
    hover(true);
  }

  function onPointerOut(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();
    hover(false);
  }

  useEffect(() => {
    if (!groupRef.current) return;
    const newY = (page - 1) * ROUND_SPACE_Y + BASE_HEADING_Y;

    animate(groupRef.current.position.y, newY, {
      duration: 1,
      onUpdate(latest) {
        if (!groupRef.current) return;
        groupRef.current.position.y = latest;
      },
    });
  }, [page]);

  return (
    <group
      ref={groupRef}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      position={[0, BASE_HEADING_Y, -30]}
    >
      <SpriteAnimator
        scale={[3, 3, 3]}
        position={[-12.2, 1, 0]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        textureImageURL={'./flame.png'}
        textureDataURL={'./flame.json'}
        visible={hovered}
      />
      <SpriteAnimator
        scale={[3, 3, 3]}
        position={[8.6, 1, 0]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        textureImageURL={'./flame.png'}
        textureDataURL={'./flame.json'}
        visible={hovered}
      />
      <Text2d fontSize={3} onClick={onClick}>
        ^ Mới cập nhật ^ ({page}) <meshNormalMaterial />
      </Text2d>

      <pointLight visible={hovered} intensity={0.25} />
    </group>
  );
}
