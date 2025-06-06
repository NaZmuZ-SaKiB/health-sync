import RatingStars from "@/components/global/shared/RatingStars";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TReview } from "@/lib/modules/review/review.type";
import { cn } from "@/lib/utils";
import { useState } from "react";

type TProps = {
  review: TReview;
  admin?: boolean;
};

const ViewReviewModal = ({ review, admin = false }: TProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn("h-auto cursor-pointer", { "rounded-none": admin })}
        >
          Review
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="mb-5">
          <DialogTitle className="text-primary-hover">Review</DialogTitle>
          <DialogDescription hidden>Review</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <RatingStars rating={review.rating} />

          <pre className="text-slate-700" style={{ fontFamily: "inherit" }}>
            {review?.comment || ""}
          </pre>
        </div>

        <DialogFooter className="mt-5">
          <Button
            variant="secondary"
            className="cursor-pointer text-slate-50"
            type="button"
            onClick={() => {
              setOpen(false);
            }}
          >
            close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewReviewModal;
