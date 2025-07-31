import { gql } from "@apollo/client";
import { U } from "node_modules/react-router/dist/development/fog-of-war-BQyvjjKg.d.mts";

const CONTEXT_USER = gql`
  query Me {
    me {
      id
      email
      role
      needPasswordChange
    }
  }
`;

const PROFILE = gql`
  query Me {
    me {
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

const UPDATE_PROFILE = gql`
  mutation UpdateProfile(
    $firstName: String
    $lastName: String
    $gender: GENDER
    $phoneNumber: String
    $address: String
    $dateOfBirth: String
  ) {
    updateProfile(
      firstName: $firstName
      lastName: $lastName
      gender: $gender
      phoneNumber: $phoneNumber
      address: $address
      dateOfBirth: $dateOfBirth
    ) {
      success
    }
  }
`;

const ADMINS_LIST = gql`
  query GetAllAdmins(
    $page: String
    $limit: String
    $searchTerm: String
    $sortBy: String
    $sortOrder: String
    $gender: String
  ) {
    getAllAdmins(
      page: $page
      limit: $limit
      searchTerm: $searchTerm
      sortBy: $sortBy
      sortOrder: $sortOrder
      gender: $gender
    ) {
      meta {
        page
        limit
        total
      }
      users {
        id
        email
        firstName
        lastName
        phoneNumber
        profilePicture {
          publicId
          secureUrl
        }
        createdAt
        updatedAt
      }
    }
  }
`;

const SINGLE_ADMIN = gql`
  query AdminById($id: String!) {
    adminById(id: $id) {
      address
      dateOfBirth
      email
      firstName
      gender
      id
      lastName
      phoneNumber
      profilePicture {
        id
        publicId
        secureUrl
      }
    }
  }
`;

const UPDATE_PROFILE_PICTURE = gql`
  mutation UpdateProfilePicture($id: String!) {
    updateProfilePicture(id: $id) {
      success
    }
  }
`;

const UPDATE_USER_STATUS = gql`
  mutation UpdateUserStatus($id: String!) {
    updateUserStatus(id: $id) {
      success
    }
  }
`;

export const UserQueries = {
  CONTEXT_USER,
  PROFILE,
  UPDATE_PROFILE,
  ADMINS_LIST,
  SINGLE_ADMIN,
  UPDATE_PROFILE_PICTURE,
  UPDATE_USER_STATUS,
};
