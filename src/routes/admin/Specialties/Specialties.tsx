import AGrid from "@/components/admin/ui/AGrid";
import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import SpecialtyCreateForm from "./_components/SpecialtyCreateForm";
import SpecialtyTable from "./_components/SpecialtyTable";
import SearchFilter from "@/components/admin/shared/SearchFilter";
import ABox from "@/components/admin/ui/ABox";

const SpecialtiesPage = () => {
  return (
    <APageContainer>
      <APageHeader title="Specialties" />

      <AGrid>
        <div>
          <SpecialtyCreateForm />
        </div>

        <div className="space-y-4">
          <ABox>
            <SearchFilter />
          </ABox>
          <SpecialtyTable />
        </div>
      </AGrid>
    </APageContainer>
  );
};

export default SpecialtiesPage;
