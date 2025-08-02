import { gql } from "@apollo/client";

const MY_PAYMENTS = gql`
  query GetAllPayments(
    $page: String
    $limit: String
    $searchTerm: String
    $sortBy: String
    $sortOrder: String
    $status: PAYMENT_STATUS
  ) {
    getAllPayments(
      page: $page
      limit: $limit
      searchTerm: $searchTerm
      sortBy: $sortBy
      sortOrder: $sortOrder
      status: $status
    ) {
      meta {
        limit
        page
        total
      }
      payments {
        amount
        createdAt
        id
        appointment {
          doctor {
            user {
              firstName
              lastName
            }
          }
        }
        status
        details
      }
    }
  }
`;

const PAYMENT_LIST = gql`
  query GetAllPayments(
    $page: String
    $limit: String
    $searchTerm: String
    $sortBy: String
    $sortOrder: String
    $status: PAYMENT_STATUS
  ) {
    getAllPayments(
      page: $page
      limit: $limit
      searchTerm: $searchTerm
      sortBy: $sortBy
      sortOrder: $sortOrder
      status: $status
    ) {
      meta {
        limit
        page
        total
      }
      payments {
        amount
        createdAt
        id
        appointment {
          patient {
            user {
              email
            }
            id
          }
        }
        status
        details
      }
    }
  }
`;

const PAYMENT_INIT = gql`
  mutation PaymentInit($appointmentId: String!) {
    paymentInit(appointmentId: $appointmentId)
  }
`;

export const PaymentQueries = {
  MY_PAYMENTS,
  PAYMENT_LIST,
  PAYMENT_INIT,
};
