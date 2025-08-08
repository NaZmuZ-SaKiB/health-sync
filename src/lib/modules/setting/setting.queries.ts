import { gql } from "@apollo/client";

const GET_SETTING_BY_KEY = gql`
  query Setting($key: String!) {
    setting(key: $key) {
      key
      value
    }
  }
`;

const GET_SETTINGS_BY_KEYS = gql`
  query Settings($keys: [String!]!) {
    settings(keys: $keys) {
      key
      value
    }
  }
`;

const UPDATE_SETTING = gql`
  mutation UpdateSetting($key: String!, $value: String!) {
    updateSetting(key: $key, value: $value) {
      success
    }
  }
`;

const UPDATE_MANY_SETTINGS = gql`
  mutation UpdateManySetting($settings: [SettingUpdateInput!]!) {
    updateManySetting(settings: $settings) {
      success
    }
  }
`;

export const SettingQueries = {
  GET_SETTING_BY_KEY,
  GET_SETTINGS_BY_KEYS,
  UPDATE_SETTING,
  UPDATE_MANY_SETTINGS,
};
