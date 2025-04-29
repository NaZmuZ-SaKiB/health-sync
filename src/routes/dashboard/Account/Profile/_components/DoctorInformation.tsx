import DBox from "@/components/dashboard/ui/DBox";
import DFormH2 from "@/components/dashboard/ui/DFormH2";
import DetailField from "@/components/global/shared/DetailField";
import { TDoctor } from "@/lib/modules/doctor/doctor.type";
import { formatCurrency } from "@/utils/formatCurrency";

const DoctorInformation = ({ doctor }: { doctor: TDoctor }) => {
  return (
    <DBox>
      <DFormH2 className="text-slate-700">Professional Info</DFormH2>

      <div className="grid grid-cols-6 gap-5">
        <DetailField title={"Bio"} value={doctor?.bio} className="col-span-6" />
        <DetailField
          title={"Qualification"}
          value={doctor?.qualification}
          className="col-span-6"
        />
        <DetailField
          title="Specialty"
          value={doctor?.specialty?.name}
          className="col-span-3"
        />
        <DetailField
          title="Location"
          value={doctor?.location?.name}
          className="col-span-3"
        />
        <DetailField
          title="License Number"
          value={doctor?.licenseNumber}
          className="col-span-3"
        />
        <DetailField
          title="Experience"
          value={doctor?.experienceYears}
          className="col-span-3"
        />
        <DetailField
          title="Fee"
          value={formatCurrency(doctor?.fee ?? 0)}
          className="col-span-3"
        />
      </div>
    </DBox>
  );
};

export default DoctorInformation;
