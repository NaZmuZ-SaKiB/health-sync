import { Images } from "@/constants";

const ReviewSection = () => {
  return (
    <div className="bg-secondary overflow-hidden">
      <div className="hs-container">
        <div className="grid grid-cols-2 gap-10 pt-24">
          <div className="relative z-10">
            <img
              className="mx-auto w-full max-w-[500px]"
              src={Images.ReviewsDoctor}
              alt="Female doctor"
            />

            {/* Circle background */}
            <div
              className="border-primary/30 absolute -bottom-24 left-0 -z-1 grid aspect-square w-full max-w-[650px] animate-spin place-items-center rounded-full border"
              style={{ animationDuration: "40s" }}
            >
              <span className="bg-primary absolute -top-[5px] left-1/2 size-[10px] -translate-x-1/2 rounded-full"></span>
              <span className="bg-primary absolute -bottom-[5px] left-1/2 size-[10px] -translate-x-1/2 rounded-full"></span>
              <span className="bg-primary absolute top-1/2 -left-[5px] size-[10px] -translate-y-1/2 rounded-full"></span>
              <span className="bg-primary absolute top-1/2 -right-[5px] size-[10px] -translate-y-1/2 rounded-full"></span>

              <div
                className="border-primary/30 aspect-square w-full max-w-[520px] animate-spin rounded-full border"
                style={{ animationDuration: "30s" }}
              >
                <span className="bg-primary absolute -top-[5px] left-1/2 size-[10px] -translate-x-1/2 rounded-full"></span>
                <span className="bg-primary absolute -bottom-[5px] left-1/2 size-[10px] -translate-x-1/2 rounded-full"></span>
                <span className="bg-primary absolute top-1/2 -left-[5px] size-[10px] -translate-y-1/2 rounded-full"></span>
                <span className="bg-primary absolute top-1/2 -right-[5px] size-[10px] -translate-y-1/2 rounded-full"></span>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
