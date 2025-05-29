import { Button } from "@/components/ui/button";
import { AUTH_KEY } from "@/constants";
import { PatientQueries } from "@/lib/modules/patient/patient.queries";
import { UserQueries } from "@/lib/modules/user/user.queries";
import { cn } from "@/lib/utils";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

type TProps = {
  id: string;
  isActive: boolean;
};

const UserActiveStatusToggle = ({ id, isActive }: TProps) => {
  const [active, setActive] = useState(isActive);

  const [cookies] = useCookies([AUTH_KEY]);

  const [updateStatusFn, { loading }] = useMutation(
    UserQueries.UPDATE_USER_STATUS,
    {
      context: {
        headers: {
          Authorization: cookies[AUTH_KEY] || "",
        },
      },
      refetchQueries: [PatientQueries.PATIENT_LIST],
    },
  );

  const handleUpdate = async () => {
    try {
      toast.promise(
        async () => {
          return await updateStatusFn({
            variables: {
              id,
            },
          });
        },
        {
          loading: isActive ? "Blocking User..." : "Unblocking User...",
          success: () => {
            setActive((prev) => !prev);
            return !isActive ? "User Blocked." : "User Activated.";
          },
          error: (error: any) => error?.message,
        },
      );
    } catch {
      toast.error("A Client error occurred");
    }
  };

  return (
    <Button
      className={cn(
        "cursor-pointer rounded-none border-green-600 bg-green-50 text-green-600 capitalize hover:bg-green-600 hover:!text-slate-50 focus-visible:border-green-600 focus-visible:bg-green-600 focus-visible:text-slate-50 focus-visible:ring-0",
        {
          "border-red-600 bg-red-50 text-red-600 hover:bg-red-600 focus-visible:border-red-600 focus-visible:bg-red-600":
            active,
        },
      )}
      variant="outline"
      size="sm"
      disabled={loading}
      onClick={handleUpdate}
    >
      {active ? "Block" : "Unblock"}
    </Button>
  );
};

export default UserActiveStatusToggle;
