import RefreshButton from "@/components/global/shared/RefreshButton";
import TableLoader from "@/components/global/shared/TableLoader";
import ABox from "@/components/admin/ui/ABox";
import HSPagination from "@/components/global/shared/HSPagination";
import { Button } from "@/components/ui/button";
import { DoctorQueries } from "@/lib/modules/doctor/doctor.queries";
import { TDoctor } from "@/lib/modules/doctor/doctor.type";
import { TMeta } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";
import formatDate from "@/utils/formatDate";
import { useQuery } from "@apollo/client";
import { Eye } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import DoctorVerificationButton from "./DoctorVerificationButton";
import { DOCTOR_VERIFICATION_STATUS } from "@/constants";

const DoctorApplicationsTable = () => {
  const [searchParams] = useSearchParams();

  const {
    data: doctorsData,
    loading,
    refetch,
  } = useQuery(DoctorQueries.DOCTOR_APPLICATION_LIST, {
    variables: {
      sortBy: "appliedDate",
      ...Object.fromEntries(searchParams),
      isVerified: "false",
    },
  });

  if (loading) return <TableLoader />;

  const meta: TMeta = doctorsData?.getAllDoctors?.meta;
  const totalPages = Math.ceil(meta.total / meta.limit);
  return (
    <ABox>
      <RefreshButton fn={refetch} className="mb-2" />
      <table className="primary-table table table-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Specialty</th>
            <th>Location</th>
            <th>Fee</th>
            <th>Apply Date</th>
            <th>Verify</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctorsData?.getAllDoctors?.doctors.map((doctor: TDoctor) => (
            <tr key={doctor.id}>
              <td>
                {doctor.user.firstName} {doctor?.user?.lastName ?? ""}
              </td>
              <td>{doctor.user.email}</td>
              <td>{doctor.user.phoneNumber}</td>
              <td>{doctor.specialty.name}</td>
              <td>{doctor.location.name}</td>
              <td>{doctor.fee ? formatCurrency(doctor.fee) : 0}</td>
              <td>{formatDate(doctor.appliedDate)}</td>
              <td>
                {doctor.verificationStatus ===
                DOCTOR_VERIFICATION_STATUS.REJECTED ? (
                  <span className="border border-red-500 bg-red-50 px-2 py-0.5 text-sm text-red-500">
                    Rejected
                  </span>
                ) : (
                  <div className="flex items-center gap-2">
                    <DoctorVerificationButton
                      doctorId={doctor.id}
                      status={DOCTOR_VERIFICATION_STATUS.VERIFIED}
                      title="Accept"
                      loadingTitle="Accepting..."
                      small
                    />
                    <DoctorVerificationButton
                      doctorId={doctor.id}
                      status={DOCTOR_VERIFICATION_STATUS.REJECTED}
                      title="Reject"
                      loadingTitle="Rejecting..."
                      className="border border-red-500 bg-red-50 text-red-500 hover:bg-red-500 hover:text-slate-50"
                      small
                    />
                  </div>
                )}
              </td>
              <td>
                <div className="flex items-center justify-center gap-1.5">
                  <Link to={`/admin/doctor-applications/${doctor.id}`}>
                    <Button
                      size="icon"
                      variant="outline"
                      className="cursor-pointer"
                    >
                      <Eye />
                    </Button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-2">
        <div className="text-sm text-slate-700">
          Showing {meta.limit < meta.total ? meta.limit : meta.total} of{" "}
          {meta.total}. ({totalPages} page
          {totalPages > 1 ? "s" : ""}.)
        </div>
        {totalPages !== 1 && (
          <HSPagination
            page={meta?.page || 1}
            limit={meta?.limit || 10}
            total={meta?.total}
            admin
          />
        )}
      </div>
    </ABox>
  );
};

export default DoctorApplicationsTable;
