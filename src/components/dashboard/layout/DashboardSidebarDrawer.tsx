import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";

const DashboardSidebarDrawer = () => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="hover:bg-primary text-primary cursor-pointer rounded p-0.5 hover:text-slate-50 lg:hidden">
        <AlignJustify className="size-7" />
      </SheetTrigger>

      <SheetContent side="left" className="w-[240px] border-none px-0 py-3">
        <SheetTitle className="hidden">Menu</SheetTitle>
        <DashboardSidebar />
      </SheetContent>
    </Sheet>
  );
};

export default DashboardSidebarDrawer;
