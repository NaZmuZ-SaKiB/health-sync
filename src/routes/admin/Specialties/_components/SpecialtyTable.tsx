import TableLoader from "@/components/global/shared/TableLoader";
import ABox from "@/components/admin/ui/ABox";
import HSPagination from "@/components/global/shared/HSPagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Images } from "@/constants";
import { SpecialtyQueries } from "@/lib/modules/specialty/specialty.queries";
import { TSpecialty } from "@/lib/modules/specialty/specialty.type";
import { TMeta } from "@/types";
import formatDate from "@/utils/formatDate";
import { useQuery } from "@apollo/client";
import { Edit, Eye, Trash2 } from "lucide-react";
import { ChangeEvent } from "react";
import { Link, useSearchParams } from "react-router";
import SpecialtyDelete from "./SpecialtyDelete";
import RefreshButton from "@/components/global/shared/RefreshButton";

type TProps = {
  selected: string[];
  setSelected: (selected: string[]) => void;
};

const SpecialtyTable = ({ selected, setSelected }: TProps) => {
  const [searchParams] = useSearchParams();

  const {
    data: specialtiesData,
    loading,
    refetch,
  } = useQuery(SpecialtyQueries.SPECIALTY_LIST, {
    variables: Object.fromEntries(searchParams),
  });

  // Handle Select
  const selectAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelected(
        specialtiesData?.getAllSpecialties?.specialties.map(
          (specialty: TSpecialty) => specialty.id,
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

  const meta: TMeta = specialtiesData?.getAllSpecialties?.meta;
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
                  <Input
                    checked={selected.includes(specialty.id)}
                    onChange={(e) => handleSelect(e, specialty.id)}
                    type="checkbox"
                    className="mx-auto size-4"
                  />
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
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-none"
                    >
                      <Eye />
                    </Button>

                    <Link to={`/admin/specialties/${specialty.id}`}>
                      <Button
                        size="icon"
                        variant="outline"
                        className="cursor-pointer rounded-none"
                      >
                        <Edit />
                      </Button>
                    </Link>

                    <SpecialtyDelete selected={[specialty.id]}>
                      <Button
                        size="icon"
                        variant="outline"
                        className="cursor-pointer rounded-none hover:border-red-500 hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 />
                      </Button>
                    </SpecialtyDelete>
                  </div>
                </td>
              </tr>
            ),
          )}
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

export default SpecialtyTable;
