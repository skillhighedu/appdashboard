import Trigger from "@components/Trigger";
import Contact from "./Contact";
import Hero from "./Hero";

// import Testimonials from "./Testimonals";

export default function Landing() {
  return (
    <div className="">
      <Hero />
      <Trigger />
      {/* <Sliding/> */}
      {/* <Testimonials /> */}
      <Contact />
    </div>
  );
}
