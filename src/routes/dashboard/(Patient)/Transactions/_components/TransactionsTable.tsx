import PaymentDetailsModal from "@/components/dashboard/shared/PaymentDetailsModal";
import DBox from "@/components/dashboard/ui/DBox";
import HSPagination from "@/components/global/shared/HSPagination";
import RefreshButton from "@/components/global/shared/RefreshButton";
import TableLoader from "@/components/global/shared/TableLoader";
import { AUTH_KEY, PAYMENT_STATUS } from "@/constants";
import { PaymentQueries } from "@/lib/modules/payment/payment.queries";
import { cn } from "@/lib/utils";
import { TMeta } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";
import formatDate from "@/utils/formatDate";
import { useQuery } from "@apollo/client";
import { useCookies } from "react-cookie";
import { useSearchParams } from "react-router";

const TransactionsTable = () => {
  const [cookies] = useCookies([AUTH_KEY]);

  const [searchParams] = useSearchParams();

  const {
    data: paymentsData,
    loading,
    refetch,
  } = useQuery(PaymentQueries.MY_PAYMENTS, {
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
    <DBox>
      <RefreshButton fn={refetch} className="mb-2 rounded-md" />

      <table className="primary-table table table-auto">
        <thead>
          <tr>
            <th>Doctor/ Service</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>

        <tbody>
          {paymentsData?.getAllPayments?.payments.map((payment: TPayment) => (
            <tr key={payment.id}>
              {payment.appointment?.doctor && (
                <td>
                  {payment?.appointment?.doctor?.user?.firstName}{" "}
                  {payment?.appointment?.doctor?.user?.lastName}
                </td>
              )}
              {payment.appointment?.service && (
                <td>{payment.appointment?.service?.name}</td>
              )}
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
                <PaymentDetailsModal details={payment.details} />
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
            page={meta?.page || 1}
            limit={meta?.limit || 10}
            total={meta?.total}
          />
        )}
      </div>
    </DBox>
  );
};

export default TransactionsTable;
