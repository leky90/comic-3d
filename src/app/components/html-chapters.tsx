import { ROUTES } from '../constants/route.constant';
import { useHashLocation } from '../hooks/use-hash-location';
import { Chapter } from '../types/comic.model';

type HtmlChaptersProps = {
  chapters: Chapter[];
  comicId: string;
};

export function HtmlChapters({ chapters, comicId }: HtmlChaptersProps) {
  const [, setLocation] = useHashLocation();

  function onClick(chapterId: number) {
    setLocation(
      ROUTES['detail-comic-chapter']
        .replace(':comicId', comicId)
        .replace(':chapterId', String(chapterId))
    );
  }
  return (
    <ul className="chapter-list">
      {chapters.map((chapter) => (
        <li key={chapter.id} onClick={() => onClick(chapter.id)}>
          {chapter.name}
        </li>
      ))}
    </ul>
  );
}
