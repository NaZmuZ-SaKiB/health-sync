import { gql } from "@apollo/client";

const DOCTOR_SCHEDULES = gql`
  query DoctorSchedules($doctorId: String!) {
    doctorSchedules(doctorId: $doctorId) {
      id
      day
      startTime
      endTime
      sessionLength
      isAvailable
    }
  }
`;

export const DoctorScheduleQueries = {
  DOCTOR_SCHEDULES,
};
