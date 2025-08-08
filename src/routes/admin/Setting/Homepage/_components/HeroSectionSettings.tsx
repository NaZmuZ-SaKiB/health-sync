import {
  CONFIG_FEATURED_DOCTOR,
  CONFIG_HERO_IMAGE,
  CONFIG_HERO_REVIEW,
  CONFIG_HERO_SUBTITLE_TEXT,
  CONFIG_HERO_TITLE_TEXT,
} from "@/lib/modules/setting/setting.constant";
import HSAInput from "@/components/admin/form/HSAInput";
import ABox from "@/components/admin/ui/ABox";
import AFormH2 from "@/components/admin/ui/AFormH2";
import DoctorAutocomplete from "./DoctorAutocomplete";
import ReviewInput from "./ReviewInput";
import HSImageUpload from "@/components/global/form/HSImageUpload";

const HeroSectionSettings = () => {
  return (
    <ABox>
      <AFormH2>Hero Section</AFormH2>

      <HSAInput
        name={CONFIG_HERO_TITLE_TEXT}
        label={CONFIG_HERO_TITLE_TEXT.toLowerCase().split("_").join(" ")}
        required={false}
        className="mb-3"
      />

      <HSAInput
        name={CONFIG_HERO_SUBTITLE_TEXT}
        label={CONFIG_HERO_SUBTITLE_TEXT.toLowerCase().split("_").join(" ")}
        required={false}
        className="mb-3"
      />

      <div className="mb-3">
        <DoctorAutocomplete
          name={CONFIG_FEATURED_DOCTOR}
          label={CONFIG_FEATURED_DOCTOR.toLowerCase().split("_").join(" ")}
          required={false}
        />
      </div>

      <div className="mb-3">
        <ReviewInput
          name={CONFIG_HERO_REVIEW}
          label={CONFIG_HERO_REVIEW.toLowerCase().split("_").join(" ")}
        />
      </div>

      <div className="mb-3">
        <HSImageUpload
          name={CONFIG_HERO_IMAGE}
          label={CONFIG_HERO_IMAGE.toLowerCase().split("_").join(" ")}
          defaultValue={[]}
          reset={false}
        />
      </div>
    </ABox>
  );
};

export default HeroSectionSettings;
