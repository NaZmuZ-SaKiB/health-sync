import HSButton from "@/components/global/shared/HSButton";
import { Images } from "@/constants";
import { MoveRight } from "lucide-react";

const AppointmentSection = () => {
  return (
    <div className="hs-container">
      <div className="grid grid-cols-2 items-end">
        <div>
          <img
            className="mx-auto w-full max-w-[600px]"
            src={Images.DoctorInGroup}
            alt="Doctors in group"
          />
        </div>
        <div className="">
          <div
            className="bg-primary relative z-20 mx-auto -mb-10 max-w-[540px] rounded-4xl bg-cover bg-left-top px-10 py-12 bg-blend-color-burn"
            style={{ backgroundImage: `url(${Images.HeroBG})` }}
          >
            <h2 className="mb-7 text-3xl leading-11 font-semibold text-slate-50">
              Make An <span className="text-[#faff17]">Appointment</span> <br />
              Apply For Treatments
            </h2>

            <div className="grid grid-cols-2 gap-5">
              <input
                className="border-b-2 border-slate-50 py-3.5 text-slate-50 outline-none placeholder:text-slate-50/80 focus:border-[#faff17]"
                type="text"
                placeholder="First Name"
              />
              <input
                className="border-b-2 border-slate-50 py-3.5 text-slate-50 outline-none placeholder:text-slate-50/80 focus:border-[#faff17]"
                type="text"
                placeholder="Last Name"
              />
              <input
                className="border-b-2 border-slate-50 py-3.5 text-slate-50 outline-none placeholder:text-slate-50/80 focus:border-[#faff17]"
                type="email"
                placeholder="Email"
              />
              <input
                className="border-b-2 border-slate-50 py-3.5 text-slate-50 outline-none placeholder:text-slate-50/80 focus:border-[#faff17]"
                type="text"
                placeholder="Phone"
              />
              <textarea
                className="col-span-2 resize-none border-b-2 border-slate-50 py-3.5 text-slate-50 outline-none placeholder:text-slate-50/80 focus:border-[#faff17]"
                placeholder="Reason"
                rows={5}
              />
              <div>
                <HSButton className="text-secondary hover:bg-secondary group h-auto bg-slate-50 py-1.5 pr-1.5 pl-5 text-lg hover:text-slate-50">
                  Continue{" "}
                  <span className="bg-secondary ml-2 grid size-10 place-items-center rounded-md duration-300 group-hover:bg-slate-50">
                    <MoveRight className="group-hover:text-secondary size-5 text-slate-50" />
                  </span>
                </HSButton>
              </div>
              <div
                className="bg-secondary absolute top-12 left-0 z-0 -translate-x-full -rotate-180 rounded-tr-3xl rounded-br-3xl px-8 py-4 text-center font-semibold text-white uppercase"
                style={{ writingMode: "vertical-lr" }}
              >
                Appointment Now
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSection;
