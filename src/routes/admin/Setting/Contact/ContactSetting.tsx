import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import DGrid from "@/components/global/shared/DGrid";
import HSButton from "@/components/global/shared/HSButton";
import ContactSettingForm from "./_components/ContactSettingForm";
import { gql, useQuery } from "@apollo/client";

const CONTACT_SETTING = gql`
  query Query {
    contactSetting
  }
`;

const ContactSettingPage = () => {
  const { data, loading } = useQuery(CONTACT_SETTING);

  if (loading) return <div>Loading...</div>;

  return (
    <APageContainer>
      <APageHeader title="Setting - Contact">
        <HSButton
          form="contact-setting-form"
          type="submit"
          className="h-auto self-start rounded-none px-5 py-2"
        >
          Save
        </HSButton>
      </APageHeader>

      <DGrid equal>
        <div>
          <ContactSettingForm defaultSettings={data?.contactSetting || "{}"} />
        </div>
      </DGrid>
    </APageContainer>
  );
};

export default ContactSettingPage;
