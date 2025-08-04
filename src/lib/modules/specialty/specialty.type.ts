import { TDoctor } from "../doctor/doctor.type";
import { TImage } from "../image/image.type";

export type TSpecialty = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;

  doctors: TDoctor[];
  icon?: TImage;
};
