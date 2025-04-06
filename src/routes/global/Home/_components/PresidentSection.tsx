import { Images } from "@/constants";
import { Check } from "lucide-react";

const PresidentSection = () => {
  return (
    <div
      className="relative z-10 bg-cover bg-fixed bg-center pt-16"
      style={{
        backgroundImage: `url(${Images.Background2})`,
      }}
    >
      <div className="absolute top-0 right-0 bottom-0 left-0 -z-1 bg-sky-50/90"></div>

      {/* Main Content */}
      <div className="hs-container">
        <div className="grid grid-cols-2 gap-10">
          {/* Left Side  */}
          <div className="relative">
            <img
              className="mx-auto w-full max-w-[650px]"
              src={Images.HospitalPresident}
              alt="hospital president"
            />
            <div className="floating-up-left-right-down absolute bottom-24 left-5 flex items-center gap-5 rounded-2xl bg-white p-5">
              <span className="text-primary text-6xl font-bold">20+</span>
              <span className="text-secondary text-lg font-semibold">
                Years <br /> Experienced
              </span>
            </div>
          </div>

          {/* Right Side */}
          <div className="">
            <h2 className="text-secondary mb-4 text-5xl leading-16 font-bold">
              A Message from Our President
            </h2>

            {/* Texts  */}
            <div className="mb-10">
              <p className="text-lg leading-8 text-slate-500">
                At Health Sync, we believe that exceptional neurological care
                begins with expertise, compassion, and innovation. With over 20+
                years specializing in neurology—from stroke recovery to advanced
                movement disorder therapies—I am committed to ensuring our
                hospital delivers world-class, patient-centered care. Every day,
                our team pushes boundaries in research, technology, and
                treatment to give you the best possible outcomes. Your trust
                inspires us to lead with excellence, and we pledge to walk
                alongside you with unwavering dedication on your journey to
                healing.
              </p>
              <p className="text-secondary mt-2.5 text-xl font-medium">
                {" "}
                Dr. Adrian Blackwell, MD
              </p>
              <p className="text-slate-700 italic">President & Director</p>
            </div>

            {/* Skills  */}
            <div>
              <h3 className="text-primary mb-5 border-b border-dashed border-slate-400 pb-3 text-xl font-semibold">
                About Skills
              </h3>
              <ul className="grid grid-cols-2 gap-5">
                <li className="flex items-center gap-3">
                  <span className="text-primary inline-block aspect-square rounded-full bg-white p-2">
                    <Check className="size-5" />
                  </span>
                  <span className="text-secondary font-medium">
                    Stroke & Cerebrovascular
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-primary inline-block aspect-square rounded-full bg-white p-2">
                    <Check className="size-5" />
                  </span>
                  <span className="text-secondary font-medium">
                    Epilepsy & Seizure Disorders
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-primary inline-block aspect-square rounded-full bg-white p-2">
                    <Check className="size-5" />
                  </span>
                  <span className="text-secondary font-medium">
                    Movement Disorders
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-primary inline-block aspect-square rounded-full bg-white p-2">
                    <Check className="size-5" />
                  </span>
                  <span className="text-secondary font-medium">
                    Neuromuscular Medicine
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresidentSection;
