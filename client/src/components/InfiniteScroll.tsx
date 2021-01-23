import React from "react";
import { useIntersectionObserver } from "../hooks";
import "./infiniteScroll.css";

interface Props {
  canFetchMore?: boolean;
  isFetching: boolean;
  fetchMore: () => void;
  children: React.ReactChild;
}

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
