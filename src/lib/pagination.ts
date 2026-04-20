export interface PaginationInput {
  page?: number;
  pageSize?: number;
}

export function normalizePagination(input: PaginationInput) {
  const page = input.page && input.page > 0 ? input.page : 1;
  const pageSize = input.pageSize && input.pageSize > 0 ? Math.min(input.pageSize, 100) : 25;

  return {
    page,
    pageSize,
    offset: (page - 1) * pageSize,
  };
}

