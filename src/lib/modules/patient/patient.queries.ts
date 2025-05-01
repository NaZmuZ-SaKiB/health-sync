import { gql } from "@apollo/client";

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

export const PatientQueries = { UPDATE_PATIENT };
