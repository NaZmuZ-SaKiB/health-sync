import { gql } from "@apollo/client";

const SERVICE_LIST = gql`
  query GetAllServices(
    $page: String
    $limit: String
    $searchTerm: String
    $sortBy: String
    $sortOrder: String
  ) {
    getAllServices(
      page: $page
      limit: $limit
      searchTerm: $searchTerm
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      services {
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

const SERVICE_BY_ID = gql`
  query Service($id: String!) {
    service(id: $id) {
      id
      name
      description
      icon
    }
  }
`;

const CREATE_SERVICE = gql`
  mutation CreateService($name: String!, $description: String, $icon: String) {
    createService(name: $name, description: $description, icon: $icon) {
      success
    }
  }
`;

export const ServiceQueries = { SERVICE_LIST, SERVICE_BY_ID, CREATE_SERVICE };
