import TableLoader from "@/components/admin/shared/TableLoader";
import ABox from "@/components/admin/ui/ABox";
import HSPagination from "@/components/global/shared/HSPagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LocationQueries } from "@/lib/modules/location/location.queries";
import { TLocation } from "@/lib/modules/location/location.type";
import { TMeta } from "@/types";
import formatDate from "@/utils/formatDate";
import { useQuery } from "@apollo/client";
import { Edit, Eye, Trash2 } from "lucide-react";
import { ChangeEvent } from "react";
import { Link, useSearchParams } from "react-router";
import LocationDelete from "./LocationDelete";
import RefreshButton from "@/components/admin/shared/RefreshButton";

type TProps = {
  selected: string[];
  setSelected: (selected: string[]) => void;
};

const LocationTable = ({ selected, setSelected }: TProps) => {
  const [searchParams] = useSearchParams();

  const {
    data: locationsData,
    loading,
    refetch,
  } = useQuery(LocationQueries.LOCATION_LIST, {
    variables: Object.fromEntries(searchParams),
  });

  // Handle Select
  const selectAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelected(
        locationsData?.getAllLocations?.locations.map(
          (location: TLocation) => location.id,
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

  const meta: TMeta = locationsData?.getAllLocations?.meta;
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
            <th>Name</th>
            <th>Phone</th>
            <th>Map</th>
            <th>Date Added</th>
            <th>Last Modified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locationsData?.getAllLocations?.locations.map(
            (location: TLocation) => (
              <tr key={location.id}>
                <td>
                  <Input
                    checked={selected.includes(location.id)}
                    onChange={(e) => handleSelect(e, location.id)}
                    type="checkbox"
                    className="mx-auto size-4"
                  />
                </td>

                <td>{location.name}</td>
                <td>{location.phoneNumber}</td>
                <td>
                  <Link
                    to={location.mapUrl}
                    className="text-sky-500 hover:underline"
                  >
                    Visit
                  </Link>
                </td>
                <td>{formatDate(location.createdAt)}</td>
                <td>{formatDate(location.updatedAt)}</td>
                <td>
                  <div className="flex items-center justify-center gap-1.5">
                    <Button size="icon" variant="outline">
                      <Eye />
                    </Button>

                    <Link to={`/admin/locations/${location.id}`}>
                      <Button
                        size="icon"
                        variant="outline"
                        className="cursor-pointer"
                      >
                        <Edit />
                      </Button>
                    </Link>

                    <LocationDelete selected={[location.id]}>
                      <Button
                        size="icon"
                        variant="outline"
                        className="cursor-pointer hover:border-red-500 hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 />
                      </Button>
                    </LocationDelete>
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

export default LocationTable;
