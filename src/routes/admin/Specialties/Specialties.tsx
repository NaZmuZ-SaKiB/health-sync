import AGrid from "@/components/admin/ui/AGrid";
import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import SpecialtyCreateForm from "./_components/SpecialtyCreateForm";
import SpecialtyTable from "./_components/SpecialtyTable";
import SearchFilter from "@/components/admin/shared/SearchFilter";
import ABox from "@/components/admin/ui/ABox";
import SortByFilter from "@/components/admin/shared/SortByFilter";
import SortOrderFilter from "@/components/admin/shared/SortOrderFilter";
import LimitFilter from "@/components/admin/shared/LimitFilter";
import { useState } from "react";
import SelectedCount from "@/components/admin/shared/SelectedCount";

const specialtySortByOptions = ["name", "createdAt", "updatedAt"];

const SpecialtiesPage = () => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <APageContainer>
      <APageHeader title="Specialties" />

      <AGrid>
        <div>
          <SpecialtyCreateForm />
        </div>

        <div className="space-y-4">
          <ABox>
            <div className="mb-2 flex items-center gap-2">
              <SelectedCount count={selected.length} />
              <SortByFilter
                options={specialtySortByOptions}
                defaultValueIndex={1}
              />
              <SortOrderFilter />
              <LimitFilter />
            </div>
            <SearchFilter />
          </ABox>
          <SpecialtyTable selected={selected} setSelected={setSelected} />
        </div>
      </AGrid>
    </APageContainer>
  );
};

export default SpecialtiesPage;
