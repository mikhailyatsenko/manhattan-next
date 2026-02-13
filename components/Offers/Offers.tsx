"use client";

import { useInView } from "../../lib/hooks/useInView";

const Offers = () => {
  const { ref, isInView } = useInView();

  return (
    <>
      <section ref={ref} id="promo-1" className="relative overflow-hidden">
        <div className="container max-w-full w-full md:px-10 px-4 justify-center items-center flex-wrap relative z-[2]">
          <div className="flex flex-wrap w-full justify-center items-center">
            <div
              className={`w-full md:w-1/2 md:pr-5 animate-in animate-from-right ${
                isInView ? "is-visible" : ""
              }`}
            >
              <div className="md:py-24 py-16 md:pr-16">
                <div className="text-darkbrown md:text-left text-center  min-w-fit bg-[#fff9] p-4">
                  <h2 className="lg:text-5xl text-4xl font-normal mb-6">
                    Будьте в курсе наших новостей, подписывайтесь
                  </h2>

                  <span className="lg:text-6xl text-4xl font-bold hover:text-mediumbrown">
                    @manhattan.bb
                  </span>
                </div>
              </div>
            </div>

            <div
              id="special"
              className={`w-full md:w-1/2 md:pl-5 animate-in animate-from-left ${
                isInView ? "is-visible" : ""
              }`}
            >
              <div className="md:py-24 py-20 md:pl-8 xl:pl-16">
                <div className="text-white md:text-right p-4 bg-[#954e2cb2] min-w-fit text-center">
                  <h2 className="sm:text-5xl text-4xl font-normal mb-6">
                    Специальные предложения
                  </h2>

                  <p className="sm:text-2xl text-xl mb-2">
                    <strong>Первое посещение:</strong>
                  </p>
                  <p className="sm:text-2xl text-xl">Скидка: 10%</p>

                  <div className="flex my-4 justify-center md:justify-end">
                    <div className="w-16 h-[2px] rounded-full bg-lightbrown inline-flex"></div>
                  </div>
                  <p className="sm:text-2xl text-xl">
                    При комплексном обслуживании «маникюр + гельлак + педикюр +
                    гельлак» <strong>коррекция бровей в подарок.</strong>
                  </p>
                  <div className="flex my-4 justify-center md:justify-end">
                    <div className="w-16 h-[2px] rounded-full bg-lightbrown inline-flex"></div>
                  </div>
                  <p className="sm:text-2xl text-xl">
                    Приводите своих друзей и{" "}
                    <strong>получайте скидку в 200₽</strong> за каждого нового
                    клиента!
                  </p>
                  <div className="flex my-4 justify-center md:justify-end">
                    <div className="w-16 h-[2px] rounded-full bg-lightbrown inline-flex"></div>
                  </div>
                  <p className="sm:text-2xl text-xl">
                    <strong>Дарим скидку 10% в День Рождения</strong>, а так же
                    за 2 дня до и после.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 text-center">
        <div className="container text-center"></div>
      </section>
    </>
  );
};

export default Offers;
