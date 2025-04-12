import HSAInput from "@/components/admin/form/HSAInput";
import HSATextarea from "@/components/admin/form/HSATextarea";
import ABox from "@/components/admin/ui/ABox";
import AFormH2 from "@/components/admin/ui/AFormH2";
import HSButton from "@/components/global/shared/HSButton";
import { Form } from "@/components/ui/form";
import { SpecialtyValidation } from "@/lib/modules/specialty/specialty.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type TFormType = z.infer<typeof SpecialtyValidation.create>;

const SpecialtyCreateForm = () => {
  const form = useForm<TFormType>({
    resolver: zodResolver(SpecialtyValidation.create),
    defaultValues: {
      name: "",
      description: "",
      // TODO: Add Image - field = icon
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<TFormType> = async (data) => {
    console.log(data);
  };

  return (
    <ABox>
      <AFormH2>Add Brand</AFormH2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <HSAInput type="text" name="name" label="Specialty Name" />
          <HSATextarea
            name="description"
            label="Description"
            required={false}
          />
          <HSButton className="rounded-none">Create</HSButton>
        </form>
      </Form>
    </ABox>
  );
};

export default SpecialtyCreateForm;
