import { gql } from "@apollo/client";

const SPECIALTY_LIST = gql`
  query Specialties {
    specialties {
      id
      name
      icon
      createdAt
      updatedAt
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
