import { gql } from "@apollo/client";

const MY_APPOINTMENTS = gql`
  query GetAllAppointments(
    $page: String
    $limit: String
    $searchTerm: String
    $sortBy: String
    $sortOrder: String
    $status: APPOINTMENT_STATUS
    $date: String
  ) {
    getAllAppointments(
      page: $page
      limit: $limit
      searchTerm: $searchTerm
      sortBy: $sortBy
      sortOrder: $sortOrder
      status: $status
      date: $date
    ) {
      appointments {
        id
        doctor {
          user {
            firstName
            lastName
          }
          specialty {
            name
          }
          location {
            name
            mapUrl
          }
        }
        timeSlot {
          slotDate
          startTime
          endTime
        }
      }
      meta {
        page
        limit
        total
      }
    }
  }
`;

const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment($input: AppointmentCreateInput!) {
    createAppointment(input: $input) {
      success
      token
    }
  }
`;

export const AppointmentQueries = { MY_APPOINTMENTS, CREATE_APPOINTMENT };
