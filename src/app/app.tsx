// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useRoute } from 'wouter';
import { AppContainer } from './components/app-container';
import { QuickButtonsStage } from './components/quick-buttons-stage';
import { useGetComicsByTypeQuery } from './services/use-get-comics-by-type';
import { ROUTES } from './constants/route.constant';
import { KeyboardControls, KeyboardControlsEntry } from '@react-three/drei';
import { Controls } from './types/keyboard.type';
import { useEffect, useMemo, useRef } from 'react';
import { useHashLocation } from './hooks/use-hash-location';

let isComicPage = false;

export function App() {
  const [location, setLocation] = useHashLocation();
  const firstAccess = useRef(true);
  const [isBasePage] = useRoute(ROUTES.base);
  const [matchedComicPage, params] = useRoute(ROUTES['comics-page']);
  isComicPage = matchedComicPage;
  const currentPage = useRef(
    params === null || firstAccess.current ? 1 : Number(params.page)
  );

  const { isSuccess } = useGetComicsByTypeQuery(
    {
      comicType: 'recent-update-comics',
      page: Math.ceil((currentPage.current + 2) / 3),
    },
    { keepPreviousData: true }
  );

  const map = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
      { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
      { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
      { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
      { name: Controls.enter, keys: ['Enter'] },
      { name: Controls.escape, keys: ['Escape'] },
    ],
    []
  );

  function back() {
    isComicPage ? setLocation(ROUTES.base) : window.history.back();
  }

  function setPage(page: number) {
    if (page < 1) return;

    setLocation(ROUTES['comics-page'].replace(':page', String(page)));
  }

  function onPress(name: string, pressed: boolean) {
    // console.log(name, pressed, currentPage.current);
    if (pressed) return;

    switch (name) {
      case Controls.escape:
        back();
        break;
      case Controls.enter:
        setPage(1);
        break;
      case Controls.forward:
        setPage(++currentPage.current);
        break;
      case Controls.back:
        if (currentPage.current <= 1) return;
        setPage(--currentPage.current);
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    currentPage.current = params === null ? 1 : Number(params.page);
  }, [location, params]);

  if (firstAccess.current && !isBasePage) {
    setLocation(ROUTES['comics-page'].replace(':page', String(1)));
  }

  firstAccess.current = false;

  return (
    <>
      <QuickButtonsStage />
      <KeyboardControls map={map} onChange={onPress}>
        {isSuccess && <AppContainer />}
      </KeyboardControls>
    </>
  );
}

export default App;
