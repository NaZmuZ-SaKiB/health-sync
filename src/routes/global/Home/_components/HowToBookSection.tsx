import HSButton from "@/components/global/shared/HSButton";
import { Icons, Images } from "@/constants";
import {
  CircleDollarSign,
  CircleUserRound,
  Clock,
  FilePenLine,
  HeartPulse,
  LucideProps,
  MapPin,
  MoveRight,
} from "lucide-react";

type TBookingStep = {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
  text: string;
};

const bookingSteps: TBookingStep[] = [
  {
    icon: MapPin,
    text: "Choose your location",
  },
  {
    icon: HeartPulse,
    text: "Select Specialty",
  },
  {
    icon: CircleUserRound,
    text: "Find a doctor",
  },
  {
    icon: Clock,
    text: "Select your preffered time slot",
  },
  {
    icon: FilePenLine,
    text: "Fill out the form with your details",
  },
  {
    icon: CircleDollarSign,
    text: "Pay within 30 minutes to confirm",
  },
];

const HowToBookSection = () => {
  return (
    <div className="hs-container">
      <div className="grid grid-cols-3 items-center gap-20 py-24">
        {/* Left Side  */}
        <div>
          <h2 className="text-secondary mb-3 text-4xl font-bold">
            How to Book
          </h2>
          <p className="text-lg leading-7 font-light text-slate-500">
            Easily schedule appointments online, by phone or PC. Find available
            slots, doctor details, and instant confirmations—hassle-free
            healthcare access at your fingertips.
          </p>

          <div className="mt-8 space-y-3">
            {bookingSteps.map((step) => (
              <div
                className="group flex items-center gap-4"
                key={`booking-step-${step.text}`}
              >
                <span className="text-primary bg-primary/5 group-hover:bg-primary relative z-10 grid size-12 place-items-center rounded-full duration-300 group-hover:text-slate-50">
                  <step.icon className="size-5" />

                  {/* Background Circles  */}
                  <span className="bg-primary/20 absolute z-0 h-full w-full scale-130 rounded-full opacity-0 duration-500 group-hover:opacity-100"></span>
                  <span className="bg-primary/10 absolute -z-1 h-full w-full scale-160 rounded-full opacity-0 duration-500 group-hover:opacity-100"></span>
                </span>
                <span className="text-secondary text-xl font-medium">
                  {step.text}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Right Side  */}
        <div className="relative col-span-2">
          <img
            className="w-full rounded-3xl rounded-bl-4xl"
            src={Images.DoctorsTreating}
            alt="Doctors Treating"
          />
          <div className="absolute bottom-0 left-0 rounded-tr-3xl border-t-[1rem] border-r-[1rem] border-white bg-white">
            <HSButton
              variant={"secondary"}
              className="h-auto py-2 pr-2 pl-5 text-lg"
            >
              Appointment{" "}
              <span className="grid size-10 place-items-center rounded-md bg-white">
                <MoveRight className="text-btn-primary size-5" />
              </span>
            </HSButton>

            <img
              className="absolute -top-[41px] left-0 size-[25px]"
              src={Icons.InnerRoundCorner}
              alt="rounded corner"
            />
            <img
              className="absolute -right-[41px] bottom-0 size-[25px]"
              src={Icons.InnerRoundCorner}
              alt="rounded corner"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToBookSection;
