import HSButton from "@/components/global/shared/HSButton";
import { Icons, Images } from "@/constants";
import { MoveRight } from "lucide-react";

const HeroSection = () => {
  return (
    <div
      className="h-[920px] overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${Images.HeroBG})` }}
    >
      <div className="hs-container h-full">
        <div className="grid h-full grid-cols-2 gap-10">
          <div className="my-auto">
            <h1 className="text-secondary text-[80px] leading-24 font-bold">
              Medical & Health Care{" "}
              <span className="text-primary flex items-center">
                Services <img src={Icons.PulseLine} alt="Pulse line red" />
              </span>
            </h1>
            <p className="mt-2 text-xl leading-8 font-light text-slate-500">
              Your health is our top priority. Schedule an <br /> appointment
              with us today
            </p>

            <div className="mt-5 space-x-4">
              <HSButton className="h-auto py-2 pr-2 pl-5 text-lg">
                Appointment{" "}
                <span className="grid size-10 place-items-center rounded-md bg-white">
                  <MoveRight className="text-primary size-5" />
                </span>
              </HSButton>

              <HSButton
                variant={"secondary"}
                className="h-auto py-2 pr-2 pl-5 text-lg"
              >
                Contact Us{" "}
                <span className="grid size-10 place-items-center rounded-md bg-white">
                  <MoveRight className="text-btn-primary size-5" />
                </span>
              </HSButton>
            </div>
          </div>
          <div className="relative flex flex-col justify-end">
            <div className="absolute -bottom-[10%] z-1 grid aspect-square w-[120%] place-items-center rounded-full border border-white bg-transparent">
              <div className="grid aspect-square w-[85%] place-items-center rounded-full bg-white/50">
                <div className="aspect-square w-[80%] rounded-full bg-white/80"></div>
              </div>
            </div>
            <img
              src={Images.BannerDoctor}
              className="relative z-10 ml-auto w-[90%]"
              alt="Lady Doctor"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
