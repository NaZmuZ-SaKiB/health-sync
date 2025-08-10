import HSAInput from "@/components/admin/form/HSAInput";
import ABox from "@/components/admin/ui/ABox";
import AFormH2 from "@/components/admin/ui/AFormH2";
import { Form } from "@/components/ui/form";
import { AUTH_KEY } from "@/constants";
import {
  CONFIG_CONTACT_EMAIL,
  CONFIG_CONTACT_PHONE,
  CONFIG_SOCIAL_LINKS,
  CONFIG_SUPPORT_EMAIL,
} from "@/lib/modules/setting/setting.constant";
import { SettingQueries } from "@/lib/modules/setting/setting.queries";
import { SettingValidation } from "@/lib/modules/setting/setting.validation";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type TForm = z.infer<typeof SettingValidation.contact>;

const ContactSettingForm = ({
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
    resolver: zodResolver(SettingValidation.contact),
    mode: "onBlur",
    defaultValues: {
      [CONFIG_CONTACT_EMAIL]: parsedSettings[CONFIG_CONTACT_EMAIL] || "",
      [CONFIG_SUPPORT_EMAIL]: parsedSettings[CONFIG_SUPPORT_EMAIL] || "",
      [CONFIG_CONTACT_PHONE]: parsedSettings[CONFIG_CONTACT_PHONE] || "",
      [CONFIG_SOCIAL_LINKS]: {
        facebook: parsedSettings[CONFIG_SOCIAL_LINKS]?.facebook || "",
        twitter: parsedSettings[CONFIG_SOCIAL_LINKS]?.twitter || "",
        instagram: parsedSettings[CONFIG_SOCIAL_LINKS]?.instagram || "",
        linkedin: parsedSettings[CONFIG_SOCIAL_LINKS]?.linkedin || "",
        youtube: parsedSettings[CONFIG_SOCIAL_LINKS]?.youtube || "",
      },
    },
  });

  const saveContactSettings: SubmitHandler<TForm> = async (data) => {
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
          loading: "Saving Contact Setting...",
          success: () => {
            return "Contacts Saved.";
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
        onSubmit={form.handleSubmit(saveContactSettings)}
        id="contact-setting-form"
        className="space-y-3"
      >
        <ABox className="space-y-3">
          <AFormH2>Emails</AFormH2>

          <HSAInput
            name={CONFIG_CONTACT_EMAIL}
            label={CONFIG_CONTACT_EMAIL.toLowerCase().split("_").join(" ")}
            required={false}
          />
          <HSAInput
            name={CONFIG_SUPPORT_EMAIL}
            label={CONFIG_SUPPORT_EMAIL.toLowerCase().split("_").join(" ")}
            required={false}
          />

          <AFormH2>Phones</AFormH2>

          <HSAInput
            name={CONFIG_CONTACT_PHONE}
            label={CONFIG_CONTACT_PHONE.toLowerCase().split("_").join(" ")}
            required={false}
          />
        </ABox>

        <ABox className="space-y-3">
          <AFormH2>Social Links</AFormH2>

          <HSAInput
            name={CONFIG_SOCIAL_LINKS + ".facebook"}
            label={"Facebook"}
            required={false}
            vertical
          />
          <HSAInput
            name={CONFIG_SOCIAL_LINKS + ".instagram"}
            label={"Instagram"}
            required={false}
            vertical
          />
          <HSAInput
            name={CONFIG_SOCIAL_LINKS + ".twitter"}
            label={"Twitter"}
            required={false}
            vertical
          />
          <HSAInput
            name={CONFIG_SOCIAL_LINKS + ".linkedin"}
            label={"Linkedin"}
            required={false}
            vertical
          />
          <HSAInput
            name={CONFIG_SOCIAL_LINKS + ".youtube"}
            label={"Youtube"}
            required={false}
            vertical
          />
        </ABox>
      </form>
    </Form>
  );
};

export default ContactSettingForm;
