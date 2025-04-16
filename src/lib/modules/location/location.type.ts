import { TDoctor } from "../doctor/doctor.type";

export type TLocation = {
  id: string;
  name: string;
  mapUrl: string;
  phoneNumber: string;
  description?: string;
  image?: string; // TODO: update to image model
  createdAt: string;
  updatedAt: string;

  doctors: TDoctor[];
};
