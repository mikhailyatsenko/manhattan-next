"use client";
import { Link } from "react-scroll";
import { useState, useEffect } from "react";
import Image from "next/image";

const Header = () => {
  const [isBurgerMenuActive, setIsBurgerMenuActive] = useState(false);
  const [headerClassName, setHeaderClassName] = useState("");
  const switcherBurgerMenu = () => {
    setIsBurgerMenuActive((prev) => !prev);
  };

  useEffect(() => {
    function stickyMenu() {
      // if (headerRef.current && scrollY > headerRef.current.clientHeight) {
      //   setHeaderClassName("fixed");
      // } else {
      //   setHeaderClassName("");
      // }
      if (window.scrollY > 400) {
        setHeaderClassName("in-view fixed");
      } else {
        setHeaderClassName("");
      }
    }
    window.addEventListener("scroll", stickyMenu);
    return () => window.removeEventListener("scroll", stickyMenu);
  }, []);

  return (
    <>
      <div
        className={
          headerClassName
            ? "md:block hidden top-bar bg-darkbrown text-lightbrown text-center w-full h-[76px] text-sm md:text-base"
            : "hidden"
        }
      >
        <p>
          Запись по телефону:{" "}
          <a
            className="underline hover:text-mediumbrown"
            href="tel:+79263948050"
          >
            +7 (926) 394-80-50
          </a>
        </p>
      </div>
      <header className={`header w-full font-normal z-10 ${headerClassName}`}>
        <div className="container px-4">
          <nav className="flex justify-between items-center">
            <div className="md:hidden w-1/4 md:w-auto flex text-3xl z-[6]">
              <a href="https://api.whatsapp.com/send/?phone=79263948050&text=Здравствуйте%2C+хочу+записаться+на+маникюр.+">
                <i
                  className="fa-brands fa-whatsapp text-green-500"
                  aria-hidden="true"
                ></i>
              </a>
              <a className="ml-3" href="tel:+79263948050">
                <i
                  className="fa-solid fa-square-phone text-red-500"
                  aria-hidden="true"
                ></i>
              </a>
            </div>
            <div className="flex items-center header-logo justify-center w-1/2 md:w-auto">
              <div className="menu-logo py-2 flex items-center">
                <a href="#">
                  <img src="/img/logo.png" alt="Logo" />
                </a>
              </div>
              <div className="text-center text-darkbrown md:text-2xl text-md font-normal px-1 md:px-2 cursor-default">
                <div className="uppercase leading-4 md:leading-6">
                  Манхэттен
                </div>
                <div className="leading-5 md:leading-6">beauty bar</div>
              </div>
            </div>
            <div className="w-1/4 md:w-auto flex justify-end">
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
              <li className="menu-link pr-3 hover:text-mediumbrown cursor-pointer">
                <Link
                  onClick={switcherBurgerMenu}
                  activeClass="active"
                  to="about"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                  className="menu-link"
                >
                  О нас
                </Link>
              </li>
              <li
                data-goto=".price-section"
                className="menu-link pr-3 hover:text-mediumbrown cursor-pointer"
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
                >
                  Цены
                </Link>
              </li>
              <li
                data-goto="#special"
                className="menu-link pr-3 hover:text-mediumbrown cursor-pointer"
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
                >
                  Акции
                </Link>
              </li>
              <li
                data-goto="#contacts"
                className="menu-link hover:text-mediumbrown hover:cursor-pointer"
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
