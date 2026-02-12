import Image from "next/image";

// &copy;
const Footer = () => {
  return (
    <footer className="text-lightbrown bg-darkbrown py-20">
      <div className="container mx-auto flex items-center sm:flex-row flex-col">
       
          <Image src="/img/logo-light.png" alt="Manhattan Beauty Bar Logo" width={60} height={60} />

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
            <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
          </a>
          <a className="ml-3" href="tel:+79263948050">
            <i className="fa-solid fa-square-phone" aria-hidden="true"></i>
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
