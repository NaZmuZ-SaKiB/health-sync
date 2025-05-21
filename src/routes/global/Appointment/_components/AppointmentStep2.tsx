import { TAppointmentFormData } from "../Appointment";
import AppointmentStep2Doctor from "./AppointmentStep2Doctor";
import AppointmentStep2Service from "./AppointmentStep2Service";

type TProps = {
  formData: Partial<TAppointmentFormData>;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setStep: any;
};

const AppointmentStep2 = ({ formData, setFormData, setStep }: TProps) => {
  if (formData?.appointment?.doctorId) {
    return (
      <AppointmentStep2Doctor
        formData={formData}
        setFormData={setFormData}
        setStep={setStep}
      />
    );
  }

  if (formData?.appointment?.serviceId) {
    return (
      <AppointmentStep2Service
        formData={formData}
        setFormData={setFormData}
        setStep={setStep}
      />
    );
  }

  setStep(1);
};

export default AppointmentStep2;
