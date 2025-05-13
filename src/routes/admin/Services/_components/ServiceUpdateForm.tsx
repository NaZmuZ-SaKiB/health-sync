import HSAInput from "@/components/admin/form/HSAInput";
import HSATextarea from "@/components/admin/form/HSATextarea";
import HSButton from "@/components/global/shared/HSButton";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { AUTH_KEY } from "@/constants";
import { ServiceQueries } from "@/lib/modules/service/service.queries";
import { TService } from "@/lib/modules/service/service.type";
import { ServiceValidation } from "@/lib/modules/service/service.validation";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type TProps = {
  service: TService;
  setOpen: any;
};

type TForm = z.infer<typeof ServiceValidation.update>;

const ServiceUpdateForm = ({ service, setOpen }: TProps) => {
  const [cookies] = useCookies([AUTH_KEY]);

  const [updateServiceFn] = useMutation(ServiceQueries.UPDATE_SERVICE, {
    context: {
      headers: {
        Authorization: cookies[AUTH_KEY] || "",
      },
    },
    refetchQueries: [ServiceQueries.SERVICE_LIST, ServiceQueries.SERVICE_BY_ID],
  });

  const form = useForm<TForm>({
    defaultValues: {
      name: service?.name || "",
      description: service?.description || "",
      // TODO: Icon
    },
    resolver: zodResolver(ServiceValidation.update),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<TForm> = async (data) => {
    try {
      toast.promise(
        async () => {
          return await updateServiceFn({
            variables: { serviceId: service.id, ...data },
          });
        },
        {
          loading: "Updating Service...",
          success: () => {
            setOpen(false);
            return "Service updated successfully.";
          },
          error: (error: any) => error?.message,
        },
      );
    } catch {
      toast.error("A Client error occurred");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <HSAInput type="text" name="name" label="Specialty Name" />
        <HSATextarea name="description" label="Description" required={false} />

        <DialogFooter className="mt-5">
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
            {form.formState.isSubmitting ? "Saving..." : "Save"}
          </HSButton>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ServiceUpdateForm;
