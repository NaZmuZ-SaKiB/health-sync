import moment from "moment";
import { toast } from "sonner";

type TTimeSlot = {
  startTime: string;
  endTime: string;
  isBooked: boolean;
};

const calculateTimeSlots = (
  startTime: string,
  endTime: string,
  sessionLength: number,
): TTimeSlot[] => {
  // Validate inputs
  if (sessionLength <= 0) {
    throw new Error("Session length must be a positive number");
  }

  const start = moment(startTime, "HH:mm");
  const end = moment(endTime, "HH:mm");

  if (!start.isValid() || !end.isValid()) {
    toast.error("Invalid time format. Use HH:mm 24-hour format");
    return [];
  }

  if (end.isBefore(start)) {
    toast.error("End time cannot be before start time");
    return [];
  }

  const slots: TTimeSlot[] = [];
  let currentSlotStart = start.clone();

  while (currentSlotStart.isBefore(end)) {
    const currentSlotEnd = currentSlotStart
      .clone()
      .add(sessionLength, "minutes");

    // Only add the slot if the entire session fits before the end time
    if (currentSlotEnd.isSameOrBefore(end)) {
      slots.push({
        startTime: currentSlotStart.format("HH:mm"),
        endTime: currentSlotEnd.format("HH:mm"),
        isBooked: false,
      });
    }

    currentSlotStart = currentSlotEnd.clone();
  }

  return slots;
};

export default calculateTimeSlots;
