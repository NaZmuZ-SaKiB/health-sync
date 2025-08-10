import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import DGrid from "@/components/global/shared/DGrid";
import OpeningHoursForm from "./_components/OpeningHoursForm";
import HSButton from "@/components/global/shared/HSButton";
import { useQuery } from "@apollo/client";
import { SettingQueries } from "@/lib/modules/setting/setting.queries";
import { CONFIG_OPENING_HOURS } from "@/lib/modules/setting/setting.constant";

const OpeningHourSettingPage = () => {
  const { data, loading } = useQuery(SettingQueries.GET_SETTING_BY_KEY, {
    variables: {
      key: CONFIG_OPENING_HOURS,
    },
  });

  // TODO: Loading
  if (loading) return <div>Loading ...</div>;

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
        <OpeningHoursForm defaultValue={data?.setting?.value} />
      </DGrid>
    </APageContainer>
  );
};

export default OpeningHourSettingPage;
