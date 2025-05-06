import { AUTH_KEY, BLOOD_GROUP, GENDER, Images } from "@/constants";
import { AppointmentValidation } from "@/lib/modules/appointment/appointment.validation";
import { UserQueries } from "@/lib/modules/user/user.queries";
import { TUser } from "@/lib/modules/user/user.type";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { z } from "zod";
import AppointmentStep1 from "./_components/AppointmentStep1";
import AppointmentStep2 from "./_components/AppointmentStep2";
import AppointmentStep3 from "./_components/AppointmentStep3";
import AppointmentSuccessStep from "./_components/AppointmentSuccessStep";
import AppointmentSteps from "./_components/AppointmentSteps";

export type TAppointmentFormData = z.infer<typeof AppointmentValidation.create>;

const AppointmentPage = () => {
  const [formLoading, setFormLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<Partial<TAppointmentFormData>>({});
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [cookies] = useCookies([AUTH_KEY]);

  const { data: userData, loading } = useQuery(UserQueries.PROFILE, {
    context: {
      headers: {
        Authorization: cookies[AUTH_KEY] || "",
      },
    },
  });

  const user: TUser | undefined = userData?.me;

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        user: {
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user?.email || "",
          phoneNumber: user?.phoneNumber || "",
          dateOfBirth: user?.dateOfBirth || "",
          address: user?.address || "",
          gender: user?.gender || GENDER.MALE,
          patient: {
            bloodGroup: user?.patient?.bloodGroup || BLOOD_GROUP.B_POSITIVE,
            allergies: user?.patient?.allergies || "",
          },
        },
      }));
    }
    setFormLoading(false);
  }, [user]);

  if (loading || formLoading) return <div>Loading...</div>;

  const renderStep = {
    1: () => (
      <AppointmentStep1
        formData={formData}
        setFormData={setFormData}
        setStep={setStep}
      />
    ),
    2: () => (
      <AppointmentStep2
        formData={formData}
        setFormData={setFormData}
        setStep={setStep}
      />
    ),
    3: () => (
      <AppointmentStep3
        formData={formData}
        setStep={setStep}
        setIsNewUser={setIsNewUser}
      />
    ),
    4: () => <AppointmentSuccessStep isNewUser={isNewUser} />,
  };

  return (
    <div>
      <div
        className="overflow-hidden bg-cover bg-center py-10"
        style={{ backgroundImage: `url(${Images.HeroBG})` }}
      >
        <div className="hs-container">
          <h1 className="text-secondary text-center text-5xl leading-14 font-bold">
            Make an Appointment
          </h1>
        </div>
      </div>

      <div className="hs-container">
        <div className="mt-10">
          <AppointmentSteps step={step} />
        </div>
        <div className="pt-10 pb-20">{renderStep[step]()}</div>
      </div>
    </div>
  );
};

export default AppointmentPage;
