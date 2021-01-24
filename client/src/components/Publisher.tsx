import React from "react";
import { Book } from "../entities";
import { useCreateBook } from "../repositories";

export const Publisher = () => {
  const { mutate: addBook } = useCreateBook();
  const [book, setBook] = React.useState<Partial<Book>>({});

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addBook(book as Book);
  };

  return (
    <>
      Publish new book to collection.
      <form onSubmit={onSubmit}>
        {[
          ["author", "text"],
          ["country", "text"],
          ["pages", "number"],
          ["title", "text"],
          ["year", "number"],
          ["isbn", "text"],
        ].map(([field, type]) => (
          <label style={{ display: "block" }}>
            <span style={{ marginRight: "0.5rem" }}>{field}</span>
            <input
              required
              type={type}
              value={(book as any)[field]}
              onChange={({ currentTarget: { value } }) =>
                setBook({ ...book, [field]: value })
              }
            />
          </label>
        ))}

        <button type="submit">Add book</button>
      </form>
    </>
  );
};
