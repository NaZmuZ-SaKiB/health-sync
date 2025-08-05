import ABox from "@/components/admin/ui/ABox";
import HSPagination from "@/components/global/shared/HSPagination";
import RefreshButton from "@/components/global/shared/RefreshButton";
import UploadImageButton from "@/components/global/shared/UploadImageButton";
import { AUTH_KEY } from "@/constants";
import { ImageQueries } from "@/lib/modules/image/image.queries";
import { TImage } from "@/lib/modules/image/image.type";
import { cn } from "@/lib/utils";
import { TMeta } from "@/types";
import { useQuery } from "@apollo/client";
import { Check, Plus } from "lucide-react";
import { useCookies } from "react-cookie";
import { useSearchParams } from "react-router";

type TProps = {
  selected: string[];
  setSelected: (selected: string[]) => void;
};

const MediaGallery = ({ selected, setSelected }: TProps) => {
  const [cookies] = useCookies([AUTH_KEY]);

  const [searchParams] = useSearchParams();

  const {
    data: imagesData,
    loading,
    refetch,
  } = useQuery(ImageQueries.IMAGE_LIST, {
    variables: {
      limit: "35",
      ...Object.fromEntries(searchParams),
      isProfilePicture: false,
    },
    context: {
      headers: {
        Authorization: cookies[AUTH_KEY] || "",
      },
    },
  });

  // TODO: Implement Loading State
  if (loading) return null;

  const meta: TMeta = imagesData?.getAllImages?.meta;
  const totalPages = Math.ceil(meta?.total / meta?.limit);

  return (
    <ABox>
      <RefreshButton fn={refetch} className="mb-2" />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(128px,1fr))] gap-3 max-sm:justify-center">
        <UploadImageButton>
          <div className="text-primary hover:text-primary-hover grid h-full cursor-pointer place-items-center border hover:bg-slate-50">
            <Plus className="size-20" />
          </div>
        </UploadImageButton>
        {imagesData?.getAllImages?.images?.map((image: TImage) => {
          const isActive = !!selected.find((img) => img === image.id);
          return (
            <div
              key={image.id}
              className={cn("relative border-2 border-transparent", {
                "border-primary": isActive,
              })}
              // onClick={() => handleClick(image)}
            >
              <div className="aspect-square cursor-pointer overflow-hidden border border-slate-300 bg-slate-100">
                <img
                  src={image.secureUrl}
                  width={128}
                  height={128}
                  alt={image.name}
                  className="size-full object-contain"
                />
              </div>
              <div
                className={cn(
                  "border-primary absolute -top-2 -right-3 border bg-white p-[1px]",
                  {
                    hidden: !isActive,
                  },
                )}
              >
                <div className="bg-primary p-1 text-white">
                  <Check strokeWidth="4px" className="size-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-2">
        <div className="text-sm text-slate-700">
          Showing {meta.limit < meta.total ? meta.limit : meta.total} of{" "}
          {meta.total}. ({totalPages} page
          {totalPages > 1 ? "s" : ""}.)
        </div>
        {totalPages !== 1 && (
          <HSPagination
            admin
            page={meta?.page || 1}
            limit={meta?.limit || 35}
            total={meta?.total}
          />
        )}
      </div>
    </ABox>
  );
};

export default MediaGallery;
