import { gql } from "@apollo/client";

const DOCTOR_LIST = gql`
  query GetAllDoctors(
    $page: String
    $limit: String
    $searchTerm: String
    $sortBy: String
    $sortOrder: String
    $gender: String
    $specialty: String
    $location: String
    $isVerified: String
  ) {
    getAllDoctors(
      page: $page
      limit: $limit
      searchTerm: $searchTerm
      sortBy: $sortBy
      sortOrder: $sortOrder
      gender: $gender
      specialty: $specialty
      location: $location
      isVerified: $isVerified
    ) {
      doctors {
        id
        user {
          firstName
          lastName
          email
          phoneNumber
          profilePicture
        }
        specialty {
          name
        }
        location {
          name
        }
        fee
        createdAt
        updatedAt
      }
      meta {
        page
        limit
        total
      }
    }
  }
`;

const SINGLE_DOCTOR_APPLICATION = gql`
  query Doctor($id: String!) {
    doctor(id: $id) {
      id
      licenseNumber
      bio
      qualification
      isVerified
      experienceYears
      fee
      createdAt
      updatedAt
      user {
        email
        firstName
        lastName
        phoneNumber
        address
        dateOfBirth
        gender
      }
      specialty {
        name
      }
      location {
        name
      }
    }
  }
`;

const UPDATE_DOCTOR = gql`
  mutation UpdateDoctor($input: UserDoctorUpdateInput!) {
    updateDoctor(input: $input) {
      success
    }
  }
`;

export const DoctorQueries = {
  DOCTOR_LIST,
  SINGLE_DOCTOR_APPLICATION,
  UPDATE_DOCTOR,
};
