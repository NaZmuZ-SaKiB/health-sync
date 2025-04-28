import { AUTH_KEY } from "@/constants";
import { UserContext } from "@/hooks/use-auth";
import { UserQueries } from "@/lib/modules/user/user.queries";

import { useQuery } from "@apollo/client";

import { useCookies } from "react-cookie";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookies] = useCookies([AUTH_KEY]);

  const { data: userData, loading } = useQuery(UserQueries.CONTEXT_USER, {
    context: {
      headers: {
        Authorization: cookies[AUTH_KEY] || "",
      },
    },
  });
  return (
    <UserContext.Provider value={{ user: userData?.me, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
