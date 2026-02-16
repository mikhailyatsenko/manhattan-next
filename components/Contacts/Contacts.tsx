"use client";
import { lazy, Suspense } from "react";
import { useInView } from "../../lib/hooks/useInView";
import whatsappIcon from "@/assets/whatsapp-svgrepo-com.svg";
import telegramIcon from "@/assets/telegram-svgrepo-com.svg";
import phoneNormalIcon from "@/assets/phone-normal.svg";
import Image from "next/image";

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
                8 (985) 411-43-54{" "}
                <Image
                  style={{ display: "inline" }}
                  src={phoneNormalIcon}
                  width={28}
                  height={28}
                  alt="Phone"
                />
              </a>
            </p>
            <p className="sm:text-2xl text-2xl mb-1">
              <a className="sm:ml-3" href="tel:+79263948050">
                8 (926) 394-80-50{" "}
                <Image
                  style={{ display: "inline" }}
                  src={phoneNormalIcon}
                  width={28}
                  height={28}
                  alt="Phone"
                />
              </a>{" "}
              <a href="https://api.whatsapp.com/send/?phone=79263948050&text=Здравствуйте%2C+хочу+записаться+на+маникюр.+">
                <Image
                  style={{ display: "inline" }}
                  src={whatsappIcon}
                  width={28}
                  height={28}
                  alt="WhatsApp"
                />
              </a>{" "}
              <a href="https://t.me/+79263948050?text=Здравствуйте%2C+хочу+записаться+на+маникюр. ">
                <Image
                  style={{ display: "inline" }}
                  src={telegramIcon}
                  width={28}
                  height={28}
                  alt="Telegram"
                />
              </a>
            </p>
            <a href="https://api.whatsapp.com/send/?phone=79263948050&text=Здравствуйте%2C+хочу+записаться+на+маникюр.+">
              <button
                id="button-whatsapp"
                type="button"
                className="animate-pulse text-darkbrown bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-normal rounded-lg text-xl px-5 py-2.5 text-center my-2 transition-all duration-300 ease-in-out"
              >
                Записаться через{" "}
                <span className="text-nowrap">
                  WhatsApp{" "}
                  <Image
                    style={{ display: "inline" }}
                    src={whatsappIcon}
                    width={28}
                    height={28}
                    alt="WhatsApp"
                  />
                </span>
              </button>
            </a>
            <a href="https://api.whatsapp.com/send/?phone=79263948050&text=Здравствуйте%2C+хочу+записаться+на+маникюр.+">
              <button
                id="button-whatsapp"
                type="button"
                className="animate-pulse text-darkbrown bg-gradient-to-r from-sky-300 to-blue-200 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-sky-200 font-normal rounded-lg text-xl px-5 py-2.5 text-center my-2 transition-all ease-in-out"
              >
                Записаться через{" "}
                <span className="text-nowrap">
                  Telegram{" "}
                  <Image
                    style={{ display: "inline" }}
                    src={telegramIcon}
                    width={28}
                    height={28}
                    alt="Telegram"
                  />
                </span>
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
              г. Москва, ул. Вавилова 66 (м.&nbsp;Вавиловская,
              м.&nbsp;Профсоюзная, м.&nbsp;Университет)
            </p>
            <p className="sm:text-xl text-lg">
              ТЦ &quot;Триумфальный&quot;, 3 этаж
            </p>

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
