import HSButton from "@/components/global/shared/HSButton";
import HSPagination from "@/components/global/shared/HSPagination";
import RatingStars from "@/components/global/shared/RatingStars";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AUTH_KEY, Images } from "@/constants";
import { TReview } from "@/lib/modules/review/review.type";
import {
  CONFIG_FEATURED_DOCTOR,
  CONFIG_HERO_REVIEW,
} from "@/lib/modules/setting/setting.constant";
import { cn } from "@/lib/utils";
import { TMeta } from "@/types";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useFormContext } from "react-hook-form";

type TProps = {
  name: string;
  label: string;
  required?: boolean;
};

const REVIEW_LIST = gql`
  query GetAllReviews($page: String, $doctorId: String) {
    getAllReviews(page: $page, doctorId: $doctorId) {
      meta {
        limit
        page
        total
      }
      reviews {
        id
        comment
        rating
        patient {
          user {
            firstName
            lastName
            profilePicture {
              publicId
              secureUrl
            }
          }
        }
      }
    }
  }
`;

const ReviewInput = ({ name, label, required = true }: TProps) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  const [cookies] = useCookies([AUTH_KEY]);

  const { control, getValues, setValue, watch } = useFormContext();

  const doctorId = watch(CONFIG_FEATURED_DOCTOR);
  const reviewId = watch(CONFIG_HERO_REVIEW);

  const defaultValue = getValues(CONFIG_HERO_REVIEW);

  const { data: reviewsData, loading: reviewsLoading } = useQuery(REVIEW_LIST, {
    variables: {
      page: page.toString(),
      doctorId: doctorId || "",
    },
    context: {
      headers: {
        Authorization: cookies[AUTH_KEY] || "",
      },
    },
    skip: !doctorId,
  });

  if (!doctorId) return null;

  if (reviewsLoading) return null;

  const meta: TMeta = reviewsData?.getAllReviews?.meta;
  const totalPages = Math.ceil(meta?.total / meta?.limit);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex w-full flex-col gap-1", {})}>
          <FormLabel
            className={"gap-0.5 text-xs font-medium text-nowrap capitalize"}
          >
            {label}
            {required && <span className="text-red-500">*</span>}
          </FormLabel>

          <Dialog open={open} onOpenChange={setOpen}>
            <FormControl>
              <DialogTrigger asChild className="no-focus">
                <HSButton
                  className="h-auto self-start rounded-none px-5 py-2 capitalize"
                  variant="outline"
                >
                  Select {label}
                </HSButton>
              </DialogTrigger>
            </FormControl>

            <DialogContent className="no-focus flex h-[95svh] !max-w-[95vw] flex-col overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-semibold">Reviews</DialogTitle>
              </DialogHeader>

              <div className="h-full">
                <div className="grid sm:grid-cols-2">
                  {!reviewsLoading &&
                    reviewsData &&
                    reviewsData?.getAllReviews?.reviews.map(
                      (review: TReview) => (
                        <div
                          key={`${name}-${review.id}`}
                          className={cn(
                            "cursor-pointer border-2 px-4 py-3 hover:bg-slate-50",
                            {
                              "border-sky-600": reviewId === review.id,
                            },
                          )}
                          onClick={() =>
                            setValue(CONFIG_HERO_REVIEW, review.id)
                          }
                        >
                          <div className="mb-3 flex items-start gap-3">
                            <img
                              src={
                                review?.patient?.user?.profilePicture
                                  ?.secureUrl || Images.PlaceholderImage
                              }
                              height={40}
                              width={40}
                              className="rounded-full object-cover"
                              alt={review?.patient?.user?.firstName}
                            />

                            <div>
                              <p className="text-sm font-medium text-slate-500">
                                {review?.patient?.user?.firstName}{" "}
                                {review?.patient?.user?.lastName}
                              </p>
                              <RatingStars
                                rating={review.rating}
                                className="size-4"
                              />
                            </div>
                          </div>
                          <p className="whitespace-pre-line">
                            {review?.comment}
                          </p>
                        </div>
                      ),
                    )}
                </div>
              </div>

              <DialogFooter className="flex w-full !items-center !justify-between border-t pt-2 max-lg:!flex-col-reverse">
                <div className="mt-2">
                  <div className="text-sm text-slate-700">
                    Showing {meta.limit < meta.total ? meta.limit : meta.total}{" "}
                    of {meta.total}. ({totalPages} page
                    {totalPages > 1 ? "s" : ""}.)
                  </div>
                  {totalPages !== 1 && (
                    <HSPagination
                      page={meta?.page || 1}
                      limit={meta?.limit || 35}
                      total={meta?.total}
                      customFunction={(page) => setPage(page)}
                      admin
                    />
                  )}
                </div>
                <DialogClose asChild>
                  <HSButton className="h-auto rounded-none px-3 py-2 lg:self-end">
                    Done
                  </HSButton>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <FormMessage className="col-span-2 !mt-0 font-normal" />
        </FormItem>
      )}
    />
  );
};

export default ReviewInput;
