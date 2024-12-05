import { useMemo } from "react";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { usePagination } from "@/hooks/use-pagination.hook";
import { getOrdersAction } from "@/domain/orders/actions/get-orders.action";

export function useGetOrders() {
  const {
    limit,
    page,
    getPreviousPageParam,
    getNextPageParam,
    calculateTotalPages,
  } = usePagination();

  const query = useInfiniteQuery({
    queryKey: ["/orders", { page, limit }],
    queryFn: async ({ pageParam }) =>
      await getOrdersAction({
        page: pageParam,
        limit,
      }).then((response) => response.data),
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
