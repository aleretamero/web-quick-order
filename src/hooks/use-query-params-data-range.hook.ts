import { useCallback, useMemo } from "react";
import { parseAsIsoDate, useQueryState } from "nuqs";

export function useQueryParamsDateRange() {
  const defaultInitialDate = useMemo(() => null, []);
  const initialDateKey = useMemo(() => "initial_date", []);
  const [initialDate, setInitialDate] = useQueryState(
    initialDateKey,
    parseAsIsoDate.withOptions({ clearOnDefault: true })
  );

  const defaultFinalDate = useMemo(() => null, []);
  const finalDateKey = useMemo(() => "final_date", []);
  const [finalDate, setFinalDate] = useQueryState(
    finalDateKey,
    parseAsIsoDate.withOptions({ clearOnDefault: true })
  );

  const resetDateRange = useCallback(() => {
    setInitialDate(defaultInitialDate);
    setFinalDate(defaultFinalDate);
  }, [defaultInitialDate, defaultFinalDate, setInitialDate, setFinalDate]);

  return {
    initialDate,
    setInitialDate,
    initialDateKey,
    finalDate,
    setFinalDate,
    finalDateKey,
    resetDateRange,
  };
}
