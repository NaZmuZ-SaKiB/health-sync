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

const SINGLE_DOCTOR = gql`
  query Doctor($id: String!) {
    doctor(id: $id) {
      id
      licenseNumber
      bio
      qualification
      experienceYears
      fee
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
      specialty {
        name
      }
      location {
        name
      }
    }
  }
`;

const DOCTOR_APPLICATION_LIST = gql`
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
      doctor {
        specialty {
          name
        }
        location {
          id
          name
        }
        licenseNumber
        bio
        qualification
        experienceYears
        fee
      }
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

const DELETE_DOCTORS = gql`
  mutation DeleteDoctors($ids: [String!]!) {
    deleteDoctors(ids: $ids) {
      success
    }
  }
`;

export const DoctorQueries = {
  DOCTOR_LIST,
  SINGLE_DOCTOR,
  DOCTOR_APPLICATION_LIST,
  SINGLE_DOCTOR_APPLICATION,
  UPDATE_DOCTOR,
  VERIFY_DOCTOR,
  DELETE_DOCTORS,
};
