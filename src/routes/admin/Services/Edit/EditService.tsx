import PageLoader from "@/components/admin/shared/PageLoader";
import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import DGrid from "@/components/global/shared/DGrid";
import { ServiceQueries } from "@/lib/modules/service/service.queries";
import { TService } from "@/lib/modules/service/service.type";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import ServiceEditForm from "../_components/ServiceEditForm";

const EditServicePage = () => {
  const params = useParams();
  const { id } = params;

  const { data: serviceData, loading: serviceLoading } = useQuery(
    ServiceQueries.SERVICE_BY_ID,
    {
      variables: { id },
      skip: !open,
    },
  );

  if (serviceLoading) {
    return <PageLoader />;
  }

  const service: TService = serviceData?.service;

  if (!serviceLoading && !service) {
    return <div>No Specialty Found</div>;
  }

  return (
    <APageContainer>
      <APageHeader title={service?.name ?? "Edit"} backButton />

      <DGrid>
        <div>
          <ServiceEditForm service={service as TService} />
        </div>
      </DGrid>
    </APageContainer>
  );
};

export default EditServicePage;
