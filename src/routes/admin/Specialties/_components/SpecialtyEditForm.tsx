import HSAInput from "@/components/admin/form/HSAInput";
import HSATextarea from "@/components/admin/form/HSATextarea";
import ABox from "@/components/admin/ui/ABox";
import AFormH2 from "@/components/admin/ui/AFormH2";
import HSImageUpload from "@/components/global/form/HSImageUpload";
import HSButton from "@/components/global/shared/HSButton";
import { Form } from "@/components/ui/form";
import { AUTH_KEY } from "@/constants";
import { SpecialtyQueries } from "@/lib/modules/specialty/specialty.queries";
import { TSpecialty } from "@/lib/modules/specialty/specialty.type";
import { SpecialtyValidation } from "@/lib/modules/specialty/specialty.validation";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

type TFormType = z.infer<typeof SpecialtyValidation.update>;

type TProps = {
  specialty: TSpecialty;
};

const SpecialtyEditForm = ({ specialty }: TProps) => {
  const [cookies] = useCookies([AUTH_KEY]);

  const navigate = useNavigate();

  const [updateSpecialtyFn] = useMutation(SpecialtyQueries.UPDATE_SPECIALTY, {
    context: {
      headers: {
        Authorization: cookies[AUTH_KEY] || "",
      },
    },
    update: (cache, { data }) => {
      const isCachedSpecialtiesExist = cache.readQuery({
        query: SpecialtyQueries.SPECIALTY_LIST,
      }) as any;

      if (isCachedSpecialtiesExist) {
        const existingList = [
          ...(isCachedSpecialtiesExist?.getAllSpecialties
            ?.specialties as TSpecialty[]),
        ];

        const findIndex = existingList.findIndex(
          (item) => item.id === specialty.id,
        );

        if (findIndex === -1) return;

        existingList[findIndex] = data?.updateSpecialty?.specialty;

        cache.writeQuery({
          query: SpecialtyQueries.SPECIALTY_LIST,
          data: {
            getAllSpecialties: {
              ...isCachedSpecialtiesExist?.getAllSpecialties,
              specialties: existingList,
            },
          },
        });
      } else return;
    },
  });

  const form = useForm<TFormType>({
    defaultValues: {
      specialtyId: specialty.id,
      name: specialty.name,
      description: specialty?.description ?? "",
      iconId: specialty?.icon?.id,
    },
    resolver: zodResolver(SpecialtyValidation.update),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<TFormType> = async (data) => {
    try {
      toast.promise(
        async () => {
          return (await updateSpecialtyFn({ variables: { ...data } })).data
            ?.createSpecialty;
        },
        {
          loading: "Updating Specialty...",
          success: () => {
            navigate("/admin/specialties");
            return "Specialty updated successfully.";
          },
          error: (error: any) => error?.message,
        },
      );
    } catch {
      toast.error("A Client error occurred");
    }
  };

  const onCancel = () => {
    form.reset();
    navigate("/admin/specialties");
  };

  return (
    <ABox>
      <AFormH2>Edit {specialty.name}</AFormH2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <HSAInput type="text" name="name" label="Specialty Name" />
          <HSATextarea
            name="description"
            label="Description"
            required={false}
          />
          <HSImageUpload
            name="iconId"
            label="Icon"
            reset={false}
            defaultValue={specialty?.icon ? [specialty.icon] : []}
          />

          <div>
            <HSButton
              type="button"
              onClick={onCancel}
              className="mr-2 rounded-none text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              variant="outline"
            >
              Cancel
            </HSButton>

            <HSButton
              className="rounded-none"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Updating..." : "Update"}
            </HSButton>
          </div>
        </form>
      </Form>
    </ABox>
  );
};

export default SpecialtyEditForm;
