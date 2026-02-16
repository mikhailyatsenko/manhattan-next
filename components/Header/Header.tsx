"use client";
import { Link } from "react-scroll";
import { useState, useEffect } from "react";
import Image from "next/image";
import whatsappIcon from "@/assets/whatsapp-svgrepo-com.svg";
import telegramIcon from "@/assets/telegram-svgrepo-com.svg";
import phoneRedIcon from "@/assets/phone-red.svg";
import logoDarkBrown from "@/assets/mbb-icon-dark-brown.svg";

const Header = () => {
  const [isBurgerMenuActive, setIsBurgerMenuActive] = useState(false);
  const [headerClassName, setHeaderClassName] = useState("");
  const switcherBurgerMenu = () => {
    setIsBurgerMenuActive((prev) => !prev);
  };

  useEffect(() => {
    const timeoutId = null;
    let isThrottled = false;

    function stickyMenu() {
      if (window.scrollY > 800) {
        setHeaderClassName("in-view fixed");
      } else {
        setHeaderClassName("");
      }
    }

    function throttledStickyMenu() {
      if (!isThrottled) {
        stickyMenu();
        isThrottled = true;
        setTimeout(() => {
          isThrottled = false;
        }, 100); // выполняется максимум раз в 100мс
      }
    }

    window.addEventListener("scroll", throttledStickyMenu);
    return () => {
      window.removeEventListener("scroll", throttledStickyMenu);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <>
      <div
        className={
          headerClassName
            ? "md:block hidden top-bar bg-darkbrown text-lightbrown text-center w-full h-[86px] text-sm md:text-base"
            : "hidden"
        }
      ></div>
      <header className={`header w-full font-normal z-10 ${headerClassName}`}>
        <div className="container px-4">
          <nav className="flex justify-between gap-4 items-center">
            <div className="flex items-center header-logo justify-center md:w-auto">
              <div className="menu-logo py-2 flex items-center">
                <Image src={logoDarkBrown} width="46" height="70" alt="Logo" />
                {/* <img src="/img/logo.png" alt="Logo" /> */}
              </div>
              <div className="text-center text-darkbrown md:text-2xl text-md font-normal px-1 md:px-2 cursor-default">
                <div className="uppercase leading-4 md:leading-6">
                  Манхэттен
                </div>
                <div className="leading-5 md:leading-6">beauty bar</div>
              </div>
            </div>
            <div className="md:hidden items-center grow gap-2 justify-end flex text-3xl z-[6] leading-4">
              <a 
                href="https://api.whatsapp.com/send/?phone=79263948050&text=Здравствуйте%2C+хочу+записаться+на+маникюр.+"
                className="inline-flex items-center justify-center min-w-[48px] min-h-[48px] p-2"
                aria-label="Написать в WhatsApp"
              >
                <Image
                  src={whatsappIcon}
                  width={32}
                  height={32}
                  alt="WhatsApp"
                />
              </a>
              <a 
                href="https://t.me/+79263948050?text=Здравствуйте%2C+хочу+записаться+на+маникюр.+"
                className="inline-flex items-center justify-center min-w-[48px] min-h-[48px] p-2"
                aria-label="Написать в Telegram"
              >
                <Image
                  style={{ display: "inline" }}
                  src={telegramIcon}
                  width={32}
                  height={32}
                  alt="Telegram"
                />
              </a>
              <a 
                href="tel:+79263948050"
                className="inline-flex items-center justify-center min-w-[48px] min-h-[48px] p-2"
                aria-label="Позвонить по телефону"
              >
                <Image src={phoneRedIcon} width={32} height={32} alt="Phone" />
              </a>
            </div>
            <div className="ml-2 w-fit flex justify-end">
              <div
                onClick={switcherBurgerMenu}
                className={`burger-icon ${isBurgerMenuActive ? "active" : ""}`}
              >
                <span></span>
              </div>
            </div>

            <ul
              className={`menu-body flex uppercase font-semibold ${isBurgerMenuActive ? "active" : ""}`}
            >
              <li className="pr-3 hover:text-mediumbrown cursor-pointer">
                <Link
                  onClick={switcherBurgerMenu}
                  activeClass="active"
                  to="about"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                  className="menu-link"
                  href="#about"
                >
                  О нас
                </Link>
              </li>
              <li
                data-goto=".price-section"
                className="pr-3 hover:text-mediumbrown cursor-pointer"
              >
                <Link
                  onClick={switcherBurgerMenu}
                  activeClass="active"
                  to="price"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                  className="menu-link"
                  href="#price"
                >
                  Цены
                </Link>
              </li>
              <li
                data-goto="#special"
                className="pr-3 hover:text-mediumbrown cursor-pointer"
              >
                <Link
                  onClick={switcherBurgerMenu}
                  activeClass="active"
                  to="promo-1"
                  spy={true}
                  smooth={true}
                  offset={10}
                  duration={500}
                  className="menu-link"
                  href="#promo-1"
                >
                  Акции
                </Link>
              </li>
              <li
                data-goto="#contacts"
                className="hover:text-mediumbrown hover:cursor-pointer"
              >
                <Link
                  onClick={switcherBurgerMenu}
                  activeClass="active"
                  to="contacts"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                  className="menu-link"
                  href="#contacts"
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
