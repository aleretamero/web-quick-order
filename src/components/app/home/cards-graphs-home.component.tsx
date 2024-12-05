import { CardBarGraphHome } from "@/components/app/home/card-bar-graph-home.component";
import { CardPieGraphHome } from "@/components/app/home/card-pie-graph-home.component";

export function CardsGraphsHome() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <CardBarGraphHome />
      <CardPieGraphHome />
    </div>
  );
}
