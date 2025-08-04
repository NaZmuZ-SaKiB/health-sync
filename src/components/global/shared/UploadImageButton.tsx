import { AUTH_KEY } from "@/constants";
import { ImageQueries } from "@/lib/modules/image/image.queries";
import { useMutation } from "@apollo/client";
import { useCookies } from "react-cookie";
import { Plus } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

declare global {
  interface Window {
    cloudinary: {
      createUploadWidget: (
        options: {
          cloudName: string;
          uploadPreset: string;
          [key: string]: any;
        },
        callback: (error: Error | null, result: any) => void,
      ) => any;
    };
  }
}

type TProps = {
  children?: React.ReactNode;
  className?: ClassValue;
  isProfilePicture?: boolean;
};

const UploadImageButton = ({
  children,
  className,
  isProfilePicture = false,
}: TProps) => {
  const cloudinaryRef = useRef<any>(null);
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    cloudinaryRef.current = window?.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
      },
      (error: any, result: any) => {
        if (error) {
          console.log("image upload error", error);
        }

        if (result.event === "queues-end" && result.info?.files?.length > 0) {
          handleSuccess(
            result?.info?.files?.map((item: any) => item?.uploadInfo),
          );
        }
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [cookies] = useCookies([AUTH_KEY]);

  const [createImagesFn] = useMutation(ImageQueries.CREATE_IMAGES, {
    context: {
      headers: {
        Authorization: cookies[AUTH_KEY] || "",
      },
    },
    refetchQueries: [ImageQueries.IMAGE_LIST],
  });

  const handleSuccess = async (result: any) => {
    const data: any = {};

    data.input = result?.map((item: any) => ({
      name: item?.display_name,
      publicId: item?.public_id,
      height: item?.height,
      width: item?.width,
      format: item?.format,
      url: item?.url,
      secureUrl: item?.secure_url,
      thumbnailUrl: item?.thumbnail_url,
      isProfilePicture: isProfilePicture,
    }));

    try {
      toast.promise(
        async () => {
          return (await createImagesFn({ variables: { ...data } })).data
            ?.createImages;
        },
        {
          loading: "Saving Images...",
          success: () => {
            return "Image Upload Successful.";
          },
          error: (error: any) => error?.message,
        },
      );
    } catch {
      toast.error("A Client error occurred");
    }
  };
  return (
    <div
      className={cn("", className)}
      onClick={() => widgetRef.current?.open()}
    >
      {children ? (
        children
      ) : (
        <div className="hover:border-primary hover:text-primary size-[128px] cursor-pointer rounded-lg border border-slate-300 text-slate-300">
          <Plus className="size-full" />
        </div>
      )}
    </div>
  );
};

export default UploadImageButton;
