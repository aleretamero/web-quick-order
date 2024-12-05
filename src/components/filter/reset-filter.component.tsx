import { Button } from "@/components/ui/button";

interface ResetFilterProps {
  text: string;
  isFilterActive: boolean;
  onReset: () => void;
}

export function ResetFilter({
  text,
  isFilterActive,
  onReset,
}: ResetFilterProps) {
  return (
    <>
      {isFilterActive ? (
        <Button variant="outline" onClick={onReset}>
          {text}
        </Button>
      ) : null}
    </>
  );
}
