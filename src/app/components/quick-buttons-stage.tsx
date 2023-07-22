import { ROUTES } from '../constants/route.constant';
import { useRoute } from 'wouter';
import { useHashLocation } from '../hooks/use-hash-location';
import { useState } from 'react';

let defaultAccept = false;

export function QuickButtonsStage() {
  const [, setLocation] = useHashLocation();
  const [accepted, setAccepted] = useState(defaultAccept);
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

  function accept() {
    defaultAccept = true;
    setAccepted(defaultAccept);
  }

  return (
    <>
      <div className={`box-center ${accepted ? 'hide' : 'show'}`}>
        <h2 style={{ color: 'yellow' }}>Hướng dẫn sử dụng:</h2>

        <ul style={{ lineHeight: 1.5 }}>
          <li>Bấm phím hoặc nhấp (Esc) để thoát</li>
          <li>
            <mark>Double click</mark> vào truyện để xem chi tiết
          </li>
          <li className="hide-mb">Bấm phím (W) hoặc (&uarr;) để đi lên</li>
          <li className="hide-mb">Bấm phím (S) hoặc (&darr;) để đi xuống</li>
          <li className="hide-mb">Bấm phím (A) hoặc (&larr;) để xoay trái</li>
          <li className="hide-mb">Bấm phím (D) hoặc (&rarr;) để xoay phải</li>
          <li className="hide show-mb">Nhấp vào nút (&uarr;) để đi lên</li>
          <li className="hide show-mb">Nhấp vào nút (&darr;) để đi xuống</li>
        </ul>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            className="white-button"
            style={{ fontSize: 14 }}
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
      <button onClick={back} className="back-button">
        (Esc)
      </button>
    </>
  );
}
