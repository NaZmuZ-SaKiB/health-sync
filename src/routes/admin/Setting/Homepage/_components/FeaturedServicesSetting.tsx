import ABox from "@/components/admin/ui/ABox";
import AFormH2 from "@/components/admin/ui/AFormH2";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Images } from "@/constants";
import { TService } from "@/lib/modules/service/service.type";
import { CONFIG_FEATURED_SERVICES } from "@/lib/modules/setting/setting.constant";
import { cn } from "@/lib/utils";
import debounce from "@/utils/debounce";
import { gql, useQuery } from "@apollo/client";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

const SERVICE_LIST = gql`
  query GetAllServices($limit: String, $searchTerm: String) {
    getAllServices(limit: $limit, searchTerm: $searchTerm) {
      services {
        id
        icon {
          publicId
          secureUrl
        }
        name
      }
    }
  }
`;

const FeaturedServicesSetting = ({
  defaultValues,
}: {
  defaultValues: TService[];
}) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const [selected, setSelected] = useState<TService[]>(defaultValues);

  const { setValue } = useFormContext();

  useEffect(() => {
    setValue(
      CONFIG_FEATURED_SERVICES,
      selected.map((item) => item.id),
    );
  }, [selected, setValue]);

  const { data: servicesData, loading: isServicesLoading } = useQuery(
    SERVICE_LIST,
    {
      variables: {
        limit: "5",
        searchTerm,
      },
    },
  );

  const setDebouncedSearchTerm = (value: string) => {
    debounce(setSearchTerm(value), 500);
  };

  const handleChange = (value: string) => {
    const service = servicesData?.getAllServices?.services?.find(
      (item: TService) => item.id === value,
    );

    const isExist = selected.findIndex((item: TService) => item.id === value);

    if (isExist !== -1) return;

    if (service) {
      setSelected((prev) => [...prev, service]);
    }
  };

  const removeService = (id: string) => {
    setSelected((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ABox>
      <AFormH2>Featured Services</AFormH2>

      <div className="mb-3 flex flex-wrap items-center gap-3">
        {selected.map((item) => (
          <div
            key={`selected-featured-service-${item.id}`}
            className="flex items-center gap-3 border p-1 pr-0 text-xs"
          >
            <img
              src={item?.icon?.secureUrl || Images.PlaceholderImage}
              alt={item.name}
              height={15}
              width={15}
              className="object-cover"
            />{" "}
            <span>{item.name}</span>
            <span
              className="cursor-pointer px-1 text-slate-500 hover:bg-red-50 hover:text-red-600"
              onClick={() => removeService(item.id)}
            >
              <X />
            </span>
          </div>
        ))}
      </div>

      <Select
        open={open}
        onOpenChange={setOpen}
        disabled={isServicesLoading}
        onValueChange={handleChange}
        value=""
      >
        <SelectTrigger
          className={cn(
            "focus-visible:border-primary w-full rounded-none bg-slate-50 focus-visible:ring-0",
            {
              "-mt-10 opacity-0": open,
            },
          )}
        >
          <SelectValue placeholder={"Select Services"} />
        </SelectTrigger>

        <SelectContent className="rounded-none border-none [&>div]:p-0">
          <Input
            type="text"
            placeholder="Search Services"
            className={cn(
              "focus-visible:border-primary !mt-1 rounded-none bg-slate-50 focus-visible:ring-0 focus-visible:ring-offset-0",
              {},
            )}
            ref={inputRef}
            onChange={(e) => setDebouncedSearchTerm(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()}
          />

          {isServicesLoading && (
            <SelectItem value="loading" disabled className="rounded-none">
              Loading...
            </SelectItem>
          )}

          {!isServicesLoading &&
            servicesData?.getAllServices?.services?.map((service: TService) => (
              <SelectItem
                key={`featured-service-${service.id}`}
                value={service.id}
                className="hover:!text-primary-hover data-[state=checked]:text-primary-hover !m-0 cursor-pointer rounded-none !px-3.5 data-[state=checked]:font-semibold"
              >
                <img
                  src={service?.icon?.secureUrl || Images.PlaceholderImage}
                  alt={service.name}
                  height={15}
                  width={15}
                  className="mr-2 object-cover"
                />{" "}
                <span>{service.name}</span>
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </ABox>
  );
};

export default FeaturedServicesSetting;
