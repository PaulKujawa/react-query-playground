interface Pagination {
  limit: number;
  cursor: string;
  cursorNext: string | null;
  // has_next: boolean;
  // has_previous: boolean;
  // offset: number;
  // total: number;
}

export interface Paginated<T> extends Pagination {
  items: T[];
}
