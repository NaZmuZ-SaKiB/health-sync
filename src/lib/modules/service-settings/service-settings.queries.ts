import { gql } from "@apollo/client";

const SINGLE_SERVICE_SETTINGS = gql`
  query ServiceSettings($serviceId: String!) {
    serviceSettings(serviceId: $serviceId) {
      startTime
      endTime
      duration
    }
  }
`;

const UPDATE_SERVICE_SETTINGS = gql`
  mutation UpdateServiceSettings(
    $serviceId: String!
    $startTime: String
    $endTime: String
    $duration: Int
  ) {
    updateServiceSettings(
      serviceId: $serviceId
      startTime: $startTime
      endTime: $endTime
      duration: $duration
    ) {
      success
    }
  }
`;

export const ServiceSettingsQueries = {
  SINGLE_SERVICE_SETTINGS,
  UPDATE_SERVICE_SETTINGS,
};
