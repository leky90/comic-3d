import { useCallback, useEffect, useRef } from 'react';
import { Image } from '../types/comic.model';
import { Scroll, useScroll } from '@react-three/drei';

type ImageChapterProps = {
  images?: Image[];
  enabled?: boolean;
};

export function ImageChapters({ images, enabled }: ImageChapterProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollData = useScroll();

  const handleMouseWheel = useCallback(
    function (e: WheelEvent) {
      if (!scrollRef.current) return;

      console.log(scrollData.el, scrollData.el.id);

      scrollData.el.scrollTo({
        left: 0,
        top: scrollData.el.scrollTop + e.deltaY,
        behavior: 'smooth',
      });
    },
    [scrollData]
  );

  useEffect(() => {
    if (!scrollRef.current) return;

    enabled && scrollRef.current.addEventListener('wheel', handleMouseWheel);

    // Clean up the event listener on component unmount
    return () => {
      scrollRef.current?.removeEventListener('wheel', handleMouseWheel);
    };
  }, [enabled, handleMouseWheel]);

  return (
    <Scroll html ref={scrollRef}>
      {images?.map((image, index) => (
        <div
          key={index}
          className="flex-center"
          style={{
            width: '100vw',
          }}
        >
          <img
            src={image.src}
            // loading="lazy"
            alt={String(image.page)}
            style={{
              width: 'auto',
              height: '100vh',
              display: 'block',
              background: 'gray',
              objectFit: 'contain',
            }}
          />
        </div>
      ))}
    </Scroll>
  );
}
