import { Images } from "@/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import FloatingPatients from "./FloatingPatients";
import FloatingReview from "./FloatingReview";

const ReviewSection = () => {
  return (
    <div className="bg-secondary overflow-hidden">
      <div className="hs-container">
        <div className="grid grid-cols-2 items-center pt-24">
          {/* Left Side  */}
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

            {/* Patients  */}
            <FloatingPatients className="bottom-10 left-10" />

            {/* Floating Review  */}
            <FloatingReview className="top-1/2 right-10 -translate-y-1/2" />
          </div>

          {/* Right Side - Review text  */}
          <div className="px-10">
            <h2 className="mb-7 text-5xl leading-16 font-bold text-slate-50">
              What Our Patients Say
            </h2>

            <div>
              <Carousel
                className="w-full"
                opts={{ loop: true }}
                plugins={[
                  Autoplay({
                    delay: 3000,
                  }),
                ]}
              >
                <CarouselContent>
                  <CarouselItem>
                    <div className="flex w-full items-center overflow-hidden rounded-3xl bg-white">
                      <div className="w-[210px]">
                        <img
                          className="w-full"
                          src={Images.DummyProfile1}
                          alt="dummy user 1"
                        />
                        <div className="bg-primary/10 py-3 text-center">
                          <h3 className="text-secondary text-lg font-medium">
                            Redoy Mollah
                          </h3>
                          <p className="text-primary text-sm">Patient</p>
                        </div>
                      </div>
                      {/* Review text  */}
                      <div className="flex-1 p-5">
                        {/* Starts  */}
                        <div className="mb-3 flex">
                          <Star className="size-5 fill-yellow-500 text-transparent" />
                          <Star className="size-5 fill-yellow-500 text-transparent" />
                          <Star className="size-5 fill-yellow-500 text-transparent" />
                          <Star className="size-5 fill-yellow-500 text-transparent" />
                          <Star className="size-5 fill-yellow-500 text-transparent" />
                        </div>
                        <p className="leading-7 text-slate-700">
                          I had a wonderful experience with Doctor. She was very
                          attentive, took the time to listen to all my concerns,
                          and explained everything in a way that was easy to
                          understand. I highly recommend her to anyone looking
                          for a caring and knowledgeable doctor.
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="flex w-full items-center overflow-hidden rounded-3xl bg-white">
                      <div className="w-[210px]">
                        <img
                          className="w-full"
                          src={Images.DummyProfile2}
                          alt="dummy user 1"
                        />
                        <div className="bg-primary/10 py-3 text-center">
                          <h3 className="text-secondary text-lg font-medium">
                            Jorina Begum
                          </h3>
                          <p className="text-primary text-sm">Patient</p>
                        </div>
                      </div>
                      {/* Review text  */}
                      <div className="flex-1 p-5">
                        {/* Starts  */}
                        <div className="mb-3 flex">
                          <Star className="size-5 fill-yellow-500 text-transparent" />
                          <Star className="size-5 fill-yellow-500 text-transparent" />
                          <Star className="size-5 fill-yellow-500 text-transparent" />
                          <Star className="size-5 fill-yellow-500 text-transparent" />
                          <Star className="size-5 fill-yellow-500 text-transparent" />
                        </div>
                        <p className="leading-7 text-slate-700">
                          I had a wonderful experience with Doctor. She was very
                          attentive, took the time to listen to all my concerns,
                          and explained everything in a way that was easy to
                          understand. I highly recommend her to anyone looking
                          for a caring and knowledgeable doctor.
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="scale-200 cursor-pointer border-none bg-transparent text-slate-50 opacity-50 hover:bg-transparent hover:text-slate-50 hover:opacity-100" />
                <CarouselNext className="scale-200 cursor-pointer border-none bg-transparent text-slate-50 opacity-50 hover:bg-transparent hover:text-slate-50 hover:opacity-100" />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
