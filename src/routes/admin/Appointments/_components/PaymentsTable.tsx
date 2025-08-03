import ABox from "@/components/admin/ui/ABox";
import PaymentDetailsModal from "@/components/dashboard/shared/PaymentDetailsModal";
import HSPagination from "@/components/global/shared/HSPagination";
import RefreshButton from "@/components/global/shared/RefreshButton";
import TableLoader from "@/components/global/shared/TableLoader";
import { AUTH_KEY, PAYMENT_STATUS } from "@/constants";
import { PaymentQueries } from "@/lib/modules/payment/payment.queries";
import { TPayment } from "@/lib/modules/payment/payment.type";
import { cn } from "@/lib/utils";
import { TMeta } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";
import formatDate from "@/utils/formatDate";
import { useQuery } from "@apollo/client";
import { useCookies } from "react-cookie";
import { Link, useSearchParams } from "react-router";

const PaymentsTable = () => {
  const [cookies] = useCookies([AUTH_KEY]);

  const [searchParams] = useSearchParams();

  const {
    data: paymentsData,
    loading,
    refetch,
  } = useQuery(PaymentQueries.PAYMENT_LIST, {
    variables: { ...Object.fromEntries(searchParams) },
    context: {
      headers: {
        Authorization: cookies[AUTH_KEY] || "",
      },
    },
  });

  if (loading) return <TableLoader />;

  const meta: TMeta = paymentsData?.getAllPayments?.meta;
  const totalPages = Math.ceil(meta?.total / meta?.limit);

  return (
    <ABox>
      <RefreshButton fn={refetch} className="mb-2" />

      <table className="primary-table table table-auto">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>

        <tbody>
          {paymentsData?.getAllPayments?.payments.map((payment: TPayment) => (
            <tr key={payment.id}>
              <td>
                <Link
                  to={`/admin/users/patients/${payment?.appointment?.patient?.id}`}
                  className="text-sky-600 hover:underline"
                >
                  {payment?.appointment?.patient?.user?.email}
                </Link>
              </td>
              <td>{formatCurrency(payment.amount)}</td>
              <td>{formatDate(payment.createdAt)}</td>
              <td
                className={cn("font-semibold capitalize", {
                  "text-emerald-600":
                    payment.status === PAYMENT_STATUS.COMPLETED,
                  "text-red-600": payment.status === PAYMENT_STATUS.FAILED,
                  "text-yellow-600": payment.status === PAYMENT_STATUS.REFUNDED,
                })}
              >
                {payment.status.toLowerCase()}
              </td>
              <td>
                <PaymentDetailsModal details={payment.details} admin />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-2">
        <div className="text-sm text-slate-700">
          Showing {meta?.limit < meta?.total ? meta?.limit : meta?.total} of{" "}
          {meta?.total}. ({totalPages} page
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

export default PaymentsTable;
