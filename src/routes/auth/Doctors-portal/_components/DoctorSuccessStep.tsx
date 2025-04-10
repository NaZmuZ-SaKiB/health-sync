import { Link } from "react-router";
import DoctorRegistrationSteps from "./DoctorRegistrationSteps";
import HSButton from "@/components/global/shared/HSButton";

const DoctorSuccessStep = ({ email }: { email?: string }) => {
  return (
    <div>
      <h1 className="mb-8 text-center text-3xl font-semibold text-slate-50">
        Registration Successful!
      </h1>

      <div className="mb-8">
        <DoctorRegistrationSteps step={3} />
      </div>

      <p className="text-slate-50">
        Thank you for registering as a doctor with us. We will review your form
        and send result to {email ? email : "your email address"}.
      </p>
      <br />
      <p className="text-slate-50">
        If you have any questions or need assistance, feel free to contact our
        support team.
      </p>
      <br />
      <p className="text-slate-50">We look forward to having you on board!</p>

      <div className="mt-8 flex w-full justify-center">
        <Link to={"/"}>
          <HSButton variant="secondary" className="h-auto px-8 py-3">
            Back to Home
          </HSButton>
        </Link>
      </div>
    </div>
  );
};

export default DoctorSuccessStep;
