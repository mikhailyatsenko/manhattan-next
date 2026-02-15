export interface SlideConfig {
  id: string;
  desktopImage: string;
  mobileImage: string;
  customStyles?: React.CSSProperties;
  content: React.ReactNode;
}

export const slides: SlideConfig[] = [
  {
    id: "first-visit",
    desktopImage: "img/slide-1.webp",
    mobileImage: "img/slide-1-sm.webp",
    content: (
      <div className="">
        <h1 className="uppercase text-3xl sm:text-5xl text-white drop-shadow-sm font-normal">
          Акция 🎉
        </h1>
        <h1 className="md:text-6xl leading-tight text-5xl text-white drop-shadow-sm font-normal">
          <span>Первое посещение: </span>
          <span className="font-semibold whitespace-nowrap text-amber-300">
            скидка 10%
          </span>
        </h1>
      </div>
    ),
  },
  {
    id: "birthday",
    desktopImage: "img/slide-2.webp",
    mobileImage: "img/slide-2-sm.webp",
    customStyles: {
      backgroundPosition: "top center",
    },
    content: (
      <h1 className="md:text-4xl xl:text-5xl sm:text-3xl text-3xl leading-tight text-white drop-shadow-sm font-normal">
        Дарим скидку
        <span className="font-semibold">
          {" "}
         10%  <span className="text-nowrap">в День Рождения 🥳</span>
          <br />
        </span>
        А так же за 2 дня до и после.
      </h1>
    ),
  },
  {
    id: "friends",
    desktopImage: "img/slide-3.webp",
    mobileImage: "img/slide-3-sm.webp",
    customStyles: {
      backgroundPosition: "top center",
    },
    content: (
      <h1 className="md:text-4xl xl:text-5xl sm:text-3xl text-3xl leading-tight text-white drop-shadow-sm font-normal">
        Приводите своих друзей <br />и получайте{" "}
        <span className="font-semibold">скидку в 200₽</span> за каждого нового
        клиента!
      </h1>
    ),
  },
];
