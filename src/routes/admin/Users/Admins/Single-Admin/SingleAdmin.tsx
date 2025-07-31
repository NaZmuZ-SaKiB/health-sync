import PageLoader from "@/components/admin/shared/PageLoader";
import ABox from "@/components/admin/ui/ABox";
import AFormH2 from "@/components/admin/ui/AFormH2";
import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import DetailField from "@/components/global/shared/DetailField";
import { Images } from "@/constants";
import { UserQueries } from "@/lib/modules/user/user.queries";
import { TUser } from "@/lib/modules/user/user.type";
import formatDate from "@/utils/formatDate";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router";

const SingleAdminPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: adminData, loading: adminLoading } = useQuery(
    UserQueries.SINGLE_ADMIN,
    {
      variables: { id },
    },
  );

  const admin: TUser | undefined = adminData?.adminById;

  if (adminLoading) {
    return <PageLoader />;
  }

  return (
    <APageContainer>
      <APageHeader
        title={`${admin?.firstName || ""} ${admin?.lastName || ""}${!admin?.firstName && !admin?.lastName ? "Admin Profile" : "'s Profile"}`}
        backButton
      />

      <ABox>
        <AFormH2>Personal Information</AFormH2>

        <div className="grid grid-cols-[3fr_1fr] items-start gap-5">
          {/* Left Side */}
          <div className="grid grid-cols-6 gap-5">
            <DetailField
              title="First Name"
              value={admin?.firstName || "N/A"}
              className="col-span-3"
            />
            <DetailField
              title="Last Name"
              value={admin?.lastName || "N/A"}
              className="col-span-3"
            />
            <DetailField
              title="Gender"
              value={admin?.gender || "N/A"}
              className="col-span-3"
            />

            <DetailField
              title="Date of Birth"
              value={
                admin?.dateOfBirth
                  ? formatDate(admin?.dateOfBirth as string)
                  : "N/A"
              }
              className="col-span-3"
            />
          </div>

          {/* Right Side */}
          <div>
            <img
              src={admin?.profilePicture?.secureUrl || Images.PlaceholderImage}
              alt={admin?.firstName || "Admin"}
              className="aspect-square w-full object-cover object-top"
            />
          </div>
        </div>
      </ABox>
    </APageContainer>
  );
};

export default SingleAdminPage;
