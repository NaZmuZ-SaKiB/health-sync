import HSButton from "@/components/global/shared/HSButton";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/formatCurrency";
import { Link, useSearchParams } from "react-router";

const PaymentResultPage = () => {
  const [searchParams] = useSearchParams();

  const colorObj = {
    success: "text-green-600",
    failed: "text-red-600",
    cancelled: "text-slate-700",
  };

  const texts = {
    success: "Payment successful",
    failed: "Payment failed",
    cancelled: "Payment cancelled",
  };

  const status = searchParams.get("status") || "cancelled";
  const amountText = searchParams.get("amount") || "0";

  const amount = Number(amountText);

  const color = colorObj[status as keyof typeof colorObj];
  const text = texts[status as keyof typeof texts];

  return (
    <div className="mx-auto mt-32 mb-48 max-w-[500px] rounded-3xl bg-slate-100 py-10 text-center">
      <h1 className={cn("mb-8 text-4xl font-semibold capitalize", color)}>
        {text}
      </h1>
      {amount > 0 && (
        <p className="mb-5 text-2xl font-medium text-slate-500">
          {formatCurrency(amount)}
        </p>
      )}

      <Link to={"/"}>
        <HSButton className="h-auto px-8 py-3" variant="secondary">
          Back to Home
        </HSButton>
      </Link>
    </div>
  );
};

export default PaymentResultPage;
