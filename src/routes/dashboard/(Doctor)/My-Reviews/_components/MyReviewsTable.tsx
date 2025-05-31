import ViewReviewModal from "@/components/dashboard/shared/ViewReviewModal";
import DBox from "@/components/dashboard/ui/DBox";
import HSPagination from "@/components/global/shared/HSPagination";
import RefreshButton from "@/components/global/shared/RefreshButton";
import TableLoader from "@/components/global/shared/TableLoader";
import { AUTH_KEY } from "@/constants";
import { ReviewQueries } from "@/lib/modules/review/review.queries";
import { TReview } from "@/lib/modules/review/review.type";
import { TMeta } from "@/types";
import { useQuery } from "@apollo/client";
import { useCookies } from "react-cookie";
import { Link, useSearchParams } from "react-router";

const MyReviewsTable = () => {
  const [cookies] = useCookies([AUTH_KEY]);

  const [searchParams] = useSearchParams();

  const {
    data: reviewsData,
    loading,
    refetch,
  } = useQuery(ReviewQueries.MY_REVIEW_LIST, {
    variables: { ...Object.fromEntries(searchParams) },
    context: {
      headers: {
        Authorization: cookies[AUTH_KEY] || "",
      },
    },
  });

  if (loading) return <TableLoader />;

  const meta: TMeta = reviewsData?.getAllReviews?.meta;
  const totalPages = Math.ceil(meta?.total / meta?.limit);

  return (
    <DBox>
      <RefreshButton fn={refetch} className="mb-2 rounded-md" />

      <table className="primary-table table table-auto">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Rating</th>
            <th>View</th>
          </tr>
        </thead>

        <tbody>
          {reviewsData?.getAllReviews?.reviews.map((review: TReview) => (
            <tr key={review.id}>
              <td>
                {review.patient.user?.firstName || "Unknown"}{" "}
                {review.patient.user?.lastName}
              </td>

              <td>{review.patient.user?.email}</td>

              <td>{review.patient?.user?.phoneNumber}</td>
              <td>{review?.rating}</td>
              <td>
                <ViewReviewModal review={review} admin />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-2">
        <div className="text-sm text-slate-700">
          Showing {meta.limit < meta.total ? meta.limit : meta.total} of{" "}
          {meta.total}. ({totalPages} page
          {totalPages > 1 ? "s" : ""}.)
        </div>
        {totalPages !== 1 && (
          <HSPagination
            page={meta?.page || 1}
            limit={meta?.limit || 10}
            total={meta?.total}
          />
        )}
      </div>
    </DBox>
  );
};

export default MyReviewsTable;
