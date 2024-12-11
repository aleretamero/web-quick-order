import { useEffect, useMemo } from "react";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { usePagination } from "@/hooks/use-pagination.hook";
import { getOrdersAction } from "@/domain/orders/actions/get-orders.action";
import { useQueryParamsDateRange } from "@/hooks/use-query-params-data-range.hook";
import { useQueryParamsOrderStatus } from "@/domain/orders/hooks/use-query-params-order-status";

export function useGetOrders() {
  const {
    limit,
    page,
    getPreviousPageParam,
    getNextPageParam,
    calculateTotalPages,
  } = usePagination();
  const { initialDate, finalDate, setDefaultDateRange } =
    useQueryParamsDateRange();
  const { value } = useQueryParamsOrderStatus();

  const query = useInfiniteQuery({
    queryKey: ["/orders", page, limit, initialDate, finalDate, value],
    queryFn: async ({ pageParam }) => {
      return await getOrdersAction({
        page: pageParam,
        limit,
        from: initialDate ?? undefined,
        to: finalDate ?? undefined,
        status: value,
      }).then((response) => response.data);
    },
    initialPageParam: page,
    getPreviousPageParam,
    getNextPageParam,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  const allOrders = useMemo(() => {
    if (!query.data) return [];
    return query.data.pages.flatMap((page) => page.data);
  }, [query.data]);

  const totalPages = useMemo(
    () => calculateTotalPages(query.data?.pages[0]?.meta.total || 0),
    [query.data, calculateTotalPages]
  );

  const totalItems = useMemo(
    () => query.data?.pages[0]?.meta.total || 0,
    [query.data]
  );

  useEffect(() => {
    if (!initialDate || !finalDate) setDefaultDateRange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data: allOrders,
    totalItems,
    totalPages,
    isRefetching: query.isFetching,
    isLoading: query.isLoading,
    hasNextPage: query.hasNextPage,
    hasPreviousPage: query.hasPreviousPage,
    refetch: query.refetch,
  };
}
