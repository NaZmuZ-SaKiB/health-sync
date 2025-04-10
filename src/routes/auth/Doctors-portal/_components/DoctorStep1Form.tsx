import HSDateInput from "@/components/global/form/HSDateInput";
import HSInput from "@/components/global/form/HSInput";
import HSSelect from "@/components/global/form/HSSelect";
import HSTextarea from "@/components/global/form/HSTextarea";
import HSButton from "@/components/global/shared/HSButton";
import { Form } from "@/components/ui/form";
import { GENDER, genders } from "@/constants";
import { DoctorValidation } from "@/lib/modules/doctor/doctor.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveRight } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type TProps = {
  setStep: React.Dispatch<React.SetStateAction<1 | 2>>;
  setFormData: React.Dispatch<React.SetStateAction<any | null>>;
};

const formSchema = DoctorValidation.create.pick({
  firstName: true,
  lastName: true,
  email: true,
  phoneNumber: true,
  address: true,
  dateOfBirth: true,
  gender: true,
});

type TFormType = z.infer<typeof formSchema>;

const genderOptions = genders.map((gender) => ({
  label: gender,
  value: gender,
}));

const DoctorStep1Form = ({ setStep, setFormData }: TProps) => {
  const form = useForm<TFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      gender: GENDER.MALE,
    },
  });

  const onSubmit: SubmitHandler<TFormType> = (data) => {
    setFormData((prevData: any) => ({ ...prevData, ...data }));
    setStep(2);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-x-8 gap-y-5"
      >
        <HSInput name="firstName" label="First Name" type="text" />
        <HSInput name="lastName" label="Last Name" type="text" />

        <HSInput name="email" label="Email" type="text" />
        <HSInput name="phoneNumber" label="Phone Number" type="text" />

        <HSSelect name="gender" label="Gender" options={genderOptions} />
        <HSDateInput name="dateOfBirth" label="Date of Birth" />

        <div className="col-span-2">
          <HSTextarea name="address" label="Address" />
        </div>

        <div></div>
        <HSButton
          variant="secondary"
          className="h-auto w-full rounded-lg py-3"
          disabled={form.formState.isSubmitting}
        >
          Next Step <MoveRight />
        </HSButton>
      </form>
    </Form>
  );
};

export default DoctorStep1Form;
