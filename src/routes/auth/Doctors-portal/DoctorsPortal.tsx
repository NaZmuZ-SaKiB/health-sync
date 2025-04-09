import { Images } from "@/constants";
import { useState } from "react";
import DoctorStep1Form from "./_components/DoctorStep1Form";
import DoctorStep2Form from "./_components/DoctorStep2Form";
import DoctorStep3Form from "./_components/DoctorStep3Form";

const DoctorsPortalPage = () => {
  const [step, setStep] = useState<1 | 2 | 3>(2);

  const [formData, setFormData] = useState<Record<string, any> | null>(null);

  const renderSteps = {
    1: () => <DoctorStep1Form setStep={setStep} setFormData={setFormData} />,
    2: () => <DoctorStep2Form setStep={setStep} setFormData={setFormData} />,
    3: () => (
      <DoctorStep3Form
        setStep={setStep}
        formData={formData}
        setFormData={setFormData}
      />
    ),
  };

  return (
    <div
      className="grid min-h-svh place-items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${Images.HeroBG})` }}
    >
      <div className="bg-primary-hover w-full max-w-[700px] rounded-3xl p-10 shadow-2xl shadow-slate-300">
        <h1 className="mb-5 text-center text-3xl font-semibold text-slate-50">
          Doctor Rgistration
        </h1>

        {renderSteps[step]()}
      </div>
    </div>
  );
};

export default DoctorsPortalPage;
