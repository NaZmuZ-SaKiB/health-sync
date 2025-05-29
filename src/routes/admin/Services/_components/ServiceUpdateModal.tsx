import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ServiceQueries } from "@/lib/modules/service/service.queries";
import { TService } from "@/lib/modules/service/service.type";
import { useQuery } from "@apollo/client";
import { Edit } from "lucide-react";
import { useState } from "react";
import ServiceUpdateForm from "./ServiceUpdateForm";

type TProps = {
  id: string;
};

const ServiceUpdateModal = ({ id }: TProps) => {
  const [open, setOpen] = useState(false);

  const { data: serviceData, loading } = useQuery(
    ServiceQueries.SERVICE_BY_ID,
    {
      variables: { id },
      skip: !open,
    },
  );

  if (loading) return <div>Loading...</div>;

  const service: TService = serviceData?.service;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="cursor-pointer rounded-none"
        >
          <Edit />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="mb-5">
          <DialogTitle className="text-primary-hover">Edit Service</DialogTitle>
          <DialogDescription hidden>Edit Service</DialogDescription>
        </DialogHeader>

        <ServiceUpdateForm service={service} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default ServiceUpdateModal;
