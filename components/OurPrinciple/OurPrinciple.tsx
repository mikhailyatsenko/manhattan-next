"use client";

import { Link } from "react-scroll";
import { useInView } from "@/lib/hooks/useInView";

const OurPrinciple = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="py-20 text-center">
      <div className={`container animate-in animate-from-bottom ${isInView ? "is-visible" : ""}`}>
        <h2 className="sm:text-5xl text-4xl font-medium mb-6">
          Наш принцип — индивидуальный подход к каждому клиенту!
        </h2>
      </div>
      <Link to="price" spy={true} smooth={true} offset={50} duration={500}>
        <button
          type="button"
          className={` mx-auto text-darkbrown hover:text-lightbrown border border-darkbrown hover:bg-darkbrown focus:ring-4 focus:outline-none focus:ring-lightbrown font-medium rounded-sm text-2xl px-5 py-2.5 text-center my-5 animate-in animate-from-bottom animate-delay-500 ${
            isInView ? "is-visible" : ""
          }`}
        >
          Ознакомиться с ценами
        </button>
      </Link>
    </section>
  );
};

export default OurPrinciple;
