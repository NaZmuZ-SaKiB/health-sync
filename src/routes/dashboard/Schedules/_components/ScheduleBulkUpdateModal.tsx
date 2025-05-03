import HSDInput from "@/components/dashboard/form/HSDInput";
import HSDTimeInput from "@/components/dashboard/form/HSDTimeInput";
import HSButton from "@/components/global/shared/HSButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { AUTH_KEY } from "@/constants";
import { DoctorScheduleQueries } from "@/lib/modules/doctor-schedule/doctor-schedule.queries";
import { TDoctorSchedule } from "@/lib/modules/doctor-schedule/doctor-schedule.type";
import { DoctorScheduleValidation } from "@/lib/modules/doctor-schedule/doctor-schedule.validation";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type TProps = {
  ids: string[];
  setIds?: (ids: string[]) => void;
  children: React.ReactNode;
  defaultValue?: TDoctorSchedule;
};

type TForm = z.infer<typeof DoctorScheduleValidation.update>;

const ScheduleBulkUpdateModal = ({
  ids,
  setIds,
  children,
  defaultValue,
}: TProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const [cookies] = useCookies([AUTH_KEY]);

  const [updateScheduleFn] = useMutation(
    DoctorScheduleQueries.UPDATE_DOCTOR_SCHEDULES,
    {
      context: {
        headers: {
          Authorization: cookies[AUTH_KEY] || "",
        },
      },
      refetchQueries: [DoctorScheduleQueries.DOCTOR_SCHEDULES],
    },
  );

  const form = useForm<TForm>({
    defaultValues: {
      startTime: defaultValue?.startTime || "09:30",
      endTime: defaultValue?.endTime || "17:30",
      sessionLength: defaultValue?.sessionLength || 30,
    },
    resolver: zodResolver(DoctorScheduleValidation.update),
    mode: "onBlur",
  });

  const handleUpdate: SubmitHandler<TForm> = async (data) => {
    try {
      toast.promise(
        async () => {
          return await updateScheduleFn({
            variables: {
              input: {
                ids,
                data,
              },
            },
          });
        },
        {
          loading: `Updating Schedule${ids.length > 1 ? "s" : ""}...`,
          success: () => {
            if (setIds) {
              setIds([]);
            }
            setOpen(false);
            return `Schedule${ids.length > 1 ? "s" : ""} updated.`;
          },
          error: (error: any) => error?.message,
        },
      );
    } catch {
      toast.error("A Client error occurred");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader className="mb-5">
          <DialogTitle className="text-primary-hover">
            {defaultValue ? (
              <span>
                Edit{" "}
                <span className="capitalize">
                  {defaultValue.day?.toLowerCase()}'s
                </span>{" "}
                Schedule
              </span>
            ) : (
              "Bluk Update Schedule"
            )}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="flex flex-col gap-3"
          >
            <HSDTimeInput
              name="startTime"
              label="Start Time"
              required={false}
              vertical
            />

            <HSDTimeInput
              name="endTime"
              label="End Time"
              required={false}
              vertical
            />

            <HSDInput
              name="sessionLength"
              label="Session Length"
              type="number"
              required={false}
              vertical
              min={15}
              max={60}
              step={15}
            />

            <DialogFooter className="mt-10">
              <Button
                variant="secondary"
                className="cursor-pointer text-slate-50"
                type="button"
                onClick={() => {
                  form.reset();
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <HSButton
                className="rounded-lg"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Updating..." : "Update"}
              </HSButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleBulkUpdateModal;
