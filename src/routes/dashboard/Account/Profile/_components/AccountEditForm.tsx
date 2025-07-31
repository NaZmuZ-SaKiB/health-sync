import { TUser } from "@/lib/modules/user/user.type";
import DPageHeader from "@/components/dashboard/ui/DPageHeader";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import HSButton from "@/components/global/shared/HSButton";
import DBox from "@/components/dashboard/ui/DBox";
import DFormH2 from "@/components/dashboard/ui/DFormH2";
import DGrid from "@/components/global/shared/DGrid";
import { z } from "zod";
import { PatientValidation } from "@/lib/modules/patient/patient.validation";
import { DoctorValidation } from "@/lib/modules/doctor/doctor.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AUTH_KEY, BLOOD_GROUP, GENDER, genders, ROLE } from "@/constants";
import { Form } from "@/components/ui/form";
import HSDInput from "@/components/dashboard/form/HSDInput";
import HSDSelect from "@/components/dashboard/form/HSDSelect";
import HSDDateInput from "@/components/dashboard/form/HSDDateInput";
import HSDTextarea from "@/components/dashboard/form/HSDTextarea";
import PatientEditForm from "./PatientEditForm";
import DoctorEditForm from "./DoctorEditForm";
import { useCookies } from "react-cookie";
import { useMutation } from "@apollo/client";
import { DoctorQueries } from "@/lib/modules/doctor/doctor.queries";
import { UserQueries } from "@/lib/modules/user/user.queries";
import { PatientQueries } from "@/lib/modules/patient/patient.queries";
import { toast } from "sonner";
import ProfilePicutre from "@/components/dashboard/shared/ProfilePicutre";

type TForm = z.infer<
  typeof PatientValidation.update | typeof DoctorValidation.update
>;

const genderOptions = genders.map((gender) => ({
  label: gender,
  value: gender,
}));

const AccountEditForm = ({ user }: { user: TUser }) => {
  const [cookies] = useCookies([AUTH_KEY]);

  const navigate = useNavigate();

  const [updateDoctorFn] = useMutation(DoctorQueries.UPDATE_DOCTOR, {
    context: {
      headers: {
        Authorization: cookies[AUTH_KEY] || "",
      },
    },
    refetchQueries: [UserQueries.PROFILE],
  });

  const [updatePatientFn] = useMutation(PatientQueries.UPDATE_PATIENT, {
    context: {
      headers: {
        Authorization: cookies[AUTH_KEY] || "",
      },
    },
    refetchQueries: [UserQueries.PROFILE],
  });

  const updateProfileFn =
    user.role === ROLE.DOCTOR ? updateDoctorFn : updatePatientFn;

  let resolver: Resolver = zodResolver(PatientValidation.update);
  const defaultValues: TForm = {
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    gender: user?.gender ?? GENDER.MALE,
    phoneNumber: user?.phoneNumber ?? "",
    dateOfBirth: user?.dateOfBirth ?? "",
    address: user?.address ?? "",
    patient: {
      allergies: user?.patient?.allergies ?? "",
      bloodGroup: user?.patient?.bloodGroup ?? BLOOD_GROUP.B_POSITIVE,
      emergencyContactName: user?.patient?.emergencyContactName ?? "",
      emergencyContactPhone: user?.patient?.emergencyContactPhone ?? "",
    },
  };

  if (user.role === ROLE.DOCTOR) {
    resolver = zodResolver(DoctorValidation.update);

    delete (defaultValues as any).patient;

    (defaultValues as any).doctor = {
      locationId: user?.doctor?.location?.id ?? "",
      licenseNumber: user?.doctor?.licenseNumber ?? "",
      bio: user?.doctor?.bio ?? "",
      qualification: user?.doctor?.qualification ?? "",
      experienceYears: user?.doctor?.experienceYears ?? "",
      fee: user?.doctor?.fee ?? "",
    };
  }

  const form = useForm<TForm>({
    defaultValues,
    resolver,
  });

  const handleUpdate: SubmitHandler<TForm> = async (data) => {
    try {
      toast.promise(
        async () => {
          return await updateProfileFn({ variables: { input: { ...data } } });
        },
        {
          loading: "Saving Changes...",
          success: () => {
            navigate("/dashboard/account/profile");
            return "Profile Updated.";
          },
          error: (error: any) => error?.message,
        },
      );
    } catch {
      toast.error("A Client error occurred");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleUpdate)}
        className="flex flex-col gap-3"
      >
        <DPageHeader title={`Edit Profile`}>
          <div className="flex gap-2">
            <Link to={`/dashboard/account/profile`}>
              <HSButton
                type="button"
                variant="outline"
                className="border-secondary text-secondary h-auto self-start rounded-md px-5 py-2"
              >
                Cancel
              </HSButton>
            </Link>

            <HSButton
              type="submit"
              variant="secondary"
              className="border-secondary h-auto self-start rounded-md border px-5 py-2"
              disabled={form.formState.isSubmitting}
            >
              Save
            </HSButton>
          </div>
        </DPageHeader>

        <DGrid small reverse className="gap-3 @max-5xl:space-y-3">
          <div className="space-y-3">
            <DBox>
              <DFormH2 className="">Personal Info</DFormH2>
              <div className="grid grid-cols-6 gap-5">
                <div className="col-span-3">
                  <HSDInput
                    name="firstName"
                    label="First Name"
                    required={false}
                  />
                </div>
                <div className="col-span-3">
                  <HSDInput
                    name="lastName"
                    label="Last Name"
                    required={false}
                  />
                </div>
                <div className="col-span-3">
                  <HSDSelect
                    name="gender"
                    label="Gender"
                    options={genderOptions}
                    required={false}
                  />
                </div>
                <div className="col-span-3">
                  <HSDInput
                    name="phoneNumber"
                    label="Phone Number"
                    required={false}
                  />
                </div>
                <div className="col-span-3">
                  <HSDDateInput
                    name="dateOfBirth"
                    label="Date of Birth"
                    required={false}
                  />
                </div>
                <div className="col-span-3">
                  <HSDTextarea
                    name="address"
                    label="Address"
                    required={false}
                  />
                </div>
              </div>
            </DBox>

            {user.role === ROLE.PATIENT && <PatientEditForm />}

            {user.role === ROLE.DOCTOR && <DoctorEditForm />}
          </div>
          <div>
            <ProfilePicutre image={user?.profilePicture} isEditMode />
          </div>
        </DGrid>
      </form>
    </Form>
  );
};

export default AccountEditForm;
