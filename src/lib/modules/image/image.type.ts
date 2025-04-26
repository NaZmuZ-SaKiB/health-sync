import { TRole } from "@/types";
import { TUser } from "../user/user.type";

export type TImage = {
  id: string;
  userType: TRole;
  name: string;
  publicId: string;
  height: number;
  width: number;
  format: string;
  url: string;
  secureUrl: string;
  thumbnailUrl: string;
  createdAt: string;
  updatedAt: string;

  user: TUser;
};
