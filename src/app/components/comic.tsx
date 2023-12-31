import { MeshProps, ThreeEvent, useThree } from '@react-three/fiber';
import {
  MouseEventHandler,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Group,
  Mesh,
  MeshLambertMaterial,
  MeshPhongMaterial,
  Vector3,
} from 'three';
import type { Comic as ComicEntity } from '../types/comic.model';
import { Box, Html, useCursor, useTexture } from '@react-three/drei';
import { ROUTES } from '../constants/route.constant';
import { Chapter } from './chapter';
import { Text2d } from './text2d';
import { useHashLocation } from '../hooks/use-hash-location';
import { motion } from 'framer-motion-3d';
import { useRoute } from 'wouter';
import { animate } from 'framer-motion';
import { useGetComicByIdQuery } from '../services/use-get-comic-by-id';
import { HtmlChapters } from './html-chapters';

type ComicProps = MeshProps & {
  enabled: boolean;
  comic: ComicEntity;
};

const CENTER_POINT = new Vector3(0, 0, 0);
const DEFAULT_POSITION = [0, 100, 0] as unknown as Vector3;
const BOX_COLOR_MATERIAL = new MeshPhongMaterial({ color: '#f0f0f0' });

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
    const htmlRef = useRef<HTMLDivElement>(null);
    const textureMaterialRef = useRef<MeshLambertMaterial>();
    const { scene } = useThree();
    const [hovered, hover] = useState(false);
    const [view, setView] = useState(false);
    const [, setLocation] = useHashLocation();
    const texture = useTexture(comic.thumbnail);
    const [matchedDetailComic, params] = useRoute(ROUTES['detail-comic']);
    const comicId = params?.id;
    const activeComic = scene.getObjectByName(comicId || '');
    const isActived = activeComic && activeComic.name === comic.id;
    const isVisible = enabled || isActived;
    const { data: comicDetail, isSuccess } = useGetComicByIdQuery(
      { comicId: comic.id },
      { enabled: isActived }
    );

    const boxVariants = {
      idle: { scale: 1 },
      hovered: { scale: 1.2 },
    };

    useCursor(hovered);

    function onDoubleClick(e: ThreeEvent<MouseEvent>) {
      e.stopPropagation();

      if (!boxRef.current || !textureMaterialRef.current) return;

      if (matchedDetailComic) {
        let rotationY = Math.PI;
        if (boxRef.current.rotation.y === Math.PI) {
          rotationY = 0;
          setView(false);
        }
        animate(boxRef.current.rotation.y, rotationY, {
          duration: 1,
          onUpdate(latest) {
            if (!boxRef.current || !textureMaterialRef.current) return;
            if (latest > Math.PI / 2) {
              boxRef.current.material = BOX_COLOR_MATERIAL;
            } else {
              boxRef.current.material = textureMaterialRef.current;
            }
            boxRef.current.rotation.y = latest;
            if (latest === Math.PI) setView(true);
            if (latest === 0) setView(false);
          },
        });
      } else {
        setLocation(ROUTES['detail-comic'].replace(':id', comic.id));
      }
    }

    function onPointerEnter(e: ThreeEvent<MouseEvent>) {
      e.stopPropagation();
      hover(true);
    }

    function handlePointerLeave(e: ThreeEvent<MouseEvent>) {
      e.stopPropagation();
      hover(false);
    }

    function onWheel(e: ThreeEvent<WheelEvent>) {
      if (!htmlRef.current || !view) return;

      htmlRef.current.scrollTo({
        left: 0,
        top: htmlRef.current.scrollTop + e.deltaY,
        behavior: 'smooth',
      });
    }

    const latestChapters = useMemo(
      () =>
        comic.lastest_chapters
          .reverse()
          .map((lastest_chapter, index) => (
            <Chapter
              key={lastest_chapter.id}
              comicId={comic.id}
              {...lastest_chapter}
              position={[6.5, index * 1.5, 1] as unknown as Vector3}
            />
          )),
      [comic.id, comic.lastest_chapters]
    );

    const comicTitle = useMemo(
      () =>
        matchedDetailComic
          ? comic.title
          : comic.title.slice(0, 24) + (comic.title.length > 24 && '...'),
      [comic.title, matchedDetailComic]
    );

    useEffect(() => {
      if (!boxRef.current || !isVisible) return;

      textureMaterialRef.current = new MeshLambertMaterial({
        map: texture,
      });

      boxRef.current.material = textureMaterialRef.current;
    }, [texture, isVisible]);

    useEffect(() => {
      if (!htmlRef.current) return;

      htmlRef.current.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth',
      });
    }, [view]);

    useEffect(() => {
      if (!boxRef.current || !textureMaterialRef.current) return;

      if (matchedDetailComic) {
        return;
      } else {
        setView(false);
        boxRef.current.rotation.y = 0;
        boxRef.current.material = textureMaterialRef.current;
      }
    }, [matchedDetailComic, texture]);

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

    return (
      <group
        position={[basePosition.x, basePosition.y, basePosition.z]}
        rotation={rotation}
        ref={groupRef}
        visible={isVisible}
      >
        <motion.group
          variants={boxVariants}
          initial={'idle'}
          animate={hovered && !matchedDetailComic ? 'hovered' : 'idle'}
        >
          <Box
            ref={boxRef}
            args={[7.35, 10, 1]}
            name={comic.id}
            onDoubleClick={onDoubleClick}
            onPointerOver={onPointerEnter}
            onPointerOut={handlePointerLeave}
            material={BOX_COLOR_MATERIAL}
            onWheel={onWheel}
          >
            <Html
              className={`comic-content ${view ? 'show' : 'hide'}`}
              transform
              fullscreen
              center
              rotation-y={Math.PI}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 8,
                }}
              >
                <h3 style={{ margin: 0 }}>Danh sách chương</h3>
                <button
                  onClick={
                    onDoubleClick as unknown as MouseEventHandler<HTMLButtonElement>
                  }
                  style={{ cursor: 'pointer' }}
                >
                  &#9587;
                </button>
              </div>
              <div ref={htmlRef} className="chapter-content">
                {isSuccess && (
                  <HtmlChapters
                    chapters={comicDetail.data.chapters}
                    comicId={comic.id}
                  />
                )}
              </div>
            </Html>
          </Box>

          <Text2d
            visible={isVisible}
            position={[0, 6.5, 1] as unknown as Vector3}
          >
            {comicTitle}
            <meshPhongMaterial color="#FFC300" />
          </Text2d>

          <Text2d
            visible={isVisible}
            position={[0, -5, 1] as unknown as Vector3}
          >
            {comic.updated_at}
            <meshPhongMaterial color="royalblue" />
          </Text2d>

          {latestChapters}
        </motion.group>

        <pointLight visible={hovered} intensity={0.1} position={[0, 0, 5]} />
      </group>
    );
  },
  (prevProps, nextProps) =>
    prevProps.comic.id === nextProps.comic.id &&
    prevProps.enabled === nextProps.enabled
);
