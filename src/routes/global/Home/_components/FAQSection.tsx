import HSButton from "@/components/global/shared/HSButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Images } from "@/constants";
import { MoveRight, PhoneCall } from "lucide-react";
import { Link } from "react-router";

const FAQSection = () => {
  return (
    <div className="hs-container">
      <div className="py-24">
        <div className="grid grid-cols-5 items-center">
          {/* Left Side  */}
          <div className="col-span-3 pr-20">
            <h2 className="text-secondary mb-3 text-5xl font-bold">
              Frequently Asked Questions
            </h2>
            <p className="mb-10 text-lg text-slate-500">
              Quick answers to common questions about appointments, services,
              and policies—saving you time and making your hospital visit
              smoother.
            </p>

            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem className="border-none" value="item-1">
                <AccordionTrigger className="text-secondary bg-primary/5 border-primary/30 cursor-pointer rounded-lg border p-4 text-lg font-semibold hover:no-underline">
                  How do I book an appointment online?
                </AccordionTrigger>
                <AccordionContent className="border-secondary/10 mt-2 rounded-lg border bg-white/20 p-6 text-base leading-7 text-slate-500">
                  You can book an appointment via our website’s "Book Now"
                  section, by selecting your preferred doctor, date, and time.
                  Instant confirmation will be sent via email/SMS.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem className="border-none" value="item-2">
                <AccordionTrigger className="text-secondary bg-primary/5 border-primary/30 cursor-pointer rounded-lg border p-4 text-lg font-semibold hover:no-underline">
                  What documents should I bring for my appointment?
                </AccordionTrigger>
                <AccordionContent className="border-secondary/10 mt-2 rounded-lg border bg-white/20 p-6 text-base leading-7 text-slate-500">
                  Please carry a valid ID, health insurance card (if
                  applicable), previous medical records, and any referral notes
                  from your physician.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem className="border-none" value="item-3">
                <AccordionTrigger className="text-secondary bg-primary/5 border-primary/30 cursor-pointer rounded-lg border p-4 text-lg font-semibold hover:no-underline">
                  Can I reschedule or cancel my appointment?
                </AccordionTrigger>
                <AccordionContent className="border-secondary/10 mt-2 rounded-lg border bg-white/20 p-6 text-base leading-7 text-slate-500">
                  Yes, you can reschedule or cancel your appointment online up
                  to 24 hours before your scheduled time. Late cancellations may
                  incur a fee.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem className="border-none" value="item-4">
                <AccordionTrigger className="text-secondary bg-primary/5 border-primary/30 cursor-pointer rounded-lg border p-4 text-lg font-semibold hover:no-underline">
                  Do you offer emergency walk-in services?
                </AccordionTrigger>
                <AccordionContent className="border-secondary/10 mt-2 rounded-lg border bg-white/20 p-6 text-base leading-7 text-slate-500">
                  Yes, our emergency department operates 24/7. For
                  non-life-threatening concerns, we recommend booking an
                  appointment to reduce waiting times.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Right Side  */}
          <div className="relative col-span-2">
            <img
              className="aspect-square w-full rounded-2xl object-cover"
              src={Images.FAQImage}
              alt="Faq section"
            />
            <div className="absolute bottom-7 left-1/2 flex w-[90%] -translate-x-1/2 items-center justify-between rounded-2xl bg-white p-5">
              <Link to="/tel:+1123456789" className="flex items-center gap-3">
                <PhoneCall className="text-primary size-8 animate-bounce" />
                <div>
                  <p className="text-sm text-slate-500">Contact us?</p>
                  <p className="text-secondary text-lg font-semibold">
                    +1123 456 789
                  </p>
                </div>
              </Link>

              <Link to={"/appointment"}>
                <HSButton className="h-auto py-2 pr-2 pl-5 text-lg">
                  Appointment{" "}
                  <span className="grid size-10 place-items-center rounded-md bg-white">
                    <MoveRight className="text-primary size-5" />
                  </span>
                </HSButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
