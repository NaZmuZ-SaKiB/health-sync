import HSAInput from "@/components/admin/form/HSAInput";
import HSATextarea from "@/components/admin/form/HSATextarea";
import ABox from "@/components/admin/ui/ABox";
import AFormH2 from "@/components/admin/ui/AFormH2";
import APageHeader from "@/components/admin/ui/APageHeader";
import HSDDateInput from "@/components/dashboard/form/HSDDateInput";
import HSDSelect from "@/components/dashboard/form/HSDSelect";
import ProfilePicutre from "@/components/dashboard/shared/ProfilePicutre";
import DGrid from "@/components/global/shared/DGrid";
import HSButton from "@/components/global/shared/HSButton";
import { Form } from "@/components/ui/form";
import { AUTH_KEY, GENDER, genders } from "@/constants";
import { AuthValidation } from "@/lib/modules/auth/auth.validation";
import { UserQueries } from "@/lib/modules/user/user.queries";
import { TUser } from "@/lib/modules/user/user.type";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

type TForm = z.infer<typeof AuthValidation.update>;

const genderOptions = genders.map((gender) => ({
  label: gender,
  value: gender,
}));

const AdminProfileEditForm = ({ user }: { user: TUser }) => {
  const [cookies] = useCookies([AUTH_KEY]);

  const navigate = useNavigate();

  const [updateProfileFn] = useMutation(UserQueries.UPDATE_PROFILE, {
    context: {
      headers: {
        Authorization: cookies[AUTH_KEY] || "",
      },
    },
    refetchQueries: [UserQueries.PROFILE],
  });

  const form = useForm<TForm>({
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      gender: user?.gender ?? GENDER.MALE,
      phoneNumber: user?.phoneNumber ?? "",
      dateOfBirth: user?.dateOfBirth ?? "",
      address: user?.address ?? "",
    },
    resolver: zodResolver(AuthValidation.update),
  });

  const handleUpdate: SubmitHandler<TForm> = async (data) => {
    try {
      toast.promise(
        async () => {
          return await updateProfileFn({ variables: data });
        },
        {
          loading: "Saving Changes...",
          success: () => {
            navigate("/admin/account/profile");
            return "Profile Updated.";
          },
          error: (error: any) => error?.message,
        },
      );

      console.log(data);
    } catch {
      toast.error("A Client error occurred");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleUpdate)}
        className="flex flex-col gap-3"
      >
        <APageHeader title={`Edit Profile`}>
          <div className="flex gap-2">
            <Link to={`/admin/account/profile`}>
              <HSButton
                type="button"
                variant="outline"
                className="border-secondary text-secondary h-auto self-start rounded-none px-5 py-2"
              >
                Cancel
              </HSButton>
            </Link>

            <HSButton
              type="submit"
              variant="secondary"
              className="border-secondary h-auto self-start rounded-none border px-5 py-2"
              disabled={form.formState.isSubmitting}
            >
              Save
            </HSButton>
          </div>
        </APageHeader>

        <DGrid small reverse className="gap-3 @max-5xl:space-y-3">
          <div className="space-y-3">
            <ABox>
              <AFormH2 className="">Personal Info</AFormH2>
              <div className="grid grid-cols-6 gap-5">
                <div className="col-span-3">
                  <HSAInput
                    name="firstName"
                    label="First Name"
                    required={false}
                  />
                </div>
                <div className="col-span-3">
                  <HSAInput
                    name="lastName"
                    label="Last Name"
                    required={false}
                  />
                </div>
                <div className="col-span-3">
                  <HSDSelect
                    name="gender"
                    label="Gender"
                    options={genderOptions}
                    required={false}
                    className="rounded-none bg-slate-50"
                  />
                </div>
                <div className="col-span-3">
                  <HSAInput
                    name="phoneNumber"
                    label="Phone Number"
                    required={false}
                  />
                </div>
                <div className="col-span-3">
                  <HSDDateInput
                    name="dateOfBirth"
                    label="Date of Birth"
                    required={false}
                    admin
                  />
                </div>
                <div className="col-span-3">
                  <HSATextarea
                    name="address"
                    label="Address"
                    required={false}
                  />
                </div>
              </div>
            </ABox>
          </div>
          <div>
            <ProfilePicutre image={user?.profilePicture} isEditMode />
          </div>
        </DGrid>
      </form>
    </Form>
  );
};

export default AdminProfileEditForm;
