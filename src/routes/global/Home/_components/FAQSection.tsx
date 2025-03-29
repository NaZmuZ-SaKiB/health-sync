import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Images } from "@/constants";

const FAQSection = () => {
  return (
    <div
      className="bg-white/30 bg-cover bg-center py-24 bg-blend-overlay"
      style={{ backgroundImage: `url(${Images.HeroBG})` }}
    >
      <div className="hs-container">
        <div className="grid grid-cols-3 gap-10">
          <div className="col-span-2">
            <h2 className="text-secondary mb-3 text-4xl font-bold">
              Frequently Asked Questions
            </h2>
            <p className="mb-5 text-lg text-slate-500">
              Quick answers to common questions about appointments, services,
              and policies—saving you time and making your hospital visit
              smoother.
            </p>

            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-secondary bg-primary/10 rounded-lg p-4 text-lg font-semibold">
                  How do I book an appointment online?
                </AccordionTrigger>
                <AccordionContent className="border-primary/30 mt-2 rounded-lg border bg-white/20 p-6 text-base leading-7 text-slate-500">
                  You can book an appointment via our website’s "Book Now"
                  section, by selecting your preferred doctor, date, and time.
                  Instant confirmation will be sent via email/SMS.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-secondary bg-primary/10 rounded-lg p-4 text-lg font-semibold">
                  What documents should I bring for my appointment?
                </AccordionTrigger>
                <AccordionContent className="border-primary/30 mt-2 rounded-lg border bg-white/20 p-6 text-base leading-7 text-slate-500">
                  Please carry a valid ID, health insurance card (if
                  applicable), previous medical records, and any referral notes
                  from your physician.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-secondary bg-primary/10 rounded-lg p-4 text-lg font-semibold">
                  Can I reschedule or cancel my appointment?
                </AccordionTrigger>
                <AccordionContent className="border-primary/30 mt-2 rounded-lg border bg-white/20 p-6 text-base leading-7 text-slate-500">
                  Yes, you can reschedule or cancel your appointment online up
                  to 24 hours before your scheduled time. Late cancellations may
                  incur a fee.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-secondary bg-primary/10 rounded-lg p-4 text-lg font-semibold">
                  Do you offer emergency walk-in services?
                </AccordionTrigger>
                <AccordionContent className="border-primary/30 mt-2 rounded-lg border bg-white/20 p-6 text-base leading-7 text-slate-500">
                  Yes, our emergency department operates 24/7. For
                  non-life-threatening concerns, we recommend booking an
                  appointment to reduce waiting times.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
