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

const SPECIALTY_BY_ID = gql`
  query Specialty($id: String!) {
    specialty(id: $id) {
      id
      name
      description
      icon
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

const UPDATE_SPECIALTY = gql`
  mutation UpdateSpecialty(
    $specialtyId: String!
    $name: String
    $description: String
    $icon: String
  ) {
    updateSpecialty(
      specialtyId: $specialtyId
      name: $name
      description: $description
      icon: $icon
    ) {
      success
      specialty {
        id
        name
        icon
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
