import DBox from "@/components/dashboard/ui/DBox";
import DPageContainer from "@/components/dashboard/ui/DPageContainer";
import DPageHeader from "@/components/dashboard/ui/DPageHeader";
import LimitFilter from "@/components/global/shared/LimitFilter";
import SearchFilter from "@/components/global/shared/SearchFilter";
import SortByFilter from "@/components/global/shared/SortByFilter";
import SortOrderFilter from "@/components/global/shared/SortOrderFilter";
import MyReviewsTable from "./_components/MyReviewsTable";

const reviewsSortByOptions = ["rating", "createdAt", "updatedAt"];

const MyReviewsPage = () => {
  return (
    <DPageContainer>
      <DPageHeader title="My Reviews" />

      <DBox>
        <div className="mb-2 flex items-center gap-2">
          <SortByFilter
            options={reviewsSortByOptions}
            defaultValueIndex={1}
            className="rounded-md"
          />
          <SortOrderFilter className="rounded-md" />
          <LimitFilter className="rounded-md" />
        </div>
        <SearchFilter className="rounded-md" />
      </DBox>

      <MyReviewsTable />
    </DPageContainer>
  );
};

export default MyReviewsPage;
