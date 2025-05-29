import DetailField from "@/components/global/shared/DetailField";
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
import { Images } from "@/constants";

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

        <div className="grid grid-cols-[3fr_1fr] items-start gap-5">
          {/* Left Side */}
          <div className="grid grid-cols-6 gap-5">
            <DetailField
              title="First Name"
              value={doctor?.user?.firstName}
              className="col-span-3"
            />
            <DetailField
              title="Last Name"
              value={doctor?.user?.lastName}
              className="col-span-3"
            />
            <DetailField
              title="Gender"
              value={doctor?.user?.gender}
              className="col-span-3"
            />

            <DetailField
              title="Date of Birth"
              value={formatDate(doctor?.user?.dateOfBirth as string)}
              className="col-span-3"
            />

            <DetailField
              title={`About ${doctor?.user?.firstName} ${doctor?.user?.lastName}`}
              value={doctor?.bio}
              className="col-span-3"
            />
          </div>

          {/* Right Side */}
          <div>
            <img
              src={
                doctor?.user?.profilePicture?.secureUrl ||
                Images.PlaceholderImage
              }
              alt={doctor?.user?.firstName || "Doctor"}
              className="aspect-square w-full object-cover object-top"
            />
          </div>
        </div>
      </ABox>

      <ABox>
        <AFormH2>Professional Information</AFormH2>

        <div className="grid grid-cols-6 gap-5">
          <DetailField
            title={"Qualification"}
            value={doctor?.qualification}
            className="col-span-4"
          />
          <DetailField
            title="Specialty"
            value={doctor?.specialty?.name}
            className="col-span-2"
          />
          <DetailField
            title="License Number"
            value={doctor?.licenseNumber}
            className="col-span-2"
          />
          <DetailField
            title="Experience"
            value={doctor?.experienceYears}
            className="col-span-2"
          />
          <DetailField
            title="Fee"
            value={formatCurrency(doctor?.fee ?? 0)}
            className="col-span-2"
          />
          <DetailField
            title="Location"
            value={doctor?.location?.name}
            className="col-span-2"
          />
        </div>
      </ABox>

      <ABox>
        <AFormH2>Contact Information</AFormH2>
        <div className="grid grid-cols-6 gap-5">
          <DetailField
            title="Email"
            value={doctor?.user?.email}
            className="col-span-2"
          />
          <DetailField
            title="Phone"
            value={doctor?.user?.phoneNumber}
            className="col-span-2"
          />
          <DetailField
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
