import DBox from "@/components/dashboard/ui/DBox";
import RefreshButton from "@/components/global/shared/RefreshButton";
import TableLoader from "@/components/global/shared/TableLoader";
import { AUTH_KEY } from "@/constants";
import { MedicalReportQueries } from "@/lib/modules/medical-report/medical-report.queries";
import { TMedicalReport } from "@/lib/modules/medical-report/medical-report.type";
import { TMeta } from "@/types";
import formatDate from "@/utils/formatDate";
import { useQuery } from "@apollo/client";
import { useCookies } from "react-cookie";
import { Link, useSearchParams } from "react-router";
import PrescriptionDetail from "../../My-Appointments/_components/PrescriptionDetail";

const MyReportsTable = () => {
  const [cookies] = useCookies([AUTH_KEY]);

  const [searchParams] = useSearchParams();

  const {
    data: reportsData,
    loading,
    refetch,
  } = useQuery(MedicalReportQueries.MY_REPORTS, {
    variables: Object.fromEntries(searchParams),
    context: {
      headers: {
        Authorization: cookies[AUTH_KEY] || "",
      },
    },
  });

  if (loading) return <TableLoader />;

  const meta: TMeta = reportsData?.getAllReports?.meta;
  const totalPages = Math.ceil(meta?.total / meta?.limit);
  return (
    <DBox>
      <RefreshButton fn={refetch} className="mb-2 rounded-md" />

      <table className="primary-table table table-auto">
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Report type</th>
            <th>File</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {reportsData?.getAllReports?.reports.map((report: TMedicalReport) => (
            <tr key={report.id}>
              <td>{formatDate(report.reportDate)}</td>
              <td>{report.title}</td>
              <td className="capitalize">
                {report.reportType.toLowerCase().split("_").join(" ")}
              </td>
              <td>
                {report.fileUrl ? (
                  <Link
                    to={report.fileUrl}
                    className="text-sky-600 hover:underline"
                  >
                    {report.fileUrl?.slice(0, 50)}
                    {report.fileUrl?.length > 50 ? "..." : ""}
                  </Link>
                ) : (
                  "N/A"
                )}
              </td>
              <td>
                <div className="flex items-center justify-center gap-1.5">
                  <PrescriptionDetail prescription={report} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DBox>
  );
};

export default MyReportsTable;
