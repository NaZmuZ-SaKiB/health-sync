import ABox from "@/components/admin/ui/ABox";
import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import FieldFilter from "@/components/global/shared/FieldFilter";
import LimitFilter from "@/components/global/shared/LimitFilter";
import SearchFilter from "@/components/global/shared/SearchFilter";
import SortByFilter from "@/components/global/shared/SortByFilter";
import SortOrderFilter from "@/components/global/shared/SortOrderFilter";
import { bloodGroups, genders } from "@/constants";
import PatientsTable from "./_components/PatientsTable";
import formatBloodGroup from "@/utils/formatBloodGroup";

const patientsSortByOptions = ["createdAt", "updatedAt"];
const genderOptions = genders.map((item) => ({
  label: item,
  value: item,
}));
const bloodGroupOptions = bloodGroups.map((item) => ({
  label: formatBloodGroup(item),
  value: item,
}));

const PatientsPage = () => {
  return (
    <APageContainer>
      <APageHeader title="Patients" />

      <ABox>
        <div className="mb-2 flex items-center gap-2">
          <SortByFilter options={patientsSortByOptions} defaultValueIndex={0} />
          <SortOrderFilter />
          <FieldFilter name="gender" label="Gender" options={genderOptions} />
          <FieldFilter
            name="bloodGroup"
            label="Blood Group"
            options={bloodGroupOptions}
          />
          <LimitFilter />
        </div>
        <SearchFilter />
      </ABox>

      <PatientsTable />
    </APageContainer>
  );
};

export default PatientsPage;
