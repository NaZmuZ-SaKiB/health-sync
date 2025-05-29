import { gql } from "@apollo/client";

const PATIENT_LIST = gql`
  query GetAllPatients(
    $page: String
    $limit: String
    $searchTerm: String
    $sortBy: String
    $sortOrder: String
    $gender: String
    $bloodGroup: String
  ) {
    getAllPatients(
      page: $page
      limit: $limit
      searchTerm: $searchTerm
      sortBy: $sortBy
      sortOrder: $sortOrder
      gender: $gender
      bloodGroup: $bloodGroup
    ) {
      meta {
        page
        limit
        total
      }
      patients {
        id
        bloodGroup
        createdAt
        user {
          id
          email
          firstName
          lastName
          phoneNumber
          gender
          isActive
          profilePicture {
            publicId
            secureUrl
          }
        }
      }
    }
  }
`;

const SINGLE_PATIENT = gql`
  query Patient($id: String!) {
    patient(id: $id) {
      id
      emergencyContactName
      emergencyContactPhone
      bloodGroup
      allergies
      user {
        id
        email
        firstName
        lastName
        phoneNumber
        address
        dateOfBirth
        gender
        profilePicture {
          publicId
          secureUrl
        }
      }
    }
  }
`;

const UPDATE_PATIENT = gql`
  mutation UpdatePatient($input: UserPatientUpdateInput!) {
    updatePatient(input: $input) {
      id
      email
      firstName
      lastName
      phoneNumber
      address
      dateOfBirth
      gender
      role
      profilePicture {
        publicId
        secureUrl
      }
      patient {
        emergencyContactName
        emergencyContactPhone
        bloodGroup
        allergies
      }
    }
  }
`;

export const PatientQueries = { UPDATE_PATIENT, PATIENT_LIST, SINGLE_PATIENT };
