import ABox from "@/components/admin/ui/ABox";
import HSPagination from "@/components/global/shared/HSPagination";
import RefreshButton from "@/components/global/shared/RefreshButton";
import TableLoader from "@/components/global/shared/TableLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AUTH_KEY, Images } from "@/constants";
import { UserQueries } from "@/lib/modules/user/user.queries";
import { TUser } from "@/lib/modules/user/user.type";
import { TMeta } from "@/types";
import formatDate from "@/utils/formatDate";
import { useQuery } from "@apollo/client";
import { Eye, Trash2 } from "lucide-react";
import { ChangeEvent } from "react";
import { useCookies } from "react-cookie";
import { Link, useSearchParams } from "react-router";

type TProps = {
  selected: string[];
  setSelected: (selected: string[]) => void;
};

const AdminsTable = ({ selected, setSelected }: TProps) => {
  const [cookies] = useCookies([AUTH_KEY]);

  const [searchParams] = useSearchParams();

  const {
    data: adminsData,
    loading,
    refetch,
  } = useQuery(UserQueries.ADMINS_LIST, {
    variables: {
      sortBy: "updatedAt",
      ...Object.fromEntries(searchParams),
    },
    context: {
      headers: {
        Authorization: cookies[AUTH_KEY] || "",
      },
    },
  });

  // Handle Select
  const selectAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelected(
        adminsData?.getAllAdmins?.users.map((admin: TUser) => admin.id) || [],
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

  const meta: TMeta = adminsData?.getAllAdmins?.meta;
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
            <th>Date Added</th>
            <th>Last Modified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {adminsData?.getAllAdmins?.users.map((admin: TUser) => (
            <tr key={admin.id}>
              <td>
                <Input
                  checked={selected.includes(admin.id)}
                  onChange={(e) => handleSelect(e, admin.id)}
                  type="checkbox"
                  className="mx-auto size-4"
                />
              </td>
              <td>
                <img
                  src={
                    admin?.profilePicture?.secureUrl || Images.PlaceholderImage
                  }
                  alt={admin.firstName}
                  className="mx-auto size-8 object-cover object-center"
                />
              </td>
              <td>
                {admin.firstName} {admin?.lastName ?? ""}
              </td>
              <td>{admin.email}</td>
              <td>{admin.phoneNumber}</td>
              <td>{formatDate(admin?.createdAt)}</td>
              <td>{formatDate(admin?.updatedAt)}</td>

              <td>
                <div className="flex items-center justify-center gap-1.5">
                  <Link to={`/admin/users/admins/${admin.id}`}>
                    <Button
                      size="icon"
                      variant="outline"
                      className="cursor-pointer rounded-none"
                    >
                      <Eye />
                    </Button>
                  </Link>

                  {/* <DoctorDelete selected={[doctor.id]}> */}
                  <Button
                    size="icon"
                    variant="outline"
                    className="cursor-pointer rounded-none hover:border-red-500 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 />
                  </Button>
                  {/* </DoctorDelete> */}
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

export default AdminsTable;
