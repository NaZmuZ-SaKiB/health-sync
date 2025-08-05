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
        icon {
          id
          publicId
          secureUrl
        }
        createdAt
        updatedAt

        serviceSettings {
          id
          startTime
          endTime
          duration
          fee
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
      icon {
        id
        publicId
        secureUrl
      }
    }
  }
`;

const CREATE_SERVICE = gql`
  mutation CreateService(
    $name: String!
    $description: String
    $iconId: String
  ) {
    createService(name: $name, description: $description, iconId: $iconId) {
      success
    }
  }
`;

const UPDATE_SERVICE = gql`
  mutation UpdateService(
    $serviceId: String!
    $name: String
    $description: String
    $iconId: String
  ) {
    updateService(
      serviceId: $serviceId
      name: $name
      description: $description
      iconId: $iconId
    ) {
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
