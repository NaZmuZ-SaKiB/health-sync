import HSAInput from "@/components/admin/form/HSAInput";
import HSATextarea from "@/components/admin/form/HSATextarea";
import ABox from "@/components/admin/ui/ABox";
import AFormH2 from "@/components/admin/ui/AFormH2";
import HSImageUpload from "@/components/global/form/HSImageUpload";
import { TImage } from "@/lib/modules/image/image.type";
import {
  CONFIG_PRESIDENT_EXPERIENCE,
  CONFIG_PRESIDENT_IMAGE,
  CONFIG_PRESIDENT_NAME,
  CONFIG_PRESIDENT_POSITION,
  CONFIG_PRESIDENT_SKILLS,
  CONFIG_PRESIDENT_TEXT,
} from "@/lib/modules/setting/setting.constant";

const PresidentSectionSetting = ({ image }: { image: TImage }) => {
  return (
    <ABox>
      <AFormH2>President Section</AFormH2>

      <div className="mb-3">
        <HSImageUpload
          name={CONFIG_PRESIDENT_IMAGE}
          label={CONFIG_PRESIDENT_IMAGE.toLowerCase().split("_").join(" ")}
          defaultValue={image ? [image] : []}
          reset={false}
        />
      </div>

      <HSAInput
        name={CONFIG_PRESIDENT_NAME}
        label={CONFIG_PRESIDENT_NAME.toLowerCase().split("_").join(" ")}
        required={false}
        className="mb-3"
      />

      <HSAInput
        name={CONFIG_PRESIDENT_POSITION}
        label={CONFIG_PRESIDENT_POSITION.toLowerCase().split("_").join(" ")}
        required={false}
        className="mb-3"
      />

      <HSAInput
        type="number"
        min={0}
        name={CONFIG_PRESIDENT_EXPERIENCE}
        label={CONFIG_PRESIDENT_EXPERIENCE.toLowerCase().split("_").join(" ")}
        required={false}
        className="mb-3"
      />

      <HSATextarea
        name={CONFIG_PRESIDENT_TEXT}
        label={CONFIG_PRESIDENT_TEXT.toLowerCase().split("_").join(" ")}
        required={false}
        className="mb-3 min-h-36"
      />

      <HSATextarea
        name={CONFIG_PRESIDENT_SKILLS}
        label={CONFIG_PRESIDENT_SKILLS.toLowerCase().split("_").join(" ")}
        placeholder="Ex: Skill 1, Skill 2, Skill 3"
        required={false}
        className="mb-3 min-h-24"
        description={`Write the skills separated by comma.\nEx: Skill 1, Skill 2`}
      />
    </ABox>
  );
};

export default PresidentSectionSetting;
