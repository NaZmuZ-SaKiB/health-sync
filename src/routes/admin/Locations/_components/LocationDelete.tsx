import { AUTH_KEY } from "@/constants";
import { LocationQueries } from "@/lib/modules/location/location.queries";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type TProps = {
  selected: string[];
  setSelected?: (items: string[]) => void;
  children: React.ReactNode;
};

const LocationDelete = ({ selected, setSelected, children }: TProps) => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [cookies] = useCookies([AUTH_KEY]);

  const [deleteLocationsFn, { loading }] = useMutation(
    LocationQueries.DELETE_LOCATIONS,
    {
      context: {
        headers: {
          Authorization: cookies[AUTH_KEY] || "",
        },
      },
      refetchQueries: [LocationQueries.LOCATION_LIST],
    },
  );

  const handleDelete = async () => {
    try {
      toast.promise(
        async () => {
          return await deleteLocationsFn({ variables: { ids: selected } });
        },
        {
          loading: `Deleting Location${selected.length > 1 ? "s" : ""}...`,
          success: () => {
            if (setSelected) {
              setSelected([]);
            }
            return `Location${selected.length > 1 ? "s" : ""} deleted successfully.`;
          },
          error: (error: any) => error?.message,
        },
      );
    } catch {
      toast.error("A Client error occurred");
    } finally {
      setOpen(false);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent className="rounded-none border-none">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete the selected Location
            {selected.length > 1 ? "s" : ""}?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This will delete all the selected Location
            {selected.length > 1 ? "s" : ""}. You can not reverse this. Do you
            understand that?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <label className="group flex cursor-pointer items-center gap-2">
          <Input
            type="checkbox"
            className="size-4"
            onChange={(e) => setDisabled(!e.target.checked)}
          />{" "}
          <span className="text-slate-500 group-hover:text-slate-900">
            Yes, I understand.
          </span>
        </label>

        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer rounded-none">
            Cancel
          </AlertDialogCancel>
          <Button
            disabled={disabled || loading}
            variant="destructive"
            className="cursor-pointer rounded-none"
            onClick={handleDelete}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LocationDelete;
