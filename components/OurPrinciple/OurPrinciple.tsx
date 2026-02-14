"use client";

import { Link } from "react-scroll";
import { useInView } from "@/lib/hooks/useInView";

const OurPrinciple = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="py-20 text-center">
      <div className="container">
        <h2 className={`sm:text-5xl text-4xl font-normal mb-6 animate-in animate-from-bottom ${isInView ? "is-visible" : ""}`}>
          Наш принцип — индивидуальный подход к каждому клиенту!
        </h2>
        <div
          className={`animate-in animate-from-bottom animate-delay-500 ${
            isInView ? "is-visible" : ""
          }`}
        >
          <Link
            to="price"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            href="#price"
            className="mx-auto text-darkbrown hover:text-lightbrown border border-darkbrown hover:bg-darkbrown focus:ring-4 focus:outline-none focus:ring-lightbrown font-normal rounded-sm text-2xl px-5 py-2.5 text-center my-5 transition-all duration-300 ease-in-out inline-block"
          >
            Ознакомиться с ценами
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurPrinciple;
