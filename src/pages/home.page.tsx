import { CardsGraphsHome } from "@/components/app/home/cards-graphs-home.component";
import { CardsInfoHome } from "@/components/app/home/cards-info-home-component";
import { DateRangePickerFilter } from "@/components/filter/date-range-picker-filter.component";
import { PageContainer } from "@/components/layout/page-container.component";

export function HomePage() {
  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Olá, Bem-vindo de volta 👋
          </h2>
          <div className="hidden items-center space-x-2 md:flex">
            <DateRangePickerFilter />
          </div>
        </div>
        <CardsInfoHome />
        <CardsGraphsHome />
      </div>
    </PageContainer>
  );
}
