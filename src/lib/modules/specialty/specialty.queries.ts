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
        icon {
          id
          publicId
          secureUrl
        }
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

const SPECIALTY_BY_ID = gql`
  query Specialty($id: String!) {
    specialty(id: $id) {
      id
      name
      description
      icon {
        id
        publicId
        secureUrl
      }
    }
  }
`;

const CREATE_SPECIALTY = gql`
  mutation CreateSpecialty(
    $name: String!
    $description: String
    $iconId: String
  ) {
    createSpecialty(name: $name, description: $description, iconId: $iconId) {
      success
    }
  }
`;

const UPDATE_SPECIALTY = gql`
  mutation UpdateSpecialty(
    $specialtyId: String!
    $name: String
    $description: String
    $iconId: String
  ) {
    updateSpecialty(
      specialtyId: $specialtyId
      name: $name
      description: $description
      iconId: $iconId
    ) {
      success
      specialty {
        id
        name
        icon {
          id
          publicId
          secureUrl
        }
        createdAt
        updatedAt
      }
    }
  }
`;

const DELETE_SPECIALTIES = gql`
  mutation RemoveSpecialties($ids: [String!]!) {
    removeSpecialties(ids: $ids) {
      success
    }
  }
`;

export const SpecialtyQueries = {
  SPECIALTY_LIST,
  SPECIALTY_BY_ID,
  CREATE_SPECIALTY,
  UPDATE_SPECIALTY,
  DELETE_SPECIALTIES,
};
