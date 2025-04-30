import DPageContainer from "@/components/dashboard/ui/DPageContainer";
import { AUTH_KEY } from "@/constants";
import { UserQueries } from "@/lib/modules/user/user.queries";
import { TUser } from "@/lib/modules/user/user.type";
import { useQuery } from "@apollo/client";
import { useCookies } from "react-cookie";
import AccountEditForm from "../_components/AccountEditForm";

const AccountEditPage = () => {
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
    <DPageContainer>
      <AccountEditForm user={user} />
    </DPageContainer>
  );
};

export default AccountEditPage;
