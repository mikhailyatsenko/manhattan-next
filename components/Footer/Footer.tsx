import Image from "next/image";
import whatsappIcon from "@/assets/whatsapp-svgrepo-com.svg";
import telegramIcon from "@/assets/telegram-svgrepo-com.svg";
import phoneNormalIcon from "@/assets/phone-normal.svg";
import logoLight from "@/assets/mbb-icon-light-brown.svg";

// &copy;
const Footer = () => {
  return (
    <footer className="text-lightbrown bg-darkbrown py-20">
      <div className="container mx-auto flex items-center sm:flex-row flex-col">
        <Image src={logoLight} width="60" height="90" alt="Logo" />
        <p
          id="copyright"
          className="text-sm sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-lightbrown sm:py-2 sm:mt-0 mt-4"
          suppressHydrationWarning
        >
          {"© " + new Date().getFullYear() + ' "Манхэттен beauty bar"'}
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start text-2xl md:text-3xl">
          {/* <a href="https://www.instagram.com/manhattan.bb/" target="_blank">
            <i className="fa-brands fa-instagram" aria-hidden="true"></i>
          </a> */}
          <a
            className="ml-3"
            href="https://api.whatsapp.com/send/?phone=79263948050&text=Здравствуйте%2C+хочу+записаться+на+маникюр.+"
          >
            <Image
              style={{ display: "inline" }}
              src={whatsappIcon}
              width={28}
              height={28}
              alt="WhatsApp"
            />
          </a>
          <a href="https://t.me/+79263948050?text=Здравствуйте%2C+хочу+записаться+на+маникюр. ">
            <Image
              style={{ display: "inline" }}
              src={telegramIcon}
              width={28}
              height={28}
              alt="Telegram"
            />
          </a>
          <a className="ml-3" href="tel:+79263948050">
            <Image
              style={{ display: "inline" }}
              src={phoneNormalIcon}
              width={28}
              height={28}
              alt="Phone"
            />
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
