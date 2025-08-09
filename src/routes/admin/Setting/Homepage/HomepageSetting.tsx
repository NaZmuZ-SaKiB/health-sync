import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import HSButton from "@/components/global/shared/HSButton";
import HomepageSettingForm from "./_components/HomepageSettingForm";
import { gql, useQuery } from "@apollo/client";

const HOMEPAGE_SETTING = gql`
  query Query {
    homepageSetting
  }
`;

const HomepageSettingPage = () => {
  const { data, loading } = useQuery(HOMEPAGE_SETTING);

  if (loading) return <div>Loading...</div>;

  return (
    <APageContainer>
      <APageHeader title="Settings - Homepage">
        <HSButton
          form="homepage-setting-form"
          type="submit"
          className="h-auto self-start rounded-none px-5 py-2"
        >
          Save
        </HSButton>
      </APageHeader>

      <HomepageSettingForm homepageSettings={data?.homepageSetting} />
    </APageContainer>
  );
};

export default HomepageSettingPage;
