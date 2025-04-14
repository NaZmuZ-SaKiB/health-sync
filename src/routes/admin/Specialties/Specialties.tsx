import AGrid from "@/components/admin/ui/AGrid";
import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import SpecialtyCreateForm from "./_components/SpecialtyCreateForm";
import SpecialtyTable from "./_components/SpecialtyTable";

const SpecialtiesPage = () => {
  return (
    <APageContainer>
      <APageHeader title="Specialties" />

      <AGrid>
        <SpecialtyCreateForm />

        <div>
          <SpecialtyTable />
        </div>
      </AGrid>
    </APageContainer>
  );
};

export default SpecialtiesPage;
