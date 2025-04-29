import DBox from "@/components/dashboard/ui/DBox";
import DFormH2 from "@/components/dashboard/ui/DFormH2";
import DPageContainer from "@/components/dashboard/ui/DPageContainer";
import DPageHeader from "@/components/dashboard/ui/DPageHeader";
import DetailField from "@/components/global/shared/DetailField";
import DGrid from "@/components/global/shared/DGrid";
import HSButton from "@/components/global/shared/HSButton";
import { AUTH_KEY, ROLE } from "@/constants";
import { UserQueries } from "@/lib/modules/user/user.queries";
import { TUser } from "@/lib/modules/user/user.type";
import formatDate from "@/utils/formatDate";
import { useQuery } from "@apollo/client";
import { Edit, UserCheck2 } from "lucide-react";
import { useCookies } from "react-cookie";
import { Link } from "react-router";
import DoctorInformation from "./_components/DoctorInformation";
import { TDoctor } from "@/lib/modules/doctor/doctor.type";
import ProfilePicutre from "./_components/ProfilePicutre";

const ProfilePage = () => {
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

  console.log(UserCheck2);

  return (
    <DPageContainer>
      <DPageHeader title={`${user.firstName} ${user.lastName}`}>
        <Link to={`/dashboard/account/profile/edit`}>
          <HSButton
            variant="outline"
            className="border-primary-hover text-primary-hover hover:bg-primary-hover h-auto self-start rounded-md px-5 py-2 hover:text-slate-50"
          >
            <Edit className="mr-2" /> Edit
          </HSButton>
        </Link>
      </DPageHeader>

      <DGrid small reverse className="gap-3 @max-5xl:space-y-3">
        <div className="space-y-3">
          <DBox>
            <DFormH2 className="text-slate-700">Personal Info</DFormH2>

            <div className="grid grid-cols-6 gap-5">
              <DetailField
                title="First Name"
                value={user?.firstName}
                className="col-span-3"
              />
              <DetailField
                title="Last Name"
                value={user?.lastName}
                className="col-span-3"
              />
              <DetailField
                title="Gender"
                value={user?.gender}
                className="col-span-3"
              />
              <DetailField
                title="Email"
                value={user?.email}
                className="col-span-3"
              />
              <DetailField
                title="Phone"
                value={user?.phoneNumber}
                className="col-span-3"
              />
              <DetailField
                title="Date of Birth"
                value={formatDate(user?.dateOfBirth as string)}
                className="col-span-3"
              />
              <DetailField
                title="Address"
                value={user?.address}
                className="col-span-6"
              />
            </div>
          </DBox>

          {user?.role === ROLE.DOCTOR && (
            <DoctorInformation doctor={user?.doctor as TDoctor} />
          )}
        </div>

        <div>
          <ProfilePicutre image={user?.profilePicture} />
        </div>
      </DGrid>
    </DPageContainer>
  );
};

export default ProfilePage;
