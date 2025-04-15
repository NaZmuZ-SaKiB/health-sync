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

export const SpecialtyQueries = {
  SPECIALTY_LIST,
};
