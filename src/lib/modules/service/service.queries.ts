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

        serviceSettings {
          id
          startTime
          endTime
          duration
        }
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

const UPDATE_SERVICE = gql`
  mutation UpdateService(
    $serviceId: String!
    $name: String
    $description: String
    $icon: String
  ) {
    updateService(
      serviceId: $serviceId
      name: $name
      description: $description
      icon: $icon
    ) {
      id
      name
      icon
      createdAt
      updatedAt
    }
  }
`;

const DELETE_SERVICES = gql`
  mutation DeleteServices($ids: [String!]!) {
    deleteServices(ids: $ids) {
      success
    }
  }
`;

export const ServiceQueries = {
  SERVICE_LIST,
  SERVICE_BY_ID,
  CREATE_SERVICE,
  UPDATE_SERVICE,
  DELETE_SERVICES,
};
