import ABox from "@/components/admin/ui/ABox";
import ViewReviewModal from "@/components/dashboard/shared/ViewReviewModal";
import HSPagination from "@/components/global/shared/HSPagination";
import RefreshButton from "@/components/global/shared/RefreshButton";
import TableLoader from "@/components/global/shared/TableLoader";
import { AUTH_KEY } from "@/constants";
import { ReviewQueries } from "@/lib/modules/review/review.queries";
import { TMeta } from "@/types";
import { useQuery } from "@apollo/client";
import { useCookies } from "react-cookie";
import { Link, useParams, useSearchParams } from "react-router";

const ServiceReviewTable = () => {
  const { id } = useParams();

  const [cookies] = useCookies([AUTH_KEY]);

  const [searchParams] = useSearchParams();

  const {
    data: reviewsData,
    loading,
    refetch,
  } = useQuery(ReviewQueries.REVIEW_LIST, {
    variables: { ...Object.fromEntries(searchParams), serviceId: id },
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
    <ABox>
      <RefreshButton fn={refetch} className="mb-2" />

      <table className="primary-table table table-auto">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Service</th>
            <th>Rating</th>
            <th>View</th>
          </tr>
        </thead>

        <tbody>
          {reviewsData?.getAllReviews?.reviews.map((review: TReview) => (
            <tr key={review.id}>
              <td>
                <Link
                  to={`/admin/users/patients/${review?.patient?.id}`}
                  className="text-sky-600 hover:underline"
                >
                  {review.patient.user?.firstName || "Unknown"}{" "}
                  {review.patient.user?.lastName}
                </Link>
              </td>
              <td>{review?.service?.name}</td>
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
            admin
            page={meta?.page || 1}
            limit={meta?.limit || 10}
            total={meta?.total}
          />
        )}
      </div>
    </ABox>
  );
};

export default ServiceReviewTable;
