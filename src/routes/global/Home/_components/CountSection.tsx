import { Images } from "@/constants";

const CountSection = () => {
  return (
    <div
      className="bg-secondary bg-cover bg-fixed bg-center py-16 bg-blend-multiply"
      style={{
        backgroundImage: `url(${Images.Background1})`,
      }}
    >
      <div className="hs-container grid grid-cols-4 items-center">
        <div>
          <div className="mb-5 flex items-center -space-x-3">
            <img
              className="rounded-full border-[3px] border-white object-contain"
              src={Images.DummyProfile1}
              width={55}
              height={55}
              alt="dummy profile 1"
            />
            <img
              className="rounded-full border-[3px] border-white object-contain"
              src={Images.DummyProfile2}
              width={55}
              height={55}
              alt="dummy profile 2"
            />
            <img
              className="rounded-full border-[3px] border-white object-contain"
              src={Images.DummyProfile3}
              width={55}
              height={55}
              alt="dummy profile 3"
            />
            <img
              className="rounded-full border-[3px] border-white object-contain"
              src={Images.DummyProfile4}
              width={55}
              height={55}
              alt="dummy profile 4"
            />
          </div>
          <p className="text-xl font-medium text-slate-50">
            300+ Appointment Booking Confirm for this Week
          </p>
        </div>
        <div className="mx-auto text-slate-50">
          <p className="text-5xl font-bold">200+</p>
          <p className="text-lg">Specialists</p>
        </div>
        <div className="mx-auto text-slate-50">
          <p className="text-5xl font-bold">35K+</p>
          <p className="text-lg">Happy Patients</p>
        </div>
        <div className="mx-auto text-slate-50">
          <p className="text-5xl font-bold">20+</p>
          <p className="text-lg">Winning Awards</p>
        </div>
      </div>
    </div>
  );
};

export default CountSection;
