import { gql } from "@apollo/client";

const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment($input: AppointmentCreateInput!) {
    createAppointment(input: $input) {
      success
      token
    }
  }
`;

export const AppointmentQueries = { CREATE_APPOINTMENT };
