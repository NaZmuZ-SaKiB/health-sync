type TProps = {
  setStep: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
  formData: Record<string, any> | null;
  setFormData: React.Dispatch<React.SetStateAction<any | null>>;
};

const DoctorStep3Form = ({ setStep, formData, setFormData }: TProps) => {
  return (
    <div>
      <h1>DoctorStep3Form</h1>
    </div>
  );
};

export default DoctorStep3Form;
