import useLocation from 'wouter/use-location';
import { ROUTES } from '../constants/route.constant';
import { useRoute } from 'wouter';

export function QuickButtonsStage() {
  const [, setLocation] = useLocation();
  const [matchedComics, params] = useRoute(ROUTES['comics-page']);
  const currentPage = params === null ? 1 : Number(params.page);

  function back() {
    setLocation(ROUTES.base);
  }

  function up() {
    setLocation(
      ROUTES['comics-page'].replace(':page', String(currentPage + 1))
    );
  }

  function down() {
    if (currentPage <= 1) return;

    setLocation(
      ROUTES['comics-page'].replace(':page', String(currentPage - 1))
    );
  }

  return (
    <>
      <button
        className={`rotate-w white-button ${matchedComics ? 'show' : 'hide'}`}
        onClick={up}
      >
        &uarr; <br />
        (W)
      </button>
      <button
        className={`rotate-s white-button ${matchedComics ? 'show' : 'hide'}`}
        onClick={down}
      >
        (S) <br />
        &darr;
      </button>
      <button
        className={`rotate-a white-button ${matchedComics ? 'show' : 'hide'}`}
      >
        &larr; (A)
      </button>
      <button
        className={`rotate-d white-button ${matchedComics ? 'show' : 'hide'}`}
      >
        (D) &rarr;
      </button>
      <button onClick={back} className="back-button">
        Quay lại (Esc)
      </button>
    </>
  );
}
