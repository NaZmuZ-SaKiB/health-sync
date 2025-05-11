import HSDTextarea from "@/components/dashboard/form/HSDTextarea";
import HSRatingInput from "@/components/global/form/HSRatingInput";
import HSButton from "@/components/global/shared/HSButton";
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
import { Form } from "@/components/ui/form";
import { AUTH_KEY } from "@/constants";
import { AppointmentQueries } from "@/lib/modules/appointment/appointment.queries";
import { ReviewQueries } from "@/lib/modules/review/review.queries";
import { ReviewValidation } from "@/lib/modules/review/review.validation";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type TProps = {
  id: string;
};

type TForm = z.infer<typeof ReviewValidation.create>;

const AddReviewButton = ({ id }: TProps) => {
  const [cookies] = useCookies([AUTH_KEY]);

  const [open, setOpen] = useState<boolean>(false);

  const [createReview] = useMutation(ReviewQueries.CREATE_REVIEW, {
    context: {
      headers: {
        Authorization: cookies[AUTH_KEY] || "",
      },
    },
    refetchQueries: [AppointmentQueries.MY_APPOINTMENTS],
  });

  const form = useForm<TForm>({
    defaultValues: {
      rating: 3,
      comment: "",
    },
    resolver: zodResolver(ReviewValidation.create),
  });

  const handleSubmit: SubmitHandler<TForm> = async (data) => {
    try {
      toast.promise(
        async () => {
          return await createReview({
            variables: {
              appointmentId: id,
              ...data,
            },
          });
        },
        {
          loading: "Submitting Review...",
          success: () => {
            setOpen(false);
            return "Thank you for your review.";
          },
          error: (error: any) => error?.message,
        },
      );
    } catch {
      toast.error("A Client error occurred");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="cursor-pointer">
          Add Review
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="mb-5">
          <DialogTitle className="text-primary-hover">Add Review</DialogTitle>
          <DialogDescription hidden>Add Review</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-3"
          >
            <HSRatingInput name="rating" label="Rating" />
            <HSDTextarea name="comment" label="Comment" required={false} />

            <DialogFooter className="mt-5">
              <Button
                variant="secondary"
                className="cursor-pointer text-slate-50"
                type="button"
                onClick={() => {
                  form.reset();
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <HSButton
                className="rounded-lg"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? "Submitting Review..."
                  : "Submit"}
              </HSButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReviewButton;
