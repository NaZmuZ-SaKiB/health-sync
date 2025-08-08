import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import DGrid from "@/components/global/shared/DGrid";
import HSButton from "@/components/global/shared/HSButton";
import { Form } from "@/components/ui/form";
import { SettingValidation } from "@/lib/modules/setting/setting.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import HeroSectionSettings from "./_components/HeroSectionSettings";
import AboutSectionSetting from "./_components/AboutSectionSetting";
import PresidentSectionSetting from "./_components/PresidentSectionSetting";
import FeaturedServicesSetting from "./_components/FeaturedServicesSetting";
import HSImageUpload from "@/components/global/form/HSImageUpload";
import { CONFIG_TESTIMONIAL_IMAGE } from "@/lib/modules/setting/setting.constant";
import ABox from "@/components/admin/ui/ABox";
import AFormH2 from "@/components/admin/ui/AFormH2";
import FeaturedSpecialtiesSetting from "./_components/FeaturedSpecialtiesSetting";
import FAQSetting from "./_components/FAQSetting";
import { TSetting } from "@/lib/modules/setting/setting.type";
import { useCookies } from "react-cookie";
import { AUTH_KEY } from "@/constants";
import { useMutation } from "@apollo/client";
import { SettingQueries } from "@/lib/modules/setting/setting.queries";
import { toast } from "sonner";

type TForm = z.infer<typeof SettingValidation.homepage>;

const HomepageSettingPage = () => {
  const [cookies] = useCookies([AUTH_KEY]);

  const [updateSettingFn] = useMutation(SettingQueries.UPDATE_MANY_SETTINGS, {
    context: {
      headers: {
        Authorization: cookies[AUTH_KEY] || "",
      },
    },
  });

  const form = useForm<TForm>({
    resolver: zodResolver(SettingValidation.homepage),
    mode: "onBlur",
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

    console.log("update data", updateData);

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
          onSubmit={form.handleSubmit(saveHomepageSetting)}
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
                  reset={false}
                />
              </ABox>

              <FeaturedServicesSetting />

              <FeaturedSpecialtiesSetting />

              <FAQSetting />
            </div>
          </DGrid>
        </form>
      </Form>
    </APageContainer>
  );
};

export default HomepageSettingPage;
