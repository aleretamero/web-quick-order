import { PaginationResponse } from "@/services/api/api-types";
import { parseAsInteger, useQueryState } from "nuqs";
import { useCallback, useEffect, useMemo } from "react";

export function usePagination(totalItems?: number) {
  const limitKey = useMemo(() => "limit", []);
  const limitDefaultValue = useMemo(() => 10, []);
  const [limit, setLimit] = useQueryState(
    limitKey,
    parseAsInteger
      .withDefault(limitDefaultValue)
      .withOptions({ clearOnDefault: false })
  );
  const resetLimit = useCallback(
    () => setLimit(limitDefaultValue),
    [setLimit, limitDefaultValue]
  );

  const pageKey = useMemo(() => "page", []);
  const pageDefaultValue = useMemo(() => 1, []);
  const [page, setPage] = useQueryState(
    pageKey,
    parseAsInteger.withDefault(1).withOptions({ clearOnDefault: false })
  );
  const resetPage = useCallback(
    () => setPage(pageDefaultValue),
    [setPage, pageDefaultValue]
  );

  const calculateTotalPages = useCallback(
    (totalItems: number) => Math.ceil(totalItems / limit),
    [limit]
  );

  const resetPagination = useCallback(() => {
    setLimit(limitDefaultValue);
    setPage(pageDefaultValue);
  }, [setLimit, setPage, limitDefaultValue, pageDefaultValue]);

  const getNextPageParam = useCallback(
    <T extends PaginationResponse>(lastPage: T) => {
      const totalItems = lastPage.meta.total;
      const totalPages = calculateTotalPages(totalItems);
      return page < totalPages ? page + 1 : undefined;
    },
    [calculateTotalPages, page]
  );

  const getPreviousPageParam = useCallback(() => {
    return page > 1 ? page - 1 : undefined;
  }, [page]);

  const firstPage = useMemo(() => 1, []);
  const lastPage = useMemo(
    () =>
      totalItems !== undefined ? calculateTotalPages(totalItems) : firstPage,
    [totalItems]
  );

  const hasPreviousPage = useMemo(() => page > firstPage, [page]);
  const hasNextPage = useMemo(() => page < lastPage, [page]);
  const goToFirstPage = useCallback(() => setPage(firstPage), [setPage]);
  const goToLastPage = useCallback(() => setPage(lastPage), [setPage]);
  const goToNextPage = useCallback(() => {
    if (hasNextPage) setPage((old) => old + 1);
  }, [hasNextPage, setPage]);
  const goToPreviousPage = useCallback(() => {
    if (hasPreviousPage) setPage((old) => old - 1);
  }, [hasPreviousPage, setPage]);

  useEffect(() => {
    resetPage();
  }, [limit, resetPage]);

  return {
    limitDefaultValue,
    limitKey,
    limit,
    setLimit,
    resetLimit,
    pageDefaultValue,
    pageKey,
    page,
    setPage,
    resetPage,
    resetPagination,
    getNextPageParam,
    getPreviousPageParam,
    calculateTotalPages,
    hasPreviousPage,
    hasNextPage,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPreviousPage,
  };
}
