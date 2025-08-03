import DBox from "@/components/dashboard/ui/DBox";
import DPageContainer from "@/components/dashboard/ui/DPageContainer";
import DPageHeader from "@/components/dashboard/ui/DPageHeader";
import FieldFilter from "@/components/global/shared/FieldFilter";
import LimitFilter from "@/components/global/shared/LimitFilter";
import SearchFilter from "@/components/global/shared/SearchFilter";
import SortByFilter from "@/components/global/shared/SortByFilter";
import SortOrderFilter from "@/components/global/shared/SortOrderFilter";
import { paymentStatuses } from "@/constants";
import TransactionsTable from "@/routes/dashboard/(Patient)/Transactions/_components/TransactionsTable";

const paymentsSortByOptions = ["createdAt", "updatedAt"];
const paymentStatusOptions = paymentStatuses.map((status) => ({
  label: status,
  value: status,
}));

const TransactionsPage = () => {
  return (
    <DPageContainer>
      <DPageHeader title="My Payments" />

      <DBox>
        <div className="mb-2 flex items-center gap-2">
          <SortByFilter
            options={paymentsSortByOptions}
            defaultValueIndex={0}
            className="rounded-md"
          />
          <SortOrderFilter className="rounded-md" />
          <FieldFilter
            name="status"
            label="Status"
            options={paymentStatusOptions}
            className="rounded-md"
          />
          <LimitFilter className="rounded-md" />
        </div>
        <SearchFilter className="rounded-md" />
      </DBox>

      <TransactionsTable />
    </DPageContainer>
  );
};

export default TransactionsPage;
