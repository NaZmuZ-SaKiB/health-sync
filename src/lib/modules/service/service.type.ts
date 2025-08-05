import { TAppointment } from "../appointment/appointment.type";
import { TImage } from "../image/image.type";
import { TReview } from "../review/review.type";
import { TServiceSettings } from "../service-settings/service-settings.type";
import { TTimeSlot } from "../time-slot/time-slot.type";

export type TService = {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;

  icon?: TImage;
  timeSlots: TTimeSlot[];
  appointments: TAppointment[];
  reviews: TReview[];
  serviceSettings: TServiceSettings;
};
