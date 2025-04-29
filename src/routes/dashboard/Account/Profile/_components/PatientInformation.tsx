import DBox from "@/components/dashboard/ui/DBox";
import DFormH2 from "@/components/dashboard/ui/DFormH2";
import DetailField from "@/components/global/shared/DetailField";
import { TPatient } from "@/lib/modules/patient/patient.type";

const PatientInformation = ({ patient }: { patient: TPatient }) => {
  console.log(patient);
  return (
    <DBox>
      <DFormH2 className="text-slate-700">Health Info</DFormH2>

      <div className="grid grid-cols-6 gap-5">
        <DetailField
          title={"Allergies"}
          value={patient?.allergies ?? "N/A"}
          className="col-span-3"
        />
        <DetailField
          title={"Blood Group"}
          value={patient?.bloodGroup ?? "N/A"}
          className="col-span-3"
        />
        <DetailField
          title={"Emergency Contact Name"}
          value={patient?.emergencyContactName ?? "N/A"}
          className="col-span-3"
        />
        <DetailField
          title={"Emergency Contact Phone"}
          value={patient?.emergencyContactPhone ?? "N/A"}
          className="col-span-3"
        />
      </div>
    </DBox>
  );
};

export default PatientInformation;
