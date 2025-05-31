import { gql } from "@apollo/client";

const REVIEW_LIST = gql`
  query GetAllReviews(
    $page: String
    $limit: String
    $searchTerm: String
    $sortBy: String
    $sortOrder: String
    $type: String
    $serviceId: String
  ) {
    getAllReviews(
      page: $page
      limit: $limit
      searchTerm: $searchTerm
      sortBy: $sortBy
      sortOrder: $sortOrder
      type: $type
      serviceId: $serviceId
    ) {
      meta {
        page
        limit
        total
      }
      reviews {
        id
        rating
        comment
        doctor {
          user {
            firstName
            lastName
          }
          id
        }
        patient {
          id
          user {
            firstName
            lastName
          }
        }
        service {
          name
        }
      }
    }
  }
`;

const CREATE_REVIEW = gql`
  mutation CreateReview(
    $appointmentId: String!
    $rating: Int!
    $comment: String
  ) {
    createReview(
      appointmentId: $appointmentId
      rating: $rating
      comment: $comment
    ) {
      success
    }
  }
`;

export const ReviewQueries = { REVIEW_LIST, CREATE_REVIEW };
