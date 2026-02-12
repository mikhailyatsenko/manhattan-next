"use client";
import { Link } from "react-scroll";
import { useInView } from "../../lib/hooks/useInView";

const Features = () => {
  const { ref, isInView } = useInView();

  return (
    <section
      ref={ref}
      id="features"
      className="text-darkbrown bg-center features-section"
    >
      <div className="container py-20 text-center">
        <div className={`text-center mb-20 animate-in animate-from-bottom ${isInView ? "is-visible" : ""}`}>
          <h2 className="sm:text-5xl text-4xl font-medium mb-4">
            Мы заинтересованы в том, чтобы Вы возвращались
          </h2>
          <p className="text-2xl leading-relaxed mx-auto">
            Поэтому стараемся обеспечить максимальный уровень комфорта по многим
            параметрам
          </p>
          <div className="flex mt-6 justify-center">
            <div className="w-16 h-1 rounded-full bg-lightbrown inline-flex"></div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center font-semibold">
          <div
            className={`p-4 sm:w-1/2 lg:w-1/4 flex flex-col text-center items-center animate-in animate-from-bottom animate-delay-200 ${
              isInView ? "is-visible" : ""
            }`}
          >
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-darkbrown text-lightbrown mb-5 flex-shrink-0">
              <i className="fa-solid fa-wand-magic-sparkles text-4xl"></i>
            </div>
            <div className="flex-grow">
              <h3 className="leading-relaxed text-xl">
                Качественные современные материалы
              </h3>
            </div>
          </div>
          <div
            className={`p-4 sm:w-1/2 lg:w-1/4 flex flex-col text-center items-center animate-in animate-from-bottom animate-delay-400 ${
              isInView ? "is-visible" : ""
            }`}
          >
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-darkbrown text-lightbrown mb-5 flex-shrink-0">
              <i className="fa-solid fa-pump-medical text-4xl"></i>
            </div>
            <div className="flex-grow">
              <h3 className="leading-relaxed text-xl">
                100% стерильные инструменты
              </h3>
            </div>
          </div>
          <div
            className={`p-4 sm:w-1/2 lg:w-1/4 flex flex-col text-center items-center animate-in animate-from-bottom animate-delay-600 ${
              isInView ? "is-visible" : ""
            }`}
          >
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-darkbrown text-lightbrown mb-5 flex-shrink-0">
              <i className="fa-solid fa-thumbs-up text-4xl"></i>
            </div>
            <div className="flex-grow">
              <h3 className="leading-relaxed text-xl">
                Безупречная работа мастеров
              </h3>
            </div>
          </div>

          <div
            className={`p-4 sm:w-1/2 lg:w-1/4 flex flex-col text-center items-center animate-in animate-from-bottom animate-delay-800 ${
              isInView ? "is-visible" : ""
            }`}
          >
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-darkbrown text-lightbrown mb-5 flex-shrink-0">
              <i className="fa-solid fa-hand-holding-dollar text-4xl"></i>
            </div>
            <div className="flex-grow">
              <h3 className="leading-relaxed text-xl">
                Соотношение цены и качества
              </h3>
            </div>
          </div>
        </div>
        <div
          className={`animate-in animate-from-bottom animate-delay-1000 ${
            isInView ? "is-visible" : ""
          }`}
        >
          <Link
            to="contacts"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
          >
            <button
              type="button"
              className="mx-auto text-darkbrown hover:text-lightbrown border border-darkbrown hover:bg-darkbrown focus:ring-4 focus:outline-none focus:ring-lightbrown font-medium rounded-sm text-2xl px-5 py-2.5 text-center my-5"
            >
              Записаться
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;
