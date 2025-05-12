import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import DGrid from "@/components/global/shared/DGrid";
import ServiceCreateForm from "./_components/ServiceCreateForm";
import { useState } from "react";
import ABox from "@/components/admin/ui/ABox";
import SelectedCount from "@/components/global/shared/SelectedCount";
import { Button } from "@/components/ui/button";
import SortByFilter from "@/components/global/shared/SortByFilter";
import SortOrderFilter from "@/components/global/shared/SortOrderFilter";
import LimitFilter from "@/components/global/shared/LimitFilter";
import SearchFilter from "@/components/global/shared/SearchFilter";
import ServiceTable from "./_components/ServiceTable";

const serviceSortByOptions = ["name", "createdAt", "updatedAt"];

const AdminServicesPage = () => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <APageContainer>
      <APageHeader title="Services" />

      <DGrid>
        <div>
          <ServiceCreateForm />
        </div>

        <div className="space-y-4">
          <ABox>
            <div className="mb-2 flex items-center gap-2">
              <SelectedCount count={selected.length} />
              {/* <SpecialtyDelete selected={selected} setSelected={setSelected}> */}
              <Button
                className="cursor-pointer rounded-none border border-red-300 bg-transparent text-red-500 hover:border-red-500 hover:bg-red-50 hover:text-red-500 focus-visible:border-red-500 focus-visible:ring-0"
                disabled={selected.length === 0}
                size="sm"
              >
                Delete
              </Button>
              {/* </SpecialtyDelete> */}
              <SortByFilter
                options={serviceSortByOptions}
                defaultValueIndex={1}
              />
              <SortOrderFilter />
              <LimitFilter />
            </div>
            <SearchFilter />
          </ABox>
          <ServiceTable selected={selected} setSelected={setSelected} />
        </div>
      </DGrid>
    </APageContainer>
  );
};

export default AdminServicesPage;
