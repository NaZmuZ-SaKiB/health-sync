import PageLoader from "@/components/admin/shared/PageLoader";
import DGrid from "@/components/global/shared/DGrid";
import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import { SpecialtyQueries } from "@/lib/modules/specialty/specialty.queries";
import { TSpecialty } from "@/lib/modules/specialty/specialty.type";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import SpecialtyEditForm from "../_components/SpecialtyEditForm";

const EditSpecialtyPage = () => {
  const params = useParams();
  const { id } = params;

  const { data: specialtyData, loading: specialtyLoading } = useQuery(
    SpecialtyQueries.SPECIALTY_BY_ID,
    {
      variables: { id },
    },
  );
  const specialty: TSpecialty | undefined = specialtyData?.specialty;

  if (specialtyLoading) {
    return <PageLoader />;
  }

  if (!specialtyLoading && !specialty) {
    return <div>No Specialty Found</div>;
  }

  return (
    <APageContainer>
      <APageHeader title={specialty?.name ?? "Edit"} backButton />

      <DGrid>
        <div>
          <SpecialtyEditForm specialty={specialty as TSpecialty} />
        </div>
      </DGrid>
    </APageContainer>
  );
};

export default EditSpecialtyPage;
