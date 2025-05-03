import DBox from "@/components/dashboard/ui/DBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/use-auth";
import { DoctorScheduleQueries } from "@/lib/modules/doctor-schedule/doctor-schedule.queries";
import { TDoctorSchedule } from "@/lib/modules/doctor-schedule/doctor-schedule.type";
import { useQuery } from "@apollo/client";
import { Edit } from "lucide-react";
import { ChangeEvent } from "react";
import ScheduleBulkUpdateModal from "./ScheduleBulkUpdateModal";
import formatTime from "@/utils/formatTime";

type TProps = {
  selected: string[];
  setSelected: (selected: string[]) => void;
};

const ScheduleTable = ({ selected, setSelected }: TProps) => {
  const { user, loading: userLoading } = useAuth();
  const { data: scheduleData, loading } = useQuery(
    DoctorScheduleQueries.DOCTOR_SCHEDULES,
    {
      variables: { doctorId: user?.id },
    },
  );

  if (userLoading || loading) return null;

  // Handle Select
  const selectAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelected(
        scheduleData?.doctorSchedules?.map(
          (schedule: TDoctorSchedule) => schedule.id,
        ) || [],
      );
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.checked) {
      setSelected([...selected, id]);
    } else {
      setSelected(selected.filter((item) => item !== id));
    }
  };
  // End Handle Select

  const schedules: TDoctorSchedule[] | undefined =
    scheduleData?.doctorSchedules;
  return (
    <DBox>
      <table className="doctor-schedule-table primary-table table table-auto">
        <thead>
          <tr>
            <th>
              <Input
                type="checkbox"
                className="mx-auto size-4"
                onChange={selectAll}
              />
            </th>
            <th>Day</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Session Length</th>
            <th>Available</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {schedules?.map((schedule) => (
            <tr key={`schedule-table-${schedule.id}`}>
              <td>
                <Input
                  checked={selected.includes(schedule.id)}
                  onChange={(e) => handleSelect(e, schedule.id)}
                  type="checkbox"
                  className="mx-auto size-4"
                />
              </td>
              <td>{schedule.day?.slice(0, 3)}</td>
              <td>{formatTime(schedule.startTime)}</td>
              <td>{formatTime(schedule.endTime)}</td>
              <td>{schedule.sessionLength} Minutes</td>
              <td>{schedule?.isAvailable ? "true" : "false"}</td>
              <td>
                <ScheduleBulkUpdateModal
                  ids={[schedule.id]}
                  defaultValue={schedule}
                >
                  <Button
                    size="icon"
                    variant="outline"
                    className="cursor-pointer"
                  >
                    <Edit />
                  </Button>
                </ScheduleBulkUpdateModal>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DBox>
  );
};

export default ScheduleTable;
