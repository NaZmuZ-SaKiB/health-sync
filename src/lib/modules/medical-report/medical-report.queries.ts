import { gql } from "@apollo/client";

const REPORTS = gql`
  query GetAllReports(
    $page: String
    $limit: String
    $searchTerm: String
    $sortBy: String
    $sortOrder: String
    $reportType: REPORT_TYPE
    $patientId: String
  ) {
    getAllReports(
      page: $page
      limit: $limit
      searchTerm: $searchTerm
      sortBy: $sortBy
      sortOrder: $sortOrder
      reportType: $reportType
      patientId: $patientId
    ) {
      meta {
        page
        limit
        total
      }
      reports {
        id
        title
        reportType
        reportDate
        fileUrl
        notes
      }
    }
  }
`;

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

export const MedicalReportQueries = {
  REPORTS,
  CREATE_MEDICAL_REPORT,
};
