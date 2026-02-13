"use client";
import { lazy, Suspense } from "react";
import { useInView } from "../../lib/hooks/useInView";

const LazyMap = lazy(() => import("../Map/Map"));

const Contacts = () => {
  const { ref, isInView } = useInView();

  return (
    <section
      ref={ref}
      id="contacts"
      className="contacts-section py-20 promo-section relative"
    >
      <div className="container">
        <div className="flex md:flex-row-reverse justify-center items-center flex-wrap z-[3] relative">
          <div className="md:w-1/2 w-full mb-10 md:mb-0 md:m-0 -m-36">
            <Suspense fallback={<p>Loading...</p>}>
              <LazyMap />
            </Suspense>
          </div>
          <div
            className={`md:w-1/2 pl-0 md:pr-8 flex flex-col md:items-start md:text-left items-center text-center text-lightbrown animate-in animate-from-right ${
              isInView ? "is-visible" : ""
            }`}
          >
            <h1 className="sm:text-6xl text-5xl font-normal">Записаться</h1>

            <div className="flex my-4 justify-center">
              <div className="w-16 h-1 rounded-full bg-lightbrown inline-flex"></div>
            </div>
            <p className="sm:text-2xl text-xl">
              Для записи звоните или пишите в мессенджерах:
            </p>

            <p className="sm:text-2xl text-2xl mb-1">
              <a className="sm:ml-3" href="tel:+79263948050">
                8 (985) 411-43-54 <i className="fa-solid fa-square-phone" aria-hidden="true"></i>
              </a>
            </p>
            <p className="sm:text-2xl text-2xl mb-1">
              <a className="sm:ml-3" href="tel:+79263948050">
                8 (926) 394-80-50 <i className="fa-solid fa-square-phone" aria-hidden="true"></i>
              </a>{" "}
              <a href="https://api.whatsapp.com/send/?phone=79263948050&text=Здравствуйте%2C+хочу+записаться+на+маникюр.+">
                <i className="fa-brands fa-whatsapp " aria-hidden="true"></i>{" "}
              </a>
            </p>
            <a href="https://api.whatsapp.com/send/?phone=79263948050&text=Здравствуйте%2C+хочу+записаться+на+маникюр.+">
              <button
                id="button-whatsapp"
                type="button"
                className="animate-pulse text-darkbrown bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-normal rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2 transition-all duration-300 ease-in-out"
              >
                Записаться через WhatsApp{" "}
                <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
              </button>
            </a>
            <h2 className="sm:text-5xl text-4xl font-normal pt-8">
              Как нас найти:
            </h2>
            <div className="flex my-4 justify-center">
              <div className="w-16 h-1 rounded-full bg-lightbrown inline-flex"></div>
            </div>
            <p className="sm:text-xl text-lg">Мы находимся по адресу:</p>
            <p className="sm:text-xl text-lg">
              г. Москва, ул. Вавилова 66 (м.&nbsp;Вавиловская, м.&nbsp;Профсоюзная,
              м.&nbsp;Университет)
            </p>
            <p className="sm:text-xl text-lg">ТЦ &quot;Триумфальный&quot;, 3 этаж</p>

            <p className="sm:text-xl text-lg pt-2 font-semibold">
              Время работы:
            </p>
            <p className="sm:text-xl text-lg">Пн — Вс: 10:00 — 21:00</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
