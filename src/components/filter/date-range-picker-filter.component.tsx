import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQueryParamsDateRange } from "@/hooks/use-query-params-data-range.hook";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import * as React from "react";

export function DateRangePickerFilter({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { initialDate, finalDate, setInitialDate, setFinalDate } =
    useQueryParamsDateRange();

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[260px] justify-start text-left font-normal text-foreground",
              !initialDate && !finalDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {initialDate ? (
              finalDate ? (
                <>
                  {format(initialDate, "P", { locale: ptBR })} -{" "}
                  {format(finalDate, "P", { locale: ptBR })}
                </>
              ) : (
                format(initialDate, "P", { locale: ptBR })
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
            defaultMonth={initialDate ?? undefined}
            selected={{
              from: initialDate ?? undefined,
              to: finalDate ?? undefined,
            }}
            onSelect={(date) => {
              setInitialDate(date?.from ?? null);
              setFinalDate(date?.to ?? null);
            }}
            numberOfMonths={2}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
