import { gql } from "@apollo/client";

const GET_TIME_SLOT_BY_DATE = gql`
  query GetTimeSlotsByDate(
    $doctorId: String
    $serviceId: String
    $date: String!
  ) {
    getTimeSlotsByDate(
      doctorId: $doctorId
      serviceId: $serviceId
      date: $date
    ) {
      startTime
      endTime
      isBooked
    }
  }
`;

export const TimeSlotQueries = {
  GET_TIME_SLOT_BY_DATE,
};
