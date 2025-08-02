import { Button } from "@/components/ui/button";
import { AUTH_KEY } from "@/constants";
import { PaymentQueries } from "@/lib/modules/payment/payment.queries";
import { cn } from "@/lib/utils";
import { useMutation } from "@apollo/client";
import { ClassValue } from "clsx";
import { useCookies } from "react-cookie";

type TProps = {
  appointmentId?: string;
  className?: ClassValue;
};

const PaymentButton = ({ appointmentId, className }: TProps) => {
  const [cookies] = useCookies([AUTH_KEY]);

  const [initPaymentFn, { loading }] = useMutation(
    PaymentQueries.PAYMENT_INIT,
    {
      context: {
        headers: {
          Authorization: cookies[AUTH_KEY] || "",
        },
      },
    },
  );

  const handleClick = async () => {
    const data = await initPaymentFn({
      variables: {
        appointmentId: appointmentId || "",
      },
    });

    if (data?.data?.paymentInit) {
      window.location = data?.data?.paymentInit;
    }
  };

  return (
    <Button
      className={cn("", className)}
      onClick={handleClick}
      disabled={loading}
    >
      Pay Now
    </Button>
  );
};

export default PaymentButton;
