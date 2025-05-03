import moment from "moment";

const formatTime = (time: string): string => {
  if (!moment(time, "HH:mm", true).isValid()) {
    throw new Error('Invalid time format. Expected "hh:mm" in 24-hour format.');
  }
  return moment(time, "HH:mm").format("hh:mm A");
};

export default formatTime;
