import { gql } from "@apollo/client";

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

export const ReviewQueries = { CREATE_REVIEW };
