import { Images } from "@/constants";
import AboutSection from "./_components/AboutSection";
import CountSection from "./_components/CountSection";
import HeroSection from "./_components/HeroSection";
import SpecialtiesSection from "./_components/SpecialtiesSection";
import ChooseUsSection from "./_components/ChooseUsSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <CountSection />
      <div
        className="bg-cover bg-center"
        style={{ backgroundImage: `url(${Images.HeroBG})` }}
      >
        <SpecialtiesSection />
      </div>
      <ChooseUsSection />
    </div>
  );
};

export default Home;
