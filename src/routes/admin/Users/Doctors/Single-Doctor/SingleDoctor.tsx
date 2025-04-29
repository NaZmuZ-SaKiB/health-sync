import ADetailField from "@/components/admin/shared/ADetailField";
import PageLoader from "@/components/admin/shared/PageLoader";
import ABox from "@/components/admin/ui/ABox";
import AFormH2 from "@/components/admin/ui/AFormH2";
import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import { DoctorQueries } from "@/lib/modules/doctor/doctor.queries";
import { TDoctor } from "@/lib/modules/doctor/doctor.type";
import { formatCurrency } from "@/utils/formatCurrency";
import formatDate from "@/utils/formatDate";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router";

const SingleDoctorPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: doctorData, loading: doctorLoading } = useQuery(
    DoctorQueries.SINGLE_DOCTOR,
    {
      variables: { id },
    },
  );

  const doctor: TDoctor | undefined = doctorData?.doctor;

  if (doctorLoading) {
    return <PageLoader />;
  }

  return (
    <APageContainer>
      <APageHeader
        title={`${doctor?.user?.firstName} ${doctor?.user?.lastName}'s Profile`}
        backButton
      />

      <ABox>
        <AFormH2>Personal Information</AFormH2>

        <div className="grid grid-cols-6 gap-5">
          <ADetailField
            title="First Name"
            value={doctor?.user?.firstName}
            className="col-span-3"
          />
          <ADetailField
            title="Last Name"
            value={doctor?.user?.lastName}
            className="col-span-3"
          />
          <ADetailField
            title="Gender"
            value={doctor?.user?.gender}
            className="col-span-3"
          />

          <ADetailField
            title="Date of Birth"
            value={formatDate(doctor?.user?.dateOfBirth as string)}
            className="col-span-3"
          />

          <ADetailField
            title={`About ${doctor?.user?.firstName} ${doctor?.user?.lastName}`}
            value={doctor?.bio}
            className="col-span-3"
          />
        </div>
      </ABox>

      <ABox>
        <AFormH2>Professional Information</AFormH2>

        <div className="grid grid-cols-6 gap-5">
          <ADetailField
            title={"Qualification"}
            value={doctor?.qualification}
            className="col-span-4"
          />
          <ADetailField
            title="Specialty"
            value={doctor?.specialty?.name}
            className="col-span-2"
          />
          <ADetailField
            title="License Number"
            value={doctor?.licenseNumber}
            className="col-span-2"
          />
          <ADetailField
            title="Experience"
            value={doctor?.experienceYears}
            className="col-span-2"
          />
          <ADetailField
            title="Fee"
            value={formatCurrency(doctor?.fee ?? 0)}
            className="col-span-2"
          />
          <ADetailField
            title="Location"
            value={doctor?.location?.name}
            className="col-span-2"
          />
        </div>
      </ABox>

      <ABox>
        <AFormH2>Contact Information</AFormH2>
        <div className="grid grid-cols-6 gap-5">
          <ADetailField
            title="Email"
            value={doctor?.user?.email}
            className="col-span-2"
          />
          <ADetailField
            title="Phone"
            value={doctor?.user?.phoneNumber}
            className="col-span-2"
          />
          <ADetailField
            title="Address"
            value={doctor?.user?.address}
            className="col-span-3"
          />
        </div>
      </ABox>
    </APageContainer>
  );
};

export default SingleDoctorPage;
