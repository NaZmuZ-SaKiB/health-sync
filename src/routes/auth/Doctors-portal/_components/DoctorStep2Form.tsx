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
import { toast } from "sonner";
import { z } from "zod";
import DoctorRegistrationSteps from "./DoctorRegistrationSteps";

type TProps = {
  prevStep: () => void;
  nextStep: () => void;
  formData: any;
};

type TFormType = z.infer<typeof DoctorValidation.create>;

const SPECIALTIES_OPTIONS = gql`
  query GetAllSpecialties($limit: String) {
    getAllSpecialties(limit: $limit) {
      specialties {
        id
        name
      }
    }
  }
`;

const LOCATIONS_OPTIONS = gql`
  query GetAllLocations($limit: String) {
    getAllLocations(limit: $limit) {
      locations {
        id
        name
      }
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

const DoctorStep2Form = ({ prevStep, nextStep, formData }: TProps) => {
  const [createDoctorFn] = useMutation(DOCTOR_CREATE);

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

  const onSubmit: SubmitHandler<TFormType> = async (data) => {
    try {
      toast.promise(
        async () => {
          return await createDoctorFn({ variables: { input: { ...data } } });
        },
        {
          loading: "Submitting Form...",
          success: () => {
            nextStep();
            return "Registration successful.";
          },
          error: (error: any) => error?.message,
        },
      );
    } catch {
      toast.error("A Client error occurred");
    }
  };

  const { data: specialtiesData, loading: specialtiesLoading } = useQuery(
    SPECIALTIES_OPTIONS,
    {
      variables: {
        limit: 9999,
      },
    },
  );
  const { data: locationsData, loading: locationsLoading } = useQuery(
    LOCATIONS_OPTIONS,
    {
      variables: {
        limit: 9999,
      },
    },
  );

  const specialtiesOptions =
    specialtiesData?.getAllSpecialties?.specialties?.map(
      (item: { name: string; id: string }) => ({
        label: item.name,
        value: item.id,
      }),
    ) || [];

  const locationsOptions =
    locationsData?.getAllLocations?.locations?.map(
      (item: { name: string; id: string }) => ({
        label: item.name,
        value: item.id,
      }),
    ) || [];

  return (
    <Form {...form}>
      <h1 className="mb-8 text-center text-3xl font-semibold text-slate-50">
        Doctor Rgistration
      </h1>

      <div className="mb-8">
        <DoctorRegistrationSteps step={2} />
      </div>

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
          onClick={prevStep}
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
