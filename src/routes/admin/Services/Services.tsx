import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import DGrid from "@/components/global/shared/DGrid";
import ServiceCreateForm from "./_components/ServiceCreateForm";

const AdminServicesPage = () => {
  return (
    <APageContainer>
      <APageHeader title="Services" />

      <DGrid>
        <div>
          <ServiceCreateForm />
        </div>
      </DGrid>
    </APageContainer>
  );
};

export default AdminServicesPage;
