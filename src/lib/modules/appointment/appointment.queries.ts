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
        status
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

const DOCTOR_APPOINTMENTS = gql`
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
        status
        notes
        patient {
          user {
            firstName
            lastName
            phoneNumber
          }
        }
        timeSlot {
          day
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

const SINGLE_APPOINTMENT = gql`
  query Appointment($id: String!) {
    appointment(id: $id) {
      id
      status
      reason
      notes
      patient {
        emergencyContactName
        emergencyContactPhone
        bloodGroup
        allergies
        user {
          email
          firstName
          lastName
          phoneNumber
          dateOfBirth
          gender
          profilePicture {
            publicId
            secureUrl
          }
          address
        }
      }
      timeSlot {
        day
        slotDate
        startTime
        endTime
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

const UPDATE_APPOINTMENT = gql`
  mutation UpdateAppointment(
    $appointmentId: String!
    $status: APPOINTMENT_STATUS
    $notes: String
  ) {
    updateAppointment(
      appointmentId: $appointmentId
      status: $status
      notes: $notes
    ) {
      success
    }
  }
`;

export const AppointmentQueries = {
  MY_APPOINTMENTS,
  DOCTOR_APPOINTMENTS,
  SINGLE_APPOINTMENT,
  CREATE_APPOINTMENT,
  UPDATE_APPOINTMENT,
};
