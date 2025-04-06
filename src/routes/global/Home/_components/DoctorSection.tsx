import HSButton from "@/components/global/shared/HSButton";
import { Images } from "@/constants";
import { Calendar, MoveRight } from "lucide-react";

type TDoctorData = {
  name: string;
  specialty: string;
  image: string;
};

const doctorsData: TDoctorData[] = [
  {
    name: "Nashid Martines",
    specialty: "Cardiac Surgery",
    image: Images.MaleDoctor2,
  },
  {
    name: "Danial Frankie",
    specialty: "Pediatric Clinic",
    image: Images.FemaleDoctor2,
  },
  {
    name: "John Martines",
    specialty: "Neurology",
    image: Images.MaleDoctor3,
  },
  {
    name: "Kenneth Fong",
    specialty: "Gynecology",
    image: Images.FemaleDoctor3,
  },
];

const DoctorSection = () => {
  return (
    <div className="hs-container">
      <div className="py-24">
        {/* Title  */}
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-secondary text-5xl leading-14 font-bold">
            We Employ only <br /> Specialists
          </h2>
          <div className="flex items-center justify-end">
            <HSButton className="h-auto py-1.5 pr-1.5 pl-5 text-sm">
              View All{" "}
              <span className="ml-2 grid size-10 place-items-center rounded-md bg-white">
                <MoveRight className="text-primary size-5" />
              </span>
            </HSButton>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-5">
          {doctorsData.map((doctor) => (
            <div
              className="hover:bg-secondary group overflow-hidden rounded-3xl bg-slate-50 p-2 transition-all duration-500"
              key={`doctor-section-${doctor.name}`}
            >
              <div className="relative aspect-[9/10] w-full overflow-hidden">
                <img
                  className="aspect-[9/10] w-full rounded-2xl object-cover object-center"
                  src={doctor.image}
                  alt={doctor.name}
                />
                <HSButton className="absolute right-3 -bottom-full left-3 h-auto py-3 group-hover:bottom-3">
                  <Calendar /> Appointment Now
                </HSButton>
              </div>
              <div className="flex items-end justify-between p-5 pb-3">
                <div>
                  <h3 className="text-secondary text-lg font-medium group-hover:text-slate-50">
                    {doctor.name}
                  </h3>
                  <p className="text-primary text-sm">{doctor.specialty}</p>
                </div>
                <HSButton
                  className="group-hover:text-secondary hover:text-secondary aspect-square h-auto rounded-lg group-hover:bg-slate-50 hover:bg-slate-100"
                  variant="secondary"
                >
                  <MoveRight />
                </HSButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorSection;
