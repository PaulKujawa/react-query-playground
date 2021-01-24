import React from "react";
import { InfiniteScroll } from ".";
import { useBooksWebsocket, useGetBooks } from "../repositories";
import "./consumer.css";

export const Consumer = () => {
  const getBookInfo = useGetBooks();
  useBooksWebsocket();

  return (
    <InfiniteScroll
      canFetchMore={getBookInfo.hasNextPage}
      isFetching={getBookInfo.isFetching}
      fetchMore={() => getBookInfo.fetchNextPage()}
    >
      <>
        {getBookInfo.data?.pages
          .flatMap((page) => page.items)
          .map((book) => (
            <div className="card" key={book.isbn}>
              <div className="card_title">{book.title}</div>
              <div className="card_author">{book.author}</div>
              <div className="card_summary">
                <span>year: {book.year}</span>
                <span>pages: {book.pages}</span>
                <span>isbn: {book.isbn}</span>
              </div>
            </div>
          ))}
      </>
    </InfiniteScroll>
  );
};
