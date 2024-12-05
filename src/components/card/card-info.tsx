import { ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardInfoProps {
  title: string;
  value: string;
  descriptions?: string[] | string;
  icon?: ReactElement;
}

export function CardInfo({ title, value, descriptions, icon }: CardInfoProps) {
  if (typeof descriptions === "string") {
    descriptions = [descriptions];
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2">{value}</div>
        {descriptions?.map((description, index) => (
          <p
            key={`${title}-description-${index}`}
            className="text-xs text-muted-foreground"
          >
            {description}
          </p>
        ))}
      </CardContent>
    </Card>
  );
}
