import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import { useState } from "react";
import ABox from "@/components/admin/ui/ABox";
import SelectedCount from "@/components/admin/shared/SelectedCount";
import SortByFilter from "@/components/admin/shared/SortByFilter";
import SortOrderFilter from "@/components/admin/shared/SortOrderFilter";
import LimitFilter from "@/components/admin/shared/LimitFilter";
import SearchFilter from "@/components/admin/shared/SearchFilter";
import LocationTable from "./_components/LocationTable";
import { Link } from "react-router";
import HSButton from "@/components/global/shared/HSButton";
import { Plus } from "lucide-react";

const locationSortByOptions = ["name", "createdAt", "updatedAt"];

const LocationsPage = () => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <APageContainer>
      <APageHeader title="Locations">
        <Link to={"/admin/locations/create"}>
          <HSButton className="h-auto self-start rounded-none px-5 py-2">
            <Plus className="mr-2" /> Add Location
          </HSButton>
        </Link>
      </APageHeader>

      <ABox>
        <div className="mb-2 flex items-center gap-2">
          <SelectedCount count={selected.length} />
          {/* // TODO: delete  */}
          <SortByFilter options={locationSortByOptions} defaultValueIndex={1} />
          <SortOrderFilter />
          <LimitFilter />
        </div>
        <SearchFilter />
      </ABox>
      <LocationTable selected={selected} setSelected={setSelected} />
    </APageContainer>
  );
};

export default LocationsPage;
