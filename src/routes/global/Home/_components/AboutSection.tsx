import HSButton from "@/components/global/shared/HSButton";
import { Images } from "@/constants";
import {
  Camera,
  Check,
  Clock,
  MessageSquareMore,
  Mic,
  MoveRight,
  Phone,
  PhoneCall,
  Video,
} from "lucide-react";
import { Link } from "react-router";

const AboutSection = () => {
  return (
    <div className="py-24">
      <div className="hs-container">
        <div className="grid grid-cols-2 items-center gap-5">
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
            <div className="bg-primary absolute right-12 bottom-10 rounded-4xl p-7 text-white">
              <h3 className="mb-4 text-lg font-semibold">Open Hours</h3>
              <ul className="text-sm leading-9">
                <li className="flex justify-between gap-5">
                  <span>Monday</span>
                  <span className="font-medium">8:00 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between gap-5">
                  <span>Tuesday</span>
                  <span className="font-medium">8:00 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between gap-5">
                  <span>Wednesday</span>
                  <span className="font-medium">8:00 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between gap-5">
                  <span>Thursday</span>
                  <span className="font-medium">8:00 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between gap-5">
                  <span>Friday</span>
                  <span className="font-medium">8:00 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between gap-5">
                  <span>Saturday</span>
                  <span className="font-medium">8:00 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between gap-5">
                  <span>Sunday</span>
                  <span className="font-medium">Emergency Cases</span>
                </li>
              </ul>

              {/* Clock  */}
              <div className="bg-secondary absolute -top-5 -right-5 rounded-full border-2 border-white p-3">
                <Clock className="size-10" />
              </div>
            </div>
          </div>
          {/* Right Side  */}
          <div>
            <h2 className="text-secondary mb-5 text-5xl leading-16 font-bold">
              Trusted Medical Excellence for Everyone
            </h2>
            <p className="leading-7 text-slate-500">
              At Health Sync, we are committed to providing exceptional medical
              care with a patient-first approach. Our team of experienced
              doctors and healthcare professionals uses the latest technology to
              ensure accurate diagnoses and effective treatments. Whether you
              need routine check-ups, emergency care, or specialized treatment,
              we are here for you—24/7 in emergencies. Your health is our
              priority.
            </p>

            {/* List  */}
            <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-3">
              <li className="flex items-center gap-3">
                <Check className="text-primary w-5" />{" "}
                <span className="font-medium">Comprehensive Specialties</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="text-primary w-5" />{" "}
                <span className="font-medium">Research and Development</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="text-primary w-5" />{" "}
                <span className="font-medium">Emergency Services</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="text-primary w-5" />{" "}
                <span className="font-medium">Advanced Imaging Services</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="text-primary w-5" />{" "}
                <span className="font-medium">Intensive Care Units (ICUs)</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="text-primary w-5" />{" "}
                <span className="font-medium">Rehabilitation Services</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="text-primary w-5" />{" "}
                <span className="font-medium">Telemedicine Facilities</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="text-primary w-5" />{" "}
                <span className="font-medium">Patient-Centric Approach</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="text-primary w-5" />{" "}
                <span className="font-medium">Multidisciplinary Team</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="text-primary w-5" />{" "}
                <span className="font-medium">
                  Health Information Technology
                </span>
              </li>
            </ul>

            {/* Buttons  */}
            <div className="mt-8 flex items-center gap-10">
              <Link to={"/appointment"}>
                <HSButton
                  variant={"secondary"}
                  className="h-auto py-2 pr-2 pl-5 text-lg"
                >
                  Appointment{" "}
                  <span className="grid size-10 place-items-center rounded-md bg-white">
                    <MoveRight className="text-btn-primary size-5" />
                  </span>
                </HSButton>
              </Link>

              <Link to="/tel:+1123456789" className="flex items-center gap-3">
                <PhoneCall className="text-primary size-8 animate-bounce" />
                <div>
                  <p className="text-sm text-slate-500">Contact us?</p>
                  <p className="text-secondary text-lg font-semibold">
                    +1123 456 789
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
