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
  UPDATE_PROFILE_PICTURE,
  UPDATE_USER_STATUS,
};
