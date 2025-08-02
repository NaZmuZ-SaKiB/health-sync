import { gql } from "@apollo/client";

const SINGLE_SERVICE_SETTINGS = gql`
  query ServiceSettings($serviceId: String!) {
    serviceSettings(serviceId: $serviceId) {
      startTime
      endTime
      duration
      fee
    }
  }
`;

const UPDATE_SERVICE_SETTINGS = gql`
  mutation UpdateServiceSettings(
    $serviceId: String!
    $startTime: String
    $endTime: String
    $duration: Int
    $fee: Float
  ) {
    updateServiceSettings(
      serviceId: $serviceId
      startTime: $startTime
      endTime: $endTime
      duration: $duration
      fee: $fee
    ) {
      success
    }
  }
`;

export const ServiceSettingsQueries = {
  SINGLE_SERVICE_SETTINGS,
  UPDATE_SERVICE_SETTINGS,
};
