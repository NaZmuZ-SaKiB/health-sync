import HSDInput from "@/components/dashboard/form/HSDInput";
import HSDTextarea from "@/components/dashboard/form/HSDTextarea";
import HSButton from "@/components/global/shared/HSButton";
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
import { Form } from "@/components/ui/form";
import { AUTH_KEY } from "@/constants";
import { AppointmentQueries } from "@/lib/modules/appointment/appointment.queries";
import { MedicalReportQueries } from "@/lib/modules/medical-report/medical-report.queries";
import { MedicalReportValidation } from "@/lib/modules/medical-report/medical-report.validation";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type TProps = {
  id: string;
  patientId: string;
  defaultValues?: Partial<TForm>;
};

type TForm = z.infer<typeof MedicalReportValidation.prescriptionSchema>;

const AddPrescriptionButton = ({ id, defaultValues, patientId }: TProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const [cookies] = useCookies([AUTH_KEY]);

  const [createPrescription] = useMutation(
    MedicalReportQueries.CREATE_MEDICAL_REPORT,
    {
      context: {
        headers: {
          Authorization: cookies[AUTH_KEY] || "",
        },
      },
      refetchQueries: [AppointmentQueries.DOCTOR_SERVICE_APPOINTMENTS],
    },
  );

  const form = useForm<TForm>({
    defaultValues: {
      fileUrl: defaultValues?.fileUrl || "",
      notes: defaultValues?.notes || "",
      title: defaultValues?.title || "",
    },
    resolver: zodResolver(MedicalReportValidation.prescriptionSchema),
  });

  const handleSubmit: SubmitHandler<TForm> = async (data) => {
    if (!data.fileUrl) delete data.fileUrl;

    try {
      toast.promise(
        async () => {
          return await createPrescription({
            variables: {
              ...data,
              patientId,
              appointmentId: id,
            },
          });
        },
        {
          loading: "Saving prescription...",
          success: () => {
            setOpen(false);
            return "Prescription Saved.";
          },
          error: (error: any) => error?.message,
        },
      );
    } catch {
      toast.error("A Client error occurred");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="cursor-pointer">
          Prescribe
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="mb-5">
          <DialogTitle className="text-primary-hover">Prescription</DialogTitle>
          <DialogDescription hidden>Prescription</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-3"
          >
            <HSDInput name="title" label="Title" />
            <HSDTextarea name="notes" label="Prescription" />
            <HSDInput
              name="fileUrl"
              label="Prescription URL (optional)"
              placeholder="Prescription URL"
              required={false}
            />

            <DialogFooter className="mt-5">
              <Button
                variant="secondary"
                className="cursor-pointer text-slate-50"
                type="button"
                onClick={() => {
                  form.reset();
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <HSButton
                className="rounded-lg"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Saving..." : "Save"}
              </HSButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPrescriptionButton;
