import HSButton from "@/components/global/shared/HSButton";
import { Images } from "@/constants";
import { MoveRight, MoveUpRight } from "lucide-react";

type TBlog = {
  title: string;
  image: string;
};

const blogs: TBlog[] = [
  {
    title: "Trump cuts to USAID halt funding for global vaccinations",
    image: Images.BlogImage1,
  },
  {
    title: "How to find a home health aide",
    image: Images.BlogImage2,
  },
  {
    title:
      "What WWII data tells us about children, added sugar and chronic disease",
    image: Images.BlogImage3,
  },
  {
    title: "Her research grant mentioned ‘hesitancy.’ Now her funding is gone.",
    image: Images.BlogImage4,
  },
];

const BlogSection = () => {
  return (
    <div className="bg-primary/5">
      <div className="hs-container">
        <div className="py-24">
          {/* Title  */}
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-secondary text-5xl leading-14 font-bold">
              Stay Informed with <br />
              Our Latest Health Blogs
            </h2>
            <div className="flex items-center justify-end">
              <HSButton
                className="h-auto py-1.5 pr-1.5 pl-5 text-sm"
                variant="secondary"
              >
                View All{" "}
                <span className="ml-2 grid size-10 place-items-center rounded-md bg-white">
                  <MoveRight className="text-secondary size-5" />
                </span>
              </HSButton>
            </div>
          </div>

          {/* Blogs  */}
          <div className="grid auto-rows-[550px] grid-cols-10 gap-5">
            <div className="group relative col-span-3 overflow-hidden rounded-3xl">
              <img
                className="h-full w-full object-cover object-center"
                src={blogs[0].image}
                alt={blogs[0].title}
              />
              <div className="text-secondary absolute top-5 left-5 flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-medium">
                <span className="bg-secondary size-2 rounded-full"></span> 30
                Mar 2025
              </div>
              <div className="absolute right-5 bottom-5 left-5 z-10 flex items-end justify-between gap-2.5 text-xl font-medium text-slate-50">
                <h3>{blogs[0].title}</h3>
                <div className="text-secondary hover:bg-primary grid cursor-pointer place-items-center rounded-full bg-white p-2.5 hover:text-slate-50">
                  <MoveUpRight />
                </div>
              </div>
              <div className="absolute top-0 left-0 z-0 h-full w-full bg-gradient-to-b from-transparent to-slate-700 opacity-100 transition-opacity duration-500 group-hover:opacity-0"></div>
              <div className="to-primary/60 absolute top-0 left-0 z-0 h-full w-full bg-gradient-to-b from-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
            </div>
            <div className="group relative col-span-4 overflow-hidden rounded-3xl">
              <img
                className="h-full w-full object-cover object-center"
                src={blogs[1].image}
                alt={blogs[1].title}
              />
              <div className="text-secondary absolute top-5 left-5 flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-medium">
                <span className="bg-secondary size-2 rounded-full"></span> 30
                Mar 2025
              </div>
              <div className="absolute right-5 bottom-5 left-5 z-10 flex items-end justify-between gap-2.5 text-xl font-medium text-slate-50">
                <h3>{blogs[1].title}</h3>
                <div className="text-secondary hover:bg-primary grid cursor-pointer place-items-center rounded-full bg-white p-2.5 hover:text-slate-50">
                  <MoveUpRight />
                </div>
              </div>
              <div className="absolute top-0 left-0 z-0 h-full w-full bg-gradient-to-b from-transparent to-slate-700 opacity-100 transition-opacity duration-500 group-hover:opacity-0"></div>
              <div className="to-primary/60 absolute top-0 left-0 z-0 h-full w-full bg-gradient-to-b from-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
            </div>
            <div className="col-span-3 flex flex-col gap-5">
              <div className="group relative flex-1 overflow-hidden rounded-3xl">
                <img
                  className="h-full w-full object-cover object-center"
                  src={blogs[2].image}
                  alt={blogs[2].title}
                />
                <div className="text-secondary absolute top-5 left-5 flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-medium">
                  <span className="bg-secondary size-2 rounded-full"></span> 30
                  Mar 2025
                </div>
                <div className="text-secondary hover:bg-primary absolute top-5 right-5 grid cursor-pointer place-items-center rounded-full bg-white p-2.5 hover:text-slate-50">
                  <MoveUpRight />
                </div>
                <div className="absolute right-5 bottom-5 left-5 z-10 gap-2.5 text-lg font-medium text-slate-50">
                  <h3>{blogs[3].title}</h3>
                </div>
                <div className="absolute top-0 left-0 z-0 h-full w-full bg-gradient-to-b from-transparent to-slate-500 opacity-100 transition-opacity duration-500 group-hover:opacity-0"></div>
                6{" "}
                <div className="to-primary/60 absolute top-0 left-0 z-0 h-full w-full bg-gradient-to-b from-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              </div>
              <div className="group relative flex-1 overflow-hidden rounded-3xl">
                <img
                  className="h-full w-full object-cover object-center"
                  src={blogs[3].image}
                  alt={blogs[3].title}
                />
                <div className="text-secondary absolute top-5 left-5 flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-medium">
                  <span className="bg-secondary size-2 rounded-full"></span> 30
                  Mar 2025
                </div>
                <div className="text-secondary hover:bg-primary absolute top-5 right-5 grid cursor-pointer place-items-center rounded-full bg-white p-2.5 hover:text-slate-50">
                  <MoveUpRight />
                </div>
                <div className="absolute right-5 bottom-5 left-5 z-10 gap-2.5 text-lg font-medium text-slate-50">
                  <h3>{blogs[3].title}</h3>
                </div>
                <div className="absolute top-0 left-0 z-0 h-full w-full bg-gradient-to-b from-transparent to-slate-500 opacity-100 transition-opacity duration-500 group-hover:opacity-0"></div>
                6{" "}
                <div className="to-primary/60 absolute top-0 left-0 z-0 h-full w-full bg-gradient-to-b from-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
