import HSAInput from "@/components/admin/form/HSAInput";
import ABox from "@/components/admin/ui/ABox";
import AFormH2 from "@/components/admin/ui/AFormH2";
import { Form } from "@/components/ui/form";
import { AUTH_KEY } from "@/constants";
import { CONFIG_OPENING_HOURS } from "@/lib/modules/setting/setting.constant";
import { SettingQueries } from "@/lib/modules/setting/setting.queries";
import { SettingValidation } from "@/lib/modules/setting/setting.validation";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type TForm = z.infer<typeof SettingValidation.openingHours>;

const OpeningHoursForm = () => {
  const [cookies] = useCookies([AUTH_KEY]);

  const [updateSettingFn] = useMutation(SettingQueries.UPDATE_MANY_SETTINGS, {
    context: {
      headers: {
        Authorization: cookies[AUTH_KEY] || "",
      },
    },
  });

  const form = useForm<TForm>({
    resolver: zodResolver(SettingValidation.openingHours),
    mode: "onBlur",
    defaultValues: {
      [CONFIG_OPENING_HOURS]: {
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: "",
      },
    },
  });

  const saveOpeningHours: SubmitHandler<TForm> = async (data) => {
    console.log("data", data);
  };

  return (
    <ABox>
      <AFormH2>Opening Hours</AFormH2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(saveOpeningHours)}
          id="opening-hours-setting-form"
        >
          <HSAInput
            name={CONFIG_OPENING_HOURS + ".monday"}
            label="Monday"
            placeholder="Ex: 8:00 AM - 10:00 PM"
            required={false}
            vertical
            className="mb-3"
          />
          <HSAInput
            name={CONFIG_OPENING_HOURS + ".tuesday"}
            label="Tuesday"
            placeholder="Ex: 8:00 AM - 10:00 PM"
            required={false}
            vertical
            className="mb-3"
          />
          <HSAInput
            name={CONFIG_OPENING_HOURS + ".wednesday"}
            label="Wednesday"
            placeholder="Ex: 8:00 AM - 10:00 PM"
            required={false}
            vertical
            className="mb-3"
          />
          <HSAInput
            name={CONFIG_OPENING_HOURS + ".thursday"}
            label="Thursday"
            placeholder="Ex: 8:00 AM - 10:00 PM"
            required={false}
            vertical
            className="mb-3"
          />
          <HSAInput
            name={CONFIG_OPENING_HOURS + ".friday"}
            label="Friday"
            placeholder="Ex: 8:00 AM - 10:00 PM"
            required={false}
            vertical
            className="mb-3"
          />
          <HSAInput
            name={CONFIG_OPENING_HOURS + ".saturday"}
            label="Saturday"
            placeholder="Ex: 8:00 AM - 10:00 PM"
            required={false}
            vertical
            className="mb-3"
          />
          <HSAInput
            name={CONFIG_OPENING_HOURS + ".sunday"}
            label="Sunday"
            placeholder="Ex: 8:00 AM - 10:00 PM"
            required={false}
            vertical
            className="mb-3"
          />
        </form>
      </Form>
    </ABox>
  );
};

export default OpeningHoursForm;
