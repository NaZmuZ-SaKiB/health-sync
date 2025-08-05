import { TDoctor } from "../doctor/doctor.type";
import { TImage } from "../image/image.type";

export type TLocation = {
  id: string;
  name: string;
  mapUrl: string;
  phoneNumber: string;
  address: string;
  description?: string;
  createdAt: string;
  updatedAt: string;

  image?: TImage;
  doctors: TDoctor[];
};
