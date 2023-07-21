import { useEffect, useState } from 'react';

export const useTabActivity = () => {
  const [tabActive, setTabActive] = useState(true);
  const [browserActive, setBrowserActive] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setTabActive(!document.hidden);
    };

    const handleWindowFocus = () => {
      setBrowserActive(true);
    };

    const handleWindowBlur = () => {
      setBrowserActive(false);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleWindowFocus);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleWindowFocus);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, []);

  return {
    tabActive,
    browserActive,
  };
};

export default useTabActivity;
