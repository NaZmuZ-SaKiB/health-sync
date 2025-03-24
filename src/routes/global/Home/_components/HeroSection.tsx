import HSButton from "@/components/global/shared/HSButton";
import { Icons, Images } from "@/constants";
import { MoveRight } from "lucide-react";

const HeroSection = () => {
  return (
    <div
      className="h-[920px] overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${Images.HeroBG})` }}
    >
      <div className="hs-container relative h-full">
        {/* Hero Content  */}
        <div className="grid h-full grid-cols-2 gap-10">
          {/* Left Side  */}
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

          {/* Right Side  */}
          <div className="relative flex flex-col justify-end">
            {/* background circle  */}
            <div className="absolute -bottom-[10%] z-1 grid aspect-square w-[120%] place-items-center rounded-full border border-white bg-transparent">
              <div className="grid aspect-square w-[85%] place-items-center rounded-full bg-white/50">
                <div className="aspect-square w-[80%] rounded-full bg-white/80"></div>
              </div>
            </div>

            {/* Image  */}
            <img
              src={Images.BannerDoctor}
              className="relative z-10 ml-auto w-[90%]"
              alt="Lady Doctor"
            />

            {/* Patients  */}
            <div className="floating-up-left-right-down absolute bottom-32 z-10 flex items-center gap-2 rounded-full bg-white p-3.5">
              <div className="flex items-center">
                <img
                  className="rounded-full border-2 border-white"
                  src={Images.DummyProfile1}
                  height={42}
                  width={42}
                  alt="Dummy Profile 1"
                />
                <img
                  className="-ml-3 rounded-full border-2 border-white"
                  src={Images.DummyProfile2}
                  height={42}
                  width={42}
                  alt="Dummy Profile 2"
                />
                <img
                  className="-ml-3 rounded-full border-2 border-white"
                  src={Images.DummyProfile3}
                  height={42}
                  width={42}
                  alt="Dummy Profile 3"
                />
                <img
                  className="-ml-3 rounded-full border-2 border-white"
                  src={Images.DummyProfile4}
                  height={42}
                  width={42}
                  alt="Dummy Profile 4"
                />
              </div>
              <div className="pr-3">
                <p className="text-primary text-lg leading-5 font-semibold">
                  150K
                </p>
                <p className="text-sm font-light text-slate-500">
                  Patient recovers
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Question Floating  */}
        <div className="floating-up-down absolute bottom-10 left-0 pt-16 pl-16">
          <div className="hero-question absolute top-0 left-0 grid size-16 place-items-center rounded-2xl rounded-br-none bg-white">
            <img
              className="absolute -right-5 bottom-0 size-5"
              src={Icons.InnerRoundCorner}
              alt="rouned"
            />
            <img
              className="rounded-lg"
              src={Images.QuestionDoctor}
              alt="lady doctor"
              width={45}
              height={45}
            />
            <img
              className="absolute right-0 -bottom-5 size-5 rotate-180"
              src={Icons.InnerRoundCorner}
              alt="rouned"
            />
          </div>
          <div className="rounded-2xl rounded-tl-none bg-white px-4 py-3">
            <p className="text-sm font-light text-slate-500">
              Have a question?
            </p>
            <p className="text-primary text-lg font-semibold">info@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
