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
    $isDeleted: String
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
      isDeleted: $isDeleted
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
        verificationStatus
        appliedDate
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
      verificationStatus
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

const VERIFY_DOCTOR = gql`
  mutation VerifyDoctor(
    $doctorId: String!
    $status: DOCTOR_VERIFICATION_STATUS!
  ) {
    verifyDoctor(doctorId: $doctorId, status: $status) {
      success
    }
  }
`;

const DELETE_DOCTOR = gql`
  mutation DeleteDoctor($doctorId: String!) {
    deleteDoctor(doctorId: $doctorId) {
      success
    }
  }
`;

export const DoctorQueries = {
  DOCTOR_LIST,
  SINGLE_DOCTOR_APPLICATION,
  UPDATE_DOCTOR,
  VERIFY_DOCTOR,
  DELETE_DOCTOR,
};
