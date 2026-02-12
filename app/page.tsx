import Header from "@/components/Header/Header";
import Slider from "@/components/Slider/Slider";
import Years15 from "@/components/Years15/Years15";
import About from "@/components/About/About";
import OurPrinciple from "@/components/OurPrinciple/OurPrinciple";
import Features from "@/components/Features/Features";
import Works from "@/components/Works/Works";
import Prices from "@/components/Prices/Prices";
import Offers from "@/components/Offers/Offers";
import Contacts from "@/components/Contacts/Contacts";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Slider />
        <Years15 />
        <About />
        <OurPrinciple />
        <Features /> 
        <Prices />
        <Offers />
        <Contacts /> 
        <Works />
      </main>
      <Footer />
    </>
  );
}
