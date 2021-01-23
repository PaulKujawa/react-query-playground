import { useMutation, useQuery } from "react-query";
import { mapBookDto, BookDto, Book, mapBook } from "./entities";

const baseUrl = "http://localhost:3000";

export const useGetBooks = () => {
  return useQuery("books", async () => {
    const response = await fetch(`${baseUrl}/books`);
    const dtos: BookDto[] = await response.json();

    return dtos.map(mapBookDto);
  });
};

export const useCreateBook = () => {
  return useMutation((book: Book) => {
    const dto = mapBook(book);

    console.log(dto);

    return fetch(`${baseUrl}/books`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    });
  });
};
