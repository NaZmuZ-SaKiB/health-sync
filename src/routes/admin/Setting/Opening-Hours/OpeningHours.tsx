import HSAInput from "@/components/admin/form/HSAInput";
import ABox from "@/components/admin/ui/ABox";
import AFormH2 from "@/components/admin/ui/AFormH2";
import { CONFIG_OPENING_HOURS } from "@/lib/modules/setting/setting.constant";

const OpeningHourSettingPage = () => {
  return (
    <ABox>
      <AFormH2>Opening Hours</AFormH2>

      <HSAInput
        name={CONFIG_OPENING_HOURS + ".monday"}
        label="Monday"
        placeholder="Ex: 8:00 AM - 10:00 PM"
        required={false}
        vertical
        className="mb-3"
      />
      <HSAInput
        name={CONFIG_OPENING_HOURS + ".tuesday"}
        label="Tuesday"
        placeholder="Ex: 8:00 AM - 10:00 PM"
        required={false}
        vertical
        className="mb-3"
      />
      <HSAInput
        name={CONFIG_OPENING_HOURS + ".wednesday"}
        label="Wednesday"
        placeholder="Ex: 8:00 AM - 10:00 PM"
        required={false}
        vertical
        className="mb-3"
      />
      <HSAInput
        name={CONFIG_OPENING_HOURS + ".thursday"}
        label="Thursday"
        placeholder="Ex: 8:00 AM - 10:00 PM"
        required={false}
        vertical
        className="mb-3"
      />
      <HSAInput
        name={CONFIG_OPENING_HOURS + ".friday"}
        label="Friday"
        placeholder="Ex: 8:00 AM - 10:00 PM"
        required={false}
        vertical
        className="mb-3"
      />
      <HSAInput
        name={CONFIG_OPENING_HOURS + ".saturday"}
        label="Saturday"
        placeholder="Ex: 8:00 AM - 10:00 PM"
        required={false}
        vertical
        className="mb-3"
      />
      <HSAInput
        name={CONFIG_OPENING_HOURS + ".sunday"}
        label="Sunday"
        placeholder="Ex: 8:00 AM - 10:00 PM"
        required={false}
        vertical
        className="mb-3"
      />
    </ABox>
  );
};

export default OpeningHourSettingPage;
