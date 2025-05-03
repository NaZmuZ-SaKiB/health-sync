import LimitFilter from "@/components/admin/shared/LimitFilter";
import SearchFilter from "@/components/admin/shared/SearchFilter";
import SelectedCount from "@/components/global/shared/SelectedCount";
import SortByFilter from "@/components/admin/shared/SortByFilter";
import SortOrderFilter from "@/components/admin/shared/SortOrderFilter";
import ABox from "@/components/admin/ui/ABox";
import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import { useState } from "react";
import DoctorsTable from "./_components/DoctorsTable";
import DoctorDelete from "./_components/DoctorDelete";
import { Button } from "@/components/ui/button";

const doctorSortByOptions = ["fee", "appliedDate", "createdAt", "updatedAt"];

const DoctorsPage = () => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <APageContainer>
      <APageHeader title="Doctors" />

      <ABox>
        <div className="mb-2 flex items-center gap-2">
          <SelectedCount count={selected.length} />
          <DoctorDelete selected={selected} setSelected={setSelected}>
            <Button
              className="cursor-pointer rounded-none border border-red-300 bg-transparent text-red-500 hover:border-red-500 hover:bg-red-50 hover:text-red-500 focus-visible:border-red-500 focus-visible:ring-0"
              disabled={selected.length === 0}
              size="sm"
            >
              Delete
            </Button>
          </DoctorDelete>
          <SortByFilter options={doctorSortByOptions} defaultValueIndex={3} />
          <SortOrderFilter />
          <LimitFilter />
        </div>
        <SearchFilter />
      </ABox>

      <DoctorsTable selected={selected} setSelected={setSelected} />
    </APageContainer>
  );
};

export default DoctorsPage;
