import LimitFilter from "@/components/admin/shared/LimitFilter";
import SearchFilter from "@/components/admin/shared/SearchFilter";
import SelectedCount from "@/components/admin/shared/SelectedCount";
import SortByFilter from "@/components/admin/shared/SortByFilter";
import SortOrderFilter from "@/components/admin/shared/SortOrderFilter";
import ABox from "@/components/admin/ui/ABox";
import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import { useState } from "react";
import DoctorsTable from "./_components/DoctorsTable";

const doctorSortByOptions = ["fee", "appliedDate", "createdAt", "updatedAt"];

const DoctorsPage = () => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <APageContainer>
      <APageHeader title="Doctors" />

      <ABox>
        <div className="mb-2 flex items-center gap-2">
          <SelectedCount count={selected.length} />
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
