import moment from "moment";

const formatDate = (inputDate: number | string | Date): string => {
  let inputMoment = moment(inputDate);

  if (!inputMoment.isValid() && typeof inputDate === "string") {
    const numericInput = Number(inputDate);
    if (!isNaN(numericInput)) {
      inputMoment = moment(numericInput);
    }
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
