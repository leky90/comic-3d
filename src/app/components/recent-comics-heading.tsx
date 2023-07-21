import { SpriteAnimator, useCursor } from '@react-three/drei';
import { useRef, useState } from 'react';
import useLocation from 'wouter/use-location';
import { ROUTES } from '../constants/route.constant';
import { Text2d } from './text2d';
import { Group } from 'three';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { ROUND_SPACE_Y } from '../constants/app.constant';

type RecentComicsHeadingProps = { page: number };

const BASE_HEADING_Y = 12;

export function RecentComicsHeading({ page }: RecentComicsHeadingProps) {
  const prevPage = useRef<number>(page);
  const groupRef = useRef<Group>(null);
  const [location, setLocation] = useLocation();
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

  useFrame(({ clock }) => {
    if (!groupRef.current || !prevPage.current) return;

    if (prevPage.current === page) return;

    if (prevPage.current > page) {
      if (
        groupRef.current.position.y <
        (page - 1) * ROUND_SPACE_Y + BASE_HEADING_Y
      ) {
        prevPage.current = page;
        groupRef.current.position.y =
          (page - 1) * ROUND_SPACE_Y + BASE_HEADING_Y;
      } else {
        groupRef.current.position.y -= clock.getElapsedTime();
      }
    } else {
      if (
        groupRef.current.position.y >=
        (page - 1) * ROUND_SPACE_Y + BASE_HEADING_Y
      ) {
        prevPage.current = page;
        groupRef.current.position.y =
          (page - 1) * ROUND_SPACE_Y + BASE_HEADING_Y;
      } else {
        groupRef.current.position.y += clock.getElapsedTime();
      }
    }
  });

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

      <pointLight visible={hovered} intensity={1} />
    </group>
  );
}
