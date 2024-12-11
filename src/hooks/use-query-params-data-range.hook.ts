import { useCallback, useMemo } from "react";
import { parseAsIsoDate, useQueryState } from "nuqs";

export function useQueryParamsDateRange() {
  const defaultInitialDate = useMemo(() => null, []);
  const initialDateKey = useMemo(() => "initial_date", []);
  const [initialDate, setInitialDate] = useQueryState(
    initialDateKey,
    parseAsIsoDate
  );

  const defaultFinalDate = useMemo(() => null, []);
  const finalDateKey = useMemo(() => "final_date", []);
  const [finalDate, setFinalDate] = useQueryState(finalDateKey, parseAsIsoDate);

  const resetDateRange = useCallback(() => {
    setInitialDate(defaultInitialDate);
    setFinalDate(defaultFinalDate);
  }, [defaultInitialDate, defaultFinalDate, setInitialDate, setFinalDate]);

  const setDefaultDateRange = useCallback(() => {
    const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;
    const endDate = finalDate ?? new Date();
    const startDate = initialDate ?? new Date(endDate.getTime() - ONE_WEEK);

    setInitialDate(startDate);
    setFinalDate(endDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    initialDate,
    setInitialDate,
    initialDateKey,
    finalDate,
    setFinalDate,
    finalDateKey,
    resetDateRange,
    setDefaultDateRange,
  };
}
