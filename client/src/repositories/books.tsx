import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { Book, BookDto, mapBook, mapBookDto, Paginated } from "../entities";
import { fetchClient } from "../lib";
import { buildQueryParams } from "../utils";

export const useGetBooks = () => {
  return useInfiniteQuery(
    "books",
    async ({ pageParam }) => {
      const query = buildQueryParams({ cursor: pageParam });
      const dto = await fetchClient.getData<Paginated<BookDto>>(
        `/books?${query}`
      );

      return { ...dto, items: dto.items.map(mapBookDto) };
    },
    { getNextPageParam: (curr) => curr.cursorNext }
  );
};

export const useCreateBook = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (book: Book) => {
      const dto = await fetchClient.postData<BookDto>("/books", mapBook(book));

      return mapBookDto(dto);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("books");
      },
    }
  );
};
