import DGrid from "@/components/global/shared/DGrid";
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
import SelectedCount from "@/components/global/shared/SelectedCount";
import SpecialtyDelete from "./_components/SpecialtyDelete";
import { Button } from "@/components/ui/button";

const specialtySortByOptions = ["name", "createdAt", "updatedAt"];

const SpecialtiesPage = () => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <APageContainer>
      <APageHeader title="Specialties" />

      <DGrid>
        <div>
          <SpecialtyCreateForm />
        </div>

        <div className="space-y-4">
          <ABox>
            <div className="mb-2 flex items-center gap-2">
              <SelectedCount count={selected.length} />
              <SpecialtyDelete selected={selected} setSelected={setSelected}>
                <Button
                  className="cursor-pointer rounded-none border border-red-300 bg-transparent text-red-500 hover:border-red-500 hover:bg-red-50 hover:text-red-500 focus-visible:border-red-500 focus-visible:ring-0"
                  disabled={selected.length === 0}
                  size="sm"
                >
                  Delete
                </Button>
              </SpecialtyDelete>
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
      </DGrid>
    </APageContainer>
  );
};

export default SpecialtiesPage;
