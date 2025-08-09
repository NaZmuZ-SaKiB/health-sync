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
import { TReview } from "@/lib/modules/review/review.type";
import { TDoctor } from "@/lib/modules/doctor/doctor.type";
import { TImage } from "@/lib/modules/image/image.type";

const HeroSectionSettings = ({
  doctor,
  review,
  heroImage,
}: {
  doctor: TDoctor | null;
  review: TReview | null;
  heroImage: TImage | null;
}) => {
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
          defaultDoctor={doctor}
          required={false}
        />
      </div>

      <div className="mb-3">
        <ReviewInput
          name={CONFIG_HERO_REVIEW}
          label={CONFIG_HERO_REVIEW.toLowerCase().split("_").join(" ")}
          defaultReview={review}
        />
      </div>

      <div className="mb-3">
        <HSImageUpload
          name={CONFIG_HERO_IMAGE}
          label={CONFIG_HERO_IMAGE.toLowerCase().split("_").join(" ")}
          defaultValue={heroImage ? [heroImage] : []}
          reset={false}
        />
      </div>
    </ABox>
  );
};

export default HeroSectionSettings;
