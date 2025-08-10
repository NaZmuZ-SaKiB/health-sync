import HSATextarea from "@/components/admin/form/HSATextarea";
import ABox from "@/components/admin/ui/ABox";
import AFormH2 from "@/components/admin/ui/AFormH2";
import HSButton from "@/components/global/shared/HSButton";
import { Form } from "@/components/ui/form";
import { AUTH_KEY } from "@/constants";
import { CONFIG_FOOTER_TEXT } from "@/lib/modules/setting/setting.constant";
import { SettingQueries } from "@/lib/modules/setting/setting.queries";
import { SettingValidation } from "@/lib/modules/setting/setting.validation";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type TForm = z.infer<typeof SettingValidation.footer>;

const FooterSettingForm = ({
  defaultSettings,
}: {
  defaultSettings: string;
}) => {
  const parsedSettings = JSON.parse(defaultSettings || "{}");

  const [cookies] = useCookies([AUTH_KEY]);

  const [updateSettingFn] = useMutation(SettingQueries.UPDATE_MANY_SETTINGS, {
    context: {
      headers: {
        Authorization: cookies[AUTH_KEY] || "",
      },
    },
  });

  const form = useForm<TForm>({
    resolver: zodResolver(SettingValidation.footer),
    mode: "onBlur",
    defaultValues: {
      [CONFIG_FOOTER_TEXT]: parsedSettings[CONFIG_FOOTER_TEXT] || "",
    },
  });

  const saveFooterSettings: SubmitHandler<TForm> = async (data) => {
    const updateData: { key: string; value: string }[] = [];

    (Object.keys(data) as (keyof typeof data)[]).forEach((key) => {
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
          loading: "Saving Footer Setting...",
          success: () => {
            return "Footer Setting Saved.";
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
        onSubmit={form.handleSubmit(saveFooterSettings)}
        className="space-y-3"
      >
        <ABox className="space-y-3">
          <AFormH2>Footer Info</AFormH2>

          <HSATextarea
            name={CONFIG_FOOTER_TEXT}
            label="Footer Description"
            required={false}
            className="min-h-36"
          />

          <HSButton
            className="rounded-none"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Saving..." : "Save"}
          </HSButton>
        </ABox>
      </form>
    </Form>
  );
};

export default FooterSettingForm;
