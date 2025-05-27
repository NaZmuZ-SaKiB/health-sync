import ReportsTable from "@/components/dashboard/shared/ReportsTable";
import DBox from "@/components/dashboard/ui/DBox";
import DPageContainer from "@/components/dashboard/ui/DPageContainer";
import DPageHeader from "@/components/dashboard/ui/DPageHeader";
import FieldFilter from "@/components/global/shared/FieldFilter";
import LimitFilter from "@/components/global/shared/LimitFilter";
import SearchFilter from "@/components/global/shared/SearchFilter";
import SortByFilter from "@/components/global/shared/SortByFilter";
import SortOrderFilter from "@/components/global/shared/SortOrderFilter";
import { REPORT_TYPE } from "@/constants";
import { useParams } from "react-router";

const reportSortByOptions = ["reportDate", "createdAt", "updatedAt"];
const reportTypeOptions = [
  {
    label: "Diagnosis",
    value: REPORT_TYPE.DIAGNOSIS,
  },
  {
    label: "Lab",
    value: REPORT_TYPE.LAB_REPORT,
  },
];

const PatientReportsPage = () => {
  const { id } = useParams();
  return (
    <DPageContainer>
      <DPageHeader title="Patient Reports" backButton />

      <DBox>
        <div className="mb-2 flex items-center gap-2">
          <SortByFilter
            options={reportSortByOptions}
            defaultValueIndex={0}
            className="rounded-md"
          />
          <SortOrderFilter className="rounded-md" />
          <LimitFilter className="rounded-md" />
          <FieldFilter
            name="reportType"
            label="Report Type"
            options={reportTypeOptions}
            className="rounded-md"
          />
        </div>
        <SearchFilter className="rounded-md" />
      </DBox>

      <ReportsTable patientId={id} />
    </DPageContainer>
  );
};

export default PatientReportsPage;
