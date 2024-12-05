import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuryParamsDateRange } from "@/hooks/use-query-params-data-range.hook";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import * as React from "react";
import { DateRange } from "react-day-picker";

export function DateRangePickerFilter({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { initialDate, finalDate, setInitialDate, setFinalDate } =
    useQuryParamsDateRange();

  const [date, setDate] = React.useState<DateRange | undefined>(() => {
    const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;
    const endDate = initialDate ?? new Date();
    const startDate = finalDate ?? new Date(endDate.getTime() - ONE_WEEK);

    return {
      from: startDate,
      to: endDate,
    };
  });

  React.useEffect(() => {
    setInitialDate(date?.from ?? null);
    setFinalDate(date?.to ?? null);
  }, [date, setInitialDate, setFinalDate]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[260px] justify-start text-left font-normal text-foreground",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "P", { locale: ptBR })} -{" "}
                  {format(date.to, "P", { locale: ptBR })}
                </>
              ) : (
                format(date.from, "P", { locale: ptBR })
              )
            ) : (
              <span>Selecione uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
