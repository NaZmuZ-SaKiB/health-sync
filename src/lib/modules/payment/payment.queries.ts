import { gql } from "@apollo/client";

const PAYMENT_INIT = gql`
  mutation PaymentInit($appointmentId: String!) {
    paymentInit(appointmentId: $appointmentId)
  }
`;

export const PaymentQueries = {
  PAYMENT_INIT,
};
