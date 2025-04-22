import LimitFilter from "@/components/admin/shared/LimitFilter";
import SearchFilter from "@/components/admin/shared/SearchFilter";
import SortByFilter from "@/components/admin/shared/SortByFilter";
import SortOrderFilter from "@/components/admin/shared/SortOrderFilter";
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
          {/* // TODO: ADD Bulk Update - reject, approve, delete  */}
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
