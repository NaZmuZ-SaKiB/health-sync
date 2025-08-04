import ABox from "@/components/admin/ui/ABox";
import AFormH2 from "@/components/admin/ui/AFormH2";
import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import ProfilePicutre from "@/components/dashboard/shared/ProfilePicutre";
import DetailField from "@/components/global/shared/DetailField";
import DGrid from "@/components/global/shared/DGrid";
import HSButton from "@/components/global/shared/HSButton";
import { AUTH_KEY } from "@/constants";
import { UserQueries } from "@/lib/modules/user/user.queries";
import { TUser } from "@/lib/modules/user/user.type";
import formatDate from "@/utils/formatDate";
import { useQuery } from "@apollo/client";
import { Edit } from "lucide-react";
import { useCookies } from "react-cookie";
import { Link } from "react-router";

const AdminProfilePage = () => {
  const [cookies] = useCookies([AUTH_KEY]);

  const { data: userData, loading } = useQuery(UserQueries.PROFILE, {
    context: {
      headers: {
        Authorization: cookies[AUTH_KEY] || "",
      },
    },
  });

  if (loading) return <div>Loading...</div>;

  const user: TUser = userData?.me;

  return (
    <APageContainer>
      <APageHeader
        title={`${user.firstName || ""} ${user.lastName || ""}${!user.firstName && !user.lastName ? "Your Profile" : ""}`}
      >
        <Link to={`/admin/account/profile/edit`}>
          <HSButton
            variant="outline"
            className="border-primary-hover text-primary-hover hover:bg-primary-hover h-auto self-start rounded-none px-5 py-2 hover:text-slate-50"
          >
            <Edit className="mr-2" /> Edit
          </HSButton>
        </Link>
      </APageHeader>

      <DGrid small reverse className="gap-3 @max-5xl:space-y-3">
        <div className="space-y-3">
          <ABox>
            <AFormH2 className="">Personal Info</AFormH2>

            <div className="grid grid-cols-6 gap-5">
              <DetailField
                title="First Name"
                value={user?.firstName || "N/A"}
                className="col-span-3"
              />
              <DetailField
                title="Last Name"
                value={user?.lastName || "N/A"}
                className="col-span-3"
              />
              <DetailField
                title="Gender"
                value={user?.gender || "N/A"}
                className="col-span-3"
              />
              <DetailField
                title="Email"
                value={user?.email}
                className="col-span-3"
              />
              <DetailField
                title="Phone"
                value={user?.phoneNumber || "N/A"}
                className="col-span-3"
              />
              <DetailField
                title="Date of Birth"
                value={
                  user?.dateOfBirth
                    ? formatDate(user?.dateOfBirth as string)
                    : "N/A"
                }
                className="col-span-3"
              />
              <DetailField
                title="Address"
                value={user?.address || "N/A"}
                className="col-span-6"
              />
            </div>
          </ABox>
        </div>

        <div>
          <ProfilePicutre image={user?.profilePicture} />
        </div>
      </DGrid>
    </APageContainer>
  );
};

export default AdminProfilePage;
