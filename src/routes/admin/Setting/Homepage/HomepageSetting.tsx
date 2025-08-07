import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import DGrid from "@/components/global/shared/DGrid";
import HSButton from "@/components/global/shared/HSButton";
import { Form } from "@/components/ui/form";
import { SettingValidation } from "@/lib/modules/setting/setting.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import HeroSectionSettings from "./_components/HeroSectionSettings";
import AboutSectionSetting from "./_components/AboutSectionSetting";
import PresidentSectionSetting from "./_components/PresidentSectionSetting";
import FeaturedServicesSetting from "./_components/FeaturedServicesSetting";
import HSImageUpload from "@/components/global/form/HSImageUpload";
import { CONFIG_TESTIMONIAL_IMAGE } from "@/lib/modules/setting/setting.constant";
import ABox from "@/components/admin/ui/ABox";
import AFormH2 from "@/components/admin/ui/AFormH2";

type TForm = z.infer<typeof SettingValidation.homepage>;

const HomepageSettingPage = () => {
  const form = useForm<TForm>({
    resolver: zodResolver(SettingValidation.homepage),
    mode: "onBlur",
  });

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

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => console.log("data", data))}
          id="homepage-setting-form"
        >
          <DGrid equal>
            <div className="space-y-3">
              <HeroSectionSettings />

              <AboutSectionSetting />

              <PresidentSectionSetting />
            </div>

            <div className="space-y-3">
              <ABox className="mb-3">
                <AFormH2>Testimonial Section</AFormH2>

                <HSImageUpload
                  name={CONFIG_TESTIMONIAL_IMAGE}
                  label={CONFIG_TESTIMONIAL_IMAGE.toLowerCase()
                    .split("_")
                    .join(" ")}
                  defaultValue={[]}
                />
              </ABox>

              <FeaturedServicesSetting />
            </div>
          </DGrid>
        </form>
      </Form>
    </APageContainer>
  );
};

export default HomepageSettingPage;
