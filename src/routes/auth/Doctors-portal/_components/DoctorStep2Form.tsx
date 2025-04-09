import HSInput from "@/components/global/form/HSInput";
import HSSelect from "@/components/global/form/HSSelect";
import HSTextarea from "@/components/global/form/HSTextarea";
import HSButton from "@/components/global/shared/HSButton";
import { Form } from "@/components/ui/form";
import { DoctorValidation } from "@/lib/validations/doctor.validation";
import { gql, useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveLeft, MoveRight } from "lucide-react";
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

const SPECIALTIES_OPTIONS = gql`
  query Specialties {
    specialties {
      name
      id
    }
  }
`;

const LOCATIONS_OPTIONS = gql`
  query Locations {
    locations {
      name
      id
    }
  }
`;

const DoctorStep2Form = ({ setStep, setFormData }: TProps) => {
  const form = useForm<TFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      doctor: {
        specialtyId: "",
        locationId: "",
        qualification: "",
        experienceYears: 0,
        licenseNumber: "",
        bio: "",
        fee: 0,
      },
    },
  });

  const previousStep = () => {
    setStep(1);
  };

  const onSubmit: SubmitHandler<TFormType> = (data) => {
    setFormData((prevData: any) => ({ ...prevData, ...data }));
    setStep(3);
  };

  const { data: specialtiesData, loading: specialtiesLoading } =
    useQuery(SPECIALTIES_OPTIONS);
  const { data: locationsData, loading: locationsLoading } =
    useQuery(LOCATIONS_OPTIONS);

  const specialtiesOptions =
    specialtiesData?.specialties?.map((item: { name: string; id: string }) => ({
      label: item.name,
      value: item.id,
    })) || [];

  const locationsOptions =
    locationsData?.locations?.map((item: { name: string; id: string }) => ({
      label: item.name,
      value: item.id,
    })) || [];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-x-8 gap-y-5"
      >
        <HSSelect
          name="doctor.specialtyId"
          label="Specialty"
          options={specialtiesOptions}
          disabled={specialtiesLoading}
        />
        <HSSelect
          name="doctor.locationId"
          label="Location"
          options={locationsOptions}
          disabled={locationsLoading}
        />

        <HSInput
          type="text"
          name="doctor.qualification"
          label="Qualification"
        />
        <HSInput
          type="number"
          name="doctor.experienceYears"
          label="Experience Years"
        />

        <HSInput
          type="text"
          name="doctor.licenseNumber"
          label="License Number"
        />
        <HSInput type="number" name="doctor.fee" label="Fee" />

        <div className="col-span-2">
          <HSTextarea name="doctor.bio" label="Bio" />
        </div>

        <HSButton
          className="text-secondary h-auto w-full rounded-lg bg-slate-100 py-3 hover:bg-slate-200"
          disabled={form.formState.isSubmitting}
          type="button"
          onClick={previousStep}
        >
          <MoveLeft /> Previous Step
        </HSButton>

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

export default DoctorStep2Form;
