import { Images } from "@/constants";
import { useState } from "react";
import DoctorStep1Form from "./_components/DoctorStep1Form";
import DoctorStep2Form from "./_components/DoctorStep2Form";
import DoctorSuccessStep from "./_components/DoctorSuccessStep";

const DoctorsPortalPage = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [formData, setFormData] = useState<Record<string, any> | null>(null);

  const nextStep = () => {
    setStep((prevStep) => (prevStep + 1) as any);
  };
  const previousStep = () => {
    setStep((prevStep) => (prevStep - 1) as any);
  };

  const renderSteps = {
    1: () => (
      <DoctorStep1Form
        nextStep={nextStep}
        formData={formData}
        setFormData={setFormData}
      />
    ),
    2: () => (
      <DoctorStep2Form
        prevStep={previousStep}
        nextStep={nextStep}
        formData={formData}
      />
    ),
    3: () => <DoctorSuccessStep email={formData?.email} />,
  };

  return (
    <div
      className="grid min-h-svh place-items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${Images.HeroBG})` }}
    >
      <div className="bg-primary-hover w-full max-w-[700px] rounded-3xl p-10 shadow-2xl shadow-slate-300">
        {renderSteps[step]()}
      </div>
    </div>
  );
};

export default DoctorsPortalPage;
