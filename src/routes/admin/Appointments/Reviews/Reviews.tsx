import ABox from "@/components/admin/ui/ABox";
import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import LimitFilter from "@/components/global/shared/LimitFilter";
import SearchFilter from "@/components/global/shared/SearchFilter";
import SortByFilter from "@/components/global/shared/SortByFilter";
import SortOrderFilter from "@/components/global/shared/SortOrderFilter";
import ReviewsTable from "../_components/ReviewsTable";
import FieldFilter from "@/components/global/shared/FieldFilter";

const reviewsSortByOptions = ["rating", "createdAt", "updatedAt"];
const reviewTypes = [
  {
    label: "Doctor",
    value: "doctor",
  },
  {
    label: "Service",
    value: "service",
  },
];

const ReviewsPage = () => {
  return (
    <APageContainer>
      <APageHeader title="Reviews" />

      <ABox>
        <div className="mb-2 flex items-center gap-2">
          <SortByFilter options={reviewsSortByOptions} defaultValueIndex={1} />
          <SortOrderFilter />
          <FieldFilter name="type" label="Type" options={reviewTypes} />
          <LimitFilter />
        </div>
        <SearchFilter />
      </ABox>

      <ReviewsTable />
    </APageContainer>
  );
};

export default ReviewsPage;
