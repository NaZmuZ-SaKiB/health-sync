import { createContext } from "react";
import { TRole } from "@/types";
import { useContext } from "react";

type TUserContext = {
  user: {
    id: string;
    email: string;
    role: TRole;
  } | null;
  loading: boolean;
};

export const UserContext = createContext<TUserContext>({
  user: null,
  loading: true,
});

const useAuth = () => useContext(UserContext);

export default useAuth;
