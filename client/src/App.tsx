import React from "react";
import { useCreateBook, useGetBooks } from "./repositories";

export const App = () => {
  const { data } = useGetBooks();
  const { mutate: addBook } = useCreateBook();

  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button
        type="button"
        onClick={() => {
          addBook({
            isbn: 9780141040356,
            title: "Wuthering Heights",
            author: "Emily Brontë",
            publishDate: new Date("2008-06-11"),
            publisher: "Penguin Classics",
            numOfPages: 416,
          });
        }}
      >
        Add book
      </button>
    </>
  );
};
