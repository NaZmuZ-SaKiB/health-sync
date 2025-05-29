import { TBloodGroup } from "@/types";

const formatBloodGroup = (bloodGroup?: TBloodGroup): string => {
  if (!bloodGroup) return "N/A";

  const [group, rh] = bloodGroup.split("_");

  const formattedGroup = group === "O" ? group : group.replace("O", ""); // This ensures "O" remains "O"

  return rh === "POSITIVE"
    ? `${formattedGroup}+`
    : rh === "NEGATIVE"
      ? `${formattedGroup}-`
      : formattedGroup;
};

export default formatBloodGroup;
