import { formatDateForBe } from "../utils";

export interface BookDto {
  author: string;
  isbn: number;
  numOfPages: number;
  publishDate: string;
  publisher: string;
  title: string;
}

export interface Book {
  author: string;
  isbn: number;
  numOfPages: number;
  publishDate: Date;
  publisher: string;
  title: string;
}

export const mapBookDto = (dto: BookDto): Book => ({
  ...dto,
  publishDate: new Date(dto.publishDate),
});

export const mapBook = (book: Book): BookDto => ({
  ...book,
  publishDate: formatDateForBe(book.publishDate),
});
