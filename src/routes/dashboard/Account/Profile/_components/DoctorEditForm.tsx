import HSDInput from "@/components/dashboard/form/HSDInput";
import HSDSelect from "@/components/dashboard/form/HSDSelect";
import HSDTextarea from "@/components/dashboard/form/HSDTextarea";
import DBox from "@/components/dashboard/ui/DBox";
import DFormH2 from "@/components/dashboard/ui/DFormH2";
import { gql, useQuery } from "@apollo/client";

const LOCATIONS_OPTIONS = gql`
  query GetAllLocations($limit: String) {
    getAllLocations(limit: $limit) {
      locations {
        id
        name
      }
    }
  }
`;

const DoctorEditForm = () => {
  const { data: locationsData, loading: locationsLoading } = useQuery(
    LOCATIONS_OPTIONS,
    {
      variables: {
        limit: "9999",
      },
    },
  );

  const locationsOptions =
    locationsData?.getAllLocations?.locations?.map(
      (item: { name: string; id: string }) => ({
        label: item.name,
        value: item.id,
      }),
    ) || [];
  return (
    <DBox>
      <DFormH2 className="">Professional Info</DFormH2>
      <div className="grid grid-cols-6 gap-5">
        <div className="col-span-3">
          <HSDTextarea name="doctor.bio" label="Bio" required={false} />
        </div>
        <div className="col-span-3">
          <HSDTextarea
            name="doctor.qualification"
            label="Qualification"
            required={false}
          />
        </div>
        <div className="col-span-3">
          <HSDInput
            name="doctor.licenseNumber"
            label="License Number"
            required={false}
          />
        </div>
        <div className="col-span-3">
          <HSDInput
            name="doctor.experienceYears"
            label="Experience in Years"
            required={false}
            type="number"
          />
        </div>
        <div className="col-span-3">
          <HSDInput
            name="doctor.fee"
            label="Fee"
            required={false}
            type="number"
          />
        </div>
        <div className="col-span-3">
          <HSDSelect
            name="doctor.locationId"
            label="Location"
            options={locationsOptions}
            disabled={locationsLoading}
          />
        </div>
      </div>
    </DBox>
  );
};

export default DoctorEditForm;
