import RefreshButton from "@/components/global/shared/RefreshButton";
import TableLoader from "@/components/global/shared/TableLoader";
import ABox from "@/components/admin/ui/ABox";
import HSPagination from "@/components/global/shared/HSPagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Images } from "@/constants";
import { DoctorQueries } from "@/lib/modules/doctor/doctor.queries";
import { TDoctor } from "@/lib/modules/doctor/doctor.type";
import { TMeta } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";
import formatDate from "@/utils/formatDate";
import { useQuery } from "@apollo/client";
import { Eye, Trash2 } from "lucide-react";
import { ChangeEvent } from "react";
import { Link, useSearchParams } from "react-router";
import DoctorDelete from "./DoctorDelete";

type TProps = {
  selected: string[];
  setSelected: (selected: string[]) => void;
};

const DoctorsTable = ({ selected, setSelected }: TProps) => {
  const [searchParams] = useSearchParams();

  const {
    data: doctorsData,
    loading,
    refetch,
  } = useQuery(DoctorQueries.DOCTOR_LIST, {
    variables: {
      sortBy: "updatedAt",
      ...Object.fromEntries(searchParams),
      isDeleted: "false",
      isVerified: "true",
    },
  });

  // Handle Select
  const selectAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelected(
        doctorsData?.getAllDoctors?.doctors.map(
          (doctor: TDoctor) => doctor.id,
        ) || [],
      );
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.checked) {
      setSelected([...selected, id]);
    } else {
      setSelected(selected.filter((item) => item !== id));
    }
  };
  // End Handle Select

  if (loading) return <TableLoader />;

  const meta: TMeta = doctorsData?.getAllDoctors?.meta;
  const totalPages = Math.ceil(meta.total / meta.limit);
  return (
    <ABox>
      <RefreshButton fn={refetch} className="mb-2" />

      <table className="primary-table table table-auto">
        <thead>
          <tr>
            <th className="w-10">
              <Input
                type="checkbox"
                className="mx-auto size-4"
                onChange={selectAll}
              />
            </th>
            <th>Img</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Specialty</th>
            <th>Location</th>
            <th>Fee</th>
            <th>Last Modified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctorsData?.getAllDoctors?.doctors.map((doctor: TDoctor) => (
            <tr key={doctor.id}>
              <td>
                <Input
                  checked={selected.includes(doctor.id)}
                  onChange={(e) => handleSelect(e, doctor.id)}
                  type="checkbox"
                  className="mx-auto size-4"
                />
              </td>
              <td>
                <img
                  src={
                    doctor.user.profilePicture.secureUrl ||
                    Images.PlaceholderImage
                  }
                  alt={doctor.user.firstName}
                  className="mx-auto size-8 object-cover object-center"
                />
              </td>
              <td>
                {doctor.user.firstName} {doctor?.user?.lastName ?? ""}
              </td>
              <td>{doctor.user.email}</td>
              <td>{doctor.user.phoneNumber}</td>
              <td>{doctor.specialty.name}</td>
              <td>{doctor.location.name}</td>
              <td>{doctor.fee ? formatCurrency(doctor.fee) : 0}</td>
              <td>{formatDate(doctor.updatedAt)}</td>

              <td>
                <div className="flex items-center justify-center gap-1.5">
                  <Link to={`/admin/users/doctors/${doctor.id}`}>
                    <Button
                      size="icon"
                      variant="outline"
                      className="cursor-pointer"
                    >
                      <Eye />
                    </Button>
                  </Link>

                  <DoctorDelete selected={[doctor.id]}>
                    <Button
                      size="icon"
                      variant="outline"
                      className="cursor-pointer hover:border-red-500 hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 />
                    </Button>
                  </DoctorDelete>
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

export default DoctorsTable;
