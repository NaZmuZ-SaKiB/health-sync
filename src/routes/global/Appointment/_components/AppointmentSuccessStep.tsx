import HSButton from "@/components/global/shared/HSButton";
import PaymentButton from "@/components/global/shared/PaymentButton";
import { Link } from "react-router";

type TProps = {
  isNewUser: boolean;
};

const AppointmentSuccessStep = ({ isNewUser }: TProps) => {
  return (
    <div className="bg-primary-hover mx-auto mb-10 w-full max-w-[450px] space-y-3 rounded-3xl p-10 text-slate-50 shadow-2xl shadow-slate-300">
      <h2 className="mb-10 text-center text-2xl font-semibold text-slate-50">
        Appointment Created
      </h2>
      <p className="text-center text-sm">
        Make Payment within 30 minutes to confirm your appointment. If you don't
        make payment within the time limit, your appointment will be cancelled.
      </p>
      <p className="text-center text-sm">
        You can pay by clicking the Pay Now button bellow. Or you can pay later
        from your dashboard/appointments page.
      </p>
      <div className="flex justify-center">
        <PaymentButton className="cursor-pointer bg-slate-50 font-semibold text-emerald-600 hover:bg-slate-100 hover:text-emerald-700" />
      </div>
      {isNewUser && (
        <>
          <br />
          <p className="text-center text-sm">
            *New Account is created with your email.*
          </p>
          <p className="text-center text-sm">
            *You can login with your Phone Number as your Password. We recommend
            to change password as soon as possible.*
          </p>
        </>
      )}

      <div className="mt-8 flex w-full justify-center">
        <Link to={"/dashboard/my-appointments"}>
          <HSButton variant="secondary" className="h-auto px-8 py-3">
            View Appointments
          </HSButton>
        </Link>
      </div>
    </div>
  );
};

export default AppointmentSuccessStep;
