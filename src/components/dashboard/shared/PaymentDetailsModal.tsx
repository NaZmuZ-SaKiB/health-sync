import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";
import { useState } from "react";

type TProps = {
  details: string;
  admin?: boolean;
};

const PaymentDetailsModal = ({ details, admin = false }: TProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const detailsString = details || "{}";
  const detailsObj = JSON.parse(detailsString);

  if (!admin) {
    delete detailsObj["storeAmount"];
    delete detailsObj["validationId"];
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn("cursor-pointer", { "rounded-none": admin })}
        >
          <Eye />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="mb-5">
          <DialogTitle className="text-primary-hover">
            Payment Details
          </DialogTitle>
          <DialogDescription hidden>Payment Details</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          {Object.keys(detailsObj).map((key) => (
            <p key={key}>
              <span className="font-semibold">{key}:</span> {detailsObj[key]}
            </p>
          ))}
        </div>

        <DialogFooter className="mt-5">
          <Button
            variant="secondary"
            className="cursor-pointer text-slate-50"
            type="button"
            onClick={() => {
              setOpen(false);
            }}
          >
            close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDetailsModal;
