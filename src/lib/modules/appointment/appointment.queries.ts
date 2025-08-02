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
        }
        service {
          name
        }
        location {
          name
        }
        timeSlot {
          slotDate
          startTime
          endTime
        }
        report {
          title
          notes
          fileUrl
          reportType
        }
        review {
          rating
          comment
        }
        payment {
          status
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

const DOCTOR_SERVICE_APPOINTMENTS = gql`
  query GetAllAppointments(
    $page: String
    $limit: String
    $searchTerm: String
    $sortBy: String
    $sortOrder: String
    $status: APPOINTMENT_STATUS
    $locationId: String
    $date: String
  ) {
    getAllAppointments(
      page: $page
      limit: $limit
      searchTerm: $searchTerm
      sortBy: $sortBy
      sortOrder: $sortOrder
      status: $status
      locationId: $locationId
      date: $date
    ) {
      appointments {
        id
        status
        notes
        patient {
          id
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
        report {
          title
          notes
          fileUrl
        }
        review {
          rating
          comment
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

const ALL_APPOINTMENTS = gql`
  query GetAllAppointments(
    $page: String
    $limit: String
    $searchTerm: String
    $sortBy: String
    $sortOrder: String
    $status: APPOINTMENT_STATUS
    $date: String
    $locationId: String
    $all: Boolean
  ) {
    getAllAppointments(
      page: $page
      limit: $limit
      searchTerm: $searchTerm
      sortBy: $sortBy
      sortOrder: $sortOrder
      status: $status
      date: $date
      locationId: $locationId
      all: $all
    ) {
      appointments {
        id
        status
        patient {
          id
          user {
            firstName
            lastName
            phoneNumber
          }
        }
        doctor {
          id
          user {
            firstName
            lastName
          }
        }
        service {
          name
        }
        location {
          name
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

const SINGLE_APPOINTMENT = gql`
  query Appointment($id: String!) {
    appointment(id: $id) {
      id
      status
      reason
      notes
      patient {
        id
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
  DOCTOR_SERVICE_APPOINTMENTS,
  ALL_APPOINTMENTS,
  SINGLE_APPOINTMENT,
  CREATE_APPOINTMENT,
  UPDATE_APPOINTMENT,
};
