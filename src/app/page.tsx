import Hero from "../components/sections/HomePage/Hero/Hero";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import Featured from "../components/sections/HomePage/Featured/Fetured";
import Highlights from "../components/sections/HomePage/Highlights/Highlights"
import Testimonials from "../components/sections/HomePage/Testimonials/Testimonials";
import VisitUs from "../components/sections/HomePage/VisitUs/VisitUs";
import About from "../components/sections/HomePage/About/About";


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Featured />
      <Highlights />
      <Testimonials />
      <About />
      <VisitUs />
      <Footer />
    </>
  );
}