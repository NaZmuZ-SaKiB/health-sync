import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImageQueries } from "@/lib/modules/image/image.queries";
import { TImage } from "@/lib/modules/image/image.type";
import { TMeta } from "@/types";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import HSButton from "./HSButton";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import HSPagination from "./HSPagination";
import { useCookies } from "react-cookie";
import { AUTH_KEY } from "@/constants";

type TProps = {
  selectedImages: TImage[];
  setSelectedImages: (images: TImage[]) => void;
  multiple?: boolean;
  title?: string;
  isProfilePicture?: boolean;
};

type TFilters = {
  limit: string;
  page: number;
  searchTerm: string;
  isProfilePicture?: boolean;
};

const ImageModal = ({
  selectedImages,
  setSelectedImages,
  multiple = false,
  title = "Select Image",
  isProfilePicture = false,
}: TProps) => {
  const [cookies] = useCookies([AUTH_KEY]);

  const [filters, setFilters] = useState<TFilters>({
    limit: "35",
    page: 1,
    searchTerm: "",
    isProfilePicture,
  });

  const onPageChange = (page: number) => {
    setFilters({ ...filters, page });
  };

  // TODO: Implement search and limit change
  //   const onLimitChange = (limit: string) => {
  //     setFilters({ ...filters, limit: parseInt(limit) });
  //   };

  //   const onSearchChange = (searchTerm: string) => {
  //     setFilters({ ...filters, searchTerm });
  //   };

  const { data: imagesData, loading } = useQuery(ImageQueries.IMAGE_LIST, {
    variables: { ...filters, page: filters.page.toString() },
    context: {
      headers: {
        Authorization: cookies[AUTH_KEY] || "",
      },
    },
  });

  const handleClick = (image: TImage) => {
    if (multiple) {
      if (selectedImages.find((img) => img.id === image.id)) {
        setSelectedImages(selectedImages.filter((img) => img.id !== image.id));
      } else {
        setSelectedImages([...selectedImages, image]);
      }
    } else {
      setSelectedImages([image]);
    }
  };

  // TODO: Loading UI
  if (loading) return null;

  const meta: TMeta = imagesData?.getAllImages?.meta;
  const totalPages = Math.ceil(meta.total / meta.limit);

  return (
    <Dialog>
      <DialogTrigger asChild className="no-focus">
        <HSButton
          className="h-auto self-start rounded-none px-5 py-2"
          variant="outline"
        >
          {title}
        </HSButton>
      </DialogTrigger>

      <DialogContent className="no-focus flex h-[95svh] !max-w-[95vw] flex-col overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-semibold">
            Insert File{multiple ? "s" : ""}
          </DialogTitle>
        </DialogHeader>

        <div className="h-full">
          {loading && (
            <div className="grid h-[400px] place-items-center">
              <Loader2 className="text-primary mx-auto size-[50px] animate-spin" />
            </div>
          )}

          <div className="grid grid-cols-[repeat(auto-fill,minmax(128px,1fr))] gap-3 max-sm:justify-center">
            {imagesData?.getAllImages?.images?.map((image: TImage) => {
              const isActive = !!selectedImages.find(
                (img) => img.id === image.id,
              );
              return (
                <div
                  key={image.id}
                  className={cn("relative border-2 border-transparent", {
                    "border-secondary": isActive,
                  })}
                  onClick={() => handleClick(image)}
                >
                  <div className="aspect-square cursor-pointer overflow-hidden border-2 border-slate-300 bg-slate-100">
                    <img
                      src={image.secureUrl}
                      width={128}
                      height={128}
                      alt={image.name}
                      className="size-full object-cover"
                    />
                  </div>
                  <div
                    className={cn(
                      "border-secondary absolute -top-2 -right-3 border bg-white p-[1px]",
                      {
                        hidden: !isActive,
                      },
                    )}
                  >
                    <div className="bg-secondary p-1 text-white">
                      <Check strokeWidth="4px" className="size-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <DialogFooter className="flex w-full !items-center !justify-between border-t pt-2 max-lg:!flex-col-reverse">
          <div className="mt-2">
            <div className="text-sm text-slate-700">
              Showing {meta.limit < meta.total ? meta.limit : meta.total} of{" "}
              {meta.total}. ({totalPages} page
              {totalPages > 1 ? "s" : ""}.)
            </div>
            {totalPages !== 1 && (
              <HSPagination
                page={meta?.page || 1}
                limit={meta?.limit || 35}
                total={meta?.total}
                customFunction={onPageChange}
                admin
              />
            )}
          </div>
          <DialogClose asChild>
            <HSButton className="h-auto rounded-none px-3 py-2 lg:self-end">
              Use Image{multiple ? "s" : ""}
            </HSButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
