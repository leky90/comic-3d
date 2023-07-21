import { Html, SpriteAnimator, useCursor } from '@react-three/drei';
import { Text } from './text';
import { useState } from 'react';
import useLocation from 'wouter/use-location';
import { ROUTES } from '../constants/route.constant';
import { ThreeEvent } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';

export function EntryComicHeading() {
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

  const textVariants = {
    active: { opacity: 1, transition: { duration: 0.5 } },
    bounce: {
      opacity: [0.5, 1, 0.5],
      y: [0.6, 1, 0.6],
      transition: { repeat: Infinity, duration: 3 },
    },
  };

  return (
    <motion.group
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onClick={onClick}
      position={[0, 1, 0]}
      visible={location === ROUTES.base}
      initial={'bounce'}
      animate={hovered ? 'active' : 'bounce'}
    >
      <SpriteAnimator
        scale={[2, 2, 2]}
        position={[-2, 0, 0]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        textureImageURL={'./flame.png'}
        textureDataURL={'./flame.json'}
      />
      <SpriteAnimator
        scale={[2, 2, 2]}
        position={[2, 0, 0]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        textureImageURL={'./flame.png'}
        textureDataURL={'./flame.json'}
      />
      <Html
        distanceFactor={10}
        position={[-1.5, -2, 0]}
        className={location === ROUTES.base ? 'show' : 'hide'}
      >
        <div className="text-white" style={{ width: 230 }}>
          (Enter or Click)
        </div>
      </Html>
      <motion.group variants={textVariants}>
        <Text>
          Truyện tranh 3D <motion.meshNormalMaterial variants={textVariants} />
        </Text>
      </motion.group>
      <pointLight visible={hovered} intensity={1} />
    </motion.group>
  );
}
