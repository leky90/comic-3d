import { ScrollControls } from '@react-three/drei';
import { useRoute } from 'wouter';
import { ROUTES } from '../constants/route.constant';
import { useGetComicChapterByIdQuery } from '../services/use-get-comic-chapter-by-id';
import { ImageChapters } from './image-chapter';

export function ComicChapter() {
  const [matched, params] = useRoute(ROUTES['detail-comic-chapter']);
  const comicId = String(params?.['comicId']);
  const chapterId = Number(params?.['chapterId']);

  const { data } = useGetComicChapterByIdQuery(
    { comicId, chapterId },
    { enabled: matched && Boolean(comicId && chapterId) }
  );

  return (
    <ScrollControls
      pages={data?.data?.images.length ?? 0}
      style={{ margin: 'auto', textAlign: 'center' }}
      enabled={matched}
    >
      <ImageChapters images={data?.data.images} enabled={matched} />
    </ScrollControls>
  );
}
