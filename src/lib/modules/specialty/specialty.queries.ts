import { gql } from "@apollo/client";

const SPECIALTY_LIST = gql`
  query GetAllSpecialties(
    $page: String
    $limit: String
    $searchTerm: String
    $sortBy: String
    $sortOrder: String
  ) {
    getAllSpecialties(
      page: $page
      limit: $limit
      searchTerm: $searchTerm
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      specialties {
        id
        name
        icon
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

const CREATE_SPECIALTY = gql`
  mutation CreateSpecialty(
    $name: String!
    $description: String
    $icon: String
  ) {
    createSpecialty(name: $name, description: $description, icon: $icon) {
      success
    }
  }
`;

export const SpecialtyQueries = {
  SPECIALTY_LIST,
  CREATE_SPECIALTY,
};
