import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import DGrid from "@/components/global/shared/DGrid";
import FooterSettingForm from "./_components/FooterSettingForm";
import { gql, useQuery } from "@apollo/client";

const FOOTER_SETTING = gql`
  query Query {
    footerSetting
  }
`;

const FooterSettingPage = () => {
  const { data, loading } = useQuery(FOOTER_SETTING);

  if (loading) return <div>Loading...</div>;

  return (
    <APageContainer>
      <APageHeader title="Setting - Footer" />

      <DGrid>
        <div>
          <FooterSettingForm defaultSettings={data?.footerSetting || "{}"} />
        </div>
      </DGrid>
    </APageContainer>
  );
};

export default FooterSettingPage;
