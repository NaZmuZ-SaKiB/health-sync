import HSAInput from "@/components/admin/form/HSAInput";
import HSATextarea from "@/components/admin/form/HSATextarea";
import ABox from "@/components/admin/ui/ABox";
import AFormH2 from "@/components/admin/ui/AFormH2";
import HSImageUpload from "@/components/global/form/HSImageUpload";
import HSButton from "@/components/global/shared/HSButton";
import { Form } from "@/components/ui/form";
import { AUTH_KEY } from "@/constants";
import { ServiceQueries } from "@/lib/modules/service/service.queries";
import { ServiceValidation } from "@/lib/modules/service/service.validation";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type TForm = z.infer<typeof ServiceValidation.create>;

const ServiceCreateForm = () => {
  const [cookies] = useCookies([AUTH_KEY]);

  const [createServiceFn] = useMutation(ServiceQueries.CREATE_SERVICE, {
    context: {
      headers: {
        Authorization: cookies[AUTH_KEY] || "",
      },
    },
    refetchQueries: [ServiceQueries.SERVICE_LIST],
  });

  const form = useForm<TForm>({
    resolver: zodResolver(ServiceValidation.create),
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<TForm> = async (data) => {
    try {
      toast.promise(
        async () => {
          return await createServiceFn({ variables: { ...data } });
        },
        {
          loading: "Creating Service...",
          success: () => {
            form.reset();
            return "Service created successfully.";
          },
          error: (error: any) => error?.message,
        },
      );
    } catch {
      toast.error("A Client error occurred");
    }
  };

  return (
    <ABox>
      <AFormH2>Add Service</AFormH2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <HSAInput type="text" name="name" label="Service Name" />
          <HSATextarea
            name="description"
            label="Description"
            required={false}
          />
          <HSImageUpload name="iconId" label="Icon" defaultValue={[]} />

          <HSButton
            className="rounded-none"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Creating..." : "Create"}
          </HSButton>
        </form>
      </Form>
    </ABox>
  );
};

export default ServiceCreateForm;
