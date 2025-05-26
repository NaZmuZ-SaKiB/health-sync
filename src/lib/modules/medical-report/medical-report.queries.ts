import { gql } from "@apollo/client";

const MY_REPORTS = gql`
  query GetAllReports(
    $page: String
    $limit: String
    $searchTerm: String
    $sortBy: String
    $sortOrder: String
    $reportType: REPORT_TYPE
  ) {
    getAllReports(
      page: $page
      limit: $limit
      searchTerm: $searchTerm
      sortBy: $sortBy
      sortOrder: $sortOrder
      reportType: $reportType
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
  MY_REPORTS,
  CREATE_MEDICAL_REPORT,
};
