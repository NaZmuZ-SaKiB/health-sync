import { gql } from "@apollo/client";

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
  ADMINS_LIST,
  UPDATE_PROFILE_PICTURE,
  UPDATE_USER_STATUS,
};
