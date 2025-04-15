import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { useSearchParams } from "react-router";
import HSButton from "@/components/global/shared/HSButton";

const SearchFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const [search, setSearch] = useState<string>(params.get("searchTerm") || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    if (!e.target.value) {
      params.delete("searchTerm");
      params.delete("page");
      params.append("page", "1");

      setSearchParams(params);
    }
  };

  const handleSearch = () => {
    if (!search || search === params.get("searchTerm")) return;

    params.delete("searchTerm");
    params.delete("page");
    params.append("page", "1");
    params.append("searchTerm", search);

    setSearchParams(params);
  };

  const handleClearSearch = () => {
    setSearch("");

    params.delete("searchTerm");
    params.delete("page");
    params.append("page", "1");

    setSearchParams(params);
  };

  useEffect(() => {
    setSearch(params.get("searchTerm") || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex w-full flex-wrap gap-2">
      <div className="relative flex-1 shrink-0 basis-60">
        <Input
          value={search}
          placeholder="Search..."
          className="focus-visible:border-primary w-full rounded-none pr-8 focus-visible:ring-0"
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <X
          className="absolute top-2.5 right-2 size-5 cursor-pointer text-slate-500"
          onClick={handleClearSearch}
        />
      </div>
      <HSButton
        variant="outline"
        className="focus-visible:border-primary h-auto rounded-none px-10 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
        onClick={handleSearch}
      >
        Search
      </HSButton>
    </div>
  );
};

export default SearchFilter;
