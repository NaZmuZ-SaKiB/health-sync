import HSAInput from "@/components/admin/form/HSAInput";
import ABox from "@/components/admin/ui/ABox";
import AFormH2 from "@/components/admin/ui/AFormH2";
import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import DGrid from "@/components/global/shared/DGrid";
import HSButton from "@/components/global/shared/HSButton";
import { Form } from "@/components/ui/form";
import { AUTH_KEY } from "@/constants";
import { AuthValidation } from "@/lib/modules/auth/auth.validation";
import { gql, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

type TFormType = z.infer<typeof AuthValidation.createAdmin>;

const CREATE_ADMIN_MUTATION = gql`
  mutation CreateAdmin($email: String!) {
    createAdmin(email: $email) {
      success
    }
  }
`;

const CreateAdminPage = () => {
  const [cookies] = useCookies([AUTH_KEY]);

  const navigate = useNavigate();

  const [createAdminFn] = useMutation(CREATE_ADMIN_MUTATION, {
    context: {
      headers: {
        Authorization: cookies[AUTH_KEY] || "",
      },
    },
  });

  const form = useForm<TFormType>({
    resolver: zodResolver(AuthValidation.createAdmin),
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<TFormType> = async (data) => {
    try {
      toast.promise(
        async () => {
          return (await createAdminFn({ variables: { ...data } })).data
            ?.createAdmin;
        },
        {
          loading: "Creating Admin...",
          success: () => {
            form.reset();
            navigate("/admin/users/admins");
            return "Admin created successfully.";
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
      <APageHeader title="Create Admin" backButton />

      <DGrid equal>
        <div>
          <ABox>
            <AFormH2>Create New Admin</AFormH2>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <HSAInput type="text" name="email" label="Email" />

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
      </DGrid>
    </APageContainer>
  );
};

export default CreateAdminPage;
