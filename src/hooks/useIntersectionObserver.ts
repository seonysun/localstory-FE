import { useCallback, useEffect, useRef } from 'react';

const useIntersectionObserver = (
  hasNextPage: boolean,
  fetchNextPage: () => void,
  isFetchingNextPage: boolean,
) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const callback = useCallback(() => {
    return new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        });
      },
      { threshold: 0.5 },
    );
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  useEffect(() => {
    const target = observerRef.current;
    if (!target) return undefined;

    const observer = callback();
    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [observerRef, callback]);

  return observerRef;
};

export default useIntersectionObserver;
