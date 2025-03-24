import { Images } from "@/constants";

const AboutSection = () => {
  return (
    <div className="py-24">
      <div className="hs-container">
        <div className="grid grid-cols-2 gap-5">
          <div className="relative">
            <div className="absolute top-14 -left-[100px] flex rounded-4xl bg-white p-8">
              <div
                className="bg-secondary z-0 -mr-5 -rotate-180 rounded-2xl p-4 pl-8 text-center font-medium text-white uppercase"
                style={{ writingMode: "vertical-lr" }}
              >
                Video call support
              </div>
              <img
                className="z-10 aspect-[3/4] w-full max-w-[200px] rounded-2xl border-2 border-white object-cover"
                src={Images.FemaleDoctor1}
                alt="female doctor"
              />
            </div>
            <img
              className="w-full max-w-[550px] rounded-4xl"
              src={Images.MaleDoctor1}
              alt="male doctor"
            />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
