import React from "react";
import { useCreateBook, useGetBooks } from "./repositories";

export const App = () => {
  const { data } = useGetBooks({ page: 1 });
  const { mutate: addBook } = useCreateBook();

  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button
        type="button"
        onClick={() => {
          addBook({
            title: "Wuthering Heights",
            author: "Emily Brontë",
            pages: 416,
            country: "England",
            year: 1847,
          });
        }}
      >
        Add book
      </button>
    </>
  );
};
