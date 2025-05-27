import ABox from "@/components/admin/ui/ABox";
import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import DateFilter from "@/components/global/shared/DateFilter";
import FieldFilter from "@/components/global/shared/FieldFilter";
import LimitFilter from "@/components/global/shared/LimitFilter";
import SearchFilter from "@/components/global/shared/SearchFilter";
import SortByFilter from "@/components/global/shared/SortByFilter";
import SortOrderFilter from "@/components/global/shared/SortOrderFilter";
import { appointmentStatuses } from "@/constants";
import AppointmentsTable from "./_components/AppointmentsTable";

const appointmentSortByOptions = ["createdAt", "updatedAt"];

const statusOptions = appointmentStatuses.map((item) => ({
  label: item,
  value: item,
}));

const AllAppointmentsPage = () => {
  return (
    <APageContainer>
      <APageHeader title="All Appointments" />

      <ABox>
        <div className="mb-2 flex items-center gap-2">
          <SortByFilter
            options={appointmentSortByOptions}
            defaultValueIndex={0}
          />
          <SortOrderFilter />
          <LimitFilter />
          <DateFilter />
          <FieldFilter name="status" label="Status" options={statusOptions} />
        </div>
        <SearchFilter />
      </ABox>

      <AppointmentsTable />
    </APageContainer>
  );
};

export default AllAppointmentsPage;
