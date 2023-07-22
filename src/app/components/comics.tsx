import { Comic } from './comic';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Group, Vector3 } from 'three';
import { useRoute } from 'wouter';
import { RecentComicsHeading } from './recent-comics-heading';
import { ROUTES } from '../constants/route.constant';
import { queryClient } from '../instances/react-query-client';
import { AxiosResponse } from 'axios';
import { ComicsResponse } from '../services/use-get-comics-by-type';
import {
  LIMIT_COMIC_EACH_ROUND,
  R,
  ROUND_SPACE_Y,
} from '../constants/app.constant';
import { Comic as ComicEntity } from '../types/comic.model';
import { motion } from 'framer-motion-3d';
import { animate } from 'framer-motion';

export function Comics() {
  const groupRef = useRef<Group>(null);
  const [comics, setComics] = useState<ComicEntity[]>([]);
  const [matchedComics, params] = useRoute(ROUTES['comics-page']);
  const [matchedDetailComics] = useRoute(ROUTES['detail-comic']);
  const currentPage = params === null ? 1 : Number(params.page);
  const realPage = Math.ceil((currentPage + 1) / 3);

  const handleMouseWheel = useCallback((event: WheelEvent) => {
    if (!groupRef.current) return;

    const deltaY = Math.sign(event.deltaY);

    animate(groupRef.current.rotation.y, groupRef.current.rotation.y + deltaY, {
      duration: 3,
      onUpdate(latest) {
        if (!groupRef.current) return;
        groupRef.current.rotation.y = latest;
      },
    });
  }, []);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!groupRef.current) return;

    const deltaY = 0.5;

    switch (event.key) {
      case 'a':
        animate(
          groupRef.current.rotation.y,
          groupRef.current.rotation.y - deltaY,
          {
            duration: 3,
            onUpdate(latest) {
              if (!groupRef.current) return;
              groupRef.current.rotation.y = latest;
            },
          }
        );
        break;
      case 'd':
        animate(
          groupRef.current.rotation.y,
          groupRef.current.rotation.y + deltaY,
          {
            duration: 3,
            onUpdate(latest) {
              if (!groupRef.current) return;
              groupRef.current.rotation.y = latest;
            },
          }
        );
        break;

      default:
        break;
    }

    // Rotate the group around the Y axis
  }, []);

  useEffect(() => {
    const cachedData = queryClient.getQueryData<AxiosResponse<ComicsResponse>>([
      'recent-update-comics',
      realPage,
    ]);
    const newComics = cachedData?.data.comics ?? [];

    setComics((comics) =>
      comics.concat(
        newComics.filter(
          (newComic) =>
            comics.findIndex((comic) => comic.id === newComic.id) < 0
        )
      )
    );
  }, [realPage]);

  useEffect(() => {
    window.addEventListener('wheel', handleMouseWheel);

    // Clean up the event listener on component unmount
    return () => {
      if (groupRef.current) groupRef.current.rotation.y = 0;
      window.removeEventListener('wheel', handleMouseWheel);
    };
  }, [handleMouseWheel, matchedComics]);

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);

    // Clean up the event listener on component unmount
    return () => {
      if (groupRef.current) groupRef.current.rotation.y = 0;
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [handleKeyPress, matchedComics]);

  const allComics = useMemo(() => {
    return comics.map((comic, index) => {
      const angle =
        (2 * Math.PI * index) / LIMIT_COMIC_EACH_ROUND - Math.PI / 4;

      const round = Math.ceil((index + 1) / LIMIT_COMIC_EACH_ROUND);

      const x = R * Math.cos(angle);
      const z = R * Math.sin(angle);
      const y = (round - 1) * ROUND_SPACE_Y + 3;

      const inCurrentPage =
        round >= currentPage - 1 && round <= currentPage + 1;

      const comicPosition = new Vector3(x, y, z);

      return (
        (
          <Comic
            key={comic.id + '-' + index}
            comic={comic}
            enabled={matchedComics && inCurrentPage}
            position={comicPosition}
          />
        ) ?? []
      );
    });
  }, [comics, currentPage, matchedComics]);

  const variants = {
    idle: { rotateY: 0 },
    entered: { rotateY: Math.PI * 2 },
  };

  return (
    <motion.group
      initial={false}
      animate={matchedComics ? 'entered' : 'idle'}
      variants={variants}
      transition={{ type: 'spring', duration: 0.5 }}
    >
      <group
        ref={groupRef}
        position={[0, 6, 0]}
        visible={matchedComics || matchedDetailComics}
      >
        <RecentComicsHeading page={currentPage} visible={matchedComics} />
        {allComics}
      </group>
    </motion.group>
  );
}
