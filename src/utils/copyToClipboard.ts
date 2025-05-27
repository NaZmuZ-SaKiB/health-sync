import { toast } from "sonner";

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard.");
  } catch {
    toast.error("Failed to copy.");
  }
};

export default copyToClipboard;
