import { gql } from "@apollo/client";

const CONTEXT_USER = gql`
  query Me {
    me {
      id
      email
      role
    }
  }
`;

export const UserQueries = {
  CONTEXT_USER,
};
