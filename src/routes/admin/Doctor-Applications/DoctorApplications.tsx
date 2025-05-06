import LimitFilter from "@/components/global/shared/LimitFilter";
import SearchFilter from "@/components/global/shared/SearchFilter";
import SortByFilter from "@/components/global/shared/SortByFilter";
import SortOrderFilter from "@/components/global/shared/SortOrderFilter";
import ABox from "@/components/admin/ui/ABox";
import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import DoctorApplicationsTable from "./_components/DoctorApplicationsTable";

const doctorSortByOptions = ["fee", "appliedDate", "createdAt", "updatedAt"];

const DoctorApplications = () => {
  return (
    <APageContainer>
      <APageHeader title="Doctor Applications" />

      <ABox>
        <div className="mb-2 flex items-center gap-2">
          <SortByFilter options={doctorSortByOptions} defaultValueIndex={1} />
          <SortOrderFilter />
          <LimitFilter />
        </div>
        <SearchFilter />
      </ABox>

      <DoctorApplicationsTable />
    </APageContainer>
  );
};

export default DoctorApplications;
