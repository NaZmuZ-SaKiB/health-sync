import HSInput from "@/components/global/form/HSInput";
import HSSelect from "@/components/global/form/HSSelect";
import HSTextarea from "@/components/global/form/HSTextarea";
import HSButton from "@/components/global/shared/HSButton";
import { Form } from "@/components/ui/form";
import { DoctorValidation } from "@/lib/modules/doctor/doctor.validation";
import { gql, useMutation, useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveLeft } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

type TProps = {
  setStep: React.Dispatch<React.SetStateAction<1 | 2>>;
  formData: any;
};

type TFormType = z.infer<typeof DoctorValidation.create>;

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

const DOCTOR_CREATE = gql`
  mutation CreateDoctor($input: UserDoctorCreateInput!) {
    createDoctor(input: $input) {
      success
    }
  }
`;

const DoctorStep2Form = ({ setStep, formData }: TProps) => {
  const [createDoctorFn] = useMutation(DOCTOR_CREATE);

  const navigate = useNavigate();

  const form = useForm<TFormType>({
    resolver: zodResolver(DoctorValidation.create),
    defaultValues: {
      ...formData,
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

  const onSubmit: SubmitHandler<TFormType> = async (data) => {
    try {
      toast.promise(
        async () => {
          return await createDoctorFn({ variables: { input: { ...data } } });
        },
        {
          loading: "Submitting Form...",
          success: () => {
            form.reset();
            navigate("/");
            return "Registration successful. Wait for Verification.";
          },
          error: (error: any) => error?.message,
        },
      );
    } catch {
      toast.error("A Client error occurred");
    }
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
          <MoveLeft /> Go Back
        </HSButton>

        <HSButton
          variant="secondary"
          className="h-auto w-full rounded-lg py-3"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Submitting..." : "Submit"}
        </HSButton>
      </form>
    </Form>
  );
};

export default DoctorStep2Form;
