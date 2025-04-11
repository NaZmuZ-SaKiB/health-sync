import { TDoctor } from "../doctor/doctor.type";

export type TSpecialty = {
  id: string;
  name: string;
  description?: string;
  icon?: string; // TODO: update to image model
  createdAt?: string;
  updatedAt?: string;

  doctors: TDoctor[];
};
