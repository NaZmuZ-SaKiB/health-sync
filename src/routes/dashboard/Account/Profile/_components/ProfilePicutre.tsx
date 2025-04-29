import DBox from "@/components/dashboard/ui/DBox";
import HSButton from "@/components/global/shared/HSButton";
import ImageModal from "@/components/global/shared/ImageModal";
import UploadImageButton from "@/components/global/shared/UploadImageButton";
import { AUTH_KEY, Images } from "@/constants";
import { TImage } from "@/lib/modules/image/image.type";
import { UserQueries } from "@/lib/modules/user/user.queries";
import { useMutation } from "@apollo/client";
import { Camera, Check, Plus, X } from "lucide-react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

const ProfilePicutre = ({ image }: { image: TImage | null }) => {
  const [cookies] = useCookies([AUTH_KEY]);

  const [selectedImages, setSelectedImages] = useState<TImage[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);

  const [updateProfilePictureFn] = useMutation(
    UserQueries.UPDATE_PROFILE_PICTURE,
    {
      context: {
        headers: {
          Authorization: cookies[AUTH_KEY] || "",
        },
      },
      refetchQueries: [UserQueries.PROFILE],
    },
  );

  const handleUpdate = async () => {
    if (selectedImages.length === 0) return;

    try {
      toast.promise(
        async () => {
          return (
            await updateProfilePictureFn({
              variables: { id: selectedImages[0]?.id },
            })
          ).data?.updateProfilePicture;
        },
        {
          loading: "Updating Profile Picture...",
          success: () => {
            setEditMode(false);
            return "Profile Picture Updated.";
          },
          error: (error: any) => error?.message,
        },
      );
    } catch {
      toast.error("A Client error occurred");
    }
  };
  return (
    <DBox className="group relative">
      <img
        src={
          selectedImages?.[0]?.secureUrl ??
          image?.secureUrl ??
          Images.PlaceholderImage
        }
        alt=""
      />

      {!editMode && (
        <div
          className="bg-secondary invisible absolute right-0 bottom-0 flex cursor-pointer items-center gap-2 rounded-tl-lg rounded-br-lg p-2 px-3 text-slate-50 opacity-0 transition-opacity duration-300 group-hover:visible group-hover:opacity-100"
          onClick={() => setEditMode(true)}
        >
          <Camera className="size-4" /> <span className="text-sm">Change</span>
        </div>
      )}

      {editMode && (
        <div className="mt-4 flex items-stretch justify-between">
          <div className="flex items-stretch gap-2">
            <ImageModal
              selectedImages={selectedImages}
              setSelectedImages={setSelectedImages}
              title={`Select Image`}
              multiple={false}
            />
            <UploadImageButton>
              <HSButton
                variant="outline"
                size="icon"
                className="text-primary-hover h-full rounded-none"
              >
                <Plus className="size-5" />
              </HSButton>
            </UploadImageButton>

            <HSButton
              variant="outline"
              size="icon"
              className="h-full rounded-none text-green-500"
              onClick={handleUpdate}
            >
              <Check className="size-5" />
            </HSButton>
          </div>

          <div>
            <HSButton
              variant="outline"
              size="icon"
              className="h-full rounded-none"
              onClick={() => {
                setSelectedImages([]);
                setEditMode(false);
              }}
            >
              <X className="size-5" />
            </HSButton>
          </div>
        </div>
      )}
    </DBox>
  );
};

export default ProfilePicutre;
