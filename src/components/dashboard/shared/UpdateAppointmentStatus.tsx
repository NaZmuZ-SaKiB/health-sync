import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { APPOINTMENT_STATUS, appointmentStatuses, AUTH_KEY } from "@/constants";
import { AppointmentQueries } from "@/lib/modules/appointment/appointment.queries";
import { cn } from "@/lib/utils";
import { TAppointmentStatus } from "@/types";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

type TProps = {
  id: string;
  defaultValue: TAppointmentStatus;
};

const options = appointmentStatuses;

const UpdateAppointmentStatus = ({ id, defaultValue }: TProps) => {
  const [selected, setSelected] = useState(defaultValue);

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

  const handleChange = async (value: string) => {
    setSelected(value as TAppointmentStatus);

    try {
      toast.promise(
        async () => {
          return await updateAppointmentFn({
            variables: {
              appointmentId: id,
              status: value,
            },
          });
        },
        {
          loading: "Updating Appointment Status...",
          success: () => {
            return "Appointment Status Updated.";
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
      {selected === APPOINTMENT_STATUS.SCHEDULED ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={loading}>
            <Button
              className={cn(
                "focus-visible:border-primary cursor-pointer rounded-none text-slate-700 capitalize hover:bg-slate-50 focus-visible:text-slate-900 focus-visible:ring-0",
                {
                  "border-green-600 bg-green-50 text-green-600 hover:bg-green-600 hover:!text-slate-50 focus-visible:text-green-600":
                    selected === APPOINTMENT_STATUS.SCHEDULED,
                },
              )}
              variant="outline"
              size="sm"
              disabled={loading}
            >
              {selected.toLowerCase()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-none p-0">
            <DropdownMenuRadioGroup
              value={defaultValue}
              onValueChange={handleChange}
            >
              {options.map((option) => (
                <DropdownMenuRadioItem
                  className="cursor-pointer rounded-none text-slate-700 capitalize hover:bg-slate-50 hover:!text-slate-900"
                  key={option}
                  value={option}
                  disabled={option === APPOINTMENT_STATUS.SCHEDULED}
                  hidden={
                    option === APPOINTMENT_STATUS.CANCELLED ||
                    option === APPOINTMENT_STATUS.SCHEDULED
                  }
                >
                  {option.toLowerCase()}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          className={cn(
            "focus-visible:border-primary cursor-pointer rounded-none text-slate-700 capitalize hover:bg-slate-50 focus-visible:text-slate-900 focus-visible:ring-0",
          )}
          variant="outline"
          size="sm"
        >
          {selected.toLowerCase()}
        </Button>
      )}
    </>
  );
};

export default UpdateAppointmentStatus;
