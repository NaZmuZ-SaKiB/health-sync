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

const UPDATE_DOCTOR_SCHEDULES = gql`
  mutation UpdateDoctorSchedule($input: DoctorScheduleUpdateInput!) {
    updateDoctorSchedule(input: $input) {
      success
    }
  }
`;

export const DoctorScheduleQueries = {
  DOCTOR_SCHEDULES,
  UPDATE_DOCTOR_SCHEDULES,
};
