import ABox from "@/components/admin/ui/ABox";
import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import FieldFilter from "@/components/global/shared/FieldFilter";
import LimitFilter from "@/components/global/shared/LimitFilter";
import SearchFilter from "@/components/global/shared/SearchFilter";
import SelectedCount from "@/components/global/shared/SelectedCount";
import SortByFilter from "@/components/global/shared/SortByFilter";
import SortOrderFilter from "@/components/global/shared/SortOrderFilter";
import { genders } from "@/constants";
import { useState } from "react";
import AdminsTable from "./AdminsTable";

const adminsSortByOptions = ["createdAt", "updatedAt"];
const genderOptions = genders.map((item) => ({
  label: item,
  value: item,
}));

const AdminsPage = () => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <APageContainer>
      <APageHeader title="Admins" />

      <ABox>
        <div className="mb-2 flex items-center gap-2">
          <SelectedCount count={selected.length} />
          <SortByFilter options={adminsSortByOptions} defaultValueIndex={1} />
          <SortOrderFilter />
          <FieldFilter name="gender" label="Gender" options={genderOptions} />
          <LimitFilter />
        </div>
        <SearchFilter />
      </ABox>

      <AdminsTable selected={selected} setSelected={setSelected} />
    </APageContainer>
  );
};

export default AdminsPage;
