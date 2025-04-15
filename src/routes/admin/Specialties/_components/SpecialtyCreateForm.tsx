import HSAInput from "@/components/admin/form/HSAInput";
import HSATextarea from "@/components/admin/form/HSATextarea";
import ABox from "@/components/admin/ui/ABox";
import AFormH2 from "@/components/admin/ui/AFormH2";
import HSButton from "@/components/global/shared/HSButton";
import { Form } from "@/components/ui/form";
import { AUTH_KEY } from "@/constants";
import { SpecialtyValidation } from "@/lib/modules/specialty/specialty.validation";
import { gql, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type TFormType = z.infer<typeof SpecialtyValidation.create>;

const CREATE_SPECIALTY = gql`
  mutation CreateSpecialty(
    $name: String!
    $description: String
    $icon: String
  ) {
    createSpecialty(name: $name, description: $description, icon: $icon) {
      success
    }
  }
`;

const SpecialtyCreateForm = () => {
  const [cookies] = useCookies([AUTH_KEY]);

  console.log(cookies[AUTH_KEY]);

  const [createSpecialtyFn] = useMutation(CREATE_SPECIALTY, {
    context: {
      headers: {
        Authorization: cookies[AUTH_KEY] || "",
      },
    },
  });

  const form = useForm<TFormType>({
    resolver: zodResolver(SpecialtyValidation.create),
    defaultValues: {
      name: "",
      description: "",
      // TODO: Add Image - field = icon
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<TFormType> = async (data) => {
    try {
      toast.promise(
        async () => {
          return (await createSpecialtyFn({ variables: { ...data } })).data
            ?.createSpecialty;
        },
        {
          loading: "Creating Specialty...",
          success: () => {
            form.reset();
            return "Specialty created successfully.";
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
      <AFormH2>Add Specialty</AFormH2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <HSAInput type="text" name="name" label="Specialty Name" />
          <HSATextarea
            name="description"
            label="Description"
            required={false}
          />
          <HSButton className="rounded-none">Create</HSButton>
        </form>
      </Form>
    </ABox>
  );
};

export default SpecialtyCreateForm;
