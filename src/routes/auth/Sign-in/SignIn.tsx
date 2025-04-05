import { Images } from "@/constants";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthValidation } from "@/lib/validations/auth.validation";
import { z } from "zod";
import HSInput from "@/components/global/form/HSInput";
import { Form } from "@/components/ui/form";
import HSSecretInput from "@/components/global/form/HSSecretInput";
import HSButton from "@/components/global/shared/HSButton";
import { Link } from "react-router";
import { gql, useMutation } from "@apollo/client";
import { toast } from "sonner";

const SIGN_IN = gql`
  mutation Signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
    }
  }
`;

type TFormType = z.infer<typeof AuthValidation.signin>;

const SignInPage = () => {
  const [signinFn] = useMutation(SIGN_IN);

  const form = useForm<TFormType>({
    resolver: zodResolver(AuthValidation.signin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignin: SubmitHandler<TFormType> = async (data) => {
    try {
      toast.promise(
        async () => {
          return (await signinFn({ variables: { ...data } })).data?.signin;
        },
        {
          loading: "Signing in...",
          success: (data) => {
            console.log(data);
            return "Sign in successful";
          },
          error: (error: any) => error?.message,
        },
      );
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  return (
    <div
      className="grid min-h-svh place-items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${Images.HeroBG})` }}
    >
      <div className="bg-primary w-full max-w-[400px] rounded-3xl p-10 shadow-2xl shadow-slate-300">
        <h1 className="mb-5 text-center text-3xl font-semibold text-slate-50">
          Sign In
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignin)}
            className="space-y-5"
          >
            <HSInput name="email" label="Email" type="text" />
            <div>
              <HSSecretInput name="password" label="Password" />
              <Link
                to="/auth/forgot-password"
                className="mt-3 block text-sm text-slate-50 hover:text-yellow-300 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <HSButton
              variant="secondary"
              className="h-auto w-full rounded-lg py-3"
            >
              Sign In
            </HSButton>

            <p className="text-sm text-slate-50">
              Don't have an account?{" "}
              <Link
                to="/auth/sign-up"
                className="hover:text-yellow-300 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignInPage;
