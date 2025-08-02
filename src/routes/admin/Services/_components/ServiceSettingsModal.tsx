import HSButton from "@/components/global/shared/HSButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { AUTH_KEY } from "@/constants";
import { TServiceSettings } from "@/lib/modules/service-settings/service-settings.type";
import { ServiceSettingsValidation } from "@/lib/modules/service-settings/service-settings.validation";
import { z } from "zod";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ServiceSettingsQueries } from "@/lib/modules/service-settings/service-settings.queries";
import { Settings } from "lucide-react";
import HSDTimeInput from "@/components/dashboard/form/HSDTimeInput";
import HSAInput from "@/components/admin/form/HSAInput";
import { ServiceQueries } from "@/lib/modules/service/service.queries";

type TProps = {
  serviceId: string;
  settings: TServiceSettings;
};

type TForm = z.infer<typeof ServiceSettingsValidation.update>;

const ServiceSettingsModal = ({ settings, serviceId }: TProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const [cookies] = useCookies([AUTH_KEY]);

  const [updateSettingsFn] = useMutation(
    ServiceSettingsQueries.UPDATE_SERVICE_SETTINGS,
    {
      context: {
        headers: {
          Authorization: cookies[AUTH_KEY] || "",
        },
      },
      refetchQueries: [ServiceQueries.SERVICE_LIST],
    },
  );

  const form = useForm<TForm>({
    defaultValues: {
      startTime: settings?.startTime || "09:30",
      endTime: settings?.endTime || "17:30",
      duration: settings?.duration || 15,
      fee: settings?.fee || 0,
    },
    resolver: zodResolver(ServiceSettingsValidation.update),
    mode: "onBlur",
  });

  const handleUpdate: SubmitHandler<TForm> = async (data) => {
    try {
      toast.promise(
        async () => {
          return await updateSettingsFn({
            variables: {
              serviceId,
              ...data,
            },
          });
        },
        {
          loading: `Updating Service Settings`,
          success: () => {
            setOpen(false);
            return `Service Settings updated.`;
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
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="cursor-pointer rounded-none"
        >
          <Settings />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="mb-5">
          <DialogTitle className="text-primary-hover">
            Service Settings
          </DialogTitle>
          <DialogDescription hidden>Service Settings</DialogDescription>
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
              admin
            />

            <HSDTimeInput
              name="endTime"
              label="End Time"
              required={false}
              vertical
              admin
            />

            <HSAInput
              name="duration"
              label="Duration"
              type="number"
              required={false}
              vertical
              min={15}
              max={60}
              step={15}
            />

            <HSAInput
              name="fee"
              label="Fee"
              type="number"
              required={false}
              vertical
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

export default ServiceSettingsModal;
