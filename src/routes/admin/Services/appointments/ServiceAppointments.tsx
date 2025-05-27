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
import ServiceAppointmentTable from "./_components/ServiceAppointmentTable";
import { gql, useQuery } from "@apollo/client";

const appointmentSortByOptions = ["createdAt", "updatedAt"];

const statusOptions = appointmentStatuses.map((item) => ({
  label: item,
  value: item,
}));

const LOCATIONS_OPTIONS = gql`
  query GetAllLocations($limit: String) {
    getAllLocations(limit: $limit) {
      locations {
        id
        name
      }
    }
  }
`;

const ServiceAppointmentsPage = () => {
  const { data: locationsData, loading: locationsLoading } = useQuery(
    LOCATIONS_OPTIONS,
    {
      variables: {
        limit: "9999",
      },
    },
  );

  const locationOptions =
    locationsData?.getAllLocations?.locations?.map(
      (item: { name: string; id: string }) => ({
        label: item.name,
        value: item.id,
      }),
    ) || [];

  return (
    <APageContainer>
      <APageHeader title="Service Appointments" />

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
          <FieldFilter
            name="locationId"
            label="Location"
            options={locationOptions}
            disabled={locationsLoading}
          />
        </div>
        <SearchFilter />
      </ABox>

      <ServiceAppointmentTable />
    </APageContainer>
  );
};

export default ServiceAppointmentsPage;
