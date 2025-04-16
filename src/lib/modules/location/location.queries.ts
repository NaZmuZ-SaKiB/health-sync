import { gql } from "@apollo/client";

const LOCATION_LIST = gql`
  query GetAllLocations(
    $page: String
    $limit: String
    $searchTerm: String
    $sortBy: String
    $sortOrder: String
  ) {
    getAllLocations(
      page: $page
      limit: $limit
      searchTerm: $searchTerm
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      locations {
        id
        name
        phoneNumber
        mapUrl
        createdAt
        updatedAt
      }
      meta {
        limit
        page
        total
      }
    }
  }
`;

const LOCATION_BY_ID = gql`
  query Location($id: String!) {
    location(id: $id) {
      id
      name
      mapUrl
      address
      phoneNumber
      description
      image
    }
  }
`;

const CREATE_LOCATION = gql`
  mutation CreateLocation(
    $name: String!
    $mapUrl: String!
    $address: String!
    $phoneNumber: String!
    $description: String
    $image: String
  ) {
    createLocation(
      name: $name
      mapUrl: $mapUrl
      address: $address
      phoneNumber: $phoneNumber
      description: $description
      image: $image
    ) {
      success
    }
  }
`;

const UPDATE_LOCATION = gql`
  mutation UpdateLocation(
    $locationId: String!
    $name: String
    $mapUrl: String
    $address: String
    $phoneNumber: String
    $description: String
    $icon: String
  ) {
    updateLocation(
      locationId: $locationId
      name: $name
      mapUrl: $mapUrl
      address: $address
      phoneNumber: $phoneNumber
      description: $description
      icon: $icon
    ) {
      success
    }
  }
`;

const DELETE_LOCATIONS = gql`
  mutation RemoveLocations($ids: [String!]!) {
    removeLocations(ids: $ids) {
      success
    }
  }
`;

export const LocationQueries = {
  LOCATION_LIST,
  LOCATION_BY_ID,
  CREATE_LOCATION,
  UPDATE_LOCATION,
  DELETE_LOCATIONS,
};
