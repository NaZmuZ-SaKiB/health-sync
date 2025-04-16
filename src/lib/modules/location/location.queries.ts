import { gql } from "@apollo/client";

const LOCATION_LIST = gql`
  query Locations(
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

export const LocationQueries = { LOCATION_LIST, CREATE_LOCATION };
