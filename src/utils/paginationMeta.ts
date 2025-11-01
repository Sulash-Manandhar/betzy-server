type GeneratePaginationMeta = {
  currentPage: number;
  totalCount: number;
  limit: number;
};

export function paginationMeta({
  totalCount,
  currentPage,
  limit,
}: GeneratePaginationMeta) {
  const totalPages = Math.ceil(totalCount / limit);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  return {
    totalCount: totalCount,
    currentPage: currentPage,
    nextPage: hasNextPage ? currentPage + 1 : null,
    previousPage: hasPreviousPage ? currentPage - 1 : null,
    totalPages: totalPages,
    limit,
    hasNextPage: hasNextPage,
    hasPreviousPage: hasPreviousPage,
  };
}
