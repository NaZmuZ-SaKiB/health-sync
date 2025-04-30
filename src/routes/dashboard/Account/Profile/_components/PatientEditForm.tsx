import HSDInput from "@/components/dashboard/form/HSDInput";
import HSDSelect from "@/components/dashboard/form/HSDSelect";
import DBox from "@/components/dashboard/ui/DBox";
import DFormH2 from "@/components/dashboard/ui/DFormH2";
import { bloodGroups } from "@/constants";

const bloodGroupOptions = bloodGroups.map((item) => ({
  label: item,
  value: item,
}));

const PatientEditForm = () => {
  return (
    <DBox>
      <DFormH2 className="">Health Info</DFormH2>

      <div className="grid grid-cols-6 gap-5">
        <div className="col-span-3">
          <HSDInput
            name="patient.allergies"
            label="Allergies"
            required={false}
          />
        </div>
        <div className="col-span-3">
          <HSDSelect
            name="patient.bloodGroup"
            label="Blood Group"
            options={bloodGroupOptions}
            required={false}
          />
        </div>
        <div className="col-span-3">
          <HSDInput
            name="patient.emergencyContactName"
            label="Emergency Contact Name"
            required={false}
          />
        </div>
        <div className="col-span-3">
          <HSDInput
            name="patient.emergencyContactPhone"
            label="Emergency Contact Phone"
            required={false}
          />
        </div>
      </div>
    </DBox>
  );
};

export default PatientEditForm;
