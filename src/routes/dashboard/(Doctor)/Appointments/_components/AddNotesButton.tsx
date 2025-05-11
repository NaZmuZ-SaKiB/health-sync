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
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type TProps = {
  id: string;
  defaultValue?: string;
};

const formSchema = z.object({
  notes: z.string({ required_error: "Notes is required." }),
});

type TForm = z.infer<typeof formSchema>;

const AddNotesButton = ({ id, defaultValue }: TProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const [cookies] = useCookies([AUTH_KEY]);

  const form = useForm<TForm>({
    defaultValues: {
      notes: defaultValue || "",
    },
    resolver: zodResolver(formSchema),
  });

  const [updateAppointmentFn] = useMutation(
    AppointmentQueries.UPDATE_APPOINTMENT,
    {
      context: {
        headers: {
          Authorization: cookies[AUTH_KEY] || "",
        },
      },
      refetchQueries: [AppointmentQueries.DOCTOR_APPOINTMENTS],
    },
  );

  const handleUpdate: SubmitHandler<TForm> = async (data) => {
    try {
      toast.promise(
        async () => {
          return await updateAppointmentFn({
            variables: {
              appointmentId: id,
              notes: data.notes,
            },
          });
        },
        {
          loading: "Saving notes...",
          success: () => {
            setOpen(false);
            return "Notes Saved.";
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
          Add Notes
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="mb-5">
          <DialogTitle className="text-primary-hover">Add Notes</DialogTitle>
          <DialogDescription hidden>Add Notes</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="flex flex-col gap-3"
          >
            <HSDTextarea name="notes" label="Notes" />

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

export default AddNotesButton;
