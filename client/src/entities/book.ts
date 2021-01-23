import { formatDateForBe } from "../utils";

export interface BookDto {
  author: string;
  country: string;
  pages: number;
  title: string;
  year: number;
  isbn: string;
}

export interface Book {
  author: string;
  country: string;
  pages: number;
  title: string;
  year: number;
  isbn: string;
}

export const mapBookDto = (dto: BookDto): Book => ({
  ...dto,
});

export const mapBook = (book: Book): BookDto => ({
  ...book,
});
