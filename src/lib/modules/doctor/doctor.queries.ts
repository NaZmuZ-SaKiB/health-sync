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
          profilePicture
          gender
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

export const DoctorQueries = {
  DOCTOR_LIST,
};
