import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TDoctor } from "@/lib/modules/doctor/doctor.type";
import { cn } from "@/lib/utils";
import debounce from "@/utils/debounce";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

type TProps = {
  name: string;
  label: string;
  required?: boolean;
};

const DOCTORS_LIST = gql`
  query GetAllDoctors($searchTerm: String, $limit: String) {
    getAllDoctors(searchTerm: $searchTerm, limit: $limit) {
      doctors {
        id
        user {
          email
        }
      }
    }
  }
`;

const DoctorAutocomplete = ({ name, label, required = true }: TProps) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const { data: doctorsData, loading: doctorsLoading } = useQuery(
    DOCTORS_LIST,
    {
      variables: {
        searchTerm,
        limit: "5",
      },
    },
  );

  const { control } = useFormContext();

  const setDebouncedSearchTerm = (value: string) => {
    debounce(setSearchTerm(value), 500);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex w-full flex-col gap-1", {})}>
          <FormLabel
            className={"gap-0.5 text-xs font-medium text-nowrap capitalize"}
          >
            {label}
            {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <Select
            open={open}
            onOpenChange={setOpen}
            {...field}
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={doctorsLoading}
          >
            <FormControl>
              <SelectTrigger
                className={cn(
                  "focus-visible:border-primary w-full rounded-none bg-slate-50 focus-visible:ring-0",
                  {
                    "-mt-10 opacity-0": open,
                  },
                )}
              >
                <SelectValue placeholder={"Select" + " " + label} />
              </SelectTrigger>
            </FormControl>

            <SelectContent className="rounded-none border-none [&>div]:p-0">
              <Input
                type="text"
                placeholder="Search Doctor"
                className={cn(
                  "focus-visible:border-primary !mt-1 rounded-none bg-slate-50 focus-visible:ring-0 focus-visible:ring-offset-0",
                  {},
                )}
                ref={inputRef}
                onChange={(e) => setDebouncedSearchTerm(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
              />
              {doctorsLoading && (
                <SelectItem value="loading" disabled className="rounded-none">
                  Loading...
                </SelectItem>
              )}
              {!doctorsLoading &&
                doctorsData.getAllDoctors.doctors.map((doctor: TDoctor) => (
                  <SelectItem
                    key={`${name}-${doctor.id}`}
                    value={doctor.id}
                    className="hover:!text-primary-hover data-[state=checked]:text-primary-hover !m-0 cursor-pointer rounded-none !px-3.5 data-[state=checked]:font-semibold"
                  >
                    {doctor.user.email}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <FormMessage className="col-span-2 !mt-0 font-normal" />
        </FormItem>
      )}
    />
  );
};

export default DoctorAutocomplete;
