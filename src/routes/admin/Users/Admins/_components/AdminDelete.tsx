import { AUTH_KEY } from "@/constants";
import { gql, useMutation } from "@apollo/client";
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
import { UserQueries } from "@/lib/modules/user/user.queries";

type TProps = {
  selected: string[];
  setSelected?: (items: string[]) => void;
  children: React.ReactNode;
};

const DELETE_ADMIN = gql`
  mutation DeleteAdmins($ids: [String!]!) {
    deleteAdmins(ids: $ids) {
      success
    }
  }
`;

const AdminDelete = ({ selected, setSelected, children }: TProps) => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [cookies] = useCookies([AUTH_KEY]);

  const [deleteAdminsFn, { loading }] = useMutation(DELETE_ADMIN, {
    context: {
      headers: {
        Authorization: cookies[AUTH_KEY] || "",
      },
    },
    refetchQueries: [UserQueries.ADMINS_LIST],
  });

  const handleDelete = async () => {
    try {
      toast.promise(
        async () => {
          return await deleteAdminsFn({ variables: { ids: selected } });
        },
        {
          loading: `Deleting Admin${selected.length > 1 ? "s" : ""}...`,
          success: () => {
            if (setSelected) {
              setSelected([]);
            }
            return `Admin${selected.length > 1 ? "s" : ""} deleted successfully.`;
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
            Are you sure you want to delete the selected Admin
            {selected.length > 1 ? "s" : ""}?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This will permanently delete all the selected Admin
            {selected.length > 1 ? "s" : ""}. Do you understand that?
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

export default AdminDelete;
