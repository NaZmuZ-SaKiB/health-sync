import { TAppointment } from "../appointment/appointment.type";
import { TReview } from "../review/review.type";
import { TServiceSettings } from "../service-settings/service-settings.type";
import { TTimeSlot } from "../time-slot/time-slot.type";

export type TService = {
  id: string;
  name: string;
  description?: string;
  icon?: string; // TODO: update to image model
  createdAt: Date;
  updatedAt: Date;

  timeSlots: TTimeSlot[];
  appointments: TAppointment[];
  reviews: TReview[];
  serviceSettings: TServiceSettings;
};
