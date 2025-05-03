import DBox from "@/components/dashboard/ui/DBox";
import DPageContainer from "@/components/dashboard/ui/DPageContainer";
import DPageHeader from "@/components/dashboard/ui/DPageHeader";
import DGrid from "@/components/global/shared/DGrid";
import SelectedCount from "@/components/global/shared/SelectedCount";
import { useState } from "react";
import ScheduleTable from "./_components/ScheduleTable";
import ScheduleBulkUpdateModal from "./_components/ScheduleBulkUpdateModal";
import HSButton from "@/components/global/shared/HSButton";

const SchedulesPage = () => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <DPageContainer>
      <DPageHeader title="Schedules" />

      <DGrid small reverse>
        <div className="flex flex-col gap-3">
          <DBox>
            <div className="flex items-center gap-2">
              <SelectedCount count={selected.length} rounded />

              <ScheduleBulkUpdateModal ids={selected} setIds={setSelected}>
                <HSButton
                  className="rounded-lg"
                  variant="secondary"
                  disabled={!selected.length}
                >
                  Bulk Update
                </HSButton>
              </ScheduleBulkUpdateModal>
            </div>
          </DBox>

          <ScheduleTable selected={selected} setSelected={setSelected} />
        </div>
      </DGrid>
    </DPageContainer>
  );
};

export default SchedulesPage;
