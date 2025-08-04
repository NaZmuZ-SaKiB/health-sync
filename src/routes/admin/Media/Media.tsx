import ABox from "@/components/admin/ui/ABox";
import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import LimitFilter from "@/components/global/shared/LimitFilter";
import SearchFilter from "@/components/global/shared/SearchFilter";
import SelectedCount from "@/components/global/shared/SelectedCount";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router";
import MediaGallery from "./_components/MediaGallery";

const MediaPage = () => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <APageContainer>
      <APageHeader title="Media" />

      <ABox>
        <div className="mb-2 flex items-center gap-2">
          <SelectedCount count={selected.length} />
          {/*<LocationDelete selected={selected} setSelected={setSelected}>*/}
          <Button
            className="cursor-pointer rounded-none border border-red-300 bg-transparent text-red-500 hover:border-red-500 hover:bg-red-50 hover:text-red-500 focus-visible:border-red-500 focus-visible:ring-0"
            disabled={selected.length === 0}
            size="sm"
          >
            Delete
          </Button>
          {/*</LocationDelete>*/}
          <LimitFilter />
        </div>
        <SearchFilter />
      </ABox>

      <MediaGallery selected={selected} setSelected={setSelected} />
    </APageContainer>
  );
};

export default MediaPage;
