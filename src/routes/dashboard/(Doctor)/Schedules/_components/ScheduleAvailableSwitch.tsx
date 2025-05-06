import { Switch } from "@/components/ui/switch";
import { AUTH_KEY } from "@/constants";
import { DoctorScheduleQueries } from "@/lib/modules/doctor-schedule/doctor-schedule.queries";
import { useMutation } from "@apollo/client";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

type TProps = { id: string; isAvailable: boolean };

const ScheduleAvailableSwitch = ({ id, isAvailable }: TProps) => {
  const [cookies] = useCookies([AUTH_KEY]);

  const [updateScheduleFn] = useMutation(
    DoctorScheduleQueries.UPDATE_DOCTOR_SCHEDULES,
    {
      context: {
        headers: {
          Authorization: cookies[AUTH_KEY] || "",
        },
      },
    },
  );

  const handleUpdate = (value: boolean) => {
    try {
      toast.promise(
        async () => {
          return await updateScheduleFn({
            variables: {
              input: {
                ids: [id],
                data: {
                  isAvailable: value,
                },
              },
            },
          });
        },
        {
          loading: `Changing Availability`,
          success: () => {
            return `Availability Changed.`;
          },
          error: (error: any) => error?.message,
        },
      );
    } catch {
      toast.error("A Client error occurred");
    }
  };
  return <Switch defaultChecked={isAvailable} onCheckedChange={handleUpdate} />;
};

export default ScheduleAvailableSwitch;
