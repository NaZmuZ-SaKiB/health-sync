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
import { TMedicalReport } from "@/lib/modules/medical-report/medical-report.type";
import { useState } from "react";
import { Link } from "react-router";

type TProps = {
  prescription: TMedicalReport;
};

const PrescriptionDetail = ({ prescription }: TProps) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="cursor-pointer">
          Prescription
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="mb-5">
          <DialogTitle className="text-primary-hover">
            {prescription.title}
          </DialogTitle>
          <DialogDescription hidden>Prescription</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <pre className="text-slate-700" style={{ fontFamily: "inherit" }}>
            {prescription.notes}
          </pre>
          {prescription?.fileUrl && (
            <div>
              <Link
                to={prescription?.fileUrl as string}
                className="text-sm text-sky-600 hover:underline"
              >
                Prescription Link
              </Link>
            </div>
          )}
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

export default PrescriptionDetail;
