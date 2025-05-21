import HSButton from "@/components/global/shared/HSButton";
import { Images } from "@/constants";
import { TService } from "@/lib/modules/service/service.type";
import { formatCurrency } from "@/utils/formatCurrency";
import formatTime from "@/utils/formatTime";
import { gql, useQuery } from "@apollo/client";
import { MoveRight } from "lucide-react";

const SINGLE_SERVICE = gql`
  query Service($id: String!) {
    service(id: $id) {
      id
      name
      description
      icon
      serviceSettings {
        startTime
        endTime
        duration
      }
    }
  }
`;

type TProps = {
  id: string;
  setStep: any;
};

const AppointmentServiceInfo = ({ id, setStep }: TProps) => {
  const { data: serviceData, loading } = useQuery(SINGLE_SERVICE, {
    variables: { id },
    skip: !id,
  });

  if (loading) return null;
  // TODO: Loader

  const service: TService = serviceData?.service;

  if (!service.serviceSettings) {
    return (
      <div className="mx-auto max-w-[900px] rounded-3xl bg-slate-50 p-10 shadow-2xl shadow-slate-200">
        <p className="text-lg text-slate-700">
          Service is not available right now!
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[900px] rounded-3xl bg-slate-50 p-10 shadow-2xl shadow-slate-200">
      <div className="mb-5 flex items-start gap-5">
        <img
          src={service?.icon || Images.PlaceholderImage}
          width={200}
          height={200}
          className="size-[200px] rounded-2xl object-cover object-center"
        />

        <div>
          <h2 className="text-primary-hover mb-5 text-3xl font-semibold">
            {service.name}
          </h2>

          <p className="mb-1 font-medium text-slate-700">
            Start Time: {formatTime(service?.serviceSettings?.startTime)}
          </p>
          <p className="mb-1 font-medium text-slate-700">
            End time: {formatTime(service?.serviceSettings?.endTime)}
          </p>
          <p className="mb-1 font-medium text-slate-700">
            Duration: {service?.serviceSettings?.duration} minutes
          </p>
          <p className="">
            <span className="font-medium text-slate-700">Fee: </span>
            {formatCurrency(service.serviceSettings?.fee || 0)}
          </p>
        </div>
      </div>

      <div>
        <p className="text-slate-700">{service?.description || ""}</p>
      </div>

      {service?.serviceSettings && (
        <div className="mt-10 flex justify-center">
          <HSButton
            className="h-auto py-2 pr-2 pl-5 text-lg"
            onClick={() => setStep(2)}
          >
            Continue{" "}
            <span className="grid size-10 place-items-center rounded-md bg-white">
              <MoveRight className="text-primary size-5" />
            </span>
          </HSButton>
        </div>
      )}
    </div>
  );
};

export default AppointmentServiceInfo;
