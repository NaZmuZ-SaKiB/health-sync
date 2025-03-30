import { Icons, Images } from "@/constants";
import { Check } from "lucide-react";

const ChooseUsSection = () => {
  return (
    <div
      className="relative z-10 bg-cover bg-fixed bg-center py-24"
      style={{
        backgroundImage: `url(${Images.Background2})`,
      }}
    >
      <div className="bg-secondary/90 absolute top-0 right-0 bottom-0 left-0 -z-1"></div>
      <div className="hs-container">
        <div className="grid grid-cols-2 items-center gap-10">
          <div className="relative mr-20">
            <img
              className="w-full"
              src={Images.DoctorTreating}
              alt="Doctor treating"
              style={{
                maskImage: `url(${Icons.ImageMaskPNG})`,
                maskRepeat: "no-repeat",
                maskSize: "99%",
                maskPosition: "center center",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskSize: "99%",
                WebkitMaskPosition: "center center",
                WebkitMaskImage: `url(${Icons.ImageMaskPNG})`,
              }}
            />
            <div className="bg-primary absolute right-0 bottom-0 grid h-[165px] w-[180px] place-items-center rounded-[1.5rem] p-5 text-center text-slate-50">
              <div>
                <p className="mb-2.5 text-5xl font-bold">20+</p>
                <p className="text-xl font-light">Years Experience</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="mb-8 text-5xl leading-16 font-bold text-slate-50">
              Why Choose Us for Your Health care Needs
            </h2>
            <div className="relative grid grid-cols-2 gap-10">
              <div className="rounded-2xl bg-white/10 p-5 text-slate-50">
                <div className="bg-primary mx-auto mb-3 grid size-12 place-items-center rounded-full">
                  <Check className="text-white" />
                </div>
                <h3 className="mb-2 text-center text-lg font-semibold">
                  More Experience
                </h3>
                <p className="text-center font-light text-slate-50/70">
                  We offer a wide range of health services to meet all your
                  needs.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-5 text-slate-50">
                <div className="bg-primary mx-auto mb-3 grid size-12 place-items-center rounded-full">
                  <Check className="text-white" />
                </div>
                <h3 className="mb-2 text-center text-lg font-semibold">
                  Seamless care
                </h3>
                <p className="text-center font-light text-slate-50/70">
                  We offer a wide range of health services to meet all your
                  needs.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-5 text-slate-50">
                <div className="bg-primary mx-auto mb-3 grid size-12 place-items-center rounded-full">
                  <Check className="text-white" />
                </div>
                <h3 className="mb-2 text-center text-lg font-semibold">
                  The right answers?
                </h3>
                <p className="text-center font-light text-slate-50/70">
                  We offer a wide range of health services to meet all your
                  needs.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-5 text-slate-50">
                <div className="bg-primary mx-auto mb-3 grid size-12 place-items-center rounded-full">
                  <Check className="text-white" />
                </div>
                <h3 className="mb-2 text-center text-lg font-semibold">
                  Unparalleled expertise
                </h3>
                <p className="text-center font-light text-slate-50/70">
                  We offer a wide range of health services to meet all your
                  needs.
                </p>
              </div>

              <div className="absolute top-0 left-1/2 h-full w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
              <div className="absolute top-1/2 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseUsSection;
