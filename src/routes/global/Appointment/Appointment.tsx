import { AUTH_KEY, BLOOD_GROUP, GENDER, Images } from "@/constants";
import { AppointmentValidation } from "@/lib/modules/appointment/appointment.validation";
import { UserQueries } from "@/lib/modules/user/user.queries";
import { TUser } from "@/lib/modules/user/user.type";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { z } from "zod";
import AppointmentStep1 from "./_components/AppointmentStep1";

export type TAppointmentFormData = z.infer<typeof AppointmentValidation.create>;

const AppointmentPage = () => {
  const [formLoading, setFormLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<Partial<TAppointmentFormData>>({});
  const [step, setStep] = useState<1>(1);

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

  console.log("formData", formData);

  const renderStep = {
    1: () => (
      <AppointmentStep1
        formData={formData}
        setFormData={setFormData}
        setStep={setStep}
      />
    ),
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
        <div className="py-20">{renderStep[step]()}</div>
      </div>
    </div>
  );
};

export default AppointmentPage;
