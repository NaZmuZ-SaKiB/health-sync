import HSSecretInput from "@/components/global/form/HSSecretInput";
import HSButton from "@/components/global/shared/HSButton";
import { Form } from "@/components/ui/form";
import { AUTH_KEY, Images } from "@/constants";
import { AuthValidation } from "@/lib/modules/auth/auth.validation";
import { gql, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const CHANGE_PASSWORD = gql`
  mutation ChangePassword($password: String!, $confirmPassword: String!) {
    changePassword(password: $password, confirmPassword: $confirmPassword) {
      success
    }
  }
`;

type TFormType = z.infer<typeof AuthValidation.changePassword>;

const ChangePasswordPage = () => {
  const [cookies] = useCookies([AUTH_KEY]);

  const [changePasswordFn] = useMutation(CHANGE_PASSWORD, {
    context: {
      headers: {
        Authorization: cookies[AUTH_KEY] || "",
      },
    },
  });

  const navigate = useNavigate();

  const form = useForm<TFormType>({
    resolver: zodResolver(AuthValidation.changePassword),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleSignin: SubmitHandler<TFormType> = async (data) => {
    try {
      toast.promise(
        async () => {
          return (await changePasswordFn({ variables: { ...data } })).data
            ?.changePassword;
        },
        {
          loading: "Changing Password...",
          success: () => {
            form.reset();
            navigate("/");
            return "Password updated.";
          },
          error: (error: any) => error?.message,
        },
      );
    } catch {
      toast.error("A Client error occurred");
    }
  };

  return (
    <div
      className="grid min-h-svh place-items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${Images.HeroBG})` }}
    >
      <div className="bg-primary-hover w-full max-w-[400px] rounded-3xl p-10 shadow-2xl shadow-slate-300">
        <h1 className="mb-5 text-center text-3xl font-semibold text-slate-50">
          Change Password
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignin)}
            className="space-y-5"
          >
            <div>
              <HSSecretInput name="password" label="Password" />
              <HSSecretInput name="confirmPassword" label="Confirm Password" />
            </div>

            <HSButton
              variant="secondary"
              className="h-auto w-full rounded-lg py-3"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? "Changing password..."
                : "Change Password"}
            </HSButton>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
