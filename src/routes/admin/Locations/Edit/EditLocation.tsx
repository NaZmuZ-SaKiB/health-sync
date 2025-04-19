import PageLoader from "@/components/admin/shared/PageLoader";
import AGrid from "@/components/admin/ui/AGrid";
import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import { LocationQueries } from "@/lib/modules/location/location.queries";
import { TLocation } from "@/lib/modules/location/location.type";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import LocationEditForm from "../_components/LocationEditForm";

const EditLocationPage = () => {
  const params = useParams();
  const { id } = params;

  const { data: locationData, loading: locationLoading } = useQuery(
    LocationQueries.LOCATION_BY_ID,
    {
      variables: { id },
    },
  );

  const location: TLocation | undefined = locationData?.location;

  if (locationLoading) {
    return <PageLoader />;
  }

  if (!locationLoading && !location) {
    return <div>No location Found</div>;
  }

  return (
    <APageContainer>
      <APageHeader title={location?.name ?? "Edit"} backButton />

      <AGrid>
        <div>
          <LocationEditForm location={location as TLocation} />
        </div>
      </AGrid>
    </APageContainer>
  );
};

export default EditLocationPage;
