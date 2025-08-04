import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TImage } from "@/lib/modules/image/image.type";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import HSButton from "../shared/HSButton";
import ImageModal from "../shared/ImageModal";
import UploadImageButton from "../shared/UploadImageButton";

type TProps = {
  name: string;
  label: string;
  defaultValue?: TImage[];
  multiple?: boolean;
  description?: string;
  reset?: boolean;
  isProfilePicture?: boolean;
};

const HSImageUpload = ({
  name,
  label,
  defaultValue = [],
  multiple = false,
  description,
  reset = true,
  isProfilePicture = false,
}: TProps) => {
  const { control, setValue, formState } = useFormContext();

  const [images, setImages] = useState<TImage[]>(defaultValue);
  const [imageIds, setImageIds] = useState<string[]>(
    multiple ? defaultValue.map((img) => img?.id) : [],
  );
  const [singleImageId, setSingleImageId] = useState<string | null>(
    multiple ? null : defaultValue[0]?.id,
  );

  useEffect(() => {
    const ids = images.map((image) => image.id);

    if (multiple) {
      setImageIds(ids);
    } else {
      setSingleImageId(ids[0]);
    }
  }, [images, multiple]);

  useEffect(() => {
    if (multiple) {
      setValue(name, imageIds);
    } else {
      setValue(name, singleImageId);
    }
  }, [imageIds, singleImageId, setValue, name, multiple]);

  useEffect(() => {
    if (formState.isSubmitted && reset) {
      setImages(defaultValue);
    }
  }, [formState, defaultValue, reset]);

  const handleRemoveImage = (id: string) => {
    if (multiple) {
      const updatedImages = images.filter((img) => img.id !== id);
      setImages(updatedImages);
    } else {
      setImages([]);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className="flex w-full flex-col gap-1">
          <FormLabel className="font-medium">{label}</FormLabel>
          <FormControl>
            <div className="flex flex-col items-start gap-4">
              {images.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {images.map((img: TImage) => (
                    <div
                      key={img.id}
                      className="relative flex aspect-square items-center justify-center border"
                    >
                      <img
                        src={img.secureUrl}
                        alt={img.name}
                        width={80}
                        height={80}
                        className="object-contain"
                      />

                      <div
                        className="absolute -top-1.5 -right-1.5 cursor-pointer border bg-white"
                        onClick={() => handleRemoveImage(img.id)}
                      >
                        <X className="size-4" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <ImageModal
                  selectedImages={images}
                  setSelectedImages={setImages}
                  title={`Select ${label}`}
                  multiple={multiple}
                  isProfilePicture={isProfilePicture}
                />
                <UploadImageButton>
                  <HSButton
                    type="button"
                    variant="outline"
                    className="text-primary aspect-square h-full self-start rounded-none !px-0 !py-0"
                  >
                    <Plus className="size-6" />
                  </HSButton>
                </UploadImageButton>
              </div>
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="!mt-0 font-normal" />
        </FormItem>
      )}
    />
  );
};

export default HSImageUpload;
