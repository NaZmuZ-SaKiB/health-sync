import HSInput from "@/components/global/form/HSInput";
import HSSecretInput from "@/components/global/form/HSSecretInput";
import HSButton from "@/components/global/shared/HSButton";
import { Form } from "@/components/ui/form";
import { Images } from "@/constants";
import { AuthValidation } from "@/lib/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";

type TFormType = z.infer<typeof AuthValidation.signup>;

const SignUpPage = () => {
  const form = useForm<TFormType>({
    resolver: zodResolver(AuthValidation.signup),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSignup: SubmitHandler<TFormType> = async (data) => {
    console.log(data);
  };

  return (
    <div
      className="grid min-h-svh place-items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${Images.HeroBG})` }}
    >
      <div className="bg-primary w-full max-w-[400px] rounded-3xl p-10 shadow-2xl shadow-slate-300">
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
            >
              Sign Up
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
