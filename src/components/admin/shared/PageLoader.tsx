import { LoaderCircle } from "lucide-react";
import APageContainer from "../ui/APageContainer";

const PageLoader = () => {
  return (
    <APageContainer className="items-center justify-center">
      <LoaderCircle className="text-secondary size-16 animate-spin" />
    </APageContainer>
  );
};

export default PageLoader;
