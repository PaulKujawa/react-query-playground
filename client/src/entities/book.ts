import { formatDateForBe } from "../utils";

export interface BookDto {
  author: string;
  country: string;
  pages: number;
  title: string;
  year: number;
}

export interface Book {
  author: string;
  country: string;
  pages: number;
  title: string;
  year: number;
}

export const mapBookDto = (dto: BookDto): Book => ({
  ...dto,
});

export const mapBook = (book: Book): BookDto => ({
  ...book,
});
