import HSAInput from "@/components/admin/form/HSAInput";
import HSATextarea from "@/components/admin/form/HSATextarea";
import ABox from "@/components/admin/ui/ABox";
import AFormH2 from "@/components/admin/ui/AFormH2";
import HSImageUpload from "@/components/global/form/HSImageUpload";
import HSButton from "@/components/global/shared/HSButton";
import { Form } from "@/components/ui/form";
import { AUTH_KEY } from "@/constants";
import { ServiceQueries } from "@/lib/modules/service/service.queries";
import { TService } from "@/lib/modules/service/service.type";
import { ServiceValidation } from "@/lib/modules/service/service.validation";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

type TProps = {
  service: TService;
};

type TForm = z.infer<typeof ServiceValidation.update>;

const ServiceEditForm = ({ service }: TProps) => {
  const [cookies] = useCookies([AUTH_KEY]);

  const navigate = useNavigate();

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
      iconId: service?.icon?.id,
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
            navigate("/admin/services");
            return "Service updated successfully.";
          },
          error: (error: any) => error?.message,
        },
      );
    } catch {
      toast.error("A Client error occurred");
    }
  };

  const onCancel = () => {
    form.reset();
    navigate("/admin/services");
  };

  return (
    <ABox>
      <AFormH2>Edit {service.name}</AFormH2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <HSAInput type="text" name="name" label="Specialty Name" />
          <HSATextarea
            name="description"
            label="Description"
            required={false}
          />
          <HSImageUpload
            name="iconId"
            label="Icon"
            reset={false}
            defaultValue={service?.icon ? [service.icon] : []}
          />

          <div>
            <HSButton
              type="button"
              onClick={onCancel}
              className="mr-2 rounded-none text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              variant="outline"
            >
              Cancel
            </HSButton>

            <HSButton
              className="rounded-none"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Updating..." : "Update"}
            </HSButton>
          </div>
        </form>
      </Form>
    </ABox>
  );
};

export default ServiceEditForm;
