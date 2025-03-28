import CircularProgress from "@/components/global/shared/CircularProgress";
import HSButton from "@/components/global/shared/HSButton";
import { Icons, Images } from "@/constants";
import { MoveRight, MoveUpRight } from "lucide-react";
import { Link } from "react-router";
import FloatingPatients from "./FloatingPatients";
import FloatingReview from "./FloatingReview";

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
            <FloatingPatients className="bottom-36 -left-10" />

            {/* Review  */}
            <FloatingReview className="-right-20 bottom-36 shadow-2xl shadow-slate-300" />

            {/* Review Percentage  */}
            <div
              className="floating-up-down floating-up-down-delay absolute top-[20%] left-0 z-10 w-52 rounded-3xl bg-white p-4 shadow-2xl shadow-slate-300/60"
              style={{ animationDelay: "2s" }}
            >
              <CircularProgress
                percentage={82}
                radius={80}
                textClass="text-4xl"
                stroke={5}
              />

              <div className="flex items-center justify-between gap-2">
                <div className="font-semibold text-slate-700">
                  Reviews Above 3 stars
                </div>
                <Link
                  to={"/#"}
                  className="border-primary/30 text-primary hover:bg-primary grid place-items-center rounded-full border p-3 duration-300 hover:text-slate-50"
                >
                  <MoveUpRight className="size-5" />
                </Link>
              </div>
            </div>

            {/* Heart Icon  */}
            <div
              className="floating-up-down absolute top-[30%] -right-10 z-10 grid aspect-square w-24 place-items-center rounded-3xl bg-white p-4 shadow-2xl shadow-slate-300/60"
              style={{
                animationDelay: "1.5s",
              }}
            >
              <img src={Images.Heart} alt="Heart" />
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
