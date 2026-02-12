import WorksGallery from "../WorksGallery/WorksGallery";

const Works = () => {
  return (
    <section id="gallery" className="py-20">
      <div className="container px-2">
        <h2 className="sm:text-5xl text-4xl font-normal mb-6 text-center px-2">
          Работы наших мастеров
        </h2>
        <WorksGallery />
        {/* <div className="text-center anim-from-bottom anim-delay">
          <h3 className="lg:text-4xl text-3xl font-normal mt-6 mb-3">
            Больше актуальных работ смотрите в нашем инстаграм:
          </h3>

          <a
            className="lg:text-6xl text-4xl font-bold hover:text-mediumbrown"
            href="https://www.instagram.com/manhattan.bb/"
            target="_blank"
          >
            <i className="fa-brands fa-instagram" aria-hidden="true"></i> manhattan.bb
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default Works;
