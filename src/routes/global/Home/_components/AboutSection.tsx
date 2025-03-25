import { Images } from "@/constants";
import {
  Camera,
  Clock,
  MessageSquareMore,
  Mic,
  Phone,
  Video,
} from "lucide-react";

const AboutSection = () => {
  return (
    <div className="py-24">
      <div className="hs-container">
        <div className="grid grid-cols-2 gap-5">
          {/* Left Side  */}
          <div className="relative">
            {/* Video Call Support  */}
            <div className="absolute top-14 -left-[150px] flex rounded-4xl bg-white p-8">
              <div
                className="bg-secondary z-0 -mr-10 -rotate-180 rounded-3xl p-4 pl-12 text-center font-semibold text-white uppercase"
                style={{ writingMode: "vertical-lr" }}
              >
                Video call support
              </div>
              <div className="relative z-10">
                <img
                  className="aspect-[3/4] w-full max-w-[200px] rounded-3xl border-2 border-white object-cover"
                  src={Images.FemaleDoctor1}
                  alt="female doctor"
                />
                <div className="absolute bottom-3 left-1/2 flex w-[90%] -translate-x-1/2 items-center justify-between rounded-full bg-slate-500/20 p-2 px-3 text-white backdrop-blur-lg">
                  <Camera className="size-3.5" />
                  <MessageSquareMore className="size-3.5" />
                  <Phone className="size-6 rotate-[135deg] rounded-full bg-red-500 fill-white p-1 text-transparent" />
                  <Mic className="size-3.5" />
                  <Video className="size-3.5" />
                </div>
              </div>
            </div>
            {/* Main Image  */}
            <img
              className="w-full max-w-[550px] rounded-4xl"
              src={Images.MaleDoctor1}
              alt="male doctor"
            />
            {/* Time Table  */}
            <div className="bg-primary absolute right-12 bottom-10 rounded-4xl px-6 py-7 text-white">
              <h3 className="mb-8 text-lg font-semibold">Open Hours</h3>
              <ul className="text-sm leading-8">
                <li className="flex justify-between gap-5">
                  <span>Monday</span>
                  <span>08:00 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between gap-5">
                  <span>Tuesday</span>
                  <span>08:00 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between gap-5">
                  <span>Wednesday</span>
                  <span>08:00 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between gap-5">
                  <span>Thursday</span>
                  <span>08:00 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between gap-5">
                  <span>Friday</span>
                  <span>08:00 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between gap-5">
                  <span>Saturday</span>
                  <span>08:00 AM - 10:00 PM</span>
                </li>
              </ul>

              {/* Clock  */}
              <div className="bg-secondary absolute -top-5 -right-5 rounded-full border-2 border-white p-3">
                <Clock className="size-10" />
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
