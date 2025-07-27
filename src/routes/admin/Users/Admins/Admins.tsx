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
import AdminsTable from "./_components/AdminsTable";
import { Link } from "react-router";
import HSButton from "@/components/global/shared/HSButton";
import { Plus } from "lucide-react";
import AdminDelete from "./_components/AdminDelete";
import { Button } from "@/components/ui/button";

const adminsSortByOptions = ["createdAt", "updatedAt"];
const genderOptions = genders.map((item) => ({
  label: item,
  value: item,
}));

const AdminsPage = () => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <APageContainer>
      <APageHeader title="Admins">
        <Link to={"/admin/users/admins/create"}>
          <HSButton className="h-auto self-start rounded-none px-5 py-2">
            <Plus className="mr-2" /> Add Admin
          </HSButton>
        </Link>
      </APageHeader>

      <ABox>
        <div className="mb-2 flex items-center gap-2">
          <SelectedCount count={selected.length} />
          <AdminDelete selected={selected} setSelected={setSelected}>
            <Button
              className="cursor-pointer rounded-none border border-red-300 bg-transparent text-red-500 hover:border-red-500 hover:bg-red-50 hover:text-red-500 focus-visible:border-red-500 focus-visible:ring-0"
              disabled={selected.length === 0}
              size="sm"
            >
              Delete
            </Button>
          </AdminDelete>
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
