import HSAInput from "@/components/admin/form/HSAInput";
import HSATextarea from "@/components/admin/form/HSATextarea";
import ABox from "@/components/admin/ui/ABox";
import AFormH2 from "@/components/admin/ui/AFormH2";
import HSButton from "@/components/global/shared/HSButton";
import { Form } from "@/components/ui/form";
import { AUTH_KEY } from "@/constants";
import { LocationQueries } from "@/lib/modules/location/location.queries";
import { LocationValidations } from "@/lib/modules/location/location.validation";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import AGrid from "@/components/admin/ui/AGrid";
import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import { useNavigate } from "react-router";

type TFormType = z.infer<typeof LocationValidations.create>;

const CreateLocationPage = () => {
  const [cookies] = useCookies([AUTH_KEY]);

  const navigate = useNavigate();

  const [createLocationFn] = useMutation(LocationQueries.CREATE_LOCATION, {
    context: {
      headers: {
        Authorization: cookies[AUTH_KEY] || "",
      },
    },
    refetchQueries: [LocationQueries.LOCATION_LIST],
  });

  const form = useForm<TFormType>({
    resolver: zodResolver(LocationValidations.create),
    defaultValues: {
      name: "",
      phoneNumber: "",
      mapUrl: "",
      address: "",
      description: "",
      // TODO: Add Image - field = image
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<TFormType> = async (data) => {
    try {
      toast.promise(
        async () => {
          return (await createLocationFn({ variables: { ...data } })).data
            ?.createLocation;
        },
        {
          loading: "Creating Location...",
          success: () => {
            form.reset();
            navigate("/admin/locations");
            return "Location created successfully.";
          },
          error: (error: any) => error?.message,
        },
      );
    } catch {
      toast.error("A Client error occurred");
    }
  };
  return (
    <APageContainer>
      <APageHeader title="Create Location" />

      <AGrid>
        <div>
          <ABox>
            <AFormH2>Add Location</AFormH2>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <HSAInput type="text" name="name" label="Location Name" />
                <HSAInput type="text" name="phoneNumber" label="Phone Number" />
                <HSAInput type="text" name="mapUrl" label="Map URL" />
                <HSAInput type="text" name="address" label="Address" />
                <HSATextarea
                  name="description"
                  label="Description"
                  required={false}
                />
                <HSButton
                  className="rounded-none"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Creating..." : "Create"}
                </HSButton>
              </form>
            </Form>
          </ABox>
        </div>
      </AGrid>
    </APageContainer>
  );
};

export default CreateLocationPage;
