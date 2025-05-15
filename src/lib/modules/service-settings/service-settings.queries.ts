import { gql } from "@apollo/client";

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

export const ServiceSettingsQueries = { UPDATE_SERVICE_SETTINGS };
