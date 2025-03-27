import HSButton from "@/components/global/shared/HSButton";
import { Icons } from "@/constants";
import { MoveRight } from "lucide-react";

type ServicesData = {
  name: string;
  icon: string;
};

const servicesData: ServicesData[] = [
  {
    name: "Sugar Testing",
    icon: Icons.SugarTestIcon,
  },
  {
    name: "Antibody Testing",
    icon: Icons.AntibodyTestIcon,
  },
  {
    name: "Vaccination Dose",
    icon: Icons.VaccinationIcon,
  },
  {
    name: "X-Ray And ECG",
    icon: Icons.XRayIcon,
  },
  {
    name: "Lipid Profile",
    icon: Icons.LipidProfileIcon,
  },
  {
    name: "Thyroid Test",
    icon: Icons.ThyroidTestIcon,
  },
  {
    name: "Hepatic Function Panel",
    icon: Icons.HepaticTestIcon,
  },
  {
    name: "Prolactin Test",
    icon: Icons.ProlactinTestIcon,
  },
];

const ServicesSection = () => {
  return (
    <div className="bg-primary/5">
      <div className="hs-container">
        <div className="py-24">
          {/* Title  */}
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-secondary text-[45px] leading-14 font-bold">
              Our Urgent Care <br /> Services
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

          {/* Services  */}
          <div className="grid grid-cols-4 gap-10">
            {servicesData.map((item) => (
              <div
                className="group relative overflow-hidden rounded-2xl bg-white p-14 shadow-slate-400 duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
                key={`servic-section-${item.name}`}
              >
                <div className="bg-primary/10 mx-auto size-[70px] rounded-full duration-300 group-hover:bg-white/50">
                  <img
                    className="mx-auto aspect-square object-contain object-center"
                    src={item.icon}
                    alt={item.name}
                    width={55}
                    height={55}
                  />
                </div>
                <h3 className="m-6 mb-0 text-center text-xl font-semibold duration-300 group-hover:text-slate-50">
                  {item.name}
                </h3>
                <div className="bg-primary absolute top-full right-0 left-0 -z-1 h-full duration-300 group-hover:top-0"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
