import APageContainer from "@/components/admin/ui/APageContainer";
import { AUTH_KEY } from "@/constants";
import { UserQueries } from "@/lib/modules/user/user.queries";
import { TUser } from "@/lib/modules/user/user.type";

import { useQuery } from "@apollo/client";
import { useCookies } from "react-cookie";
import AdminProfileEditForm from "../_components/AdminProfileEditForm";

const EditAdminProfilePage = () => {
  const [cookies] = useCookies([AUTH_KEY]);

  const { data: userData, loading } = useQuery(UserQueries.PROFILE, {
    context: {
      headers: {
        Authorization: cookies[AUTH_KEY] || "",
      },
    },
  });

  if (loading) return <div>Loading...</div>;

  const user: TUser = userData?.me;

  return (
    <APageContainer>
      <AdminProfileEditForm user={user} />
    </APageContainer>
  );
};

export default EditAdminProfilePage;
