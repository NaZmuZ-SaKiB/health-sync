import { Images } from "@/constants";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthValidation } from "@/lib/validations/auth.validation";
import { z } from "zod";
import HSInput from "@/components/global/form/HSInput";
import { Form } from "@/components/ui/form";

type TFormType = z.infer<typeof AuthValidation.signin>;

const SignInPage = () => {
  const form = useForm<TFormType>({
    resolver: zodResolver(AuthValidation.signin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignin: SubmitHandler<TFormType> = async (data) => {
    console.log(data);
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
          <form onSubmit={form.handleSubmit(handleSignin)} className="">
            <HSInput name="email" label="Email" type="email" />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignInPage;
