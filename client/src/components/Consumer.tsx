import React from "react";
import { InfiniteScroll } from ".";
import { useBooksWebsocket, useGetBooks } from "../repositories";
import "./consumer.css";

export const Consumer = () => {
  const scrollAnchor = React.useRef<HTMLDivElement>(null);
  const getBookInfo = useGetBooks();
  const [bufferLength, flushBuffer] = useBooksWebsocket();

  return (
    <div ref={scrollAnchor}>
      {!!bufferLength && (
        <button
          className="consumer_flush"
          onClick={() => {
            // scrollAnchor.current!.scrollIntoView({ behavior: "smooth" });
            window.scrollTo(0, 0);
            flushBuffer();
          }}
        >
          show {bufferLength} new posts
        </button>
      )}

      <InfiniteScroll
        canFetchMore={getBookInfo.hasNextPage}
        isFetching={getBookInfo.isFetching}
        fetchMore={() => getBookInfo.fetchNextPage()}
      >
        <>
          {getBookInfo.data?.pages
            .flatMap((page) => page.items)
            .map((book) => (
              <div className="consumer_card" key={book.isbn}>
                <div className="consumer_card_title">{book.title}</div>
                <div className="consumer_card_author">{book.author}</div>
                <div className="consumer_card_summary">
                  <span>year: {book.year}</span>
                  <span>pages: {book.pages}</span>
                  <span>isbn: {book.isbn}</span>
                </div>
              </div>
            ))}
        </>
      </InfiniteScroll>
    </div>
  );
};
