import { PaginationResponse } from "@/services/api/api-types";
import { parseAsInteger, useQueryState } from "nuqs";
import { useCallback, useEffect, useMemo } from "react";

export function usePagination() {
  const limitKey = useMemo(() => "limit", []);
  const limitDefaultValue = useMemo(() => 12, []);
  const [limit, setLimit] = useQueryState(
    limitKey,
    parseAsInteger
      .withDefault(limitDefaultValue)
      .withOptions({ clearOnDefault: true })
  );
  const resetLimit = useCallback(
    () => setLimit(limitDefaultValue),
    [setLimit, limitDefaultValue]
  );

  const pageKey = useMemo(() => "page", []);
  const pageDefaultValue = useMemo(() => 1, []);
  const [page, setPage] = useQueryState(
    pageKey,
    parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true })
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
  };
}
