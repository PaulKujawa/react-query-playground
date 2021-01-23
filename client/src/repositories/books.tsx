import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchClient } from "../lib";
import { mapBookDto, BookDto, Book, mapBook } from "../entities";
import { buildQueryParams } from "../utils";

export const useGetBooks = (options: { page?: number }) => {
  return useQuery("books", async () => {
    const query = buildQueryParams(options);
    const dtos = await fetchClient.getData<BookDto[]>(`/books?${query}`);

    return dtos!.map(mapBookDto);
  });
};

export const useCreateBook = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (book: Book) => {
      const dto = await fetchClient.postData<BookDto>("/books", mapBook(book));

      return mapBookDto(dto!);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("books");
      },
    }
  );
};
