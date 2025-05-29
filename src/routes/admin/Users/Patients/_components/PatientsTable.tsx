import UserActiveStatusToggle from "@/components/admin/shared/UserActiveStatusToggle";
import ABox from "@/components/admin/ui/ABox";
import HSPagination from "@/components/global/shared/HSPagination";
import RefreshButton from "@/components/global/shared/RefreshButton";
import TableLoader from "@/components/global/shared/TableLoader";
import { Button } from "@/components/ui/button";
import { AUTH_KEY, Images } from "@/constants";
import { PatientQueries } from "@/lib/modules/patient/patient.queries";
import { TPatient } from "@/lib/modules/patient/patient.type";
import { cn } from "@/lib/utils";
import { TMeta } from "@/types";
import formatBloodGroup from "@/utils/formatBloodGroup";
import formatDate from "@/utils/formatDate";
import { useQuery } from "@apollo/client";
import { Eye } from "lucide-react";
import { useCookies } from "react-cookie";
import { Link, useSearchParams } from "react-router";

const PatientsTable = () => {
  const [cookies] = useCookies([AUTH_KEY]);

  const [searchParams] = useSearchParams();

  const {
    data: patientsData,
    loading,
    refetch,
  } = useQuery(PatientQueries.PATIENT_LIST, {
    variables: {
      ...Object.fromEntries(searchParams),
    },
    context: {
      headers: {
        Authorization: cookies[AUTH_KEY] || "",
      },
    },
  });

  if (loading) return <TableLoader />;

  const meta: TMeta = patientsData?.getAllPatients?.meta;
  const totalPages = Math.ceil(meta.total / meta.limit);
  return (
    <ABox>
      <RefreshButton fn={refetch} className="mb-2" />

      <table className="primary-table table table-auto">
        <thead>
          <tr>
            <th>Img</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Blood Group</th>
            <th>Date Added</th>
            <th>Status</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {patientsData?.getAllPatients?.patients.map((patient: TPatient) => (
            <tr key={patient.id}>
              <td>
                <img
                  src={
                    patient.user?.profilePicture?.secureUrl ||
                    Images.PlaceholderImage
                  }
                  alt={patient.user.firstName}
                  className="mx-auto size-8 object-cover object-center"
                />
              </td>
              <td>
                {patient?.user?.firstName || "N/A"}{" "}
                {patient?.user?.lastName || ""}
              </td>
              <td>{patient.user.email}</td>
              <td>{patient?.user?.phoneNumber || "N/A"}</td>
              <td>{patient?.user?.gender || "N/A"}</td>
              <td>{formatBloodGroup(patient?.bloodGroup)}</td>
              <td>{formatDate(patient.createdAt)}</td>
              <td>
                <div
                  className={cn(
                    "border border-green-600 bg-green-50 text-green-600",
                    {
                      "border border-red-600 bg-red-50 text-red-600":
                        !patient?.user?.isActive,
                    },
                  )}
                >
                  {patient?.user?.isActive ? "Active" : "Blocked"}
                </div>
              </td>
              <td>
                <div className="flex items-center justify-center gap-1.5">
                  <Link to={`/admin/users/patients/${patient.id}`}>
                    <Button
                      size="icon"
                      variant="outline"
                      className="cursor-pointer rounded-none"
                    >
                      <Eye />
                    </Button>
                  </Link>
                  <UserActiveStatusToggle
                    id={patient?.user?.id}
                    isActive={patient?.user?.isActive}
                  />
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

export default PatientsTable;
