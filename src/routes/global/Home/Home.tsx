import { Images } from "@/constants";
import AboutSection from "./_components/AboutSection";
import CountSection from "./_components/CountSection";
import HeroSection from "./_components/HeroSection";
import SpecialtiesSection from "./_components/SpecialtiesSection";
import ChooseUsSection from "./_components/ChooseUsSection";
import ServicesSection from "./_components/ServicesSection";
import DoctorSection from "./_components/DoctorSection";
import ReviewSection from "./_components/ReviewSection";
import HowToBookSection from "./_components/HowToBookSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <CountSection />
      <ServicesSection />
      <div
        className="bg-cover bg-center"
        style={{ backgroundImage: `url(${Images.HeroBG})` }}
      >
        <SpecialtiesSection />
      </div>
      <ChooseUsSection />
      <DoctorSection />
      <ReviewSection />
      <HowToBookSection />
    </div>
  );
};

export default Home;
