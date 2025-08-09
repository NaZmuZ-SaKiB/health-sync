import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import DGrid from "@/components/global/shared/DGrid";
import OpeningHoursForm from "./_components/OpeningHoursForm";
import HSButton from "@/components/global/shared/HSButton";

const OpeningHourSettingPage = () => {
  return (
    <APageContainer>
      <APageHeader title="Settings - Opening Hours">
        <HSButton
          form="opening-hours-setting-form"
          type="submit"
          className="h-auto self-start rounded-none px-5 py-2"
        >
          Save
        </HSButton>
      </APageHeader>

      <DGrid equal>
        <OpeningHoursForm />
      </DGrid>
    </APageContainer>
  );
};

export default OpeningHourSettingPage;
