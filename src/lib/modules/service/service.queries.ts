import { gql } from "@apollo/client";

const CREATE_SERVICE = gql`
  mutation CreateService($name: String!, $description: String, $icon: String) {
    createService(name: $name, description: $description, icon: $icon) {
      success
    }
  }
`;

export const ServiceQueries = { CREATE_SERVICE };
