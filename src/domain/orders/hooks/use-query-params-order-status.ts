import { useCallback, useMemo } from "react";
import { parseAsArrayOf, parseAsStringEnum, useQueryState } from "nuqs";
import { OrderStatus } from "@/domain/orders/enums/order-status.enum";

export function useQueryParamsOrderStatus() {
  const key = useMemo(() => "order_status", []);
  const defaultValue = useMemo<OrderStatus[]>(() => [], []);
  const [value, setValues] = useQueryState(
    key,
    parseAsArrayOf(parseAsStringEnum<OrderStatus>(Object.values(OrderStatus)))
      .withDefault(defaultValue)
      .withOptions({ clearOnDefault: true })
  );

  const reset = useCallback(() => {
    setValues(defaultValue);
  }, [setValues, defaultValue]);

  return {
    key,
    defaultValue,
    value,
    setValues,
    reset,
  };
}
