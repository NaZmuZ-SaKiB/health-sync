import { Form } from "@/components/ui/form";
import { DoctorValidation } from "@/lib/validations/doctor.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type TProps = {
  setStep: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
  setFormData: React.Dispatch<React.SetStateAction<any | null>>;
};

const formSchema = DoctorValidation.create.pick({
  doctor: true,
});

type TFormType = z.infer<typeof formSchema>;

const DoctorStep2Form = ({ setStep, setFormData }: TProps) => {
  const form = useForm<TFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      doctor: {
        specialtyId: "",
        qualification: "",
        experienceYears: 0,
        licenseNumber: "",
        bio: "",
        fee: 0,
      },
    },
  });

  const onSubmit: SubmitHandler<TFormType> = (data) => {
    console.log(data);
    //   setFormData((prevData: any) => ({ ...prevData, ...data }));
    //   setStep(3);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-x-8 gap-y-5"
      ></form>
    </Form>
  );
};

export default DoctorStep2Form;
