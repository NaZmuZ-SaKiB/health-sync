import { gql } from "@apollo/client";

const IMAGE_LIST = gql`
  query GetAllImages($page: String, $limit: String, $searchTerm: String) {
    getAllImages(page: $page, limit: $limit, searchTerm: $searchTerm) {
      images {
        id
        publicId
        name
        secureUrl
        thumbnailUrl
      }
      meta {
        limit
        page
        total
      }
    }
  }
`;

const CREATE_IMAGES = gql`
  mutation CreateImages($input: [ImagesCreateInput!]!) {
    createImages(input: $input) {
      success
    }
  }
`;

export const ImageQueries = { IMAGE_LIST, CREATE_IMAGES };
