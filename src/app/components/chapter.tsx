import { useCursor } from '@react-three/drei';
import { Chapter as ChapterEntity } from '../types/comic.model';
import { Vector3 } from 'three';
import { useState } from 'react';
import { useLocation } from 'wouter';
import { ROUTES } from '../constants/route.constant';
import { ThreeEvent } from '@react-three/fiber';
import { Text2d } from './text2d';

type ChaperProps = {
  position: Vector3;
  comicId: string;
  visible?: boolean;
} & ChapterEntity;

export function Chapter({ name, id, comicId, position }: ChaperProps) {
  const [hovered, hover] = useState(false);
  const [, setLocation] = useLocation();
  useCursor(hovered);

  function onClick(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();
    setLocation(
      ROUTES['detail-comic-chapter']
        .replace(':comicId', comicId)
        .replace(':chapterId', String(id))
    );
  }

  function onPointerOver(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();
    hover(true);
  }

  function onPointerOut(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();
    hover(false);
  }

  return (
    <Text2d
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onClick={onClick}
      position={position}
    >
      {name}
      <meshPhongMaterial color={hovered ? '#2874A6' : '#FFFFFF'} />
    </Text2d>
  );
}
