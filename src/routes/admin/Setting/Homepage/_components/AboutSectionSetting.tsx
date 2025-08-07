import HSATextarea from "@/components/admin/form/HSATextarea";
import ABox from "@/components/admin/ui/ABox";
import AFormH2 from "@/components/admin/ui/AFormH2";
import {
  CONFIG_ABOUT_LIST,
  CONFIG_ABOUT_TEXT,
} from "@/lib/modules/setting/setting.constant";

const AboutSectionSetting = () => {
  return (
    <ABox>
      <AFormH2>About Section</AFormH2>

      <HSATextarea
        name={CONFIG_ABOUT_TEXT}
        label={CONFIG_ABOUT_TEXT.toLowerCase().split("_").join(" ")}
        required={false}
        className="mb-3 min-h-36"
      />

      <HSATextarea
        name={CONFIG_ABOUT_LIST}
        label={CONFIG_ABOUT_LIST.toLowerCase().split("_").join(" ")}
        placeholder="Ex: Item 1, Item 2, Item 3"
        required={false}
        className="mb-3 min-h-24"
        description={`Write the list items separated by comma.\nEx: Item 1, Item 2`}
      />
    </ABox>
  );
};

export default AboutSectionSetting;
