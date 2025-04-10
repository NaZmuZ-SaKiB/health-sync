import HSInput from "@/components/global/form/HSInput";
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

const SIGN_UP = gql`
  mutation Signup(
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    signup(
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      token
    }
  }
`;

type TFormType = z.infer<typeof AuthValidation.signup>;

const SignUpPage = () => {
  const [signupFn] = useMutation(SIGN_UP);

  const [, setCookie] = useCookies([AUTH_KEY]);

  const navigate = useNavigate();

  const form = useForm<TFormType>({
    resolver: zodResolver(AuthValidation.signup),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSignup: SubmitHandler<TFormType> = async (data) => {
    try {
      toast.promise(
        async () => {
          return (await signupFn({ variables: { ...data } })).data?.signup;
        },
        {
          loading: "Signing up...",
          success: (data) => {
            setCookie(AUTH_KEY, data?.token);
            form.reset();
            navigate("/");
            return "Sign up successful";
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
          Sign Up
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignup)}
            className="space-y-5"
          >
            <HSInput name="email" label="Email" type="text" />

            <HSSecretInput name="password" label="Password" />
            <HSSecretInput name="confirmPassword" label="Confirm Password" />

            <HSButton
              variant="secondary"
              className="h-auto w-full rounded-lg py-3"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Signing up..." : "Sign Up"}
            </HSButton>

            <p className="text-sm text-slate-50">
              Already have an account?{" "}
              <Link
                to="/auth/sign-in"
                className="hover:text-yellow-300 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUpPage;
