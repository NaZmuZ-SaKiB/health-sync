import ABox from "@/components/admin/ui/ABox";
import HSPagination from "@/components/global/shared/HSPagination";
import RefreshButton from "@/components/global/shared/RefreshButton";
import TableLoader from "@/components/global/shared/TableLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Images } from "@/constants";
import { ServiceQueries } from "@/lib/modules/service/service.queries";
import { TService } from "@/lib/modules/service/service.type";
import { TMeta } from "@/types";
import formatDate from "@/utils/formatDate";
import { useQuery } from "@apollo/client";
import { Edit, Eye, Trash2 } from "lucide-react";
import { ChangeEvent, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import ServiceSettingsModal from "./ServiceSettingsModal";
import ServiceDelete from "./ServiceDelete";

type TProps = {
  selected: string[];
  setSelected: (selected: string[]) => void;
};

const ServiceTable = ({ selected, setSelected }: TProps) => {
  const [searchParams] = useSearchParams();

  const {
    data: servicesData,
    loading,
    refetch,
  } = useQuery(ServiceQueries.SERVICE_LIST, {
    variables: Object.fromEntries(searchParams),
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  // Handle Select
  const selectAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelected(
        servicesData?.getAllServices?.services.map(
          (service: TService) => service.id,
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

  const meta: TMeta = servicesData?.getAllServices?.meta;
  const totalPages = Math.ceil(meta?.total / meta?.limit);

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
          {servicesData?.getAllServices?.services.map((service: TService) => (
            <tr key={service.id}>
              <td>
                <Input
                  checked={selected.includes(service.id)}
                  onChange={(e) => handleSelect(e, service.id)}
                  type="checkbox"
                  className="mx-auto size-4"
                />
              </td>
              <td>
                <img
                  src={service?.icon?.secureUrl || Images.PlaceholderImage}
                  alt={service.name}
                  className="mx-auto size-8 object-cover object-center"
                />
              </td>
              <td>{service.name}</td>
              <td>{formatDate(service.createdAt)}</td>
              <td>{formatDate(service.updatedAt)}</td>
              <td>
                <div className="flex items-center justify-center gap-1.5">
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-none"
                  >
                    <Eye />
                  </Button>

                  <Link to={`/admin/services/${service.id}`}>
                    <Button
                      size="icon"
                      variant="outline"
                      className="cursor-pointer rounded-none"
                    >
                      <Edit />
                    </Button>
                  </Link>

                  <ServiceSettingsModal
                    serviceId={service.id}
                    settings={service?.serviceSettings}
                  />

                  <ServiceDelete selected={[service.id]}>
                    <Button
                      size="icon"
                      variant="outline"
                      className="cursor-pointer rounded-none hover:border-red-500 hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 />
                    </Button>
                  </ServiceDelete>

                  <Link to={`/admin/services/reviews/${service?.id}`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-none"
                    >
                      Reviews
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

export default ServiceTable;
