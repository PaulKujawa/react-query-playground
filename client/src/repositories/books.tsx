import React from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { Book, BookDto, mapBook, mapBookDto, Paginated } from "../entities";
import { fetchClient, webSocket } from "../lib";
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

/*
 * react-query cache holds pages with items of books, received from a RESTful endpoint.
 * Additionally, this app listens to a websocket that sends books added after initial page load.
 * These books are infititly preprended to the items of the first page.
 *
 * It does not handle the scenario when the websocket emits before the RESTful endpoint
 * as this is product-specific.
 */
export const useBooksWebsocket = () => {
  const queryClient = useQueryClient();
  const [buffer, setBuffer] = React.useState<Book[]>([]);

  React.useEffect(() => {
    webSocket.on("book-added", (dto: BookDto) => {
      setBuffer((acc) => [mapBookDto(dto), ...acc]);
    });
  }, []);

  const flushBuffer = () => {
    queryClient.setQueryData("books", ({ pages, pageParams }: any) => ({
      pageParams,
      pages: [
        { ...pages[0], items: buffer.concat(pages[0].items) },
        ...pages.slice(1),
      ],
    }));
    setBuffer([]);
  };

  return [buffer.length, flushBuffer] as const;
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
