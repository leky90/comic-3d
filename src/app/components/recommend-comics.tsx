import { RecommendComic } from './recommend-comic';
import { useGetRecommendComicsQuery } from '../services/use-get-recommend-comics';
import { useMemo } from 'react';
import { Vector3 } from 'three';
import { useRoute } from 'wouter';
import { ROUTES } from '../constants/route.constant';

const COMIC_DISTANCE = 20;

export function RecommendComics() {
  const [matchedRecommendComics] = useRoute(ROUTES['recommend-comics']);

  const { data: comicResponse, isSuccess } = useGetRecommendComicsQuery({});

  const comics1 = useMemo(() => {
    if (!isSuccess) return [];

    return comicResponse?.data.map((comic, index) => (
      <RecommendComic
        key={comic.id}
        index={index}
        comic={comic}
        position={new Vector3(index * COMIC_DISTANCE, 0, 0)}
      />
    ));
  }, [isSuccess]);

  if (!matchedRecommendComics) return <></>;

  return (
    <>
      <group position={[0, 5, -25]}>{comics1}</group>
      {/* <group position={[0,0,0]}>{comics1}</group> */}
    </>
  );
}
