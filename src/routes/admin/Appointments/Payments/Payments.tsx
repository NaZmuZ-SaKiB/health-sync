import ABox from "@/components/admin/ui/ABox";
import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import FieldFilter from "@/components/global/shared/FieldFilter";
import LimitFilter from "@/components/global/shared/LimitFilter";
import SearchFilter from "@/components/global/shared/SearchFilter";
import SortByFilter from "@/components/global/shared/SortByFilter";
import SortOrderFilter from "@/components/global/shared/SortOrderFilter";
import { paymentStatuses } from "@/constants";
import PaymentsTable from "../_components/PaymentsTable";

const paymentsSortByOptions = ["createdAt", "updatedAt"];
const paymentStatusOptions = paymentStatuses.map((status) => ({
  label: status,
  value: status,
}));

const PaymentsPage = () => {
  return (
    <APageContainer>
      <APageHeader title="Payments" />

      <ABox>
        <div className="mb-2 flex items-center gap-2">
          <SortByFilter options={paymentsSortByOptions} defaultValueIndex={0} />
          <SortOrderFilter />
          <FieldFilter
            name="status"
            label="Status"
            options={paymentStatusOptions}
          />
          <LimitFilter />
        </div>
        <SearchFilter />
      </ABox>

      <PaymentsTable />
    </APageContainer>
  );
};

export default PaymentsPage;
