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
import PrescriptionDetail from "./PrescriptionDetail";
import HSPagination from "@/components/global/shared/HSPagination";

const ReportsTable = ({ patientId }: { patientId?: string }) => {
  const [cookies] = useCookies([AUTH_KEY]);

  const [searchParams] = useSearchParams();

  const {
    data: reportsData,
    loading,
    refetch,
  } = useQuery(MedicalReportQueries.REPORTS, {
    variables: { ...Object.fromEntries(searchParams), patientId },
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

export default ReportsTable;
