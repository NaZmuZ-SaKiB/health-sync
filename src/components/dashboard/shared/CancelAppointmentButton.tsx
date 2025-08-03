import { Button } from "@/components/ui/button";
import { APPOINTMENT_STATUS, AUTH_KEY } from "@/constants";
import { AppointmentQueries } from "@/lib/modules/appointment/appointment.queries";
import { cn } from "@/lib/utils";
import { useMutation } from "@apollo/client";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

type TProps = {
  id: string;
  isCancelled: boolean;
  hideIfCancelled?: boolean;
  admin?: boolean;
};

const CancelAppointmentButton = ({
  id,
  isCancelled,
  hideIfCancelled,
  admin = false,
}: TProps) => {
  const [cookies] = useCookies([AUTH_KEY]);

  const [updateAppointmentFn, { loading }] = useMutation(
    AppointmentQueries.UPDATE_APPOINTMENT,
    {
      context: {
        headers: {
          Authorization: cookies[AUTH_KEY] || "",
        },
      },
      refetchQueries: [
        AppointmentQueries.MY_APPOINTMENTS,
        AppointmentQueries.DOCTOR_SERVICE_APPOINTMENTS,
      ],
    },
  );

  const handleClick = async () => {
    try {
      toast.promise(
        async () => {
          return await updateAppointmentFn({
            variables: {
              appointmentId: id,
              status: APPOINTMENT_STATUS.CANCELLED,
            },
          });
        },
        {
          loading: "Cancelling Appointment...",
          success: () => {
            return "Appointment Canceled.";
          },
          error: (error: any) => error?.message,
        },
      );
    } catch {
      toast.error("A Client error occurred");
    }
  };

  return (
    <>
      {isCancelled ? (
        <Button
          size="sm"
          variant="outline"
          className={cn(
            "h-auto border-red-500 bg-red-50 px-3 py-1 text-xs text-red-500 hover:border-red-500 hover:bg-red-50 hover:text-red-500",
            { hidden: hideIfCancelled, "rounded-none": admin },
          )}
        >
          Canceled
        </Button>
      ) : (
        <Button
          size="sm"
          variant="outline"
          className="h-auto cursor-pointer hover:border-red-500 hover:bg-red-50 hover:text-red-500"
          disabled={isCancelled || loading}
          onClick={handleClick}
        >
          {loading ? "Cancelling..." : "Cancel"}
        </Button>
      )}
    </>
  );
};

export default CancelAppointmentButton;
