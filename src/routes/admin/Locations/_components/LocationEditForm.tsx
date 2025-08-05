import HSAInput from "@/components/admin/form/HSAInput";
import HSATextarea from "@/components/admin/form/HSATextarea";
import ABox from "@/components/admin/ui/ABox";
import AFormH2 from "@/components/admin/ui/AFormH2";
import HSImageUpload from "@/components/global/form/HSImageUpload";
import HSButton from "@/components/global/shared/HSButton";
import { Form } from "@/components/ui/form";
import { AUTH_KEY } from "@/constants";
import { LocationQueries } from "@/lib/modules/location/location.queries";
import { TLocation } from "@/lib/modules/location/location.type";
import { LocationValidations } from "@/lib/modules/location/location.validation";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

type TFormType = z.infer<typeof LocationValidations.update>;

type TProps = {
  location: TLocation;
};

const LocationEditForm = ({ location }: TProps) => {
  const [cookies] = useCookies([AUTH_KEY]);

  const navigate = useNavigate();

  const [updateLocationFn] = useMutation(LocationQueries.UPDATE_LOCATION, {
    context: {
      headers: {
        Authorization: cookies[AUTH_KEY] || "",
      },
    },
    update: (cache, { data }) => {
      const isCachedLocationsExists = cache.readQuery({
        query: LocationQueries.LOCATION_LIST,
      }) as any;

      if (isCachedLocationsExists) {
        const existingList = [
          ...(isCachedLocationsExists?.getAllLocations
            ?.locations as TLocation[]),
        ];

        const findIndex = existingList.findIndex(
          (item) => item.id === location.id,
        );

        if (findIndex === -1) return;

        existingList[findIndex] = data?.updateLocation;

        cache.writeQuery({
          query: LocationQueries.LOCATION_LIST,
          data: {
            getAllLocations: {
              ...isCachedLocationsExists?.getAllLocations,
              locations: existingList,
            },
          },
        });
      } else return;
    },
  });

  const form = useForm<TFormType>({
    resolver: zodResolver(LocationValidations.update),
    defaultValues: {
      locationId: location.id,
      name: location.name,
      phoneNumber: location.phoneNumber,
      mapUrl: location.mapUrl,
      address: location.address,
      description: location.description ?? "",
      imageId: location?.image?.id,
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<TFormType> = async (data) => {
    try {
      toast.promise(
        async () => {
          return (await updateLocationFn({ variables: { ...data } })).data
            ?.updateLocation;
        },
        {
          loading: "Updating Location...",
          success: () => {
            form.reset();
            navigate("/admin/locations");
            return "Location updated successfully.";
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
    navigate("/admin/locations");
  };

  return (
    <ABox>
      <AFormH2>Edit {location.name}</AFormH2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <HSAInput type="text" name="name" label="Location Name" />
          <HSAInput type="text" name="phoneNumber" label="Phone Number" />
          <HSAInput type="text" name="mapUrl" label="Map URL" />
          <HSAInput type="text" name="address" label="Address" />
          <HSATextarea
            name="description"
            label="Description"
            required={false}
          />
          <HSImageUpload
            name="imageId"
            label="Image"
            reset={false}
            defaultValue={location?.image ? [location?.image] : []}
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

export default LocationEditForm;
