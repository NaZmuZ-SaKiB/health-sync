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

type TForm = z.infer<typeof SettingValidation.homepage>;

const HomepageSettingsPage = () => {
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
        <form onSubmit={form.handleSubmit((data) => console.log("data", data))}>
          <DGrid equal>
            <div>
              <HeroSectionSettings />
            </div>
          </DGrid>
        </form>
      </Form>
    </APageContainer>
  );
};

export default HomepageSettingsPage;
