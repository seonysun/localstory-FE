import { useEffect } from 'react';

function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  callback: () => void,
) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [ref, callback]);
}

export default useClickOutside;
