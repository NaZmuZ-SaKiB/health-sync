import PageLoader from "@/components/admin/shared/PageLoader";
import ABox from "@/components/admin/ui/ABox";
import AFormH2 from "@/components/admin/ui/AFormH2";
import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import DetailField from "@/components/global/shared/DetailField";
import { AUTH_KEY, Images } from "@/constants";
import { PatientQueries } from "@/lib/modules/patient/patient.queries";
import { TPatient } from "@/lib/modules/patient/patient.type";
import formatBloodGroup from "@/utils/formatBloodGroup";
import formatDate from "@/utils/formatDate";
import { useQuery } from "@apollo/client";
import { useCookies } from "react-cookie";
import { useParams } from "react-router";

const SinglePatientPage = () => {
  const { id } = useParams<{ id: string }>();

  const [cookies] = useCookies([AUTH_KEY]);

  const { data: patientData, loading: patientLoading } = useQuery(
    PatientQueries.SINGLE_PATIENT,
    {
      variables: { id },
      context: {
        headers: {
          Authorization: cookies[AUTH_KEY] || "",
        },
      },
    },
  );

  const patient: TPatient | undefined = patientData?.patient;

  if (patientLoading) {
    return <PageLoader />;
  }

  console.log("patient", patient);

  return (
    <APageContainer>
      <APageHeader
        title={`${patient?.user?.firstName} ${patient?.user?.lastName}'s Profile`}
        backButton
      />

      <ABox>
        <AFormH2>Personal Information</AFormH2>

        <div className="grid grid-cols-[3fr_1fr] items-start gap-5">
          {/* Left Side */}
          <div className="grid grid-cols-6 gap-5">
            <DetailField
              title="First Name"
              value={patient?.user?.firstName || "N/A"}
              className="col-span-3"
            />

            <DetailField
              title="Last Name"
              value={patient?.user?.lastName || "N/A"}
              className="col-span-3"
            />

            <DetailField
              title="Date of Birth"
              value={formatDate(patient?.user?.dateOfBirth as string)}
              className="col-span-3"
            />

            <DetailField
              title="Gender"
              value={patient?.user?.gender || "N/A"}
              className="col-span-3"
            />

            <DetailField
              title="Blood Group"
              value={formatBloodGroup(patient?.bloodGroup)}
              className="col-span-3"
            />

            <DetailField
              title="Allergies"
              value={patient?.allergies || "N/A"}
              className="col-span-3"
            />
          </div>

          {/* Right Side */}
          <div>
            <img
              src={
                patient?.user?.profilePicture?.secureUrl ||
                Images.PlaceholderImage
              }
              alt={patient?.user?.firstName || "Doctor"}
              className="aspect-square w-full object-cover object-top"
            />
          </div>
        </div>
      </ABox>

      <ABox>
        <AFormH2>Contact Information</AFormH2>

        <div className="grid grid-cols-6 gap-5">
          <DetailField
            title="Email"
            value={patient?.user?.email}
            className="col-span-3"
          />

          <DetailField
            title="Phone"
            value={patient?.user?.phoneNumber || "N/A"}
            className="col-span-3"
          />

          <DetailField
            title="Emergency Contact Name"
            value={patient?.emergencyContactName || "N/A"}
            className="col-span-3"
          />

          <DetailField
            title="Emergency Contact Phone"
            value={patient?.emergencyContactPhone || "N/A"}
            className="col-span-3"
          />

          <DetailField
            title="Address"
            value={patient?.user?.address || "N/A"}
            className="col-span-6"
          />
        </div>
      </ABox>
    </APageContainer>
  );
};

export default SinglePatientPage;
