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

export const UserQueries = {
  CONTEXT_USER,
};
