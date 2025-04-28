import useAuth from "@/hooks/use-auth";
import { TRole } from "@/types";
import { useNavigate } from "react-router";
import { toast } from "sonner";

type TProps = {
  children: React.ReactNode;
  role?: TRole[];
};

const ProtectedRoute = ({ children, role }: TProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // TODO: Add a loading state
  if (loading) return null;

  if (!loading && !user) {
    navigate("/auth/sign-in");
  }

  if (user && role && !role.includes(user.role)) {
    navigate("/");
    toast.error("You do not have permission to access this page");
  }

  return children;
};

export default ProtectedRoute;
