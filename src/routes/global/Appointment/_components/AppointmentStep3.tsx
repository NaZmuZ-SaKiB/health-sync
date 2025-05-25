import { SubmitHandler, useForm } from "react-hook-form";
import { TAppointmentFormData } from "../Appointment";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppointmentValidation } from "@/lib/modules/appointment/appointment.validation";
import {
  AUTH_KEY,
  BLOOD_GROUP,
  bloodGroups,
  GENDER,
  genders,
} from "@/constants";
import { Form } from "@/components/ui/form";
import HSInput from "@/components/global/form/HSInput";
import HSSelectInput from "@/components/global/form/HSSelectInput";
import HSDateInput from "@/components/global/form/HSDateInput";
import HSTextarea from "@/components/global/form/HSTextarea";
import HSButton from "@/components/global/shared/HSButton";
import { MoveLeft } from "lucide-react";
import { useMutation } from "@apollo/client";
import { AppointmentQueries } from "@/lib/modules/appointment/appointment.queries";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { TimeSlotQueries } from "@/lib/modules/time-slot/time-slot.queries";

type TProps = {
  formData: Partial<TAppointmentFormData>;
  setStep: any;
  setIsNewUser: any;
};

const genderOptions = genders.map((gender) => ({
  label: gender,
  value: gender,
}));

const bloodGroupOptions = bloodGroups.map((item) => ({
  label: item,
  value: item,
}));

const AppointmentStep3 = ({ formData, setStep, setIsNewUser }: TProps) => {
  const defaultValues: TAppointmentFormData = {
    user: {
      email: formData?.user?.email || "",
      firstName: formData?.user?.firstName || "",
      lastName: formData?.user?.lastName || "",
      phoneNumber: formData?.user?.phoneNumber || "",
      dateOfBirth: formData?.user?.dateOfBirth || "",
      gender: formData?.user?.gender || GENDER.MALE,
      address: formData?.user?.address || "",
      patient: {
        allergies: formData?.user?.patient?.allergies || "",
        bloodGroup:
          formData?.user?.patient?.bloodGroup || BLOOD_GROUP.B_POSITIVE,
      },
    },
    appointment: {
      reason: formData?.appointment?.reason || "",
      ...(formData?.appointment as any),
    },
  };

  const [, setCookie] = useCookies([AUTH_KEY]);

  const [createAppointmentFn] = useMutation(
    AppointmentQueries.CREATE_APPOINTMENT,
    {
      refetchQueries: [TimeSlotQueries.GET_TIME_SLOT_BY_DATE],
    },
  );

  const form = useForm<TAppointmentFormData>({
    defaultValues,
    resolver: zodResolver(AppointmentValidation.create),
    mode: "onBlur",
  });

  const submitAppointment: SubmitHandler<TAppointmentFormData> = async (
    data,
  ) => {
    try {
      toast.promise(
        async () => {
          return (await createAppointmentFn({ variables: { input: data } }))
            .data?.createAppointment;
        },
        {
          loading: "Booking an appointment...",
          success: (data) => {
            if (data?.token) {
              setCookie(AUTH_KEY, data?.token);
              setIsNewUser(true);
            }
            setStep(4);
            return "Appointment booked successfully.";
          },
          error: (error: any) => error?.message,
        },
      );
    } catch {
      toast.error("A Client error occurred");
    }
  };

  return (
    <div className="bg-primary-hover mx-auto mb-10 w-full max-w-[700px] space-y-10 rounded-3xl p-10 text-slate-50 shadow-2xl shadow-slate-300">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitAppointment)}
          className="grid grid-cols-2 items-end gap-x-8 gap-y-5"
        >
          <HSInput name="user.email" label="Email" />

          <HSInput name="user.firstName" label="First Name" />
          <HSInput name="user.lastName" label="Last Name" />

          <HSInput name="user.phoneNumber" label="Phone Number" />

          <HSSelectInput
            name="user.gender"
            label="Gender"
            options={genderOptions}
          />
          <HSSelectInput
            name="user.patient.bloodGroup"
            label="Gender"
            options={bloodGroupOptions}
          />

          <HSDateInput name="user.dateOfBirth" label="Date of Birth" />

          <HSInput
            name="user.patient.allergies"
            label="Allergies"
            required={false}
          />

          <div className="col-span-2">
            <HSTextarea name="user.address" label="Address" required={false} />
          </div>

          <div className="col-span-2">
            <HSTextarea
              name="appointment.reason"
              label="Reason for Appointment"
              required={false}
            />
          </div>

          <div>
            <HSButton
              className="text-secondary h-auto bg-white py-2 pr-5 pl-2 text-lg hover:bg-slate-100"
              type="button"
              onClick={() => setStep(2)}
            >
              <span className="bg-secondary grid size-10 place-items-center rounded-md">
                <MoveLeft className="size-5 text-slate-50" />
              </span>
              Go Back
            </HSButton>
          </div>

          <div className="flex justify-end">
            <HSButton
              variant={"secondary"}
              className="h-auto px-5 py-2 text-lg"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              Confirm Appointment
            </HSButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AppointmentStep3;
