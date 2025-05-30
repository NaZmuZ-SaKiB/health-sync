import ABox from "@/components/admin/ui/ABox";
import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import FieldFilter from "@/components/global/shared/FieldFilter";
import LimitFilter from "@/components/global/shared/LimitFilter";
import SearchFilter from "@/components/global/shared/SearchFilter";
import SortByFilter from "@/components/global/shared/SortByFilter";
import SortOrderFilter from "@/components/global/shared/SortOrderFilter";
import { REPORT_TYPE } from "@/constants";
import ReportsTable from "./_components/ReportsTable";

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

const ReportsPage = () => {
  return (
    <APageContainer>
      <APageHeader title="All Reports" />

      <ABox>
        <div className="mb-2 flex items-center gap-2">
          <SortByFilter options={reportSortByOptions} defaultValueIndex={0} />
          <SortOrderFilter />
          <LimitFilter />
          <FieldFilter
            name="reportType"
            label="Report Type"
            options={reportTypeOptions}
          />
        </div>
        <SearchFilter />
      </ABox>

      <ReportsTable />
    </APageContainer>
  );
};

export default ReportsPage;
