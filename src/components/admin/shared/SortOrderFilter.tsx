import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useSearchParams } from "react-router";

type TSortOrder = "asc" | "desc";

const SortOrderFilter = () => {
  const [sortOrder, setSortOrder] = useState<TSortOrder>("desc");

  const [searchParams, setSearchParams] = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const handleChange = (value: TSortOrder) => {
    setSortOrder(value);

    params.delete("sortOrder");
    params.delete("page");
    params.append("page", "1");
    params.append("sortOrder", value);

    setSearchParams(params);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="focus-visible:border-primary cursor-pointer rounded-none text-slate-700 capitalize hover:bg-slate-50 focus-visible:text-slate-900 focus-visible:ring-0"
          variant="outline"
          size="sm"
        >
          Order : {sortOrder}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-none p-0">
        <DropdownMenuRadioGroup
          value={sortOrder}
          onValueChange={handleChange as any}
        >
          <DropdownMenuRadioItem
            className="cursor-pointer rounded-none text-slate-700 capitalize hover:bg-slate-50 hover:text-slate-900"
            value="asc"
          >
            Ascending
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="cursor-pointer rounded-none text-slate-700 capitalize hover:bg-slate-50 hover:text-slate-900"
            value="desc"
          >
            Descending
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortOrderFilter;
