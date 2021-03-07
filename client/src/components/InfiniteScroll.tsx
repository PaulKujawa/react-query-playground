import React from "react";
import "./infiniteScroll.css";

interface Props {
  canFetchMore?: boolean;
  isFetching: boolean;
  fetchMore: () => void;
  children: React.ReactChild;
}

export const useIntersectionObserver = ({
  target,
  enabled,
  onIntersect,
  root,
  rootMargin,
  threshold,
}: IntersectionObserverInit & {
  target: React.MutableRefObject<Element | null>;
  enabled: boolean;
  onIntersect: () => void;
}) => {
  React.useEffect(() => {
    if (!target.current || !enabled) return;

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && onIntersect(),
      { root, rootMargin, threshold }
    );

    const elem = target.current;
    intersectionObserver.observe(elem);

    return () => {
      intersectionObserver.unobserve(elem);
    };
  }, [target, enabled, onIntersect, root, rootMargin, threshold]);
};

export const InfiniteScroll = ({
  canFetchMore,
  isFetching,
  fetchMore,
  children,
}: Props) => {
  const infiniteScrollAnchor = React.useRef<HTMLDivElement>(null);

  useIntersectionObserver({
    target: infiniteScrollAnchor,
    enabled: !!canFetchMore,
    onIntersect: fetchMore,
    rootMargin: "250px",
  });

  return (
    <>
      {children}

      {isFetching && (
        <div className="infiniteScrolling_placeholder">loading...</div>
      )}

      {canFetchMore === false && (
        <div className="infiniteScrolling_depleted">All items loaded.</div>
      )}

      <div ref={infiniteScrollAnchor} />
    </>
  );
};
