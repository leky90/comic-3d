import { ROUTES } from '../constants/route.constant';
import { useRoute } from 'wouter';
import { useHashLocation } from '../hooks/use-hash-location';
import { useState } from 'react';

let defaultAccept = false;

export function QuickButtonsStage() {
  const [, setLocation] = useHashLocation();
  const [accepted, setAccepted] = useState(defaultAccept);
  const [matchedComics, params] = useRoute(ROUTES['comics-page']);
  const [matchedDetailComic] = useRoute(ROUTES['detail-comic']);
  const [matchedDetailComicChapter] = useRoute(ROUTES['detail-comic-chapter']);
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

  function accept() {
    defaultAccept = true;
    setAccepted(defaultAccept);
  }

  return (
    <>
      {matchedComics && (
        <>
          <div className={`box-center ${accepted ? 'hide' : 'show'}`}>
            <h2 style={{ color: 'yellow' }}>Hướng dẫn sử dụng:</h2>

            <ul className="hide-mb" style={{ lineHeight: 1.5 }}>
              <li>Bấm phím hoặc nhấp (Esc) để thoát</li>
              <li>
                <mark>Double click</mark> vào truyện để xem chi tiết
              </li>
              <li>Nắm giữ chuột và di chuyển để xem xung quanh</li>
              <li>Bấm phím (W) hoặc (&uarr;) để đi lên</li>
              <li>Bấm phím (S) hoặc (&darr;) để đi xuống</li>
              <li>Bấm phím (A) hoặc (&larr;) để xoay trái</li>
              <li>Bấm phím (D) hoặc (&rarr;) để xoay phải</li>
            </ul>
            <ul className="hide show-mb" style={{ lineHeight: 1.5 }}>
              <li>Nhấp vào (Esc) để thoát</li>
              <li>
                <mark>Double tap</mark> vào truyện để xem chi tiết
              </li>
              <li>Chạm và di chuyển ngón tay để xem xung quanh</li>
              <li>Nhấp vào nút (&uarr;) để đi lên</li>
              <li>Nhấp vào nút (&darr;) để đi xuống</li>
            </ul>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                className="white-button"
                style={{ fontSize: 14, position: 'static' }}
                onClick={accept}
              >
                Đã hiểu
              </button>
            </div>
          </div>
          <button className={`rotate-w white-button `} onClick={up}>
            &uarr; <br />
            (W)
          </button>
          <button className={`rotate-s white-button `} onClick={down}>
            (S) <br />
            &darr;
          </button>
          <button className={`rotate-a white-button `}>&larr; (A)</button>
          <button className={`rotate-d white-button `}>(D) &rarr;</button>
        </>
      )}
      {(matchedDetailComic || matchedComics || matchedDetailComicChapter) && (
        <button onClick={back} className="back-button">
          (Esc)
        </button>
      )}
    </>
  );
}
