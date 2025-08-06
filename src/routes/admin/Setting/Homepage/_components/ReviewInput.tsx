import HSButton from "@/components/global/shared/HSButton";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  CONFIG_FEATURED_DOCTOR,
  CONFIG_HERO_REVIEW,
} from "@/lib/modules/setting/setting.constant";
import { cn } from "@/lib/utils";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
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
            gender
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

  const { control, getValues, setValue, watch } = useFormContext();

  const doctorId = watch(CONFIG_FEATURED_DOCTOR);

  const defaultValue = getValues(CONFIG_HERO_REVIEW);

  const { data: reviewsData, loading: reviewsLoading } = useQuery(REVIEW_LIST, {
    variables: {
      page,
      doctorId: doctorId || "",
    },
    skip: !doctorId,
  });

  if (!doctorId) return null;

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
          </Dialog>

          <FormMessage className="col-span-2 !mt-0 font-normal" />
        </FormItem>
      )}
    />
  );
};

export default ReviewInput;
