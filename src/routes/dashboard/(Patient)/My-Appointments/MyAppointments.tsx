import DBox from "@/components/dashboard/ui/DBox";
import DPageContainer from "@/components/dashboard/ui/DPageContainer";
import DPageHeader from "@/components/dashboard/ui/DPageHeader";
import DateFilter from "@/components/global/shared/DateFilter";
import FieldFilter from "@/components/global/shared/FieldFilter";
import LimitFilter from "@/components/global/shared/LimitFilter";
import SearchFilter from "@/components/global/shared/SearchFilter";
import SortByFilter from "@/components/global/shared/SortByFilter";
import SortOrderFilter from "@/components/global/shared/SortOrderFilter";
import { appointmentStatuses } from "@/constants";
import MyAppointmentsTable from "./_components/MyAppointmentsTable";

const appointmentSortByOptions = ["createdAt", "updatedAt"];

const statusOptions = appointmentStatuses.map((item) => ({
  label: item,
  value: item,
}));

const MyAppointmentsPage = () => {
  return (
    <DPageContainer>
      <DPageHeader title="My Appointments" />

      <DBox>
        <div className="mb-2 flex items-center gap-2">
          <SortByFilter
            options={appointmentSortByOptions}
            defaultValueIndex={0}
            className="rounded-md"
          />
          <SortOrderFilter className="rounded-md" />
          <LimitFilter className="rounded-md" />
          <DateFilter className="rounded-md" />
          <FieldFilter
            name="status"
            label="Status"
            options={statusOptions}
            className="rounded-md"
          />
        </div>
        <SearchFilter className="rounded-md" />
      </DBox>

      <MyAppointmentsTable />
    </DPageContainer>
  );
};

export default MyAppointmentsPage;
