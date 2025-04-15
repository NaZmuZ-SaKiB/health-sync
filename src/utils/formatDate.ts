import moment from "moment";

const formatDate = (inputDate: number | string | Date): string => {
  let inputMoment: moment.Moment;

  // If number (timestamp), pass directly
  if (typeof inputDate === "number") {
    inputMoment = moment(inputDate);
  }
  // If Date instance, wrap in moment
  else if (inputDate instanceof Date) {
    inputMoment = moment(inputDate);
  }
  // If string, try parsing as ISO or numeric string
  else if (typeof inputDate === "string") {
    // Try to parse string directly first
    inputMoment = moment(inputDate, moment.ISO_8601, true);
    // If still invalid and it's numeric
    if (!inputMoment.isValid() && /^\d+$/.test(inputDate)) {
      inputMoment = moment(Number(inputDate));
    }
  } else {
    return "Invalid date";
  }

  if (!inputMoment.isValid()) {
    return "Invalid date";
  }

  const today = moment().startOf("day");
  const yesterday = moment().subtract(1, "days").startOf("day");
  inputMoment = inputMoment.startOf("day");

  if (inputMoment.isSame(today, "day")) {
    return "today";
  } else if (inputMoment.isSame(yesterday, "day")) {
    return "yesterday";
  } else {
    return inputMoment.format("DD-MM-YYYY");
  }
};

export default formatDate;
