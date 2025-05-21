import { TService } from "../service/service.type";

export type TServiceSettings = {
  id: string;
  startTime: string;
  endTime: string;
  duration: number;
  fee: number;
  createdAt: Date;
  updatedAt: Date;

  service: TService;
};
