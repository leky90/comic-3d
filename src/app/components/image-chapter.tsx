import { useCallback, useEffect, useRef } from 'react';
import { Image } from '../types/comic.model';
import { Scroll, useScroll } from '@react-three/drei';

type ImageChapterProps = {
  images?: Image[];
  enabled?: boolean;
};

let startY = 0;
let moveY = 0;

export function ImageChapters({ images, enabled }: ImageChapterProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollData = useScroll();

  const handleMouseWheel = useCallback(
    function (e: WheelEvent) {
      if (!scrollRef.current) return;

      scrollData.el.scrollTo({
        left: 0,
        top: scrollData.el.scrollTop + e.deltaY,
        behavior: 'smooth',
      });
    },
    [scrollData]
  );

  const handleTouchMove = useCallback(function (event: TouchEvent) {
    if (!scrollRef.current) return;

    const touch = event.touches[0];
    moveY = touch.clientY;

    scrollData.el.scrollTop -= moveY - startY;

    event.preventDefault();
  }, []);

  const handleTouchStart = useCallback(function (event: TouchEvent) {
    const touch = event.touches[0];
    startY = touch.clientY;
  }, []);

  const handleTouchEnd = useCallback(function () {
    startY = moveY = 0;
  }, []);

  useEffect(() => {
    if (!scrollRef.current) return;

    if (enabled) {
      scrollRef.current.addEventListener('wheel', handleMouseWheel);
      scrollRef.current.addEventListener('touchstart', handleTouchStart);
      scrollRef.current.addEventListener('touchmove', handleTouchMove);
      scrollRef.current.addEventListener('touchend', handleTouchEnd);
    }

    // Clean up the event listener on component unmount
    return () => {
      scrollRef.current?.removeEventListener('wheel', handleMouseWheel);
      scrollRef.current?.removeEventListener('touchstart', handleTouchStart);
      scrollRef.current?.removeEventListener('touchmove', handleTouchMove);
      scrollRef.current?.removeEventListener('touchend', handleTouchEnd);
    };
  }, [
    enabled,
    handleMouseWheel,
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart,
  ]);

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
