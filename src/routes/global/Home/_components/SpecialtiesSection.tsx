import HSButton from "@/components/global/shared/HSButton";
import { Icons } from "@/constants";
import { MoveRight, MoveUpRight } from "lucide-react";

type TSpecialtyData = {
  name: string;
  icon: string;
  description: string;
};

const specialtiesData: TSpecialtyData[] = [
  {
    name: "Medicine",
    icon: Icons.MedicineIcon,
    description:
      "General medical care for adults, focusing on diagnosis and non-surgical treatment.",
  },
  {
    name: "Cardiology",
    icon: Icons.HeartIcon,
    description:
      "Heart and cardiovascular system specialists treating conditions like hypertension and heart disease.",
  },
  {
    name: "Orthopedics",
    icon: Icons.OrthopedicsIcon,
    description:
      "Musculoskeletal system experts treating bones, joints, ligaments, tendons, and muscles.",
  },
  {
    name: "Dermatology",
    icon: Icons.DermatologyIcon,
    description:
      "Skin, hair, and nail specialists treating conditions from acne to skin cancer.",
  },
  {
    name: "ENT",
    icon: Icons.ENTIcon,
    description:
      "Ear, nose, and throat specialists treating sinus issues, hearing loss, and more.",
  },
  {
    name: "Neurology",
    icon: Icons.NeurologyIcon,
    description:
      "Nervous system experts treating brain, spinal cord, and nerve disorders.",
  },
  {
    name: "Ophthalmology",
    icon: Icons.OphthalmologyIcon,
    description:
      "Eye care specialists treating vision problems, eye diseases, and performing surgeries.",
  },
  {
    name: "Urology",
    icon: Icons.UrologyIcon,
    description:
      "Urinary tract and male reproductive system specialists treating kidney stones, UTIs, etc.",
  },
];

const SpecialtiesSection = () => {
  return (
    <div className="hs-container">
      <div className="py-24">
        {/* Title  */}
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-secondary text-[45px] leading-14 font-bold">
            We Have Doctors From All <br /> Specialties
          </h2>
          <div className="flex items-center justify-end">
            <HSButton
              variant={"secondary"}
              className="h-auto py-1.5 pr-1.5 pl-5 text-sm"
            >
              View All{" "}
              <span className="ml-2 grid size-10 place-items-center rounded-md bg-white">
                <MoveRight className="text-btn-primary size-5" />
              </span>
            </HSButton>
          </div>
        </div>

        {/* Specialties  */}
        <div className="grid grid-cols-4 gap-5">
          {specialtiesData.map((specialty) => (
            <div
              key={`specialty-section-${specialty.name}`}
              className="group relative z-10 overflow-hidden rounded-3xl p-7"
            >
              <div className="mb-7">
                <img
                  src={specialty.icon}
                  width={60}
                  height={60}
                  alt={specialty.name}
                  className="object-contain"
                />
              </div>
              <h3 className="text-secondary mb-3 text-xl font-semibold duration-300 group-hover:text-slate-50">
                {specialty.name}
              </h3>
              <p className="text-slate-500 duration-300 group-hover:text-slate-50">
                {specialty.description}
              </p>
              <div className="mt-5 mr-12 border-t border-dashed pt-5 text-sm text-slate-800">
                <div className="flex items-center gap-2 border-slate-300 duration-300 group-hover:text-slate-50">
                  <span className="bg-primary group-hover:bg-secondary size-2.5 rounded-full"></span>
                  25+ Doctors
                </div>
                <div className="bg-primary hover:bg-primary-hover absolute right-0 bottom-0 grid size-12 cursor-pointer place-items-center rounded-full duration-300">
                  <MoveUpRight className="text-white" />
                </div>
              </div>
              <img
                src={specialty.icon}
                alt={specialty.name}
                className="absolute top-3 right-3 size-[150px] opacity-[.03] grayscale-100 duration-300 group-hover:opacity-5"
              />
              <div
                className="group-hover:bg-primary absolute top-0 left-0 -z-1 h-full w-full rounded-3xl bg-white bg-cover duration-300"
                style={{
                  maskImage: `url(${Icons.InnerRoundedSquarePNG})`,
                  maskPosition: "right bottom",
                  WebkitMaskImage: `url(${Icons.InnerRoundedSquarePNG})`,
                  WebkitMaskPosition: "right bottom",
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialtiesSection;
