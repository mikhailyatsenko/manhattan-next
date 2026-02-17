"use client";

import { useInView } from "@/lib/hooks/useInView";
import Image from "next/image";

const About = () => {
  const { ref, isInView } = useInView();

  return (
    <section
      ref={ref}
      id="about"
      className="py-20 years15-section relative"
    >
      <div className="container sm:px-2 xl:px-10">
        <div className="flex justify-center items-center flex-wrap z-[2] relative">
          <div
            className={` rounded-md overflow-hidden md:w-1/2 w-full mb-10 md:mb-0 md:m-0 -m-36 overflow-hidden animate-in animate-from-right shadow-[1px_-1px_10px_#5b4d4ae3] ${
              isInView ? "is-visible" : ""
            }`}
          >
            <Image
             
              alt="hero"
              src="/img/salon.webp"
              width={800}
              height={600}
            />
          </div>
          <div
            className={`overflow-hidden md:w-1/2 pl-0 md:pl-8 flex flex-col md:items-start md:text-left items-center text-center text-lightbrown animate-in animate-from-left ${
              isInView ? "is-visible" : ""
            }`}
          >
            <h3 className="text-4xl lg:text-5xl font-normal mb-6">
              На 3 этаже торгового центра «Триумфальный» находится маникюрный
              салон <strong>«Манхэттен beauty bar»</strong>
            </h3>
            <div className="flex my-4 justify-center">
              <div className="w-16 h-1 rounded-full bg-lightbrown inline-flex"></div>
            </div>

            <p className="sm:text-xl text-lg">
              В уютной атмосфере под любимый фильм и чашечку кофе Вам сделают
              любой вид маникюра и педикюра в исполнении мастеров высочайшего
              класса: классический, аппаратный, комбинированный, моделирование
              искусственных ногтей и многое другое.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
