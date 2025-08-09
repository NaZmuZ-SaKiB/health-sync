import DGrid from "@/components/global/shared/DGrid";
import { Form } from "@/components/ui/form";
import HeroSectionSettings from "./HeroSectionSettings";
import AboutSectionSetting from "./AboutSectionSetting";
import PresidentSectionSetting from "./PresidentSectionSetting";
import FeaturedServicesSetting from "./FeaturedServicesSetting";
import HSImageUpload from "@/components/global/form/HSImageUpload";
import {
  CONFIG_ABOUT_LIST,
  CONFIG_ABOUT_TEXT,
  CONFIG_FAQ_ITEMS,
  CONFIG_FEATURED_DOCTOR,
  CONFIG_FEATURED_SERVICES,
  CONFIG_FEATURED_SPECIALTIES,
  CONFIG_HERO_IMAGE,
  CONFIG_HERO_REVIEW,
  CONFIG_HERO_SUBTITLE_TEXT,
  CONFIG_HERO_TITLE_TEXT,
  CONFIG_PRESIDENT_EXPERIENCE,
  CONFIG_PRESIDENT_IMAGE,
  CONFIG_PRESIDENT_NAME,
  CONFIG_PRESIDENT_POSITION,
  CONFIG_PRESIDENT_SKILLS,
  CONFIG_PRESIDENT_TEXT,
  CONFIG_TESTIMONIAL_IMAGE,
} from "@/lib/modules/setting/setting.constant";
import ABox from "@/components/admin/ui/ABox";
import AFormH2 from "@/components/admin/ui/AFormH2";
import FeaturedSpecialtiesSetting from "./FeaturedSpecialtiesSetting";
import FAQSetting from "./FAQSetting";
import { SettingValidation } from "@/lib/modules/setting/setting.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { TSetting } from "@/lib/modules/setting/setting.type";
import { useCookies } from "react-cookie";
import { AUTH_KEY } from "@/constants";
import { useMutation } from "@apollo/client";
import { SettingQueries } from "@/lib/modules/setting/setting.queries";
import { toast } from "sonner";

type TForm = z.infer<typeof SettingValidation.homepage>;

const HomepageSettingForm = ({
  homepageSettings,
}: {
  homepageSettings: string;
}) => {
  const [cookies] = useCookies([AUTH_KEY]);

  const [updateSettingFn] = useMutation(SettingQueries.UPDATE_MANY_SETTINGS, {
    context: {
      headers: {
        Authorization: cookies[AUTH_KEY] || "",
      },
    },
  });

  const parsedSettings = JSON.parse(homepageSettings || "{}");

  const formDefaultValues = {
    [CONFIG_HERO_TITLE_TEXT]: parsedSettings[CONFIG_HERO_TITLE_TEXT] || "",
    [CONFIG_HERO_SUBTITLE_TEXT]:
      parsedSettings[CONFIG_HERO_SUBTITLE_TEXT] || "",
    [CONFIG_HERO_IMAGE]: parsedSettings[CONFIG_HERO_IMAGE]?.id || "",
    [CONFIG_HERO_REVIEW]: parsedSettings[CONFIG_HERO_REVIEW]?.id || "",
    [CONFIG_FEATURED_DOCTOR]: parsedSettings[CONFIG_FEATURED_DOCTOR]?.id || "",

    [CONFIG_ABOUT_TEXT]: parsedSettings[CONFIG_ABOUT_TEXT] || "",
    [CONFIG_ABOUT_LIST]: parsedSettings[CONFIG_ABOUT_LIST] || "",

    [CONFIG_PRESIDENT_IMAGE]: parsedSettings[CONFIG_PRESIDENT_IMAGE]?.id || "",
    [CONFIG_PRESIDENT_NAME]: parsedSettings[CONFIG_PRESIDENT_NAME] || "",
    [CONFIG_PRESIDENT_POSITION]:
      parsedSettings[CONFIG_PRESIDENT_POSITION] || "",
    [CONFIG_PRESIDENT_EXPERIENCE]:
      parsedSettings[CONFIG_PRESIDENT_EXPERIENCE] || "",
    [CONFIG_PRESIDENT_TEXT]: parsedSettings[CONFIG_PRESIDENT_TEXT] || "",
    [CONFIG_PRESIDENT_SKILLS]: parsedSettings[CONFIG_PRESIDENT_SKILLS] || "",

    [CONFIG_TESTIMONIAL_IMAGE]:
      parsedSettings[CONFIG_TESTIMONIAL_IMAGE]?.id || "",

    [CONFIG_FEATURED_SERVICES]:
      parsedSettings[CONFIG_FEATURED_SERVICES].map((item: any) => item.id) ||
      [],
    [CONFIG_FEATURED_SPECIALTIES]:
      parsedSettings[CONFIG_FEATURED_SPECIALTIES].map((item: any) => item.id) ||
      [],

    [CONFIG_FAQ_ITEMS]: parsedSettings[CONFIG_FAQ_ITEMS] || [],
  };

  const form = useForm<TForm>({
    resolver: zodResolver(SettingValidation.homepage),
    mode: "onBlur",
    defaultValues: formDefaultValues,
  });

  const saveHomepageSetting: SubmitHandler<TForm> = async (data) => {
    const updateData: Pick<TSetting, "key" | "value">[] = [];

    (Object.keys(data) as (keyof TForm)[]).forEach((key) => {
      if (data[key]) {
        updateData.push({
          key: key,
          value:
            typeof data[key] === "string"
              ? data[key]
              : JSON.stringify(data[key]),
        });
      }
    });

    try {
      toast.promise(
        async () => {
          return await updateSettingFn({ variables: { settings: updateData } });
        },
        {
          loading: "Saving Homepage Setting...",
          success: () => {
            return "Settings Saved.";
          },
          error: (error: any) => error?.message,
        },
      );
    } catch {
      toast.error("A Client error occurred");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(saveHomepageSetting)}
        id="homepage-setting-form"
      >
        <DGrid equal>
          <div className="space-y-3">
            <HeroSectionSettings
              doctor={parsedSettings[CONFIG_FEATURED_DOCTOR] || null}
              review={parsedSettings[CONFIG_HERO_REVIEW] || null}
              heroImage={parsedSettings[CONFIG_HERO_IMAGE] || null}
            />

            <AboutSectionSetting />

            <PresidentSectionSetting
              image={parsedSettings[CONFIG_PRESIDENT_IMAGE] || null}
            />
          </div>

          <div className="space-y-3">
            <ABox className="mb-3">
              <AFormH2>Testimonial Section</AFormH2>

              <HSImageUpload
                name={CONFIG_TESTIMONIAL_IMAGE}
                label={CONFIG_TESTIMONIAL_IMAGE.toLowerCase()
                  .split("_")
                  .join(" ")}
                defaultValue={
                  parsedSettings[CONFIG_TESTIMONIAL_IMAGE]
                    ? [parsedSettings[CONFIG_TESTIMONIAL_IMAGE]]
                    : []
                }
                reset={false}
              />
            </ABox>

            <FeaturedServicesSetting
              defaultValues={parsedSettings[CONFIG_FEATURED_SERVICES] || []}
            />

            <FeaturedSpecialtiesSetting
              defaultValues={parsedSettings[CONFIG_FEATURED_SPECIALTIES] || []}
            />

            <FAQSetting
              defaultValues={parsedSettings[CONFIG_FAQ_ITEMS] || []}
            />
          </div>
        </DGrid>
      </form>
    </Form>
  );
};

export default HomepageSettingForm;
