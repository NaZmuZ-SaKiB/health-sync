import { gql } from "@apollo/client";

const GET_DOCTOR_SCHEDULE_BY_DATE = gql`
  query GetDoctorScheduleByDate($doctorId: String!, $date: String!) {
    getDoctorScheduleByDate(doctorId: $doctorId, date: $date) {
      id
      day
      startTime
      endTime
      sessionLength
      isAvailable
    }
  }
`;

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
  GET_DOCTOR_SCHEDULE_BY_DATE,
  DOCTOR_SCHEDULES,
  UPDATE_DOCTOR_SCHEDULES,
};
