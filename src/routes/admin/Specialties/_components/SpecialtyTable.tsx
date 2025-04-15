import TableLoader from "@/components/admin/shared/TableLoader";
import ABox from "@/components/admin/ui/ABox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Images } from "@/constants";
import { SpecialtyQueries } from "@/lib/modules/specialty/specialty.queries";
import { TSpecialty } from "@/lib/modules/specialty/specialty.type";
import formatDate from "@/utils/formatDate";
import { useQuery } from "@apollo/client";
import { Edit, Eye, Trash2 } from "lucide-react";
import { useSearchParams } from "react-router";

const SpecialtyTable = () => {
  const [searchParams] = useSearchParams();

  const { data: specialtiesData, loading } = useQuery(
    SpecialtyQueries.SPECIALTY_LIST,
    {
      variables: Object.fromEntries(searchParams),
    },
  );

  if (loading) return <TableLoader />;

  return (
    <ABox>
      <table className="primary-table table table-auto">
        <thead>
          <tr>
            <th className="w-10">
              <Input type="checkbox" className="mx-auto size-4" />
            </th>
            <th>Icon</th>
            <th>Name</th>
            <th>Date Added</th>
            <th>Last Modified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {specialtiesData?.getAllSpecialties?.specialties.map(
            (specialty: TSpecialty) => (
              <tr key={specialty.id}>
                <td>
                  <Input type="checkbox" className="mx-auto size-4" />
                </td>
                <td>
                  <img
                    src={specialty.icon || Images.PlaceholderImage}
                    alt={specialty.name}
                    className="mx-auto size-8 object-cover object-center"
                  />
                </td>
                <td>{specialty.name}</td>
                <td>{formatDate(specialty.createdAt)}</td>
                <td>{formatDate(specialty.updatedAt)}</td>
                <td>
                  <div className="flex items-center justify-center gap-1.5">
                    <Button size="icon" variant="outline">
                      <Eye />
                    </Button>
                    <Button size="icon" variant="outline">
                      <Edit />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="hover:border-red-500 hover:bg-red-500 hover:text-slate-50"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </ABox>
  );
};

export default SpecialtyTable;
