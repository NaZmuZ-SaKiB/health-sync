import { gql } from "@apollo/client";

const CREATE_MEDICAL_REPORT = gql`
  mutation CreateMedicalReport(
    $patientId: String!
    $title: String!
    $appointmentId: String
    $reportType: REPORT_TYPE!
    $reportDate: String
    $fileUrl: String
    $notes: String
  ) {
    createMedicalReport(
      patientId: $patientId
      title: $title
      appointmentId: $appointmentId
      reportType: $reportType
      reportDate: $reportDate
      fileUrl: $fileUrl
      notes: $notes
    ) {
      success
    }
  }
`;

export const MedicalReportQueries = { CREATE_MEDICAL_REPORT };
