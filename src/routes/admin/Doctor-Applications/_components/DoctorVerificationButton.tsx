import HSButton from "@/components/global/shared/HSButton";
import { AUTH_KEY } from "@/constants";
import { DoctorQueries } from "@/lib/modules/doctor/doctor.queries";
import { cn } from "@/lib/utils";
import { TDoctorVerificationStatus } from "@/types";
import { useMutation } from "@apollo/client";
import { ClassValue } from "clsx";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

type TProps = {
  doctorId?: string;
  status: TDoctorVerificationStatus;
  className?: ClassValue;
  title: string;
  loadingTitle: string;
  small?: boolean;
};

const DoctorVerificationButton = ({
  doctorId,
  status,
  title,
  loadingTitle,
  className,
  small,
}: TProps) => {
  const [cookies] = useCookies([AUTH_KEY]);

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const [updateDoctorFn, { loading }] = useMutation(
    DoctorQueries.VERIFY_DOCTOR,
    {
      context: {
        headers: {
          Authorization: cookies[AUTH_KEY] || "",
        },
      },
      refetchQueries: [DoctorQueries.DOCTOR_LIST],
      // TODO: remove doctor from cache
    },
  );

  const handleVerification = async () => {
    try {
      toast.promise(
        async () => {
          return await updateDoctorFn({
            variables: { doctorId: id ?? doctorId, status },
          });
        },
        {
          loading: "Updating Status...",
          success: () => {
            navigate("/admin/doctor-applications");
            return "Status Updated.";
          },
          error: (error: any) => error?.message,
        },
      );
    } catch {
      toast.error("A Client error occurred");
    }
  };

  if (!id && !doctorId) return null;

  return (
    <HSButton
      onClick={handleVerification}
      disabled={loading}
      className={cn("cursor-pointer rounded-none", className)}
      size={small ? "sm" : "default"}
    >
      {loading ? loadingTitle : title}
    </HSButton>
  );
};

export default DoctorVerificationButton;
